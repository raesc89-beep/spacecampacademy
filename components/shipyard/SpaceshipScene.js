'use client';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, useGLTF } from '@react-three/drei';
import { useShipStore } from '@/store/useShipStore';
import * as THREE from 'three';

// Material Components
const getMaterials = (colors) => {
  return {
    primary: new THREE.MeshStandardMaterial({ 
      color: colors.primary, roughness: 0.2, metalness: 0.8 
    }),
    secondary: new THREE.MeshStandardMaterial({ 
      color: colors.secondary, roughness: 0.5, metalness: 0.5 
    }),
    emissive: new THREE.MeshStandardMaterial({ 
      color: colors.emissive, emissive: colors.emissive, emissiveIntensity: 2, toneMapped: false 
    }),
    dark: new THREE.MeshStandardMaterial({
      color: '#111111', roughness: 0.9, metalness: 0.1
    })
  };
};

function ProceduralShip() {
  const { shipConfig } = useShipStore();
  const group = useRef();
  const materials = getMaterials(shipConfig.colors);

  // Animación sutil de la nave
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.z = Math.sin(t * 0.5) * 0.05;
    group.current.rotation.x = Math.cos(t * 0.4) * 0.05;
  });

  return (
    <group ref={group} dispose={null}>
      {/* NÚCLEO CENTRAL (Siempre presente) */}
      <mesh position={[0, 0, 0]} material={materials.emissive}>
        <cylinderGeometry args={[0.3, 0.3, 1.5, 16]} />
      </mesh>

      {/* FUSELAJE */}
      {shipConfig.fuselage === 'fighter' && (
        <mesh position={[0, 0, 1]} rotation={[Math.PI/2, 0, 0]} material={materials.primary}>
          <coneGeometry args={[0.8, 4, 32]} />
        </mesh>
      )}
      {shipConfig.fuselage === 'cargo' && (
        <mesh position={[0, 0, 0]} material={materials.primary}>
          <boxGeometry args={[1.5, 1.2, 4]} />
        </mesh>
      )}
      {shipConfig.fuselage === 'explorer' && (
        <mesh position={[0, 0, 0]} material={materials.primary}>
          <capsuleGeometry args={[0.8, 3, 16, 32]} />
        </mesh>
      )}

      {/* CABINA */}
      <mesh position={[0, 0.5, 1.5]} material={materials.dark}>
        <sphereGeometry args={[0.4, 32, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
      </mesh>

      {/* ALAS */}
      {shipConfig.wings === 'delta' && (
        <group>
          <mesh position={[1.2, -0.2, 0]} rotation={[0, 0, -0.2]} material={materials.secondary}>
            <boxGeometry args={[2.5, 0.1, 1.5]} />
          </mesh>
          <mesh position={[-1.2, -0.2, 0]} rotation={[0, 0, 0.2]} material={materials.secondary}>
            <boxGeometry args={[2.5, 0.1, 1.5]} />
          </mesh>
        </group>
      )}
      {shipConfig.wings === 'xwing' && (
        <group>
          {/* Superior derecha, inferior derecha, sup izq, inf izq */}
          <mesh position={[1, 0.5, -0.5]} rotation={[0, 0, -0.5]} material={materials.secondary}><boxGeometry args={[2, 0.1, 1]} /></mesh>
          <mesh position={[1, -0.5, -0.5]} rotation={[0, 0, 0.5]} material={materials.secondary}><boxGeometry args={[2, 0.1, 1]} /></mesh>
          <mesh position={[-1, 0.5, -0.5]} rotation={[0, 0, 0.5]} material={materials.secondary}><boxGeometry args={[2, 0.1, 1]} /></mesh>
          <mesh position={[-1, -0.5, -0.5]} rotation={[0, 0, -0.5]} material={materials.secondary}><boxGeometry args={[2, 0.1, 1]} /></mesh>
        </group>
      )}
      {shipConfig.wings === 'ring' && (
        <mesh position={[0, 0, -0.5]} rotation={[Math.PI/2, 0, 0]} material={materials.secondary}>
          <torusGeometry args={[1.5, 0.2, 16, 64]} />
        </mesh>
      )}

      {/* MOTORES */}
      <group position={[0, 0, -2]}>
        {shipConfig.engines === 'ion' ? (
          <>
            <mesh position={[0.4, 0, 0]} material={materials.dark}><cylinderGeometry args={[0.3, 0.4, 0.5, 16]} rotation={[Math.PI/2,0,0]} /></mesh>
            <mesh position={[0.4, 0, -0.3]} material={materials.emissive}><circleGeometry args={[0.25, 32]} rotation={[Math.PI,0,0]} /></mesh>
            <mesh position={[-0.4, 0, 0]} material={materials.dark}><cylinderGeometry args={[0.3, 0.4, 0.5, 16]} rotation={[Math.PI/2,0,0]} /></mesh>
            <mesh position={[-0.4, 0, -0.3]} material={materials.emissive}><circleGeometry args={[0.25, 32]} rotation={[Math.PI,0,0]} /></mesh>
          </>
        ) : (
          <mesh position={[0, 0, 0]} material={materials.dark}>
            <boxGeometry args={[1.5, 0.5, 0.5]} />
            <mesh position={[0, 0, -0.26]} material={materials.emissive}>
               <planeGeometry args={[1.3, 0.3]} rotation={[Math.PI,0,0]} />
            </mesh>
          </mesh>
        )}
      </group>

      {/* ARMAS */}
      {shipConfig.weapon === 'laser' && (
        <group position={[0, -0.5, 1.5]}>
          <mesh position={[0.3, 0, 0]} material={materials.dark}><cylinderGeometry args={[0.05, 0.05, 1, 8]} rotation={[Math.PI/2,0,0]}/></mesh>
          <mesh position={[-0.3, 0, 0]} material={materials.dark}><cylinderGeometry args={[0.05, 0.05, 1, 8]} rotation={[Math.PI/2,0,0]}/></mesh>
          {/* Laser Glow */}
          <mesh position={[0.3, 0, 0.5]} material={materials.emissive}><cylinderGeometry args={[0.02, 0.02, 0.5, 8]} rotation={[Math.PI/2,0,0]}/></mesh>
          <mesh position={[-0.3, 0, 0.5]} material={materials.emissive}><cylinderGeometry args={[0.02, 0.02, 0.5, 8]} rotation={[Math.PI/2,0,0]}/></mesh>
        </group>
      )}
      {shipConfig.weapon === 'missile' && (
        <group position={[0, -0.6, 0.5]}>
          <mesh position={[0.5, 0, 0]} material={materials.secondary}><cylinderGeometry args={[0.1, 0.1, 0.8, 8]} rotation={[Math.PI/2,0,0]}/></mesh>
          <mesh position={[-0.5, 0, 0]} material={materials.secondary}><cylinderGeometry args={[0.1, 0.1, 0.8, 8]} rotation={[Math.PI/2,0,0]}/></mesh>
        </group>
      )}
    </group>
  );
}

export default function SpaceshipScene() {
  return (
    <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden relative shadow-2xl shadow-cyan-900/20 border border-slate-700/50">
      {/* Background Grid Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <Canvas shadows camera={{ position: [4, 3, 5], fov: 45 }} className="z-10">
        <color attach="background" args={['#050816']} />
        
        {/* Luces y Ambiente */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00FFFF" />
        
        {/* Entorno HDRI para reflejos metálicos realistas */}
        <Environment preset="city" />
        
        {/* Modelo Flotante */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <ProceduralShip />
        </Float>
        
        {/* Sombras de Contacto */}
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        
        {/* Controles de Cámara Orbital */}
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.5} enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
}
