// lib/firebase-admin.js — Firebase Admin SDK (solo para uso en servidor)
// Permite escrituras seguras en Firestore sin pasar por las reglas de seguridad del cliente.
// NUNCA importar este archivo en componentes del cliente ('use client').

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function initAdminApp() {
  if (getApps().length > 0) return getApps()[0];

  // Soporte para dos métodos de configuración:
  // 1. Variable de entorno con JSON del service account (recomendado para Vercel)
  // 2. Variables individuales de entorno

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    return initializeApp({ credential: cert(serviceAccount) });
  }

  // Fallback: variables individuales
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || 'space-camp-academy',
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      // La private key puede venir con \n literales en Vercel; hay que convertirlos
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const adminApp = initAdminApp();
export const adminDb = getFirestore(adminApp);
