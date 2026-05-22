'use client';
import { useRef, useMemo } from 'react';
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

      {/* CLASES DE NAVE (Geometrías Avanzadas y Realistas) */}
      {shipConfig.fuselage === 'fighter' && (
        <group>
          {/* Caza: Nariz afilada (Cono), cuerpo esbelto */}
          <mesh position={[0, 0, 1.5]} rotation={[Math.PI/2, 0, 0]} material={materials.primary}>
            <coneGeometry args={[0.5, 3.5, 16]} />
          </mesh>
          <mesh position={[0, 0.2, 0.2]} rotation={[Math.PI/2, 0, 0]} material={materials.secondary}>
             <cylinderGeometry args={[0.6, 0.6, 2.5, 16]} />
          </mesh>
          <mesh position={[0, -0.3, 0]} material={materials.dark}>
             <boxGeometry args={[1, 0.4, 2.8]} />
          </mesh>
        </group>
      )}
      
      {shipConfig.fuselage === 'cargo' && (
        <group>
          {/* Nave Minera: Tanques cilíndricos, estructura reforzada */}
          <mesh position={[0, 0, 0.8]} material={materials.primary}>
            <boxGeometry args={[2, 1.5, 4.5]} />
          </mesh>
          <mesh position={[0, 1.2, -0.5]} material={materials.industrial}>
            <boxGeometry args={[1.2, 0.6, 2]} />
          </mesh>
          {/* Tanques de carga laterales (Cilíndricos) */}
          <mesh position={[1.3, 0, 1]} rotation={[Math.PI/2, 0, 0]} material={materials.secondary}><cylinderGeometry args={[0.6, 0.6, 4, 16]} /></mesh>
          <mesh position={[-1.3, 0, 1]} rotation={[Math.PI/2, 0, 0]} material={materials.secondary}><cylinderGeometry args={[0.6, 0.6, 4, 16]} /></mesh>
        </group>
      )}

      {shipConfig.fuselage === 'explorer' && (
        <group>
          {/* Explorador: Diseño suave, disco central, domos, cápsulas */}
          <mesh position={[0, 0, 0.5]} material={materials.primary}>
            <cylinderGeometry args={[1.8, 1.8, 0.6, 32]} />
          </mesh>
          <mesh position={[0, 0, 2]} material={materials.primary}>
            <capsuleGeometry args={[0.6, 2, 16, 16]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
          {/* Antenas de sensores laterales */}
          <mesh position={[1.5, 0, 1]} rotation={[Math.PI/2, 0, -0.3]} material={materials.dark}>
             <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
          </mesh>
          <mesh position={[-1.5, 0, 1]} rotation={[Math.PI/2, 0, 0.3]} material={materials.dark}>
             <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
          </mesh>
        </group>
      )}

      {/* CABINA PRINCIPAL (Común pero escalable) */}
      <mesh position={[0, 0.6, 1.8]} material={materials.glass}>
        <sphereGeometry args={[0.45, 32, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
      </mesh>
      <mesh position={[0, 0.5, 1.8]} material={materials.dark}>
        <cylinderGeometry args={[0.47, 0.47, 0.2, 32]} />
      </mesh>

      {/* SISTEMA DE ALAS (Con ángulos agresivos) */}
      {shipConfig.wings === 'delta' && (
        <group>
          <mesh position={[1.5, 0, 0]} rotation={[0, -0.3, -0.1]} material={materials.secondary}>
             <boxGeometry args={[2.5, 0.08, 1.8]} />
          </mesh>
          <mesh position={[-1.5, 0, 0]} rotation={[0, 0.3, 0.1]} material={materials.secondary}>
             <boxGeometry args={[2.5, 0.08, 1.8]} />
          </mesh>
        </group>
      )}
      {shipConfig.wings === 'xwing' && (
        <group>
          <mesh position={[1.8, 1, -0.5]} rotation={[0, 0, -0.5]} material={materials.secondary}><boxGeometry args={[3.5, 0.15, 1.2]} /></mesh>
          <mesh position={[1.8, -0.8, -0.5]} rotation={[0, 0, 0.5]} material={materials.secondary}><boxGeometry args={[3.5, 0.15, 1.2]} /></mesh>
          <mesh position={[-1.8, 1, -0.5]} rotation={[0, 0, 0.5]} material={materials.secondary}><boxGeometry args={[3.5, 0.15, 1.2]} /></mesh>
          <mesh position={[-1.8, -0.8, -0.5]} rotation={[0, 0, -0.5]} material={materials.secondary}><boxGeometry args={[3.5, 0.15, 1.2]} /></mesh>
        </group>
      )}
      {shipConfig.wings === 'ring' && (
        <mesh position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]} material={materials.secondary}>
          <torusGeometry args={[2.5, 0.4, 32, 64]} />
        </mesh>
      )}

      {/* MOTORES Y PROPULSIÓN (Alta Emisión) */}
      <group position={[0, 0, -1.8]}>
        {shipConfig.engines === 'ion' ? (
          <>
            <mesh position={[0.8, 0, 0]} material={materials.dark}><cylinderGeometry args={[0.5, 0.4, 1.5, 32]} rotation={[Math.PI/2,0,0]} /></mesh>
            <mesh position={[0.8, 0, -0.8]} material={materials.emissive}><cylinderGeometry args={[0.35, 0.35, 0.2, 32]} rotation={[Math.PI/2,0,0]} /></mesh>
            <mesh position={[-0.8, 0, 0]} material={materials.dark}><cylinderGeometry args={[0.5, 0.4, 1.5, 32]} rotation={[Math.PI/2,0,0]} /></mesh>
            <mesh position={[-0.8, 0, -0.8]} material={materials.emissive}><cylinderGeometry args={[0.35, 0.35, 0.2, 32]} rotation={[Math.PI/2,0,0]} /></mesh>
          </>
        ) : (
          <mesh position={[0, 0, 0]} material={materials.dark}>
            <boxGeometry args={[2.5, 0.8, 1]} />
            <mesh position={[0, 0, -0.51]} material={materials.emissive}>
               <planeGeometry args={[2.2, 0.6]} rotation={[Math.PI,0,0]} />
            </mesh>
          </mesh>
        )}
      </group>

      {/* ARMAMENTO */}
      {shipConfig.weapon === 'laser' && (
        <group position={[0, 0, 1.5]}>
          {/* Cañones Láser Laterales */}
          <mesh position={[1.2, 0.2, 0]} material={materials.dark}>
            <cylinderGeometry args={[0.1, 0.1, 2, 16]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
          <mesh position={[1.2, 0.2, 1]} material={materials.emissive}>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
          <mesh position={[-1.2, 0.2, 0]} material={materials.dark}>
            <cylinderGeometry args={[0.1, 0.1, 2, 16]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
          <mesh position={[-1.2, 0.2, 1]} material={materials.emissive}>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
        </group>
      )}
      {shipConfig.weapon === 'missile' && (
        <group position={[0, -0.5, 0]}>
          {/* Lanza Misiles Inferior */}
          <mesh position={[0, 0, 0.5]} material={materials.dark}>
            <boxGeometry args={[1.5, 0.4, 2]} />
          </mesh>
          <mesh position={[0.4, 0, 1.5]} material={materials.emissive}>
            <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} rotation={[Math.PI/2, 0, 0]} />
          </mesh>
          <mesh position={[-0.4, 0, 1.5]} material={materials.emissive}>
            <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} rotation={[Math.PI/2, 0, 0]} />
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
          <ProceduralShipAAA />
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
