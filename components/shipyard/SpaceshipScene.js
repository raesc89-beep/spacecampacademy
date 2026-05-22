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
    group.current.position.y = Math.sin(t * 2) * 0.05; // Vibración idle
    group.current.rotation.z = Math.sin(t * 0.5) * 0.02;
  });

  return (
    <group ref={group} dispose={null} scale={2.5} position={[0, 1.5, 0]}>
      
      {/* NÚCLEO REACTOR (Emisivo Volumétrico) */}
      <mesh position={[0, 0.2, -0.2]} material={materials.emissive}>
        <cylinderGeometry args={[0.3, 0.3, 1, 32]} rotation={[Math.PI/2, 0, 0]} />
      </mesh>
      <mesh position={[0, 0.2, -0.2]} material={materials.dark}>
        <cylinderGeometry args={[0.35, 0.35, 0.8, 16]} rotation={[Math.PI/2, 0, 0]} />
      </mesh>

      {/* CLASES DE NAVE (Geometrías Curvas de Alta Fidelidad Aerodinámica) */}
      {shipConfig.fuselage === 'fighter' && (
        <group>
          {/* Caza: Nariz aerodinámica suave de bala (Ref: Diseño Curvo) */}
          <mesh position={[0, 0, 1.2]} rotation={[Math.PI/2, 0, 0]} material={materials.primary}>
            {/* Cápsula elongada perfecta */}
            <capsuleGeometry args={[0.6, 3, 32, 32]} />
          </mesh>
          {/* Cabina tipo burbuja de caza integrada */}
          <mesh position={[0, 0.4, 0.5]} rotation={[Math.PI/2, 0, 0]} material={materials.glass}>
            <capsuleGeometry args={[0.4, 1.5, 32, 32]} />
          </mesh>
          {/* Faldones laterales curvos */}
          <mesh position={[0.4, 0, -0.5]} material={materials.secondary}>
             <capsuleGeometry args={[0.4, 2, 32, 32]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
          <mesh position={[-0.4, 0, -0.5]} material={materials.secondary}>
             <capsuleGeometry args={[0.4, 2, 32, 32]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
        </group>
      )}
      
      {shipConfig.fuselage === 'cargo' && (
        <group>
          {/* Nave Carguera: Cuerpo orgánico pesado (Ref: Sci-fi curve) */}
          <mesh position={[0, 0, 0]} material={materials.primary}>
            <capsuleGeometry args={[1.5, 2.5, 32, 64]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
          {/* Cabina frontal esférica amplia */}
          <mesh position={[0, 0.6, 1.8]} material={materials.glass}>
            <sphereGeometry args={[0.8, 32, 32]} />
          </mesh>
          {/* Tanques de carga laterales cilíndricos pulidos */}
          <mesh position={[1.4, 0, 0]} material={materials.secondary}>
             <cylinderGeometry args={[0.8, 0.8, 4, 32]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
          <mesh position={[-1.4, 0, 0]} material={materials.secondary}>
             <cylinderGeometry args={[0.8, 0.8, 4, 32]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
        </group>
      )}

      {shipConfig.fuselage === 'explorer' && (
        <group>
          {/* Explorador: Cohete liso hiper-aerodinámico */}
          {/* Fuselaje principal tubular perfecto */}
          <mesh position={[0, 0, 0.5]} rotation={[Math.PI/2, 0, 0]} material={materials.secondary}>
            <cylinderGeometry args={[0.9, 0.9, 3.5, 64]} />
          </mesh>
          {/* Punta ovalada suave (ojiva) */}
          <mesh position={[0, 0, 2.8]} rotation={[Math.PI/2, 0, 0]} material={materials.primary}>
            <capsuleGeometry args={[0.9, 1.5, 32, 64]} />
          </mesh>
          {/* Anillos de separación estilizados */}
          <mesh position={[0, 0, -1]} rotation={[Math.PI/2, 0, 0]} material={materials.dark}>
            <torusGeometry args={[0.92, 0.1, 16, 64]} />
          </mesh>
          <mesh position={[0, 0, 1.5]} rotation={[Math.PI/2, 0, 0]} material={materials.dark}>
            <torusGeometry args={[0.92, 0.1, 16, 64]} />
          </mesh>
        </group>
      )}
      {/* CABINA PRINCIPAL (Oculta si es explorer o fighter ya que lo integran) */}
      {shipConfig.fuselage === 'cargo' && (
        <group>
          {/* Integración esférica */}
        </group>
      )}

      {/* SISTEMA DE ALAS (Con curvas elegantes) */}
      {shipConfig.wings === 'delta' && (
        <group>
          {/* Alas curvas tipo gaviota en 3D */}
          <mesh position={[1.4, 0, -1]} rotation={[0, -0.4, 0]} material={materials.primary}>
             <capsuleGeometry args={[0.1, 2.5, 16, 32]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
          <mesh position={[-1.4, 0, -1]} rotation={[0, 0.4, 0]} material={materials.primary}>
             <capsuleGeometry args={[0.1, 2.5, 16, 32]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
          {/* Aletas de punta redondeadas */}
          <mesh position={[2.4, 0.4, -1.5]} rotation={[0.2, 0, 0]} material={materials.dark}>
             <capsuleGeometry args={[0.05, 1.2, 16, 16]} />
          </mesh>
          <mesh position={[-2.4, 0.4, -1.5]} rotation={[0.2, 0, 0]} material={materials.dark}>
             <capsuleGeometry args={[0.05, 1.2, 16, 16]} />
          </mesh>
          {/* Cola vertical suave */}
          <mesh position={[0, 1, -1.5]} rotation={[-0.3, 0, 0]} material={materials.primary}>
             <capsuleGeometry args={[0.1, 1.5, 16, 32]} />
          </mesh>
        </group>
      )}
      
      {shipConfig.wings === 'xwing' && (
        <group>
          {/* 4 Alas en X con alerones cilíndricos ultra-finos */}
          <mesh position={[1.5, 0.8, -0.5]} rotation={[0, 0, -0.4]} material={materials.primary}><capsuleGeometry args={[0.15, 2.5, 16, 32]} rotation={[Math.PI/2, 0, 0]} /></mesh>
          <mesh position={[1.5, 0.82, -0.5]} rotation={[0, 0, -0.4]} material={materials.emissive}><capsuleGeometry args={[0.16, 2, 16, 32]} rotation={[Math.PI/2, 0, 0]} /></mesh>
          
          <mesh position={[-1.5, 0.8, -0.5]} rotation={[0, 0, 0.4]} material={materials.primary}><capsuleGeometry args={[0.15, 2.5, 16, 32]} rotation={[Math.PI/2, 0, 0]} /></mesh>
          <mesh position={[-1.5, 0.82, -0.5]} rotation={[0, 0, 0.4]} material={materials.emissive}><capsuleGeometry args={[0.16, 2, 16, 32]} rotation={[Math.PI/2, 0, 0]} /></mesh>
          
          <mesh position={[1.5, -0.8, -0.5]} rotation={[0, 0, 0.4]} material={materials.primary}><capsuleGeometry args={[0.15, 2.5, 16, 32]} rotation={[Math.PI/2, 0, 0]} /></mesh>
          <mesh position={[1.5, -0.82, -0.5]} rotation={[0, 0, 0.4]} material={materials.emissive}><capsuleGeometry args={[0.16, 2, 16, 32]} rotation={[Math.PI/2, 0, 0]} /></mesh>
          
          <mesh position={[-1.5, -0.8, -0.5]} rotation={[0, 0, -0.4]} material={materials.primary}><capsuleGeometry args={[0.15, 2.5, 16, 32]} rotation={[Math.PI/2, 0, 0]} /></mesh>
          <mesh position={[-1.5, -0.82, -0.5]} rotation={[0, 0, -0.4]} material={materials.emissive}><capsuleGeometry args={[0.16, 2, 16, 32]} rotation={[Math.PI/2, 0, 0]} /></mesh>
        </group>
      )}

      {shipConfig.wings === 'ring' && (
        <group>
          {/* Anillos aerodinámicos en lugar de aletas */}
          <mesh position={[0, 0, -1]} rotation={[Math.PI/2, 0, 0]} material={materials.dark}>
            <torusGeometry args={[1.5, 0.2, 32, 100]} />
          </mesh>
          <mesh position={[0, 0, -1]} rotation={[Math.PI/2, 0, 0]} material={materials.emissive}>
            <torusGeometry args={[1.51, 0.05, 32, 100]} />
          </mesh>
        </group>
      )}

      {/* MOTORES PROPULSORES */}
      {shipConfig.engines === 'ion' && (
        <group position={[0, 0, -2.5]}>
          {/* Toberas suaves */}
          <mesh position={[0.6, 0, 0]} rotation={[Math.PI/2, 0, 0]} material={materials.dark}><cylinderGeometry args={[0.4, 0.2, 1, 32]} /></mesh>
          <mesh position={[-0.6, 0, 0]} rotation={[Math.PI/2, 0, 0]} material={materials.dark}><cylinderGeometry args={[0.4, 0.2, 1, 32]} /></mesh>
          {/* Esferas de plasma iónico */}
          <mesh position={[0.6, 0, -0.4]} material={materials.emissive}><sphereGeometry args={[0.35, 32, 32]} /></mesh>
          <mesh position={[-0.6, 0, -0.4]} material={materials.emissive}><sphereGeometry args={[0.35, 32, 32]} /></mesh>
        </group>
      )}
      
      {shipConfig.engines === 'plasma' && (
        <group position={[0, 0, -2.2]}>
          <mesh rotation={[Math.PI/2, 0, 0]} material={materials.industrial}><cylinderGeometry args={[0.8, 0.5, 1.5, 64]} /></mesh>
          <mesh position={[0, 0, -0.6]} material={materials.emissive}><torusGeometry args={[0.6, 0.1, 32, 64]} rotation={[Math.PI/2, 0, 0]} /></mesh>
          <mesh position={[0, 0, -0.6]} material={materials.emissive}><sphereGeometry args={[0.5, 32, 32]} /></mesh>
        </group>
      )}

      {/* ARMAMENTO */}
      {shipConfig.weapon === 'laser' && (
        <group position={[0, 0, 1.5]}>
          {/* Cañones Láser Laterales Cilíndricos Perfectos */}
          <mesh position={[1.4, -0.2, 0.5]} material={materials.dark}>
            <capsuleGeometry args={[0.1, 1.5, 16, 16]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
          <mesh position={[1.4, -0.2, 1.3]} material={materials.emissive}>
            <capsuleGeometry args={[0.11, 0.4, 16, 16]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
          <mesh position={[-1.4, -0.2, 0.5]} material={materials.dark}>
            <capsuleGeometry args={[0.1, 1.5, 16, 16]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
          <mesh position={[-1.4, -0.2, 1.3]} material={materials.emissive}>
            <capsuleGeometry args={[0.11, 0.4, 16, 16]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
        </group>
      )}
      {shipConfig.weapon === 'missile' && (
        <group position={[0, -0.8, 0]}>
          {/* Lanza Misiles Ovalado/Gotario */}
          <mesh position={[0, 0, 0.5]} material={materials.dark}>
            <capsuleGeometry args={[0.8, 1.5, 32, 32]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
          <mesh position={[0.4, 0, 1.5]} material={materials.emissive}>
            <sphereGeometry args={[0.2, 32, 32]} />
          </mesh>
          <mesh position={[-0.4, 0, 1.5]} material={materials.emissive}>
            <sphereGeometry args={[0.2, 32, 32]} />
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
