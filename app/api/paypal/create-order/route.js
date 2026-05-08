// app/api/paypal/create-order/route.js
// CAPA 1: El servidor crea la orden de pago. El cliente NUNCA ve las credenciales.
import { NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/paypal';

export async function POST(req) {
  try {
    const { userId, currency = 'USD' } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'userId requerido' }, { status: 400 });
    }

    // Precio definido en el servidor (nunca en el cliente para prevenir manipulación)
    const PRICE = process.env.MEMBERSHIP_PRICE || '29.99';

    const order = await createPayPalOrder(userId, PRICE, currency);

    return NextResponse.json({ orderID: order.id });
  } catch (err) {
    console.error('[PayPal create-order]', err.message);
    return NextResponse.json({ error: 'No se pudo crear la orden' }, { status: 500 });
  }
}
