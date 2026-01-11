"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/app/lib/utils";

export type CoreSkillVizId =
  | "brand-storytelling"
  | "copywriting"
  | "editorial-governance"
  | "seo-aeo"
  | "integrated-marketing-campaigns"
  | "performance-marketing"
  | "subject-matter-expertise"
  | "cross-functional-collaboration";

type CoreSkillVizProps = {
  id: CoreSkillVizId;
  className?: string;
};

type Variant = {
  color: string;
  emissive: string;
  tilt: [number, number, number];
};

const LOOP_SECONDS = 8;
const TAU = Math.PI * 2;
const OMEGA = TAU / LOOP_SECONDS;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useScrollPaused(delayMs = 160) {
  const [paused, setPaused] = useState(false);
  const timeoutId = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setPaused(true);
      if (timeoutId.current) window.clearTimeout(timeoutId.current);
      timeoutId.current = window.setTimeout(() => setPaused(false), delayMs);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutId.current) window.clearTimeout(timeoutId.current);
    };
  }, [delayMs]);

  return paused;
}

function getVariant(id: CoreSkillVizId): Variant {
  switch (id) {
    case "brand-storytelling":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        tilt: [0.25, 0.15, 0],
      };
    case "copywriting":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        tilt: [0.15, 0.35, 0],
      };
    case "editorial-governance":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        tilt: [0.2, 0.3, 0],
      };
    case "seo-aeo":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        tilt: [0.05, 0.2, 0],
      };
    case "integrated-marketing-campaigns":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        tilt: [0.25, 0.1, 0],
      };
    case "performance-marketing":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        tilt: [0.3, 0.15, 0],
      };
    case "subject-matter-expertise":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        tilt: [0.15, 0.25, 0],
      };
    case "cross-functional-collaboration":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        tilt: [0.2, 0.4, 0],
      };
  }
}

function materialSet(variant: Variant) {
  const wireProps = {
    color: variant.color,
    emissive: variant.emissive,
    emissiveIntensity: 0.14,
    roughness: 0.35,
    metalness: 0.55,
    wireframe: true,
  } as const;

  const softProps = {
    color: variant.color,
    emissive: variant.emissive,
    emissiveIntensity: 0.06,
    roughness: 0.55,
    metalness: 0.25,
    transparent: true,
    opacity: 0.08,
  } as const;

  const accentProps = {
    color: variant.emissive,
    emissive: variant.emissive,
    emissiveIntensity: 0.22,
    roughness: 0.35,
    metalness: 0.35,
    transparent: true,
    opacity: 0.18,
  } as const;

  return { wireProps, softProps, accentProps };
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function Link({
  from,
  to,
  radius = 0.03,
  color = "#EAEAEA",
}: {
  from: [number, number, number];
  to: [number, number, number];
  radius?: number;
  color?: string;
}) {
  const start = useMemo(() => new THREE.Vector3(...from), [from]);
  const end = useMemo(() => new THREE.Vector3(...to), [to]);
  const mid = useMemo(() => new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5), [start, end]);
  const dir = useMemo(() => new THREE.Vector3().subVectors(end, start), [start, end]);
  const length = useMemo(() => dir.length(), [dir]);
  const quat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return q;
  }, [dir]);

  return (
    <mesh position={mid} quaternion={quat}>
      <cylinderGeometry args={[radius, radius, length, 10]} />
      <meshStandardMaterial color={color} transparent opacity={0.14} roughness={0.6} metalness={0.1} />
    </mesh>
  );
}

function SkillScene({
  id,
  variant,
  reducedMotion,
}: {
  id: CoreSkillVizId;
  variant: Variant;
  reducedMotion: boolean;
}) {
  const mats = materialSet(variant);

  switch (id) {
    case "brand-storytelling":
      return <BrandStorytellingScene variant={variant} mats={mats} reducedMotion={reducedMotion} />;

    case "copywriting":
      return <CopywritingScene mats={mats} reducedMotion={reducedMotion} />;

    case "editorial-governance":
      return <EditorialGovernanceScene variant={variant} mats={mats} reducedMotion={reducedMotion} />;

    case "seo-aeo":
      return <SeoAeoScene variant={variant} mats={mats} reducedMotion={reducedMotion} />;

    case "integrated-marketing-campaigns":
      return <IntegratedCampaignsScene variant={variant} mats={mats} reducedMotion={reducedMotion} />;

    case "performance-marketing":
      return <PerformanceMarketingScene variant={variant} mats={mats} reducedMotion={reducedMotion} />;

    case "subject-matter-expertise":
      return <SubjectMatterExpertiseScene variant={variant} mats={mats} reducedMotion={reducedMotion} />;

    case "cross-functional-collaboration":
      return <CrossFunctionalCollaborationScene variant={variant} mats={mats} reducedMotion={reducedMotion} />;
  }
}

