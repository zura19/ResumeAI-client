"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

export type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

export interface LightRaysProps {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [
        Number.parseInt(m[1], 16) / 255,
        Number.parseInt(m[2], 16) / 255,
        Number.parseInt(m[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const getAnchorAndDir = (
  origin: RaysOrigin,
  w: number,
  h: number
): { anchor: [number, number]; dir: [number, number] } => {
  const outside = 0.2;
  switch (origin) {
    case "top-left":
      return { anchor: [0, -outside * h], dir: [0, 1] };
    case "top-right":
      return { anchor: [w, -outside * h], dir: [0, 1] };
    case "left":
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case "bottom-left":
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case "bottom-center":
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case "bottom-right":
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default:
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
};

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `
precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 rayPos;
uniform vec2 rayDir;
uniform vec3 raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2 mousePos;
uniform float mouseInfluence;
varying vec2 vUv;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float distance = length(sourceToCoord);
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);
  float spreadFactor = pow(max(cosAngle, 0.0), 1.8 / max(lightSpread, 0.001));
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? 0.9 + 0.1 * sin(iTime * speed) : 1.0;
  float baseStrength = raysSpeed > 0.0 ? clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)), 0.0, 1.0) : 1.0;
  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
  vec2 finalRayDir = mouseInfluence > 0.0 ? 
    normalize(mix(rayDir, normalize(mousePos * iResolution.xy - rayPos), mouseInfluence)) : rayDir;
  
  vec4 rays = vec4(1.0) * (
    rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed) * 1.0 +
    rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed) * 0.8
  );
  
  float brightness = 1.0 - (coord.y / iResolution.y);
  rays.r *= 0.1 + brightness * 0.8;
  rays.g *= 0.3 + brightness * 0.6;
  rays.b *= 0.5 + brightness * 0.5;
  
  if (saturation != 1.0) {
    float gray = dot(rays.rgb, vec3(0.299, 0.587, 0.114));
    rays.rgb = mix(vec3(gray), rays.rgb, saturation);
  }
  
  gl_FragColor = vec4(rays.rgb * raysColor, rays.a);
}`;

export default function LightRays({
  raysOrigin = "top-center",
  raysColor = "#ffffff",
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.1,
  className = "",
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glContextRef = useRef<{
    renderer: Renderer;
    mesh: Mesh;
    uniforms: Record<string, { value: number | number[] }>;
    rafId: number | null;
    mouse: { x: number; y: number; smoothX: number; smoothY: number };
  } | null>(null);

  // Single useEffect to initialize WebGL and handle all updates
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });
    const gl = renderer.gl;

    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.appendChild(gl.canvas);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      rayPos: { value: [0, 0] },
      rayDir: { value: [0, 1] },
      raysColor: { value: hexToRgb(raysColor) },
      raysSpeed: { value: raysSpeed },
      lightSpread: { value: lightSpread },
      rayLength: { value: rayLength },
      pulsating: { value: pulsating ? 1.0 : 0.0 },
      fadeDistance: { value: fadeDistance },
      saturation: { value: saturation },
      mousePos: { value: [0.5, 0.5] },
      mouseInfluence: { value: mouseInfluence },
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms,
    });
    const mesh = new Mesh(gl, { geometry, program });

    const updateSize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      const dpr = renderer.dpr;
      const w = clientWidth * dpr;
      const h = clientHeight * dpr;
      uniforms.iResolution.value = [w, h];
      const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);
      uniforms.rayPos.value = anchor;
      uniforms.rayDir.value = dir;
    };

    const mouse = { x: 0.5, y: 0.5, smoothX: 0.5, smoothY: 0.5 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
    };

    const handleResize = () => updateSize();

    const animate = (t: number) => {
      uniforms.iTime.value = t * 0.001;

      if (followMouse && mouseInfluence > 0.0) {
        const smoothing = 0.92;
        mouse.smoothX = mouse.smoothX * smoothing + mouse.x * (1 - smoothing);
        mouse.smoothY = mouse.smoothY * smoothing + mouse.y * (1 - smoothing);
        uniforms.mousePos.value = [mouse.smoothX, mouse.smoothY];
      }

      renderer.render({ scene: mesh });
      glContextRef.current!.rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    if (followMouse) window.addEventListener("mousemove", handleMouseMove);

    updateSize();
    glContextRef.current = {
      renderer,
      mesh,
      uniforms,
      rafId: requestAnimationFrame(animate),
      mouse,
    };

    return () => {
      const ctx = glContextRef.current;
      if (ctx?.rafId) cancelAnimationFrame(ctx.rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      const loseContextExt = gl.getExtension("WEBGL_lose_context");
      if (loseContextExt) loseContextExt.loseContext();
      if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);

      glContextRef.current = null;
    };
  }, []); // Only initialize once

  // Separate effect for prop updates - just update uniforms, don't recreate WebGL
  useEffect(() => {
    const ctx = glContextRef.current;
    if (!ctx || !containerRef.current) return;

    const { uniforms, renderer } = ctx;
    const container = containerRef.current;

    uniforms.raysColor.value = hexToRgb(raysColor);
    uniforms.raysSpeed.value = raysSpeed;
    uniforms.lightSpread.value = lightSpread;
    uniforms.rayLength.value = rayLength;
    uniforms.pulsating.value = pulsating ? 1.0 : 0.0;
    uniforms.fadeDistance.value = fadeDistance;
    uniforms.saturation.value = saturation;
    uniforms.mouseInfluence.value = mouseInfluence;

    const { clientWidth, clientHeight } = container;
    const dpr = renderer.dpr;
    const { anchor, dir } = getAnchorAndDir(
      raysOrigin,
      clientWidth * dpr,
      clientHeight * dpr
    );
    uniforms.rayPos.value = anchor;
    uniforms.rayDir.value = dir;
  }, [
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    mouseInfluence,
    raysOrigin,
  ]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full pointer-events-none overflow-hidden ${className}`.trim()}
    />
  );
}
