import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Float, ContactShadows } from '@react-three/drei';

/**
 * Clay/Toy material — MeshPhysicalMaterial tuned for plastic toy look.
 * clearcoat = glossy outer lacquer coat
 * roughness = soft clay base under the coat
 * sheen = fabric/clay inter-reflection
 */
function ClayMaterial({ color, roughness = 0.55, clearcoat = 0.8, clearcoatRoughness = 0.15, metalness = 0.0, sheenColor, sheen = 0.3 }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={roughness}
      metalness={metalness}
      clearcoat={clearcoat}
      clearcoatRoughness={clearcoatRoughness}
      sheen={sheen}
      sheenRoughness={0.6}
      sheenColor={sheenColor || color}
      envMapIntensity={1.2}
    />
  );
}

/** Glossy visor — tinted transparent glass */
function VisorMaterial({ color }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.05}
      metalness={0.45}
      clearcoat={1.0}
      clearcoatRoughness={0.0}
      reflectivity={1.0}
      envMapIntensity={2.5}
      emissive={color}
      emissiveIntensity={0.35}
      opacity={0.85}
      transparent={true}
      side={2}
    />
  );
}

/** Rubber/glove — matte with slight sheen */
function RubberMaterial({ color }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.75}
      metalness={0.0}
      clearcoat={0.2}
      clearcoatRoughness={0.5}
      sheen={0.4}
      sheenRoughness={0.8}
      sheenColor={color}
    />
  );
}