function Geometry({ id, variant, reducedMotion }: { id: CoreSkillVizId; variant: Variant; reducedMotion: boolean }) {
  const group = useMemo(() => new THREE.Group(), []);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    const phase = t * OMEGA;
    group.rotation.y = Math.sin(phase) * 0.35;
    group.rotation.x = Math.sin(phase + 1.2) * 0.16;
    group.rotation.z = Math.sin(phase + 0.4) * 0.06;
  });

  return (
    <primitive object={group}>
      <SkillScene id={id} variant={variant} reducedMotion={reducedMotion} />
    </primitive>
  );
}

function BrandStorytellingScene({
  variant,
  mats,
  reducedMotion,
}: {
  variant: Variant;
  mats: ReturnType<typeof materialSet>;
  reducedMotion: boolean;
}) {
  const strandA = useRef<THREE.Mesh>(null);
  const strandB = useRef<THREE.Mesh>(null);
  const marker = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    const phase = t * OMEGA;

    if (strandA.current) strandA.current.rotation.y = Math.sin(phase) * 0.35;
    if (strandB.current) strandB.current.rotation.y = Math.sin(phase + 1.4) * -0.28;

    if (marker.current) {
      const r = 0.92;
      marker.current.position.set(
        Math.cos(phase) * r,
        Math.sin(phase) * r * 0.55,
        Math.sin(phase * 2) * 0.08,
      );
    }
  });

  return (
    <>
      <mesh ref={strandA} rotation={variant.tilt}>
        <torusKnotGeometry args={[0.66, 0.14, 220, 20]} />
        <meshStandardMaterial {...mats.wireProps} />
      </mesh>
      <mesh ref={strandB} rotation={[variant.tilt[0] + 0.18, variant.tilt[1] - 0.12, variant.tilt[2] + 0.05]} scale={0.98}>
        <torusKnotGeometry args={[0.62, 0.13, 210, 18]} />
        <meshStandardMaterial {...mats.softProps} />
      </mesh>
      <mesh ref={marker}>
        <sphereGeometry args={[0.075, 18, 18]} />
        <meshStandardMaterial {...mats.accentProps} />
      </mesh>
    </>
  );
}

function CopywritingScene({
  mats,
  reducedMotion,
}: {
  mats: ReturnType<typeof materialSet>;
  reducedMotion: boolean;
}) {
  const blocks = useRef<Array<THREE.Mesh | null>>([]);

  const targets = useMemo(
    () => [
      [-0.55, 0.35, 0.0],
      [0.0, 0.35, 0.0],
      [0.55, 0.35, 0.0],
      [-0.55, -0.25, 0.0],
      [0.0, -0.25, 0.0],
      [0.55, -0.25, 0.0],
    ] as Array<[number, number, number]>,
    [],
  );

  const offsets = useMemo(
    () => [
      [-0.72, 0.42, 0.06],
      [0.1, 0.5, -0.08],
      [0.72, 0.28, 0.12],
      [-0.62, -0.34, -0.08],
      [-0.05, -0.46, 0.1],
      [0.66, -0.16, -0.06],
    ] as Array<[number, number, number]>,
    [],
  );

  useFrame((state) => {
    const w = (Math.sin(state.clock.getElapsedTime() * OMEGA) + 1) / 2;
    const bump = smoothstep(0.12, 0.28, w) * (1 - smoothstep(0.72, 0.88, w));
    const mix = reducedMotion ? 1 : 1 - bump * 0.32;
    for (let i = 0; i < blocks.current.length; i++) {
      const mesh = blocks.current[i];
      if (!mesh) continue;
      const from = offsets[i]!;
      const to = targets[i]!;
      mesh.position.set(
        from[0] + (to[0] - from[0]) * mix,
        from[1] + (to[1] - from[1]) * mix,
        from[2] + (to[2] - from[2]) * mix,
      );
    }
  });

  return (
    <>
      {targets.map((_, i) => (
        <mesh
          key={`block-${i}`}
          ref={(node) => {
            blocks.current[i] = node;
          }}
          rotation={[0.2, 0.35, 0.02]}
        >
          <boxGeometry args={[0.44, 0.18, 0.06]} />
          <meshStandardMaterial {...mats.wireProps} />
        </mesh>
      ))}
      <mesh rotation={[0.2, 0.35, 0.02]} position={[0, 0.06, -0.15]} scale={[1.02, 1.02, 1.02]}>
        <boxGeometry args={[1.55, 0.02, 1.05]} />
        <meshStandardMaterial {...mats.softProps} />
      </mesh>
    </>
  );
}

