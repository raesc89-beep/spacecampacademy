// lib/paypal.js — Helper centralizado para llamadas a la API de PayPal
// Todos los endpoints del servidor usan este módulo

const PAYPAL_BASE = process.env.PAYPAL_ENV === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

/**
 * Obtiene un access token de PayPal usando Client Credentials.
 * El token dura 9 horas; se regenera en cada request del servidor.
 */
export async function getPayPalToken() {
  const credentials = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) throw new Error('PayPal auth failed: ' + res.status);
  const data = await res.json();
  return data.access_token;
}

/**
 * Crea una orden de pago en PayPal.
 * @param {string} userId - UID del usuario en Firebase
 * @param {string} amount - Monto (ej: "29.99")
 * @param {string} currency - Moneda (ej: "USD", "EUR")
 */
export async function createPayPalOrder(userId, amount, currency) {
  const token = await getPayPalToken();

  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'PayPal-Request-Id': `order-${userId}-${Date.now()}`, // Idempotency key
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: { currency_code: currency, value: amount },
        description: 'Space Camp Academy — Acceso Completo a la Plataforma',
        custom_id: userId, // ← Clave de seguridad: liga el pago al usuario
      }],
      application_context: {
        brand_name: 'Space Camp Academy',
        landing_page: 'LOGIN',
        user_action: 'PAY_NOW',
      },
    }),
  });

  if (!res.ok) throw new Error('PayPal order creation failed: ' + res.status);
  return await res.json();
}

/**
 * Captura (cobra) una orden ya aprobada por el usuario.
 * Esta es la operación crítica que confirma el pago.
 * @param {string} orderID - ID de la orden aprobada por PayPal
 */
export async function capturePayPalOrder(orderID) {
  const token = await getPayPalToken();

  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('PayPal capture failed: ' + res.status);
  return await res.json();
}

/**
 * Verifica el estado actual de una orden de PayPal.
 * Usado como capa de seguridad secundaria al verificar si el pago fue completado.
 * @param {string} orderID
 */
export async function getPayPalOrder(orderID) {
  const token = await getPayPalToken();

  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return null;
  return await res.json();
}

/**
 * Verifica la firma de un webhook de PayPal para prevenir fraude.
 * Llama a la API de verificación de PayPal en lugar de implementar la verificación localmente.
 */
export async function verifyPayPalWebhook(headers, body) {
  const token = await getPayPalToken();

  const verificationPayload = {
    auth_algo: headers['paypal-auth-algo'],
    cert_url: headers['paypal-cert-url'],
    transmission_id: headers['paypal-transmission-id'],
    transmission_sig: headers['paypal-transmission-sig'],
    transmission_time: headers['paypal-transmission-time'],
    webhook_id: process.env.PAYPAL_WEBHOOK_ID,
    webhook_event: body,
  };

  const res = await fetch(`${PAYPAL_BASE}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(verificationPayload),
  });

  if (!res.ok) return false;
  const data = await res.json();
  return data.verification_status === 'SUCCESS';
}
