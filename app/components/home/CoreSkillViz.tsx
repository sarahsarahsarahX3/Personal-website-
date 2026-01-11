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
  geometry:
    | { kind: "torusKnot"; args: [number, number, number, number] }
    | { kind: "icosahedron"; args: [number, number] }
    | { kind: "box"; args: [number, number, number] }
    | { kind: "torus"; args: [number, number, number, number] }
    | { kind: "dodecahedron"; args: [number, number] }
    | { kind: "octahedron"; args: [number, number] }
    | { kind: "capsule"; args: [number, number, number, number] };
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
        geometry: { kind: "torusKnot", args: [0.72, 0.18, 180, 16] },
        tilt: [0.25, 0.15, 0],
      };
    case "copywriting":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        geometry: { kind: "capsule", args: [0.52, 1.1, 10, 18] },
        tilt: [0.15, 0.35, 0],
      };
    case "editorial-governance":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        geometry: { kind: "box", args: [1.2, 1.2, 1.2] },
        tilt: [0.2, 0.3, 0],
      };
    case "seo-aeo":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        geometry: { kind: "icosahedron", args: [0.95, 0] },
        tilt: [0.05, 0.2, 0],
      };
    case "integrated-marketing-campaigns":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        geometry: { kind: "dodecahedron", args: [0.95, 0] },
        tilt: [0.25, 0.1, 0],
      };
    case "performance-marketing":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        geometry: { kind: "torus", args: [0.92, 0.22, 18, 64] },
        tilt: [0.3, 0.15, 0],
      };
    case "subject-matter-expertise":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        geometry: { kind: "octahedron", args: [1.0, 0] },
        tilt: [0.15, 0.25, 0],
      };
    case "cross-functional-collaboration":
      return {
        color: "#EAEAEA",
        emissive: "#FF3B30",
        geometry: { kind: "torusKnot", args: [0.62, 0.16, 160, 14] },
        tilt: [0.2, 0.4, 0],
      };
  }
}

function Geometry({ variant }: { variant: Variant }) {
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
      <mesh rotation={variant.tilt}>
        {variant.geometry.kind === "torusKnot" ? (
          <torusKnotGeometry args={variant.geometry.args} />
        ) : null}
        {variant.geometry.kind === "icosahedron" ? (
          <icosahedronGeometry args={variant.geometry.args} />
        ) : null}
        {variant.geometry.kind === "box" ? <boxGeometry args={variant.geometry.args} /> : null}
        {variant.geometry.kind === "torus" ? <torusGeometry args={variant.geometry.args} /> : null}
        {variant.geometry.kind === "dodecahedron" ? (
          <dodecahedronGeometry args={variant.geometry.args} />
        ) : null}
        {variant.geometry.kind === "octahedron" ? (
          <octahedronGeometry args={variant.geometry.args} />
        ) : null}
        {variant.geometry.kind === "capsule" ? (
          <capsuleGeometry args={variant.geometry.args} />
        ) : null}
        <meshStandardMaterial
          color={variant.color}
          emissive={variant.emissive}
          emissiveIntensity={0.18}
          roughness={0.35}
          metalness={0.55}
          wireframe
        />
      </mesh>

      {/* A second, slightly offset solid mesh for depth (very subtle) */}
      <mesh rotation={variant.tilt} scale={0.985}>
        {variant.geometry.kind === "torusKnot" ? (
          <torusKnotGeometry args={variant.geometry.args} />
        ) : null}
        {variant.geometry.kind === "icosahedron" ? (
          <icosahedronGeometry args={variant.geometry.args} />
        ) : null}
        {variant.geometry.kind === "box" ? <boxGeometry args={variant.geometry.args} /> : null}
        {variant.geometry.kind === "torus" ? <torusGeometry args={variant.geometry.args} /> : null}
        {variant.geometry.kind === "dodecahedron" ? (
          <dodecahedronGeometry args={variant.geometry.args} />
        ) : null}
        {variant.geometry.kind === "octahedron" ? (
          <octahedronGeometry args={variant.geometry.args} />
        ) : null}
        {variant.geometry.kind === "capsule" ? (
          <capsuleGeometry args={variant.geometry.args} />
        ) : null}
        <meshStandardMaterial
          color={variant.color}
          emissive={variant.emissive}
          emissiveIntensity={0.05}
          roughness={0.55}
          metalness={0.25}
          transparent
          opacity={0.08}
        />
      </mesh>
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
          <Geometry variant={variant} />
        </group>
      </Canvas>
    </div>
  );
}
