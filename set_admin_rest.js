const { execSync } = require('child_process');
const https = require('https');

// Use Firebase REST API with a fresh token from CLI
function getToken() {
  try {
    // Try to get token from firebase CLI config
    const os = require('os');
    const path = require('path');
    const fs = require('fs');
    
    const configPath = path.join(os.homedir(), '.config', 'configstore', 'firebase-tools.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const tokens = config.tokens;
      if (tokens && tokens.access_token) {
        return tokens.access_token;
      }
    }
    return null;
  } catch(e) {
    return null;
  }
}

async function firestoreRequest(method, path, body) {
  const token = getToken();
  if (!token) throw new Error('No access token found. Please run firebase login first.');
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'firestore.googleapis.com',
      path: `/v1/projects/space-camp-academy/databases/(default)/documents/${path}`,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch(e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  const adminUid = 'luJw63htUcWCu6suJsH13q8aMsI3'; // raesc89@gmail.com
  
  console.log('🔍 Buscando documento del admin en Firestore...');
  
  // GET the current document
  const getRes = await firestoreRequest('GET', `users/${adminUid}`);
  console.log('Status GET:', getRes.status);
  
  if (getRes.status === 200) {
    console.log('✅ Documento encontrado');
    const currentRole = getRes.body.fields?.role?.stringValue;
    console.log('Rol actual:', currentRole);
    
    if (currentRole === 'admin') {
      console.log('✅ ¡Ya tiene rol de admin! No se necesita cambio.');
      return;
    }
    
    // PATCH to update role field only
    const patchRes = await firestoreRequest(
      'PATCH',
      `users/${adminUid}?updateMask.fieldPaths=role`,
      {
        fields: {
          role: { stringValue: 'admin' }
        }
      }
    );
    console.log('Status PATCH:', patchRes.status);
    if (patchRes.status === 200) {
      console.log('✅ ¡Rol de admin asignado exitosamente a raesc89@gmail.com!');
    } else {
      console.log('❌ Error al actualizar:', JSON.stringify(patchRes.body, null, 2));
    }
    
  } else if (getRes.status === 404) {
    console.log('⚠️ Documento no existe en Firestore. Creando con role: admin...');
    const createRes = await firestoreRequest(
      'PATCH',
      `users/${adminUid}`,
      {
        fields: {
          email: { stringValue: 'raesc89@gmail.com' },
          name: { stringValue: 'Admin' },
          role: { stringValue: 'admin' },
          isApproved: { booleanValue: true },
          createdAt: { stringValue: new Date().toISOString() }
        }
      }
    );
    if (createRes.status === 200) {
      console.log('✅ Documento de admin creado exitosamente');
    } else {
      console.log('❌ Error creando documento:', JSON.stringify(createRes.body, null, 2));
    }
  } else {
    console.log('❌ Error inesperado:', getRes.status, JSON.stringify(getRes.body, null, 2));
  }
  
  // Now verify
  console.log('\n🔍 Verificando el resultado...');
  const verifyRes = await firestoreRequest('GET', `users/${adminUid}`);
  if (verifyRes.status === 200) {
    const role = verifyRes.body.fields?.role?.stringValue;
    console.log('✅ Rol final en Firestore:', role);
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
