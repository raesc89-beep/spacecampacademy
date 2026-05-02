'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, useTexture, Stars } from '@react-three/drei';
import { useShipStore } from '@/store/useShipStore';
import * as THREE from 'three';

// Procedural PBR Material with simulated detail
const useShipMaterials = (colors) => {
  // Using public seamless textures for realism
  const [normalMap, roughnessMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/water/Water_1_M_Normal.jpg', // Repurposing as sci-fi panels via tiling
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/golfball.jpg' // Adds micro-surface detail
  ]);

  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(4, 4);
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(2, 2);

  return {
    primary: new THREE.MeshStandardMaterial({ 
      color: colors.primary, 
      roughness: 0.3, 
      metalness: 0.8,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(0.5, 0.5),
      roughnessMap: roughnessMap
    }),
    secondary: new THREE.MeshStandardMaterial({ 
      color: colors.secondary, 
      roughness: 0.5, 
      metalness: 0.6,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(0.2, 0.2)
    }),
    emissive: new THREE.MeshStandardMaterial({ 
      color: colors.emissive, 
      emissive: colors.emissive, 
      emissiveIntensity: 5, 
      toneMapped: false 
    }),
    dark: new THREE.MeshStandardMaterial({
      color: '#0a0a0a', roughness: 0.8, metalness: 0.9, normalMap: normalMap
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: '#000000', metalness: 0.9, roughness: 0.1, envMapIntensity: 2, clearcoat: 1, transparent: true, opacity: 0.8
    })
  };
};

function ProceduralShip() {
  const { shipConfig } = useShipStore();
  const group = useRef();
  
  // Safe material loading
  let materials;
  try {
    materials = useShipMaterials(shipConfig.colors);
  } catch (e) {
    // Fallback if textures fail to load
    materials = {
      primary: new THREE.MeshStandardMaterial({ color: shipConfig.colors.primary, metalness: 0.8, roughness: 0.2 }),
      secondary: new THREE.MeshStandardMaterial({ color: shipConfig.colors.secondary, metalness: 0.6, roughness: 0.4 }),
      emissive: new THREE.MeshStandardMaterial({ color: shipConfig.colors.emissive, emissive: shipConfig.colors.emissive, emissiveIntensity: 2 }),
      dark: new THREE.MeshStandardMaterial({ color: '#111', metalness: 0.8, roughness: 0.8 }),
      glass: new THREE.MeshStandardMaterial({ color: '#000', metalness: 1, roughness: 0 })
    };
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t) * 0.1;
  });

  return (
    <group ref={group} dispose={null} scale={1.5}>
      {/* NÚCLEO CENTRAL (Reactor) */}
      <mesh position={[0, 0.1, -0.5]} material={materials.emissive}>
        <cylinderGeometry args={[0.4, 0.4, 0.8, 16]} rotation={[Math.PI/2, 0, 0]} />
      </mesh>
      <mesh position={[0, 0.1, -0.5]} material={materials.dark}>
        <cylinderGeometry args={[0.45, 0.45, 0.6, 16]} rotation={[Math.PI/2, 0, 0]} />
      </mesh>

      {/* FUSELAJE (Más estilizado) */}
      {shipConfig.fuselage === 'fighter' && (
        <group>
          <mesh position={[0, 0, 1.5]} rotation={[Math.PI/2, 0, 0]} material={materials.primary}>
            <coneGeometry args={[0.6, 4, 6]} /> {/* Geometría hexagonal */}
          </mesh>
          <mesh position={[0, 0.2, 0.5]} material={materials.secondary}>
             <boxGeometry args={[1.2, 0.4, 3]} />
          </mesh>
        </group>
      )}
      {shipConfig.fuselage === 'cargo' && (
        <mesh position={[0, 0, 1]} material={materials.primary}>
          <boxGeometry args={[1.8, 1.5, 5]} />
        </mesh>
      )}
      {shipConfig.fuselage === 'explorer' && (
        <mesh position={[0, 0, 1]} material={materials.primary}>
          <capsuleGeometry args={[0.9, 4, 16, 32]} rotation={[Math.PI/2, 0, 0]} />
        </mesh>
      )}

      {/* CABINA DE CRISTAL (Estilo realista) */}
      <mesh position={[0, 0.6, 1.8]} material={materials.glass}>
        <sphereGeometry args={[0.45, 32, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
      </mesh>
      <mesh position={[0, 0.5, 1.8]} material={materials.dark}>
        <cylinderGeometry args={[0.48, 0.48, 0.2, 32]} />
      </mesh>

      {/* ALAS AVANZADAS */}
      {shipConfig.wings === 'delta' && (
        <group>
          <mesh position={[1.4, -0.1, 0.5]} rotation={[0, 0, -0.1]} material={materials.secondary}>
            <cylinderGeometry args={[0.01, 2, 0.1, 3]} rotation={[0, -Math.PI/2, 0]} />
          </mesh>
          <mesh position={[-1.4, -0.1, 0.5]} rotation={[0, 0, 0.1]} material={materials.secondary}>
            <cylinderGeometry args={[0.01, 2, 0.1, 3]} rotation={[0, Math.PI/2, 0]} />
          </mesh>
        </group>
      )}
      {shipConfig.wings === 'xwing' && (
        <group>
          <mesh position={[1.5, 0.8, 0]} rotation={[0, 0, -0.4]} material={materials.secondary}><boxGeometry args={[3, 0.1, 1.5]} /></mesh>
          <mesh position={[1.5, -0.6, 0]} rotation={[0, 0, 0.4]} material={materials.secondary}><boxGeometry args={[3, 0.1, 1.5]} /></mesh>
          <mesh position={[-1.5, 0.8, 0]} rotation={[0, 0, 0.4]} material={materials.secondary}><boxGeometry args={[3, 0.1, 1.5]} /></mesh>
          <mesh position={[-1.5, -0.6, 0]} rotation={[0, 0, -0.4]} material={materials.secondary}><boxGeometry args={[3, 0.1, 1.5]} /></mesh>
        </group>
      )}
      {shipConfig.wings === 'ring' && (
        <mesh position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]} material={materials.secondary}>
          <torusGeometry args={[2.2, 0.3, 16, 64]} />
        </mesh>
      )}

      {/* MOTORES (Reactores detallados) */}
      <group position={[0, 0, -1.5]}>
        {shipConfig.engines === 'ion' ? (
          <>
            <mesh position={[0.6, 0, 0]} material={materials.dark}><cylinderGeometry args={[0.4, 0.3, 1.5, 16]} rotation={[Math.PI/2,0,0]} /></mesh>
            <mesh position={[0.6, 0, -0.8]} material={materials.emissive}><circleGeometry args={[0.3, 32]} rotation={[Math.PI,0,0]} /></mesh>
            <mesh position={[-0.6, 0, 0]} material={materials.dark}><cylinderGeometry args={[0.4, 0.3, 1.5, 16]} rotation={[Math.PI/2,0,0]} /></mesh>
            <mesh position={[-0.6, 0, -0.8]} material={materials.emissive}><circleGeometry args={[0.3, 32]} rotation={[Math.PI,0,0]} /></mesh>
          </>
        ) : (
          <mesh position={[0, 0, 0]} material={materials.dark}>
            <boxGeometry args={[2, 0.6, 1]} />
            <mesh position={[0, 0, -0.51]} material={materials.emissive}>
               <planeGeometry args={[1.8, 0.4]} rotation={[Math.PI,0,0]} />
            </mesh>
          </mesh>
        )}
      </group>
    </group>
  );
}

