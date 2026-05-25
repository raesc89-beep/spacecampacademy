import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, eventType, eventData, source } = body;

    if (!userId || !eventType) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos (userId, eventType)' }, { status: 400 });
    }

    // Registrar evento de telemetría en Firestore
    // En un entorno de producción estricto usaríamos firebase-admin
    const telemetryRef = collection(db, 'telemetry');
    const docRef = await addDoc(telemetryRef, {
      userId,
      eventType,
      eventData: eventData || {},
      source: source || 'unknown',
      timestamp: serverTimestamp(),
      environment: process.env.NODE_ENV || 'development'
    });

    console.log(`[TELEMETRY] Evento registrado: ${eventType} para usuario ${userId}. ID: ${docRef.id}`);

    return NextResponse.json({ success: true, message: 'Evento registrado con éxito', id: docRef.id }, { status: 200 });

  } catch (error) {
    console.error('[TELEMETRY] Error al procesar evento:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
