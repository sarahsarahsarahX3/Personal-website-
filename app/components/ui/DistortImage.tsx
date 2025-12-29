"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Image as DreiImage } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/app/lib/utils";

const CustomMaterialString = `
  uniform float uHover;
  
  void main() {
    float time = uTime;
    vec2 uv = vUv;
    
    // Wave Effect
    float wave = sin(uv.y * 10.0 + time * 2.0) * uHover * 0.05;
    uv.x += wave;
    
    vec4 textureColor = texture2D(uTexture, uv);
    
    // RGB Shift
    float shift = uHover * 0.02;
    float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
    
    gl_FragColor = vec4(r, textureColor.g, b, textureColor.a);
    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }
`;

// To simplify, we will use Drei's <Image> but inject a custom shader via onBeforeCompile or just stick to
// a simpler approach: A custom ShaderMaterial on a plain plane that fills the view.

const DistortionShader = {
    uniforms: {
        uTexture: { value: null },
        uHover: { value: 0 },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) }
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Simple fluid distortion
      float noise = sin(uv.y * 10.0 + uTime) * uHover * 0.02;
      uv.x += noise;
      
      vec4 color = texture2D(uTexture, uv);
      
      // Chromatic aberration
      float shift = uHover * 0.015;
      vec4 r = texture2D(uTexture, uv + vec2(shift, 0.0));
      vec4 b = texture2D(uTexture, uv - vec2(shift, 0.0));
      
      gl_FragColor = vec4(r.r, color.g, b.b, 1.0);
    }
  `
};

function ShaderPlane({ src, isHovered }: { src: string; isHovered: boolean }) {
    const mesh = useRef<THREE.Mesh>(null);
    const texture = useTexture(src);
    const material = useRef<THREE.ShaderMaterial>(null);
    const { viewport } = useThree();

    useFrame((state) => {
        if (material.current) {
            material.current.uniforms.uHover.value = THREE.MathUtils.lerp(
                material.current.uniforms.uHover.value,
                isHovered ? 1 : 0,
                0.1
            );
            material.current.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                ref={material}
                args={[DistortionShader]}
                uniforms-uTexture-value={texture}
                toneMapped={false}
            />
        </mesh>
    );
}

export function DistortImage({ src, alt, className, fill }: { src: string; alt?: string; className?: string; fill?: boolean }) {
    const [hover, setHover] = useState(false);

    return (
        <div
            className={cn("relative overflow-hidden bg-surface-secondary", className)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ width: '100%', height: '100%' }} // Ensure it accepts parent dimensions
        >
            <Suspense fallback={<div className="w-full h-full bg-surface-secondary" />}>
                <Canvas
                    className="w-full h-full block"
                    camera={{ fov: 75, position: [0, 0, 5], near: 0.1, far: 100 }}
                    // IMPORTANT: Resize logic to fit container
                    resize={{ scroll: false }} // Fix: Remove polyfill: true which was causing type error, use simple options
                >
                    {/* We move camera to fit plane exactly? Or simpler: scale plane to viewport */}
                    <ShaderPlane src={src} isHovered={hover} />
                </Canvas>
            </Suspense>
        </div>
    );
}