function EditorialGovernanceScene({
  variant,
  mats,
  reducedMotion,
}: {
  variant: Variant;
  mats: ReturnType<typeof materialSet>;
  reducedMotion: boolean;
}) {
  const railA = useRef<THREE.Mesh>(null);
  const railB = useRef<THREE.Mesh>(null);
  const railC = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const phase = state.clock.getElapsedTime() * OMEGA;
    const t = Math.sin(phase) * 0.08;
    if (railA.current) railA.current.position.x = t;
    if (railB.current) railB.current.position.y = -t;
    if (railC.current) railC.current.position.x = -t;
  });

  return (
    <>
      {/* Boundary frame */}
      <mesh rotation={variant.tilt}>
        <boxGeometry args={[1.65, 1.2, 1.25]} />
        <meshStandardMaterial {...mats.wireProps} />
      </mesh>

      {/* Internal constraints / guide rails */}
      <mesh ref={railA} rotation={[0, 0.25, 0]} position={[0, 0.15, 0.02]}>
        <boxGeometry args={[1.2, 0.02, 0.9]} />
        <meshStandardMaterial {...mats.accentProps} />
      </mesh>
      <mesh ref={railB} rotation={[0, -0.18, 0]} position={[0, -0.1, -0.02]}>
        <boxGeometry args={[1.05, 0.02, 0.8]} />
        <meshStandardMaterial {...mats.accentProps} />
      </mesh>
      <mesh ref={railC} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[0.78, 0.012, 12, 92]} />
        <meshStandardMaterial {...mats.softProps} />
      </mesh>
    </>
  );
}

function SeoAeoScene({
  mats,
  reducedMotion,
}: {
  variant: Variant;
  mats: ReturnType<typeof materialSet>;
  reducedMotion: boolean;
}) {
  const core = useRef<THREE.Mesh>(null);
  const coreMaterial = useRef<THREE.MeshStandardMaterial>(null);

  const nodes = useMemo(
    () =>
      [
        [1.0, 0.15, 0.0],
        [0.35, 0.92, 0.08],
        [-0.55, 0.7, -0.06],
        [-1.0, -0.1, 0.0],
        [-0.35, -0.92, 0.05],
        [0.6, -0.68, -0.08],
      ] as Array<[number, number, number]>,
    [],
  );

  useFrame((state) => {
    if (reducedMotion) return;
    const phase = state.clock.getElapsedTime() * OMEGA;
    const pulse = 0.5 + 0.5 * Math.sin(phase);
    if (core.current) core.current.scale.setScalar(1 + pulse * 0.06);
    if (coreMaterial.current) coreMaterial.current.emissiveIntensity = 0.08 + pulse * 0.18;
  });

  return (
    <>
      {/* Central node */}
      <mesh ref={core}>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshStandardMaterial ref={coreMaterial} {...mats.accentProps} />
      </mesh>

      {/* Branching connections */}
      {nodes.map((pos) => (
        <group key={pos.join(",")}>
          <Link from={[0, 0, 0]} to={pos} radius={0.02} color="#EAEAEA" />
          <mesh position={pos}>
            <sphereGeometry args={[0.085, 16, 16]} />
            <meshStandardMaterial {...mats.wireProps} />
          </mesh>
        </group>
      ))}

      {/* Discovery boundary ring */}
      <mesh rotation={[Math.PI / 2, 0.1, 0]}>
        <torusGeometry args={[1.18, 0.015, 12, 110]} />
        <meshStandardMaterial {...mats.softProps} />
      </mesh>
    </>
  );
}

