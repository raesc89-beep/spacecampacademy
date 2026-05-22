'use client';
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, useTexture, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useShipStore } from '@/store/useShipStore';
import * as THREE from 'three';

// Material avanzado AAA con mapas PBR
const useAAAMaterials = (colors) => {
  const [normalMap, roughnessMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/water/Water_1_M_Normal.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/golfball.jpg'
  ]);

  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(8, 8);
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(4, 4);

  return useMemo(() => ({
    primary: new THREE.MeshPhysicalMaterial({ 
      color: colors.primary, 
      roughness: 0.4, 
      metalness: 0.9,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(0.8, 0.8),
      roughnessMap: roughnessMap,
      clearcoat: 0.3,
      clearcoatRoughness: 0.1
    }),
    secondary: new THREE.MeshPhysicalMaterial({ 
      color: colors.secondary, 
      roughness: 0.6, 
      metalness: 0.7,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(0.5, 0.5)
    }),
    emissive: new THREE.MeshStandardMaterial({ 
      color: colors.emissive, 
      emissive: colors.emissive, 
      emissiveIntensity: 2, // Reducido para evitar blowout
      toneMapped: false 
    }),
    dark: new THREE.MeshStandardMaterial({
      color: '#080808', roughness: 0.9, metalness: 1.0, normalMap: normalMap
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: '#000000', metalness: 1, roughness: 0, envMapIntensity: 3, clearcoat: 1, transparent: true, opacity: 0.85
    }),
    industrial: new THREE.MeshPhysicalMaterial({
      color: '#d4a373', roughness: 0.8, metalness: 0.5, normalMap: normalMap, normalScale: new THREE.Vector2(1, 1)
    })
  }), [colors, normalMap, roughnessMap]);
};

