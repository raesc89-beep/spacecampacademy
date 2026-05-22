import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Float, ContactShadows } from '@react-three/drei';

function ProceduralAstronaut({ skinTone, suitColor, visorColor, accentColor }) {
  const group = useRef();

  useFrame((state) => {
    // Subtle breathing animation
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 2) * 0.05;
  });

  return (
    <group ref={group} scale={1.8} position={[0, -1, 0]}>
      {/* Torso */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.6, 0.5, 1.2, 32]} />
        <meshStandardMaterial color={suitColor} roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Backpack (Life Support) */}
      <mesh position={[0, 1.3, -0.4]}>
        <boxGeometry args={[0.8, 1, 0.4]} />
        <meshStandardMaterial color={suitColor} roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Backpack Accents */}
      <mesh position={[0, 1.3, -0.61]}>
        <boxGeometry args={[0.6, 0.8, 0.05]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Head / Helmet Base */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color={suitColor} roughness={0.2} metalness={0.2} />
      </mesh>

      {/* Helmet Visor */}
      <mesh position={[0, 2.2, 0.2]}>
        <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.2]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color={visorColor} roughness={0.1} metalness={0.9} envMapIntensity={2} />
      </mesh>
      
      {/* Face inside (visible if visor is slightly transparent or if we just want a glowing effect) */}
      <mesh position={[0, 2.2, 0.1]}>
         <sphereGeometry args={[0.45, 16, 16]} />
         <meshStandardMaterial color={skinTone} roughness={0.5} />
      </mesh>

      {/* Shoulders */}
      <mesh position={[0.7, 1.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[-0.7, 1.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Arms */}
      <mesh position={[0.8, 1.1, 0]} rotation={[0, 0, 0.1]}>
        <capsuleGeometry args={[0.2, 0.8, 16, 16]} />
        <meshStandardMaterial color={suitColor} roughness={0.3} />
      </mesh>
      <mesh position={[-0.8, 1.1, 0]} rotation={[0, 0, -0.1]}>
        <capsuleGeometry args={[0.2, 0.8, 16, 16]} />
        <meshStandardMaterial color={suitColor} roughness={0.3} />
      </mesh>

      {/* Hands / Gloves */}
      <mesh position={[0.9, 0.5, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[-0.9, 0.5, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Belt */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.2, 32]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Legs */}
      <mesh position={[0.3, 0.1, 0]}>
        <capsuleGeometry args={[0.25, 0.8, 16, 16]} />
        <meshStandardMaterial color={suitColor} roughness={0.3} />
      </mesh>
      <mesh position={[-0.3, 0.1, 0]}>
        <capsuleGeometry args={[0.25, 0.8, 16, 16]} />
        <meshStandardMaterial color={suitColor} roughness={0.3} />
      </mesh>

      {/* Boots */}
      <mesh position={[0.3, -0.5, 0.1]}>
        <boxGeometry args={[0.55, 0.35, 0.75]} />
        <meshStandardMaterial color={accentColor} roughness={0.7} />
      </mesh>
      <mesh position={[-0.3, -0.5, 0.1]}>
        <boxGeometry args={[0.55, 0.35, 0.75]} />
        <meshStandardMaterial color={accentColor} roughness={0.7} />
      </mesh>
    </group>
  );
}

export default function Astronaut3DScene({ skinTone, suitColor, visorColor, accentColor }) {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#010204', position: 'absolute', inset: 0 }}>
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 40 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#010204']} />
        
        {/* Starfield Background */}
        <Stars radius={100} depth={50} count={8000} factor={6} saturation={0.8} fade speed={1.5} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={10} castShadow color="#ffffff" />
        <spotLight position={[-5, 5, -5]} angle={0.8} penumbra={1} intensity={15} color="#00e4ff" /> {/* Cyan rim light */}
        <spotLight position={[5, -5, -5]} angle={0.8} penumbra={1} intensity={10} color="#ff0055" /> {/* Magenta fill light */}
        
        <Environment preset="studio" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <ProceduralAstronaut 
            skinTone={skinTone} 
            suitColor={suitColor} 
            visorColor={visorColor} 
            accentColor={accentColor} 
          />
        </Float>
        
        <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={10} blur={2} far={4} color="#00e4ff" />

        <OrbitControls 
          makeDefault 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2 + 0.1} 
          enablePan={false}
          minDistance={3}
          maxDistance={25}
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