// Entorno de Hangar Espacial (Reemplaza el fondo vacío)
function HangarEnvironment() {
  return (
    <group>
      {/* Plataforma de Aterrizaje */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[15, 64]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Anillos de luz de la plataforma */}
      <mesh position={[0, -2.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[14, 14.2, 64]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, -2.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8, 8.1, 64]} />
        <meshBasicMaterial color="#ff0055" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function SpaceshipScene() {
  return (
    <div className="w-full h-full bg-[#030508]">
      <Canvas shadows camera={{ position: [8, 4, 8], fov: 45 }}>
        {/* Espacio profundo */}
        <color attach="background" args={['#02040a']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Iluminación de Estudio Cinematográfica */}
        <ambientLight intensity={0.2} />
        <spotLight position={[0, 15, 0]} angle={0.6} penumbra={0.5} intensity={5} castShadow color="#ffffff" />
        <spotLight position={[10, 5, 10]} angle={0.3} penumbra={1} intensity={3} color="#00ffff" />
        <spotLight position={[-10, 5, -10]} angle={0.3} penumbra={1} intensity={3} color="#ff0055" />
        
        {/* Entorno HDRI para reflejos de metal de alta fidelidad */}
        <Environment preset="studio" />
        
        {/* Escenario y Nave */}
        <HangarEnvironment />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <ProceduralShip />
        </Float>
        
        <ContactShadows position={[0, -2.4, 0]} opacity={0.8} scale={20} blur={2} far={4} color="#000000" />
        
        <OrbitControls 
          makeDefault 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2 + 0.1} 
          minDistance={5}
          maxDistance={15}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
