// app/api/paypal/capture-order/route.js
// CAPA 2: El servidor captura el pago y verifica que el pago pertenece al usuario correcto.
// Doble verificación: captura + comprobación de custom_id para prevenir fraude.

import { NextResponse } from 'next/server';
import { capturePayPalOrder } from '@/lib/paypal';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req) {
  try {
    const { orderID, userId } = await req.json();

    if (!orderID || !userId) {
      return NextResponse.json({ error: 'orderID y userId requeridos' }, { status: 400 });
    }

    // Capturar el pago con PayPal
    const capture = await capturePayPalOrder(orderID);

    // Verificación de seguridad crítica:
    // El custom_id de la orden DEBE coincidir con el userId del request.
    // Esto previene que un usuario active el acceso de otra persona.
    const captureUnit = capture.purchase_units?.[0];
    const paidCustomId = captureUnit?.custom_id;

    if (paidCustomId !== userId) {
      console.error(`[PayPal Security] custom_id mismatch: esperado=${userId}, recibido=${paidCustomId}`);
      return NextResponse.json({ error: 'Verificación de identidad fallida' }, { status: 403 });
    }

    if (capture.status !== 'COMPLETED') {
      return NextResponse.json({ error: `Pago no completado: ${capture.status}` }, { status: 400 });
    }

    // Extraer información del pago
    const captureDetails = captureUnit.payments?.captures?.[0];
    const amountPaid = captureDetails?.amount?.value;
    const currency = captureDetails?.amount?.currency_code;
    const captureId = captureDetails?.id;

    // Activar acceso en Firestore usando Admin SDK (no reglas de cliente)
    await adminDb.collection('users').doc(userId).update({
      isApproved: true,
      subscriptionStatus: 'active',
      paidAt: new Date().toISOString(),
      paypalOrderId: orderID,
      paypalCaptureId: captureId,
      amountPaid,
      currency,
    });

    // Registrar el pago en colección de auditoría
    await adminDb.collection('payments').add({
      userId,
      orderID,
      captureId,
      amountPaid,
      currency,
      status: 'completed',
      source: 'paypal_capture',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, captureId });
  } catch (err) {
    console.error('[PayPal capture-order]', err.message);
    return NextResponse.json({ error: 'Error al procesar el pago' }, { status: 500 });
  }
}
