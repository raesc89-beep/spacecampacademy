import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAE-Oquu9GuIAoX7nA-lJoLK0CRan_RcsE",
  authDomain: "space-camp-academy.firebaseapp.com",
  projectId: "space-camp-academy"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testRules() {
  console.log("Iniciando prueba de reglas de seguridad de Firestore...");
  
  // Prueba 1: Intentar leer un módulo (Debería estar PERMITIDO por 'allow read: if true;')
  try {
    await getDoc(doc(db, "modules", "test_module_read"));
    console.log("✅ Prueba 1 (Leer módulo sin auth): PERMITIDO. (Correcto según las reglas)");
  } catch (error) {
    console.log("❌ Prueba 1 (Leer módulo sin auth): DENEGADO.", error.code);
  }

  // Prueba 2: Intentar leer un usuario aleatorio (Debería estar DENEGADO por 'allow read: if isOwner(userId) || isAdmin();')
  try {
    await getDoc(doc(db, "users", "anonymous_test_user"));
    console.log("❌ Prueba 2 (Leer usuario sin auth): PERMITIDO. ¡ALERTA! Si esto dice permitido, las reglas de prueba de 30 días aún están activas.");
  } catch (error) {
    console.log("✅ Prueba 2 (Leer usuario sin auth): DENEGADO. (Correcto, las nuevas reglas bloquean esto)");
  }

  // Prueba 3: Intentar escribir en un usuario aleatorio (Debería estar DENEGADO)
  try {
    await setDoc(doc(db, "users", "anonymous_test_user"), { test: true });
    console.log("❌ Prueba 3 (Escribir usuario sin auth): PERMITIDO. ¡ALERTA! Tu base de datos está vulnerable.");
  } catch (error) {
    console.log("✅ Prueba 3 (Escribir usuario sin auth): DENEGADO. (Correcto, tu base de datos está protegida)");
  }
  
  process.exit(0);
}

testRules();