// ─── Procedural Astronaut ─────────────────────────────────────────────────────
function ProceduralAstronaut({ skinTone, suitColor, visorColor, accentColor }) {
  const group   = useRef();
  const leftArm  = useRef();
  const rightArm = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current)    group.current.position.y   = Math.sin(t * 1.6) * 0.06;
    if (leftArm.current)  leftArm.current.rotation.z  =  Math.sin(t * 1.2) * 0.12 + 0.15;
    if (rightArm.current) rightArm.current.rotation.z = -Math.sin(t * 1.2) * 0.12 - 0.15;
  });

  return (
    <group ref={group} scale={1.75} position={[0, -1.2, 0]}>

      {/* ── BOOTS — realistic space boot ──────────────────────────────── */}
      {/* LEFT BOOT */}
      {/* Ankle cuff — tapers from leg (top 0.18) to boot (bottom 0.24) */}
      <mesh position={[-0.3, -0.48, 0.04]} castShadow>
        <cylinderGeometry args={[0.18, 0.24, 0.2, 24]} />
        <ClayMaterial color={suitColor} roughness={0.45} clearcoat={0.8} />
      </mesh>
      {/* Velcro strap */}
      <mesh position={[-0.3, -0.40, 0.04]}>
        <torusGeometry args={[0.22, 0.04, 10, 32]} />
        <ClayMaterial color={accentColor} roughness={0.3} clearcoat={1.0} />
      </mesh>
      {/* Foot body — capsule horizontal */}
      <mesh position={[-0.3, -0.62, 0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.17, 0.36, 12, 24]} />
        <RubberMaterial color={suitColor} />
      </mesh>
      {/* Sole — flat dark base */}
      <mesh position={[-0.3, -0.76, 0.08]} castShadow>
        <boxGeometry args={[0.38, 0.06, 0.54, 2, 1, 2]} />
        <ClayMaterial color="#0a0a0a" roughness={0.95} clearcoat={0.05} />
      </mesh>

      {/* RIGHT BOOT */}
      <mesh position={[0.3, -0.48, 0.04]} castShadow>
        <cylinderGeometry args={[0.18, 0.24, 0.2, 24]} />
        <ClayMaterial color={suitColor} roughness={0.45} clearcoat={0.8} />
      </mesh>
      <mesh position={[0.3, -0.40, 0.04]}>
        <torusGeometry args={[0.22, 0.04, 10, 32]} />
        <ClayMaterial color={accentColor} roughness={0.3} clearcoat={1.0} />
      </mesh>
      <mesh position={[0.3, -0.62, 0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <capsuleGeometry args={[0.17, 0.36, 12, 24]} />
        <RubberMaterial color={suitColor} />
      </mesh>
      <mesh position={[0.3, -0.76, 0.08]} castShadow>
        <boxGeometry args={[0.38, 0.06, 0.54, 2, 1, 2]} />
        <ClayMaterial color="#0a0a0a" roughness={0.95} clearcoat={0.05} />
      </mesh>

      {/* ── LEGS ──────────────────────────────────────────────────────────── */}
      <mesh position={[-0.3, 0.08, 0]} castShadow>
        <capsuleGeometry args={[0.26, 0.82, 12, 24]} />
        <ClayMaterial color={suitColor} roughness={0.5} clearcoat={0.7} />
      </mesh>
      <mesh position={[-0.3, -0.22, 0]}>
        <torusGeometry args={[0.28, 0.06, 16, 32]} />
        <ClayMaterial color={accentColor} roughness={0.35} clearcoat={0.9} />
      </mesh>
      <mesh position={[0.3, 0.08, 0]} castShadow>
        <capsuleGeometry args={[0.26, 0.82, 12, 24]} />
        <ClayMaterial color={suitColor} roughness={0.5} clearcoat={0.7} />
      </mesh>
      <mesh position={[0.3, -0.22, 0]}>
        <torusGeometry args={[0.28, 0.06, 16, 32]} />
        <ClayMaterial color={accentColor} roughness={0.35} clearcoat={0.9} />
      </mesh>

      {/* ── BELT / WAIST ──────────────────────────────────────────────────── */}
      <mesh position={[0, 0.6, 0]}>
        <torusGeometry args={[0.54, 0.1, 16, 48]} />
        <ClayMaterial color={accentColor} roughness={0.3} clearcoat={1.0} clearcoatRoughness={0.05} />
      </mesh>

      {/* ── TORSO ─────────────────────────────────────────────────────────── */}
      <mesh position={[0, 1.12, 0]} castShadow>
        <cylinderGeometry args={[0.58, 0.52, 1.1, 32, 3]} />
        <ClayMaterial color={suitColor} roughness={0.45} clearcoat={0.85} />
      </mesh>
      {/* Torso accent stripe top */}
      <mesh position={[0, 1.62, 0]}>
        <torusGeometry args={[0.57, 0.045, 12, 48]} />
        <ClayMaterial color={accentColor} roughness={0.3} clearcoat={1.0} />
      </mesh>
      {/* Torso accent stripe mid */}
      <mesh position={[0, 1.0, 0]}>
        <torusGeometry args={[0.545, 0.04, 12, 48]} />
        <ClayMaterial color={accentColor} roughness={0.3} clearcoat={1.0} />
      </mesh>

      {/* ── CHEST PANEL — front-facing, clearly visible ───────────────────── */}
      {/* Panel housing */}
      <mesh position={[0, 1.22, 0.58]} castShadow>
        <boxGeometry args={[0.58, 0.42, 0.07]} />
        <ClayMaterial color="#020c1e" roughness={0.5} clearcoat={0.6} />
      </mesh>
      {/* Panel screen inset */}
      <mesh position={[0, 1.22, 0.625]}>
        <boxGeometry args={[0.48, 0.32, 0.02]} />
        <meshPhysicalMaterial color="#001133" emissive="#001a44" emissiveIntensity={1.2} roughness={0.4} clearcoat={0.8} />
      </mesh>
      {/* Green status LED */}
      <mesh position={[-0.14, 1.30, 0.64]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshPhysicalMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={5.0} roughness={0.1} clearcoat={1} />
      </mesh>
      {/* Red status LED */}
      <mesh position={[0.05, 1.30, 0.64]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshPhysicalMaterial color="#ff2244" emissive="#ff2244" emissiveIntensity={5.0} roughness={0.1} clearcoat={1} />
      </mesh>
      {/* Yellow warning LED */}
      <mesh position={[0.14, 1.30, 0.64]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhysicalMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={4.0} roughness={0.1} clearcoat={1} />
      </mesh>
      {/* Data bar 1 */}
      <mesh position={[-0.08, 1.17, 0.64]}>
        <boxGeometry args={[0.28, 0.025, 0.01]} />
        <meshPhysicalMaterial color="#00e4ff" emissive="#00e4ff" emissiveIntensity={3.0} roughness={0.2} />
      </mesh>
      {/* Data bar 2 */}
      <mesh position={[-0.1, 1.13, 0.64]}>
        <boxGeometry args={[0.18, 0.025, 0.01]} />
        <meshPhysicalMaterial color="#00e4ff" emissive="#00e4ff" emissiveIntensity={2.0} roughness={0.2} />
      </mesh>

      {/* ── BACKPACK (ECLSS) ──────────────────────────────────────────────── */}
      <mesh position={[0, 1.2, -0.5]} castShadow>
        <boxGeometry args={[0.78, 0.95, 0.38, 2, 3, 2]} />
        <ClayMaterial color={suitColor} roughness={0.55} clearcoat={0.6} />
      </mesh>
      <mesh position={[0, 1.2, -0.7]}>
        <boxGeometry args={[0.55, 0.7, 0.04]} />
        <ClayMaterial color={accentColor} roughness={0.25} clearcoat={1.0} />
      </mesh>
      {/* ECLSS stripes — bright */}
      {[-0.18, 0, 0.18].map((y, i) => (
        <mesh key={i} position={[0, 1.05 + y * 1.3, -0.72]}>
          <boxGeometry args={[0.44, 0.045, 0.025]} />
          <meshPhysicalMaterial color="#00e4ff" emissive="#00e4ff" emissiveIntensity={4.0} roughness={0.2} />
        </mesh>
      ))}

      {/* ── SHOULDER RINGS ────────────────────────────────────────────────── */}
      <mesh position={[-0.68, 1.58, 0]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <ClayMaterial color={accentColor} roughness={0.3} clearcoat={1.0} clearcoatRoughness={0.05} />
      </mesh>
      <mesh position={[-0.68, 1.58, 0]}>
        <torusGeometry args={[0.3, 0.05, 12, 32]} />
        <ClayMaterial color={suitColor} roughness={0.4} clearcoat={0.8} />
      </mesh>
      <mesh position={[0.68, 1.58, 0]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <ClayMaterial color={accentColor} roughness={0.3} clearcoat={1.0} clearcoatRoughness={0.05} />
      </mesh>
      <mesh position={[0.68, 1.58, 0]}>
        <torusGeometry args={[0.3, 0.05, 12, 32]} />
        <ClayMaterial color={suitColor} roughness={0.4} clearcoat={0.8} />
      </mesh>

      {/* ── ARMS ──────────────────────────────────────────────────────────── */}
      <group ref={leftArm} position={[-0.72, 1.18, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.2, 0.75, 10, 24]} />
          <ClayMaterial color={suitColor} roughness={0.48} clearcoat={0.75} />
        </mesh>
        <mesh position={[0, -0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.21, 0.05, 12, 32]} />
          <ClayMaterial color={accentColor} roughness={0.3} clearcoat={1.0} />
        </mesh>
        <mesh position={[0, -0.65, 0]} castShadow>
          <sphereGeometry args={[0.24, 20, 20]} />
          <RubberMaterial color={accentColor} />
        </mesh>
      </group>

      <group ref={rightArm} position={[0.72, 1.18, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.2, 0.75, 10, 24]} />
          <ClayMaterial color={suitColor} roughness={0.48} clearcoat={0.75} />
        </mesh>
        <mesh position={[0, -0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.21, 0.05, 12, 32]} />
          <ClayMaterial color={accentColor} roughness={0.3} clearcoat={1.0} />
        </mesh>
        <mesh position={[0, -0.65, 0]} castShadow>
          <sphereGeometry args={[0.24, 20, 20]} />
          <RubberMaterial color={accentColor} />
        </mesh>
      </group>

      {/* ── NECK COLLAR ───────────────────────────────────────────────────── */}
      <mesh position={[0, 1.75, 0]}>
        <cylinderGeometry args={[0.3, 0.34, 0.2, 24]} />
        <ClayMaterial color={suitColor} roughness={0.5} clearcoat={0.7} />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <torusGeometry args={[0.32, 0.055, 12, 32]} />
        <ClayMaterial color={accentColor} roughness={0.3} clearcoat={1.0} />
      </mesh>

      {/* ── HELMET ────────────────────────────────────────────────────────── */}
      <mesh position={[0, 2.28, 0]} castShadow>
        <sphereGeometry args={[0.58, 48, 48]} />
        <ClayMaterial color={suitColor} roughness={0.3} clearcoat={1.0} clearcoatRoughness={0.05} sheen={0.5} />
      </mesh>
      {/* Visor frame ring */}
      <mesh position={[0, 2.26, 0.06]} rotation={[0.25, 0, 0]}>
        <torusGeometry args={[0.4, 0.055, 16, 48]} />
        <ClayMaterial color={accentColor} roughness={0.25} clearcoat={1.0} />
      </mesh>
      {/* Visor lens — 3D half-dome visible from all angles */}
      <mesh position={[0, 2.26, 0.12]} rotation={[0.25, 0, 0]}>
        <sphereGeometry args={[0.42, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <VisorMaterial color={visorColor} />
      </mesh>
      {/* Face/skin behind visor */}
      <mesh position={[0, 2.24, 0.15]}>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshPhysicalMaterial color={skinTone} roughness={0.7} metalness={0} clearcoat={0.2} />
      </mesh>
      {/* Comm units */}
      <mesh position={[-0.6, 2.24, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.12, 0.12, 16]} />
        <ClayMaterial color={accentColor} roughness={0.35} clearcoat={0.9} />
      </mesh>
      <mesh position={[0.6, 2.24, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.12, 0.12, 16]} />
        <ClayMaterial color={accentColor} roughness={0.35} clearcoat={0.9} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0.42, 2.78, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.55, 8]} />
        <ClayMaterial color={accentColor} roughness={0.2} clearcoat={1.0} />
      </mesh>
      <mesh position={[0.42, 3.07, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshPhysicalMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1.5} roughness={0.1} clearcoat={1} />
      </mesh>

    </group>
  );
}

// ─── Main 3D Scene ────────────────────────────────────────────────────────────
export default function Astronaut3DScene({ skinTone, suitColor, visorColor, accentColor }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, background: '#000' }}>
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 7], fov: 42 }}
        gl={{ antialias: true, alpha: false, toneMapping: 3 }}
      >
        <color attach="background" args={['#010308']} />
        <fog attach="fog" args={['#010308', 12, 28]} />

        <Stars radius={80} depth={60} count={7000} factor={5} saturation={0.7} fade speed={1} />

        {/* Cinematic toy/clay 4-point lighting */}
        <directionalLight position={[4, 8, 5]} intensity={3.5} color="#fff8f0" castShadow
          shadow-mapSize={[2048, 2048]} shadow-camera-near={0.5} shadow-camera-far={30}
          shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={8} shadow-camera-bottom={-4} />
        <directionalLight position={[-5, 3, 2]} intensity={1.8} color="#c8e8ff" />
        <directionalLight position={[0, 2, -8]} intensity={2.2} color="#00e4ff" />
        <directionalLight position={[0, -4, 3]} intensity={0.8} color="#ffcc88" />
        <ambientLight intensity={0.35} color="#aaccff" />

        <Environment preset="city" />

        <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.4}>
          <ProceduralAstronaut
            skinTone={skinTone}
            suitColor={suitColor}
            visorColor={visorColor}
            accentColor={accentColor}
          />
        </Float>

        <ContactShadows position={[0, -2.85, 0]} opacity={0.55} scale={8} blur={2.5} far={5} color="#0066aa" />

        <OrbitControls makeDefault minPolarAngle={Math.PI / 5} maxPolarAngle={Math.PI / 2 + 0.15}
          enablePan={false} minDistance={3.5} maxDistance={18}
          enableDamping dampingFactor={0.06}
          autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
