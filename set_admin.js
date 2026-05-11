const admin = require('firebase-admin');

// Initialize using application default credentials (Firebase CLI already logged in)
const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'space-camp-academy'
});

const db = admin.firestore();

async function setAdminRole() {
  const adminUid = 'luJw63htUcWCu6suJsH13q8aMsI3'; // raesc89@gmail.com
  const ref = db.collection('users').doc(adminUid);
  
  const doc = await ref.get();
  if (doc.exists) {
    console.log('Usuario encontrado. Datos actuales:', JSON.stringify(doc.data(), null, 2));
    await ref.update({ role: 'admin' });
    console.log('✅ Rol de admin asignado exitosamente a raesc89@gmail.com');
  } else {
    // Create doc if it doesn't exist yet
    await ref.set({
      email: 'raesc89@gmail.com',
      name: 'Admin',
      role: 'admin',
      isApproved: true,
      createdAt: new Date().toISOString()
    });
    console.log('✅ Documento de admin creado con role: admin');
  }

  // Also approve all other users so they can access the platform
  const allUsers = await db.collection('users').get();
  console.log('\nUsuarios en Firestore:');
  allUsers.forEach(d => {
    console.log(' -', d.id, '|', d.data().email, '| role:', d.data().role);
  });

  process.exit(0);
}

setAdminRole().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