function ProceduralShipAAA() {
  const { shipConfig } = useShipStore();
  const group = useRef();
  
  let materials;
  try {
    materials = useAAAMaterials(shipConfig.colors);
  } catch(e) {
    materials = { 
      primary: new THREE.MeshStandardMaterial({ color: shipConfig.colors.primary }),
      secondary: new THREE.MeshStandardMaterial({ color: shipConfig.colors.secondary }),
      emissive: new THREE.MeshBasicMaterial({ color: shipConfig.colors.emissive }),
      dark: new THREE.MeshStandardMaterial({ color: '#111' }),
      glass: new THREE.MeshStandardMaterial({ color: '#222' }),
      industrial: new THREE.MeshStandardMaterial({ color: '#aa6622' })
    };
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 2) * 0.05;
    group.current.rotation.z = Math.sin(t * 0.5) * 0.02;
  });

  return (
    <group ref={group} dispose={null} scale={1.8} position={[0, 1.5, 0]}>
      
      {/* ─── CLASES DE NAVE (Diseños Angulares y Stealth) ─── */}
      {shipConfig.fuselage === 'fighter' && (
        <group>
          {/* Caza Stealth: Cuerpo central angular */}
          <mesh position={[0, 0, 0]} material={materials.dark}>
            <boxGeometry args={[1.2, 0.5, 4]} />
          </mesh>
          {/* Nariz y Mandíbulas (Prongs frontales) */}
          <mesh position={[0.7, 0, 2.5]} material={materials.primary}>
            <boxGeometry args={[0.3, 0.4, 2.5]} />
          </mesh>
          <mesh position={[-0.7, 0, 2.5]} material={materials.primary}>
            <boxGeometry args={[0.3, 0.4, 2.5]} />
          </mesh>
          {/* Cabina angular tipo pirámide o cuña */}
          <mesh position={[0, 0.5, 0.5]} rotation={[0.2, 0, 0]} material={materials.glass}>
            <boxGeometry args={[0.8, 0.6, 2]} />
          </mesh>
          {/* Recortes luminosos en las mandíbulas */}
          <mesh position={[0.7, 0.1, 3]} material={materials.emissive}>
            <boxGeometry args={[0.1, 0.5, 1]} />
          </mesh>
          <mesh position={[-0.7, 0.1, 3]} material={materials.emissive}>
            <boxGeometry args={[0.1, 0.5, 1]} />
          </mesh>
        </group>
      )}
      
      {shipConfig.fuselage === 'cargo' && (
        <group>
          {/* Carguero Pesado: Bloque macizo central */}
          <mesh position={[0, 0, 0]} material={materials.dark}>
            <boxGeometry args={[2.5, 1.5, 5]} />
          </mesh>
          {/* Cabina tipo puente acorazado */}
          <mesh position={[0, 1, 2]} material={materials.glass}>
            <boxGeometry args={[1.5, 0.8, 1]} />
          </mesh>
          {/* Contenedores de carga blindados laterales */}
          <mesh position={[1.8, 0, -0.5]} material={materials.secondary}>
             <boxGeometry args={[1.2, 1.2, 3]} />
          </mesh>
          <mesh position={[-1.8, 0, -0.5]} material={materials.secondary}>
             <boxGeometry args={[1.2, 1.2, 3]} />
          </mesh>
        </group>
      )}

      {shipConfig.fuselage === 'explorer' && (
        <group>
          {/* Explorador: Aguja angular larga (Stealth needle) */}
          <mesh position={[0, 0, 0]} material={materials.secondary}>
            <boxGeometry args={[0.8, 0.8, 6]} />
          </mesh>
          <mesh position={[0, 0.2, 3.5]} material={materials.primary}>
            <cylinderGeometry args={[0, 0.4, 2, 4]} rotation={[Math.PI/2, 0, Math.PI/4]} />
          </mesh>
          {/* Paneles de sensores frontales */}
          <mesh position={[0, 0, 2.5]} material={materials.emissive}>
            <boxGeometry args={[0.9, 0.1, 1]} />
          </mesh>
        </group>
      )}

      {/* ─── SISTEMA DE ALAS ─── */}
      {shipConfig.wings === 'delta' && (
        <group>
          {/* Alas Delta ultra-angulares (Cuñas) */}
          <mesh position={[1.5, -0.1, -1]} rotation={[0, -Math.PI/6, 0]} material={materials.primary}>
             <boxGeometry args={[3, 0.2, 2.5]} />
          </mesh>
          <mesh position={[-1.5, -0.1, -1]} rotation={[0, Math.PI/6, 0]} material={materials.primary}>
             <boxGeometry args={[3, 0.2, 2.5]} />
          </mesh>
          {/* Paneles de Luz internos (Acentos Verdes/Neón) */}
          <mesh position={[1.8, 0, -1.2]} rotation={[0, -Math.PI/6, 0]} material={materials.emissive}>
             <boxGeometry args={[1.5, 0.3, 0.5]} />
          </mesh>
          <mesh position={[-1.8, 0, -1.2]} rotation={[0, Math.PI/6, 0]} material={materials.emissive}>
             <boxGeometry args={[1.5, 0.3, 0.5]} />
          </mesh>
          {/* Aletas de cola en V (V-tail) angulares */}
          <mesh position={[1, 0.8, -2.5]} rotation={[0, 0, -0.5]} material={materials.dark}>
             <boxGeometry args={[0.1, 1.5, 1]} />
          </mesh>
          <mesh position={[-1, 0.8, -2.5]} rotation={[0, 0, 0.5]} material={materials.dark}>
             <boxGeometry args={[0.1, 1.5, 1]} />
          </mesh>
        </group>
      )}
      
      {shipConfig.wings === 'xwing' && (
        <group>
          {/* Alas en X angulares (Stealth X) */}
          <mesh position={[1.5, 0.8, -1]} rotation={[0, 0, -0.4]} material={materials.primary}><boxGeometry args={[3, 0.2, 2]} /></mesh>
          <mesh position={[1.5, 0.82, -0.8]} rotation={[0, 0, -0.4]} material={materials.emissive}><boxGeometry args={[2.5, 0.25, 0.3]} /></mesh>
          
          <mesh position={[-1.5, 0.8, -1]} rotation={[0, 0, 0.4]} material={materials.primary}><boxGeometry args={[3, 0.2, 2]} /></mesh>
          <mesh position={[-1.5, 0.82, -0.8]} rotation={[0, 0, 0.4]} material={materials.emissive}><boxGeometry args={[2.5, 0.25, 0.3]} /></mesh>
          
          <mesh position={[1.5, -0.8, -1]} rotation={[0, 0, 0.4]} material={materials.primary}><boxGeometry args={[3, 0.2, 2]} /></mesh>
          <mesh position={[1.5, -0.82, -0.8]} rotation={[0, 0, 0.4]} material={materials.emissive}><boxGeometry args={[2.5, 0.25, 0.3]} /></mesh>
          
          <mesh position={[-1.5, -0.8, -1]} rotation={[0, 0, -0.4]} material={materials.primary}><boxGeometry args={[3, 0.2, 2]} /></mesh>
          <mesh position={[-1.5, -0.82, -0.8]} rotation={[0, 0, -0.4]} material={materials.emissive}><boxGeometry args={[2.5, 0.25, 0.3]} /></mesh>
        </group>
      )}

      {shipConfig.wings === 'ring' && (
        <group>
          {/* Anillos aerodinámicos (Hiperimpulsor) */}
          <mesh position={[0, 0, -1]} rotation={[Math.PI/2, 0, 0]} material={materials.dark}>
             <cylinderGeometry args={[2.5, 2.5, 1, 16]} />
          </mesh>
          <mesh position={[0, 0, -1]} rotation={[Math.PI/2, 0, 0]} material={materials.primary}>
             <cylinderGeometry args={[2.3, 2.3, 1.2, 16]} />
          </mesh>
          <mesh position={[0, 0, -1]} rotation={[Math.PI/2, 0, 0]} material={materials.emissive}>
             <cylinderGeometry args={[2.4, 2.4, 0.5, 16]} />
          </mesh>
        </group>
      )}

      {/* ─── MOTORES PROPULSORES ─── */}
      {shipConfig.engines === 'ion' && (
        <group position={[0, 0, -2.8]}>
          {/* Toberas rectangulares stealth */}
          <mesh position={[0.8, 0, 0]} material={materials.dark}><boxGeometry args={[0.8, 0.4, 1.5]} /></mesh>
          <mesh position={[-0.8, 0, 0]} material={materials.dark}><boxGeometry args={[0.8, 0.4, 1.5]} /></mesh>
          {/* Resplandor iónico rectangular */}
          <mesh position={[0.8, 0, -0.6]} material={materials.emissive}><boxGeometry args={[0.6, 0.3, 0.2]} /></mesh>
          <mesh position={[-0.8, 0, -0.6]} material={materials.emissive}><boxGeometry args={[0.6, 0.3, 0.2]} /></mesh>
        </group>
      )}
      
      {shipConfig.engines === 'plasma' && (
        <group position={[0, 0, -2.8]}>
          {/* Un gran motor central blindado */}
          <mesh rotation={[0, 0, 0]} material={materials.industrial}><boxGeometry args={[1.5, 1, 1.5]} /></mesh>
          <mesh position={[0, 0, -0.8]} material={materials.emissive}><boxGeometry args={[1.2, 0.8, 0.2]} /></mesh>
          {/* Líneas de plasma laterales */}
          <mesh position={[0.8, 0, 0]} material={materials.emissive}><boxGeometry args={[0.1, 0.5, 1.5]} /></mesh>
          <mesh position={[-0.8, 0, 0]} material={materials.emissive}><boxGeometry args={[0.1, 0.5, 1.5]} /></mesh>
        </group>
      )}

      {/* ─── ARMAMENTO ─── */}
      {shipConfig.weapon === 'laser' && (
        <group position={[0, 0, 1.5]}>
          {/* Cañones Láser Angulares Integrados */}
          <mesh position={[1.5, -0.3, 1]} material={materials.dark}>
            <boxGeometry args={[0.2, 0.2, 3]} />
          </mesh>
          <mesh position={[1.5, -0.3, 2.6]} material={materials.emissive}>
            <boxGeometry args={[0.1, 0.1, 1.5]} />
          </mesh>
          <mesh position={[-1.5, -0.3, 1]} material={materials.dark}>
            <boxGeometry args={[0.2, 0.2, 3]} />
          </mesh>
          <mesh position={[-1.5, -0.3, 2.6]} material={materials.emissive}>
            <boxGeometry args={[0.1, 0.1, 1.5]} />
          </mesh>
        </group>
      )}
      {shipConfig.weapon === 'missile' && (
        <group position={[0, -0.5, 1.5]}>
          {/* Pod de Misiles Cuadrado/Stealth */}
          <mesh position={[0, 0, 0]} material={materials.dark}>
            <boxGeometry args={[1.5, 0.5, 1.5]} />
          </mesh>
          <mesh position={[0.4, 0, 0.8]} material={materials.emissive}>
            <boxGeometry args={[0.3, 0.3, 0.2]} />
          </mesh>
          <mesh position={[-0.4, 0, 0.8]} material={materials.emissive}>
            <boxGeometry args={[0.3, 0.3, 0.2]} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// Entorno de Hangar Cinematográfico
function HangarEnvironment() {
  return (
    <group>
      {/* Plataforma de Aterrizaje Metálica */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[20, 64]} />
        <meshStandardMaterial color="#0a0a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Anillos de luz de la plataforma */}
      <mesh position={[0, -2.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[18, 18.2, 64]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, -2.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[10, 10.3, 64]} />
        <meshBasicMaterial color="#ff0055" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function SpaceshipScene() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#010204' }}>
      <Canvas shadows camera={{ position: [8, 4, 8], fov: 35 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#010204']} />
        <Stars radius={100} depth={50} count={10000} factor={8} saturation={0.8} fade speed={2} />
        
        {/* Iluminación Cinematográfica AAA */}
        <ambientLight intensity={0.1} />
        {/* Key Light */}
        <spotLight position={[10, 15, 10]} angle={0.5} penumbra={0.8} intensity={8} castShadow color="#ffffff" shadow-bias={-0.0001} />
        {/* Rim Light Cyan */}
        <spotLight position={[-15, 5, -15]} angle={0.8} penumbra={1} intensity={15} color="#00ffff" />
        {/* Fill Light Magenta */}
        <spotLight position={[15, -5, -15]} angle={0.8} penumbra={1} intensity={10} color="#ff0055" />
        
        {/* Entorno HDRI */}
        <Environment preset="studio" />
        
        <HangarEnvironment />
        
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <React.Suspense fallback={null}>
            <ProceduralShipAAA />
          </React.Suspense>
        </Float>
        
        <ContactShadows position={[0, -2.4, 0]} opacity={0.9} scale={30} blur={2.5} far={5} color="#000000" />
        
        {/* POSTPROCESADO AAA */}
        <EffectComposer disableNormalPass multisampling={4}>
          <Bloom 
            luminanceThreshold={0.9} 
            mipmapBlur 
            intensity={0.5} 
            radius={0.3} 
          />
          <Noise opacity={0.02} blendFunction={BlendFunction.OVERLAY} />
          <Vignette eskil={false} offset={0.1} darkness={1.0} />
        </EffectComposer>

        <OrbitControls 
          makeDefault 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2 + 0.1} 
          minDistance={6}
          maxDistance={40}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