function IntegratedCampaignsScene({
  mats,
  reducedMotion,
}: {
  variant: Variant;
  mats: ReturnType<typeof materialSet>;
  reducedMotion: boolean;
}) {
  const orbiters = useRef<Array<THREE.Mesh | null>>([]);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    const phase = t * OMEGA;

    const a = phase;
    const b = phase + TAU / 3;
    const c = phase + (TAU * 2) / 3;

    const r1 = 1.0;
    const r2 = 0.82;
    const r3 = 0.92;

    const p1: [number, number, number] = [Math.cos(a) * r1, Math.sin(a) * r1 * 0.35, Math.sin(a) * 0.18];
    const p2: [number, number, number] = [Math.cos(b) * r2 * 0.55, Math.sin(b) * r2, Math.cos(b) * 0.12];
    const p3: [number, number, number] = [Math.sin(c) * r3, Math.cos(c) * r3 * 0.55, Math.sin(c) * 0.12];

    const positions = [p1, p2, p3];
    for (let i = 0; i < orbiters.current.length; i++) {
      const mesh = orbiters.current[i];
      if (!mesh) continue;
      const p = positions[i]!;
      mesh.position.set(p[0], p[1], p[2]);
    }
  });

  return (
    <>
      {/* Shared center */}
      <mesh>
        <dodecahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial {...mats.wireProps} />
      </mesh>

      {/* Orbital paths */}
      <mesh rotation={[Math.PI / 2, 0.15, 0]}>
        <torusGeometry args={[1.0, 0.012, 12, 120]} />
        <meshStandardMaterial {...mats.softProps} />
      </mesh>
      <mesh rotation={[0.25, Math.PI / 2, 0.1]}>
        <torusGeometry args={[0.82, 0.012, 12, 120]} />
        <meshStandardMaterial {...mats.softProps} />
      </mesh>
      <mesh rotation={[0.15, 0.2, Math.PI / 2]}>
        <torusGeometry args={[0.92, 0.012, 12, 120]} />
        <meshStandardMaterial {...mats.softProps} />
      </mesh>

      {/* Orbiting channel nodes */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={`orbiter-${i}`}
          ref={(node) => {
            orbiters.current[i] = node;
          }}
        >
          <sphereGeometry args={[0.085, 16, 16]} />
          <meshStandardMaterial {...mats.accentProps} />
        </mesh>
      ))}
    </>
  );
}

function PerformanceMarketingScene({
  variant,
  mats,
  reducedMotion,
}: {
  variant: Variant;
  mats: ReturnType<typeof materialSet>;
  reducedMotion: boolean;
}) {
  const layers = useRef<Array<THREE.Mesh | null>>([]);
  const base = useMemo(
    () => [
      { key: "layer-1", y: -0.55, z: 0.05, w: 1.55 },
      { key: "layer-2", y: -0.28, z: 0.02, w: 1.35 },
      { key: "layer-3", y: -0.02, z: -0.01, w: 1.15 },
      { key: "layer-4", y: 0.26, z: -0.04, w: 0.95 },
    ],
    [],
  );

  useFrame((state) => {
    if (reducedMotion) return;
    const phase = state.clock.getElapsedTime() * OMEGA;
    const drift = Math.sin(phase) * 0.06;
    for (let i = 0; i < layers.current.length; i++) {
      const mesh = layers.current[i];
      if (!mesh) continue;
      mesh.position.y = base[i]!.y + drift * (i + 1) * 0.35;
    }
  });

  return (
    <>
      {base.map((layer, i) => (
        <mesh
          key={layer.key}
          ref={(node) => {
            layers.current[i] = node;
          }}
          rotation={[variant.tilt[0] + 0.18, variant.tilt[1] + 0.25, 0]}
          position={[0, layer.y, layer.z]}
        >
          <boxGeometry args={[layer.w, 0.06, 0.9]} />
          <meshStandardMaterial {...mats.wireProps} />
        </mesh>
      ))}

      <mesh rotation={[variant.tilt[0] + 0.18, variant.tilt[1] + 0.25, 0]} position={[0, -0.62, 0.1]}>
        <boxGeometry args={[1.7, 0.02, 1.05]} />
        <meshStandardMaterial {...mats.softProps} />
      </mesh>
    </>
  );
}

