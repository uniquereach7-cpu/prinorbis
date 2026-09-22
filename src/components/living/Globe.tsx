"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { mulberry32 } from "@/lib/random";

/*
 * Orbis: the world as a living system. Root veins grow across a sphere from
 * one lime first point, pulses travel along them, and the globe turns slowly
 * and leans toward the pointer. Plain three.js, no scene graph library.
 */

const R = 1.6;

function randomWalks(rng: () => number) {
  const start = new THREE.Vector3(0.35, 0.55, 0.76).normalize();
  const walks: THREE.Vector3[][] = [];
  const stack: { p: THREE.Vector3; dir: THREE.Vector3; life: number; depth: number }[] = [];

  for (let k = 0; k < 7; k++) {
    const tangent = new THREE.Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).cross(start).normalize();
    stack.push({ p: start.clone(), dir: tangent, life: 70 + rng() * 50, depth: 0 });
  }

  while (stack.length && walks.length < 220) {
    const b = stack.pop()!;
    const pts = [b.p.clone().multiplyScalar(R * 1.004)];
    let p = b.p.clone();
    const dir = b.dir.clone();
    for (let s = 0; s < b.life; s++) {
      const jitter = new THREE.Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).multiplyScalar(0.35);
      dir.add(jitter).sub(p.clone().multiplyScalar(dir.dot(p))).normalize();
      p = p.clone().add(dir.clone().multiplyScalar(0.018)).normalize();
      pts.push(p.clone().multiplyScalar(R * 1.004));
      if (b.depth < 4 && rng() < 0.035) {
        const side = new THREE.Vector3().crossVectors(p, dir).multiplyScalar(rng() < 0.5 ? -1 : 1);
        stack.push({ p: p.clone(), dir: dir.clone().add(side).normalize(), life: b.life * (0.45 + rng() * 0.3), depth: b.depth + 1 });
      }
    }
    walks.push(pts);
  }
  return { walks, start };
}

export default function Globe({ className = "" }: { className?: string }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rng = mulberry32(2026);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.domElement.style.display = "block";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0, 7);

    const world = new THREE.Group();
    world.rotation.x = 0.28;
    scene.add(world);

    // Dust of the world: points on a Fibonacci sphere.
    const N = 1400;
    const dots = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = Math.PI * (3 - Math.sqrt(5)) * i;
      dots.set([Math.cos(t) * r * R, y * R, Math.sin(t) * r * R], i * 3);
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dots, 3));
    const dotMat = new THREE.PointsMaterial({ color: 0x8fae96, size: 0.018, transparent: true, opacity: 0.55, depthWrite: false });
    world.add(new THREE.Points(dotGeo, dotMat));

    // A faint body so the far side reads as behind.
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(R * 0.985, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x0b2219, transparent: true, opacity: 0.82 }),
    );
    world.add(body);

    // Root veins.
    const { walks, start } = randomWalks(rng);
    const veinMat = new THREE.LineBasicMaterial({ color: 0xb7cdb9, transparent: true, opacity: 0.75 });
    const limeMat = new THREE.LineBasicMaterial({ color: 0xc8f03c, transparent: true, opacity: 0.55 });
    const veins = walks.map((pts, i) => {
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      geo.setDrawRange(0, reduce ? pts.length : 0);
      const line = new THREE.Line(geo, i % 4 === 0 ? limeMat : veinMat);
      world.add(line);
      return { line, geo, pts, born: i * 0.035 };
    });

    // The first point.
    const glowTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d")!;
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(200,240,60,1)");
      grad.addColorStop(0.35, "rgba(200,240,60,0.5)");
      grad.addColorStop(1, "rgba(200,240,60,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();
    const seed = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, depthWrite: false, transparent: true }));
    seed.position.copy(start.clone().multiplyScalar(R * 1.01));
    seed.scale.setScalar(0.42);
    world.add(seed);

    // Pulses travelling along veins.
    const pulses = Array.from({ length: 16 }, (_, i) => {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, depthWrite: false, transparent: true }));
      s.scale.setScalar(0.12);
      world.add(s);
      return { s, vein: veins[(i * 7) % veins.length], t: rng() };
    });

    // Orbit ring.
    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(R * 1.45, 0.0035, 8, 200),
      new THREE.MeshBasicMaterial({ color: 0x8fae96, transparent: true, opacity: 0.35 }),
    );
    orbit.rotation.x = Math.PI / 2.3;
    orbit.rotation.y = 0.35;
    scene.add(orbit);

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = `${w}px`;
      renderer.domElement.style.height = `${h}px`;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      target.y = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      world.rotation.y = t * 0.08 + target.x;
      world.rotation.x += (0.28 + target.y - world.rotation.x) * 0.04;
      orbit.rotation.z = t * 0.05;
      for (const v of veins) {
        const grown = Math.min(1, Math.max(0, (t - v.born) / 2.2));
        v.geo.setDrawRange(0, Math.floor(v.pts.length * grown));
      }
      seed.scale.setScalar(0.42 + Math.sin(t * 2.2) * 0.05);
      for (const p of pulses) {
        p.t += 0.004;
        if (p.t > 1) {
          p.t = 0;
          p.vein = veins[Math.floor(Math.random() * veins.length)];
        }
        const idx = Math.floor(p.t * (p.vein.pts.length - 1));
        p.s.position.copy(p.vein.pts[idx]);
        (p.s.material as THREE.SpriteMaterial).opacity = t > 2.5 ? Math.sin(p.t * Math.PI) : 0;
      }
      renderer.render(scene, camera);
    };

    if (reduce) {
      world.rotation.y = 0.6;
      pulses.forEach((p) => (p.s.visible = false));
      renderer.render(scene, camera);
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      glowTex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className={className || "relative size-full"} aria-hidden />;
}
