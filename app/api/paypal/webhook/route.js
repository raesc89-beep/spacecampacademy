// app/api/paypal/webhook/route.js
// CAPA 3 (Respaldo automático): PayPal envía eventos a este endpoint de forma independiente.
// Si la Capa 2 falla (ej: el usuario cierra el navegador), el webhook activa el acceso de todas formas.
// La firma del webhook se verifica con la API de PayPal para prevenir requests fraudulentos.

import { NextResponse } from 'next/server';
import { verifyPayPalWebhook } from '@/lib/paypal';
import { adminDb } from '@/lib/firebase-admin';

// Desactivar el body parser de Next.js para leer el raw body (requerido para verificar la firma)
export const config = { api: { bodyParser: false } };

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);

    // Verificar la autenticidad del webhook con PayPal
    const headers = {
      'paypal-auth-algo': req.headers.get('paypal-auth-algo'),
      'paypal-cert-url': req.headers.get('paypal-cert-url'),
      'paypal-transmission-id': req.headers.get('paypal-transmission-id'),
      'paypal-transmission-sig': req.headers.get('paypal-transmission-sig'),
      'paypal-transmission-time': req.headers.get('paypal-transmission-time'),
    };

    const isValid = await verifyPayPalWebhook(headers, body);

    if (!isValid) {
      console.error('[PayPal Webhook] Firma inválida — posible fraude');
      return NextResponse.json({ error: 'Webhook inválido' }, { status: 401 });
    }

    const eventType = body.event_type;
    const resource = body.resource;

    console.log(`[PayPal Webhook] Evento recibido: ${eventType}`);

    switch (eventType) {
      case 'CHECKOUT.ORDER.APPROVED':
      case 'PAYMENT.CAPTURE.COMPLETED': {
        // Extraer el userId del custom_id que se pasó al crear la orden
        const userId =
          resource?.purchase_units?.[0]?.custom_id ||  // CHECKOUT.ORDER.APPROVED
          resource?.custom_id;                          // PAYMENT.CAPTURE.COMPLETED

        if (!userId) {
          console.warn('[PayPal Webhook] No se encontró userId en el evento');
          break;
        }

        const captureId = resource?.id;
        const amount = resource?.amount?.value || resource?.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value;
        const currency = resource?.amount?.currency_code || 'USD';

        // Verificar si ya fue activado (idempotencia — evitar doble activación)
        const userDoc = await adminDb.collection('users').doc(userId).get();
        if (userDoc.exists && userDoc.data().isApproved) {
          console.log(`[PayPal Webhook] Usuario ${userId} ya está aprobado, ignorando duplicado`);
          break;
        }

        // Activar acceso
        await adminDb.collection('users').doc(userId).update({
          isApproved: true,
          subscriptionStatus: 'active',
          activatedVia: 'paypal_webhook',
          paidAt: new Date().toISOString(),
          paypalCaptureId: captureId,
          amountPaid: amount,
          currency,
        });

        // Log de auditoría
        await adminDb.collection('payments').add({
          userId,
          captureId,
          amountPaid: amount,
          currency,
          status: 'completed',
          source: 'paypal_webhook',
          eventType,
          createdAt: new Date().toISOString(),
        });

        console.log(`[PayPal Webhook] ✅ Acceso activado para usuario: ${userId}`);
        break;
      }

      case 'PAYMENT.CAPTURE.DENIED':
      case 'PAYMENT.CAPTURE.REVERSED':
      case 'PAYMENT.CAPTURE.REFUNDED': {
        // Revocar acceso si el pago fue rechazado, revertido o reembolsado
        const userId = resource?.custom_id;
        if (userId) {
          await adminDb.collection('users').doc(userId).update({
            isApproved: false,
            subscriptionStatus: eventType.includes('REFUND') ? 'refunded' : 'revoked',
            revokedAt: new Date().toISOString(),
            revokedReason: eventType,
          });
          console.log(`[PayPal Webhook] ⛔ Acceso revocado para usuario: ${userId} — Motivo: ${eventType}`);
        }
        break;
      }

      default:
        console.log(`[PayPal Webhook] Evento ignorado: ${eventType}`);
    }

    // PayPal requiere siempre un 200 OK para confirmar la recepción
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[PayPal Webhook] Error:', err.message);
    // Devolver 200 de todas formas para que PayPal no reintente indefinidamente
    return NextResponse.json({ received: true });
  }
}
