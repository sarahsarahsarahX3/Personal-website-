"use client";

import { useEffect, useMemo, useState } from "react";
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

function SkillScene({ id, variant }: { id: CoreSkillVizId; variant: Variant }) {
  const mats = materialSet(variant);

  switch (id) {
    case "brand-storytelling":
      return (
        <>
          {/* Story arc / ribbon */}
          <mesh rotation={variant.tilt}>
            <torusKnotGeometry args={[0.68, 0.16, 200, 18]} />
            <meshStandardMaterial {...mats.wireProps} />
          </mesh>
          <mesh rotation={variant.tilt} scale={0.985}>
            <torusKnotGeometry args={[0.68, 0.16, 200, 18]} />
            <meshStandardMaterial {...mats.softProps} />
          </mesh>
          {/* A small "spark" marker */}
          <mesh position={[0.9, 0.35, 0]} rotation={[0.2, 0.4, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial {...mats.accentProps} />
          </mesh>
        </>
      );

    case "copywriting":
      return (
        <>
          {/* Stacked pages */}
          {[
            { id: "page-1", dx: -0.06, dy: -0.06, dz: -0.0 },
            { id: "page-2", dx: -0.03, dy: -0.03, dz: -0.04 },
            { id: "page-3", dx: 0.0, dy: 0.0, dz: -0.08 },
            { id: "page-4", dx: 0.03, dy: 0.03, dz: -0.12 },
            { id: "page-5", dx: 0.06, dy: 0.06, dz: -0.16 },
          ].map((page) => (
            <mesh
              key={page.id}
              rotation={[0.15, 0.22, 0.02]}
              position={[page.dx, page.dy, page.dz]}
            >
              <boxGeometry args={[1.35, 0.06, 0.95]} />
              <meshStandardMaterial {...mats.wireProps} />
            </mesh>
          ))}
          <mesh rotation={[0.15, 0.22, 0.02]} position={[0.05, 0.05, -0.22]} scale={[0.98, 0.98, 0.98]}>
            <boxGeometry args={[1.35, 0.06, 0.95]} />
            <meshStandardMaterial {...mats.softProps} />
          </mesh>
          {/* Cursor caret */}
          <mesh position={[0.62, 0.1, 0.55]}>
            <boxGeometry args={[0.05, 0.5, 0.05]} />
            <meshStandardMaterial {...mats.accentProps} />
          </mesh>
        </>
      );

    case "editorial-governance":
      return (
        <>
          {/* Framework cube */}
          <mesh rotation={variant.tilt}>
            <boxGeometry args={[1.35, 1.0, 1.35]} />
            <meshStandardMaterial {...mats.wireProps} />
          </mesh>
          <mesh rotation={variant.tilt} scale={0.985}>
            <boxGeometry args={[1.35, 1.0, 1.35]} />
            <meshStandardMaterial {...mats.softProps} />
          </mesh>
          {/* Guideline planes */}
          <mesh rotation={[0, 0.2, 0]} position={[0, 0.05, 0]}>
            <planeGeometry args={[1.15, 0.85]} />
            <meshStandardMaterial {...mats.accentProps} />
          </mesh>
          <mesh rotation={[0, -0.25, 0]} position={[0, -0.05, 0.02]}>
            <planeGeometry args={[1.0, 0.72]} />
            <meshStandardMaterial {...mats.accentProps} />
          </mesh>
        </>
      );

    case "seo-aeo":
      return (
        <>
          {/* "Search radar" */}
          <mesh rotation={[0.25, 0.1, 0]}>
            <ringGeometry args={[0.42, 0.9, 48]} />
            <meshStandardMaterial {...mats.wireProps} />
          </mesh>
          <mesh rotation={[0.1, 0.35, 0]}>
            <icosahedronGeometry args={[0.62, 0]} />
            <meshStandardMaterial {...mats.wireProps} />
          </mesh>
          <mesh rotation={[0.1, 0.35, 0]} scale={0.985}>
            <icosahedronGeometry args={[0.62, 0]} />
            <meshStandardMaterial {...mats.softProps} />
          </mesh>
          {/* Query beam */}
          <mesh rotation={[0, 0, -0.35]} position={[0.15, 0.05, 0.0]}>
            <cylinderGeometry args={[0.02, 0.02, 1.6, 10]} />
            <meshStandardMaterial {...mats.accentProps} />
          </mesh>
          <mesh position={[0.55, 0.48, 0.0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial {...mats.accentProps} />
          </mesh>
        </>
      );

    case "integrated-marketing-campaigns":
      return (
        <>
          {/* Central hub + orbiting channels */}
          <mesh rotation={variant.tilt}>
            <dodecahedronGeometry args={[0.62, 0]} />
            <meshStandardMaterial {...mats.wireProps} />
          </mesh>
          <mesh rotation={variant.tilt} scale={0.985}>
            <dodecahedronGeometry args={[0.62, 0]} />
            <meshStandardMaterial {...mats.softProps} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0.2, 0]} position={[0, 0, 0]}>
            <torusGeometry args={[0.95, 0.02, 12, 72]} />
            <meshStandardMaterial {...mats.accentProps} />
          </mesh>
          {[
            { key: "node-a", pos: [0.95, 0.15, 0.0] as [number, number, number] },
            { key: "node-b", pos: [-0.35, 0.85, 0.1] as [number, number, number] },
            { key: "node-c", pos: [-0.65, -0.65, -0.05] as [number, number, number] },
          ].map((node) => (
            <mesh key={node.key} position={node.pos}>
              <sphereGeometry args={[0.085, 16, 16]} />
              <meshStandardMaterial {...mats.accentProps} />
            </mesh>
          ))}
        </>
      );

    case "performance-marketing":
      return (
        <>
          {/* Bars */}
          {[
            { key: "bar-1", x: -0.6, h: 0.55 },
            { key: "bar-2", x: -0.2, h: 0.8 },
            { key: "bar-3", x: 0.2, h: 1.05 },
            { key: "bar-4", x: 0.6, h: 1.25 },
          ].map((b) => (
            <mesh
              key={b.key}
              position={[b.x, b.h / 2 - 0.5, 0]}
              rotation={[0.12, 0.35, 0]}
            >
              <boxGeometry args={[0.22, b.h, 0.22]} />
              <meshStandardMaterial {...mats.wireProps} />
            </mesh>
          ))}
          {/* Trend arrow */}
          <mesh rotation={[0, 0, -0.35]} position={[0.1, 0.25, 0.35]}>
            <cylinderGeometry args={[0.02, 0.02, 1.6, 10]} />
            <meshStandardMaterial {...mats.accentProps} />
          </mesh>
          <mesh rotation={[0, 0, -0.35]} position={[0.72, 0.72, 0.35]}>
            <coneGeometry args={[0.08, 0.2, 12]} />
            <meshStandardMaterial {...mats.accentProps} />
          </mesh>
        </>
      );

    case "subject-matter-expertise":
      return (
        <>
          {/* Atom/molecule */}
          <mesh>
            <sphereGeometry args={[0.18, 20, 20]} />
            <meshStandardMaterial {...mats.accentProps} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0.2, 0]}>
            <torusGeometry args={[0.82, 0.02, 12, 72]} />
            <meshStandardMaterial {...mats.wireProps} />
          </mesh>
          <mesh rotation={[0.2, Math.PI / 2, 0.15]}>
            <torusGeometry args={[0.82, 0.02, 12, 72]} />
            <meshStandardMaterial {...mats.wireProps} />
          </mesh>
          <mesh rotation={[0.0, 0.0, 0.35]}>
            <torusGeometry args={[0.82, 0.02, 12, 72]} />
            <meshStandardMaterial {...mats.wireProps} />
          </mesh>
          {[
            { key: "electron-1", pos: [0.78, 0.2, 0.0] as [number, number, number] },
            { key: "electron-2", pos: [-0.35, -0.72, 0.1] as [number, number, number] },
            { key: "electron-3", pos: [-0.25, 0.55, -0.15] as [number, number, number] },
          ].map((electron) => (
            <mesh key={electron.key} position={electron.pos}>
              <sphereGeometry args={[0.075, 16, 16]} />
              <meshStandardMaterial {...mats.accentProps} />
            </mesh>
          ))}
        </>
      );

    case "cross-functional-collaboration": {
      const nodes: Array<[number, number, number]> = [
        [-0.7, -0.25, 0.1],
        [-0.15, 0.55, -0.05],
        [0.6, 0.25, 0.0],
        [0.35, -0.55, -0.1],
        [-0.35, 0.0, 0.25],
      ];

      const links: Array<[number, number]> = [
        [0, 4],
        [4, 1],
        [1, 2],
        [2, 3],
        [3, 0],
      ];

      return (
        <>
          {links.map((l) => (
            <Link
              key={`${l[0]}-${l[1]}`}
              from={nodes[l[0]!]!}
              to={nodes[l[1]!]!}
              color="#EAEAEA"
            />
          ))}

          {nodes.map((p) => (
            <mesh key={p.join(",")} position={p}>
              <sphereGeometry args={[0.11, 18, 18]} />
              {p === nodes[4] ? <meshStandardMaterial {...mats.accentProps} /> : <meshStandardMaterial {...mats.wireProps} />}
            </mesh>
          ))}
        </>
      );
    }
  }
}

function Geometry({ id, variant }: { id: CoreSkillVizId; variant: Variant }) {
  const reducedMotion = usePrefersReducedMotion();
  const group = useMemo(() => new THREE.Group(), []);
  const clockRef = useMemo(() => ({ t: 0 }), []);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    clockRef.t += delta;
    group.rotation.y = clockRef.t * 0.2;
    group.rotation.x = clockRef.t * 0.08;
  });

  return (
    <primitive object={group}>
      <SkillScene id={id} variant={variant} />
    </primitive>
  );
}

export function CoreSkillViz({ id, className }: CoreSkillVizProps) {
  const reducedMotion = usePrefersReducedMotion();
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
          <Geometry id={id} variant={variant} />
        </group>
      </Canvas>
    </div>
  );
}
