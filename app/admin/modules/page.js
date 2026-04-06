'use client';
import { useState, useRef } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Package, UploadCloud, AlertCircle, Image as ImageIcon, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminModulesPage() {
  const [uploadData, setUploadData] = useState({ title: '', description: '', type: 'scorm', file: null });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setUploadData({ ...uploadData, file: e.target.files[0] });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadData.file) {
      setStatusMsg("Selecciona un paquete ZIP (SCORM) o una Imagen primero.");
      return;
    }

    setUploading(true);
    setStatusMsg('');
    setProgress(0);

    // Identificar carpeta en Firebase Storage basado en el tipo
    const storagePath = uploadData.type === 'scorm' ? `scorm_packages/${Date.now()}_${uploadData.file.name}` : `assets/uploads/${Date.now()}_${uploadData.file.name}`;
    const storageRef = ref(storage, storagePath);

    const uploadTask = uploadBytesResumable(storageRef, uploadData.file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      (error) => {
        console.error("Error en nube:", error);
        setStatusMsg("Falla de red. Revisa tus reglas de Firebase Storage.");
        setUploading(false);
      },
      async () => {
        // Al terminar de subir a Storage, obtenemos la URL y la guardamos en Firestore para tener un registro
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        
        try {
          await addDoc(collection(db, "educational_assets"), {
            title: uploadData.title || uploadData.file.name,
            description: uploadData.description,
            type: uploadData.type, // 'scorm' o 'image'
            url: downloadURL,
            storagePath: storagePath,
            createdAt: serverTimestamp()
          });

          setStatusMsg("¡Paquete inyectado exitosamente a la Nube (Firebase Cloud)! ✅");
          setUploadData({ title: '', description: '', type: 'scorm', file: null });
          if(fileInputRef.current) fileInputRef.current.value = "";
        } catch (dbErr) {
          setStatusMsg("Error en Firestore. Archivo subido, pero no referenciado.");
        }
        setUploading(false);
      }
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '800px' }}>
      
      <header>
        <h1 style={{ fontSize: '2.2rem', margin: 0, color: 'var(--electric-blue)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Package size={36} /> Editor Moodle Avanzado
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Módulo de inyección y descompresión de archivos (SCORM 1.2 / Fotografías H5P) hacia Firebase Cloud Storage.</p>
      </header>

      <section className="glass-card" style={{ border: '1px solid rgba(0, 228, 255, 0.2)' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          <UploadCloud size={24} color="var(--electric-blue)" /> Subir Recursos Educativos
        </h2>
        
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <span style={{ fontWeight: 'bold' }}>Nombre del Módulo (Visible Frontend)</span>
               <input 
                 type="text" 
                 required
                 placeholder="Ej. Examen Final Asteroides"
                 value={uploadData.title}
                 onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                 style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px' }}
               />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <span style={{ fontWeight: 'bold' }}>Tipo Carga</span>
               <select 
                 value={uploadData.type} 
                 onChange={(e) => setUploadData({...uploadData, type: e.target.value})}
                 style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', cursor: 'pointer' }}
               >
                 <option value="scorm">Paquete SCORM Interactvo (.zip)</option>
                 <option value="image">Retrato Planeta (.jpg, .png)</option>
               </select>
            </label>
          </div>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
             <span style={{ fontWeight: 'bold' }}>Descripción Breve</span>
             <textarea 
               rows={3}
               placeholder="Descripción para tu bitácora de director..."
               value={uploadData.description}
               onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
               style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', resize: 'vertical' }}
             />
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '12px', alignItems: 'center', textAlign: 'center' }}>
             {uploadData.type === 'scorm' ? <Package size={40} color="var(--starlight)" opacity={0.5} /> : <ImageIcon size={40} color="var(--starlight)" opacity={0.5} />}
             <input 
                type="file" 
                ref={fileInputRef}
                accept={uploadData.type === 'scorm' ? ".zip" : "image/*"} 
                onChange={handleFileChange}
                style={{ width: '100%', maxWidth: '300px' }}
             />
             <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Límite Cloud Storage por archivo configurado a: ilimitado, bajo facturación Firebase Blaze por MBs superados.</p>
          </div>

          {uploading && (
             <div style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                   <span>Transfiriendo a Base Lunar...</span>
                   <span>{Math.round(progress)}%</span>
                </div>
                <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                   <motion.div 
                     initial={{ width: 0 }} 
                     animate={{ width: `${progress}%` }} 
                     style={{ height: '100%', background: 'var(--electric-blue)' }} 
                   />
                </div>
             </div>
          )}

          {statusMsg && (
             <div style={{ padding: '1rem', marginTop: '1rem', background: statusMsg.includes('Error') ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,136,0.1)', color: statusMsg.includes('Error') ? 'var(--danger)' : 'var(--success)', borderRadius: '8px', border: `1px solid ${statusMsg.includes('Error') ? 'var(--danger)' : 'var(--success)'}` }}>
                {statusMsg}
             </div>
          )}

          <button 
             type="submit" 
             disabled={uploading || !uploadData.file} 
             className="btn-primary" 
             style={{ marginTop: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', background: uploadData.file ? 'var(--electric-blue)' : 'rgba(255,255,255,0.1)', color: uploadData.file ? 'black' : 'var(--text-muted)' }}
          >
             {uploading ? 'Asegurando Carga...' : <><UploadCloud size={20} /> Ejecutar Inyección de Datos</>}
          </button>
        </form>
      </section>

      {/* Reglas de Seguridad Warning */}
      <section style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(255,215,0,0.05)', borderRadius: '12px', borderLeft: '4px solid var(--gold-star)' }}>
        <AlertCircle size={28} color="var(--gold-star)" />
        <div>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--gold-star)' }}>Protocolo de Cortafuegos</h4>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Para que esta tecnología funcione libremente y subas ZIPs gigantes o fotos a la nube en tiempo real, deberás ir a tu consola en `console.firebase.google.com -> Storage -> Rules` y asegurarte de tener la regla de `allow write: if true;` configurada temporal o permanentemente por el administrador.
          </p>
        </div>
      </section>

    </div>
  );
}