function SubjectMatterExpertiseScene({
  mats,
  reducedMotion,
}: {
  variant: Variant;
  mats: ReturnType<typeof materialSet>;
  reducedMotion: boolean;
}) {
  const shellA = useRef<THREE.Mesh>(null);
  const shellB = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const phase = state.clock.getElapsedTime() * OMEGA;
    if (shellA.current) shellA.current.rotation.y = Math.sin(phase) * 0.22;
    if (shellB.current) shellB.current.rotation.y = Math.sin(phase + 1.1) * -0.18;
  });

  return (
    <>
      {/* Core */}
      <mesh>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={mats.wireProps.color}
          emissive={mats.wireProps.emissive}
          emissiveIntensity={0.08}
          roughness={0.35}
          metalness={0.35}
        />
      </mesh>

      {/* Validation layers / shells */}
      <mesh ref={shellA}>
        <sphereGeometry args={[0.78, 24, 24]} />
        <meshStandardMaterial {...mats.softProps} opacity={0.06} />
      </mesh>
      <mesh ref={shellB} rotation={[0.2, 0.2, 0.1]}>
        <sphereGeometry args={[1.02, 24, 24]} />
        <meshStandardMaterial {...mats.softProps} opacity={0.04} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0.15, 0]}>
        <torusGeometry args={[0.95, 0.012, 12, 110]} />
        <meshStandardMaterial {...mats.wireProps} />
      </mesh>
    </>
  );
}

function CrossFunctionalCollaborationScene({
  mats,
  reducedMotion,
}: {
  variant: Variant;
  mats: ReturnType<typeof materialSet>;
  reducedMotion: boolean;
}) {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const phase = state.clock.getElapsedTime() * OMEGA;
    const bob = Math.sin(phase) * 0.04;
    if (ringA.current) ringA.current.position.y = bob;
    if (ringB.current) ringB.current.position.y = -bob;
    if (ringC.current) ringC.current.position.x = bob;
  });

  return (
    <>
      {/* Interlocking components (balanced; no single "hero" part) */}
      <mesh ref={ringA} rotation={[Math.PI / 2, 0.2, 0]} position={[-0.25, 0, 0]}>
        <torusGeometry args={[0.62, 0.06, 18, 90]} />
        <meshStandardMaterial {...mats.wireProps} />
      </mesh>
      <mesh ref={ringB} rotation={[0.2, Math.PI / 2, 0.15]} position={[0.25, 0, 0]}>
        <torusGeometry args={[0.62, 0.06, 18, 90]} />
        <meshStandardMaterial {...mats.wireProps} />
      </mesh>
      <mesh ref={ringC} rotation={[0.15, 0.35, Math.PI / 2]} position={[0, 0.05, 0]}>
        <torusGeometry args={[0.62, 0.06, 18, 90]} />
        <meshStandardMaterial {...mats.wireProps} />
      </mesh>

      {/* Subtle connective rails */}
      <mesh rotation={[0.2, 0.35, 0]} position={[0, -0.55, 0.0]}>
        <boxGeometry args={[1.3, 0.02, 0.6]} />
        <meshStandardMaterial {...mats.softProps} />
      </mesh>
      <mesh rotation={[0.2, 0.35, 0]} position={[0, 0.55, 0.0]}>
        <boxGeometry args={[1.1, 0.02, 0.5]} />
        <meshStandardMaterial {...mats.softProps} />
      </mesh>
    </>
  );
}

export function CoreSkillViz({ id, className }: CoreSkillVizProps) {
  const reducedMotionPreference = usePrefersReducedMotion();
  const scrollPaused = useScrollPaused();
  const reducedMotion = reducedMotionPreference || scrollPaused;
  const variant = useMemo(() => getVariant(id), [id]);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none relative h-full w-full", className)}
      style={{
        background:
          "radial-gradient(120% 80% at 50% 20%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.00) 70%)",
      }}
    >
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 3.25], fov: 45, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[2.8, 3.2, 2.6]} intensity={0.9} />
        <directionalLight position={[-2.8, -1.2, 2.2]} intensity={0.45} />
        <group>
          <Geometry id={id} variant={variant} reducedMotion={reducedMotion} />
        </group>
      </Canvas>
    </div>
  );
}
