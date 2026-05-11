import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductModel {
  name: string
  build: (scene: THREE.Scene) => THREE.Group
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function roundedBoxGeometry(w: number, h: number, d: number, r: number, segs = 3) {
  const geo = new THREE.BoxGeometry(w, h, d, segs, segs, segs)
  const pos = geo.attributes.position
  const v = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i)
    v.x = Math.sign(v.x) * Math.min(Math.abs(v.x), w / 2 - r) + Math.sign(v.x) * r * (Math.abs(v.x) > w / 2 - r * 2 ? 1 : 0)
    v.y = Math.sign(v.y) * Math.min(Math.abs(v.y), h / 2 - r) + Math.sign(v.y) * r * (Math.abs(v.y) > h / 2 - r * 2 ? 1 : 0)
    v.z = Math.sign(v.z) * Math.min(Math.abs(v.z), d / 2 - r) + Math.sign(v.z) * r * (Math.abs(v.z) > d / 2 - r * 2 ? 1 : 0)
    pos.setXYZ(i, v.x, v.y, v.z)
  }
  geo.computeVertexNormals()
  return geo
}

// ─── Material presets ─────────────────────────────────────────────────────────

const matPhone = () => new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.9, roughness: 0.15 })
const matGlass = () => new THREE.MeshStandardMaterial({ color: 0x88aacc, metalness: 0.1, roughness: 0.05, transparent: true, opacity: 0.35 })
const matScreen = () => new THREE.MeshStandardMaterial({ color: 0x050510, metalness: 0.0, roughness: 0.6, emissive: 0x1133ff, emissiveIntensity: 0.15 })
const matAluminium = () => new THREE.MeshStandardMaterial({ color: 0xd4d0c8, metalness: 0.8, roughness: 0.25 })
const matRubber = () => new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.0, roughness: 0.9 })
const matLens = () => new THREE.MeshStandardMaterial({ color: 0x334455, metalness: 0.05, roughness: 0.05, transparent: true, opacity: 0.7 })
const matSilicone = () => new THREE.MeshStandardMaterial({ color: 0x1a1a22, metalness: 0.0, roughness: 0.85 })
const matSensor = () => new THREE.MeshStandardMaterial({ color: 0x0d1117, metalness: 0.7, roughness: 0.2, emissive: 0x00ff88, emissiveIntensity: 0.1 })

// ─── Product builders ─────────────────────────────────────────────────────────

function buildIPhone(): THREE.Group {
  const g = new THREE.Group()

  // Body
  const body = new THREE.Mesh(roundedBoxGeometry(0.75, 1.55, 0.08, 0.05), matPhone())
  g.add(body)

  // Screen bezel inset
  const screenBg = new THREE.Mesh(new THREE.PlaneGeometry(0.66, 1.42), matScreen())
  screenBg.position.set(0, 0.01, 0.042)
  g.add(screenBg)

  // Glass front
  const glass = new THREE.Mesh(roundedBoxGeometry(0.74, 1.54, 0.005, 0.045), matGlass())
  glass.position.set(0, 0, 0.042)
  g.add(glass)

  // Triple camera island
  const islandBase = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.02), matPhone())
  islandBase.position.set(-0.16, 0.52, 0.055)
  g.add(islandBase)

  for (let i = 0; i < 3; i++) {
    const cx = i % 2 === 0 ? -0.06 : 0.06
    const cy = i < 2 ? 0.06 : -0.06
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.015, 24), matLens())
    lens.rotation.x = Math.PI / 2
    lens.position.set(-0.16 + cx, 0.52 + cy, 0.068)
    g.add(lens)
    const lensRing = new THREE.Mesh(new THREE.TorusGeometry(0.048, 0.006, 12, 24), matPhone())
    lensRing.position.copy(lens.position)
    lensRing.rotation.x = Math.PI / 2
    g.add(lensRing)
  }

  // Dynamic Island
  const island = new THREE.Mesh(new THREE.CapsuleGeometry(0.025, 0.08, 8, 16), matPhone())
  island.position.set(0, 0.67, 0.043)
  island.rotation.z = Math.PI / 2
  g.add(island)

  // Side buttons
  const vol1 = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.08, 0.04), matPhone())
  vol1.position.set(-0.38, 0.2, 0)
  g.add(vol1)
  const vol2 = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.08, 0.04), matPhone())
  vol2.position.set(-0.38, 0.06, 0)
  g.add(vol2)
  const power = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.12, 0.04), matPhone())
  power.position.set(0.38, 0.15, 0)
  g.add(power)

  return g
}

function buildRayBan(): THREE.Group {
  const g = new THREE.Group()

  // Left lens
  const lensL = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.03, 12, 40), matRubber())
  lensL.position.set(-0.3, 0, 0)
  g.add(lensL)
  const lensLFill = new THREE.Mesh(new THREE.CircleGeometry(0.19, 40), matLens())
  lensLFill.position.set(-0.3, 0, 0.01)
  g.add(lensLFill)

  // Right lens
  const lensR = lensL.clone()
  lensR.position.set(0.3, 0, 0)
  g.add(lensR)
  const lensRFill = lensLFill.clone()
  lensRFill.position.set(0.3, 0, 0.01)
  g.add(lensRFill)

  // Bridge
  const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.14, 12), matRubber())
  bridge.rotation.z = Math.PI / 2
  bridge.position.set(0, 0.04, 0)
  g.add(bridge)

  // Left arm
  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.025, 0.025), matRubber())
  armL.position.set(-0.62, 0, -0.15)
  armL.rotation.y = 0.15
  g.add(armL)
  // Right arm
  const armR = armL.clone()
  armR.position.set(0.62, 0, -0.15)
  armR.rotation.y = -0.15
  g.add(armR)

  // Speaker grille (Ray-Ban Meta)
  const grilleMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.3, roughness: 0.7 })
  for (let i = 0; i < 4; i++) {
    const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.01, 8), grilleMat)
    dot.rotation.x = Math.PI / 2
    dot.position.set(-0.85 + i * 0.015, 0, -0.01)
    g.add(dot)
  }

  // Nose pads
  const noseL = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), matRubber())
  noseL.position.set(-0.07, -0.09, 0.04)
  g.add(noseL)
  const noseR = noseL.clone()
  noseR.position.set(0.07, -0.09, 0.04)
  g.add(noseR)

  g.scale.set(1.1, 1.1, 1.1)
  return g
}

function buildWhoop(): THREE.Group {
  const g = new THREE.Group()

  // Band (torus-like arc segments)
  const bandMat = matSilicone()
  const bandOuter = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.1, 16, 80, Math.PI * 1.6), bandMat)
  bandOuter.rotation.x = Math.PI / 2
  bandOuter.position.set(0, 0, 0)
  g.add(bandOuter)

  // Sensor pod
  const pod = new THREE.Mesh(roundedBoxGeometry(0.5, 0.28, 0.14, 0.04), matSilicone())
  pod.position.set(0, -0.45, 0)
  g.add(pod)

  // Screen
  const podScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.16), matScreen())
  podScreen.position.set(0, -0.45, 0.076)
  g.add(podScreen)

  // LED strip
  const ledMat = new THREE.MeshStandardMaterial({ color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 0.8, metalness: 0, roughness: 0.5 })
  for (let i = 0; i < 4; i++) {
    const led = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.01, 8), ledMat)
    led.rotation.x = Math.PI / 2
    led.position.set(-0.09 + i * 0.06, -0.45, 0.079)
    g.add(led)
  }

  // Sensor bumps (bottom of pod)
  for (let i = 0; i < 3; i++) {
    const bump = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.02, 12), matSensor())
    bump.rotation.x = Math.PI / 2
    bump.position.set(-0.1 + i * 0.1, -0.45, -0.078)
    g.add(bump)
  }

  g.scale.set(0.9, 0.9, 0.9)
  return g
}

function buildMacBook(): THREE.Group {
  const g = new THREE.Group()
  const hinge = -0.05

  // ── Base ──────────────────────────────────────────────────────────────────
  const base = new THREE.Mesh(roundedBoxGeometry(1.6, 0.1, 1.1, 0.04), matAluminium())
  base.position.set(0, hinge - 0.05, 0)
  g.add(base)

  // Trackpad
  const trackpad = new THREE.Mesh(roundedBoxGeometry(0.6, 0.01, 0.38, 0.02), matAluminium())
  trackpad.position.set(0, hinge, 0.18)
  g.add(trackpad)
  const trackpadBorder = new THREE.Mesh(roundedBoxGeometry(0.62, 0.01, 0.40, 0.02), new THREE.MeshStandardMaterial({ color: 0xb0a8a0, metalness: 0.7, roughness: 0.3 }))
  trackpadBorder.position.set(0, hinge - 0.002, 0.18)
  g.add(trackpadBorder)

  // Keyboard keys (simplified grid)
  const keyMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.4, roughness: 0.7 })
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 12; col++) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(0.105, 0.01, 0.09), keyMat)
      key.position.set(-0.65 + col * 0.12, hinge + 0.01, -0.12 + row * 0.105)
      g.add(key)
    }
  }

  // ── Lid ──────────────────────────────────────────────────────────────────
  const lidAngle = -Math.PI * 0.42

  const lid = new THREE.Group()

  const lidBody = new THREE.Mesh(roundedBoxGeometry(1.6, 0.06, 1.1, 0.04), matAluminium())
  lidBody.position.set(0, 0, 0)
  lid.add(lidBody)

  // Screen
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.42, 0.92), matScreen())
  screen.position.set(0, 0.034, 0.04)
  screen.rotation.x = -Math.PI / 2
  lid.add(screen)

  // Notch
  const notch = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.034, 0.015), new THREE.MeshStandardMaterial({ color: 0x0a0a0a, metalness: 0, roughness: 1 }))
  notch.position.set(0, 0.034, -0.455)
  lid.add(notch)

  // Apple logo (simplified – a circle indentation)
  const logo = new THREE.Mesh(new THREE.CircleGeometry(0.08, 32), new THREE.MeshStandardMaterial({ color: 0xc8c4bc, metalness: 0.9, roughness: 0.1 }))
  logo.position.set(0, -0.031, 0)
  logo.rotation.x = Math.PI / 2
  lid.add(logo)

  lid.rotation.x = lidAngle
  lid.position.set(0, hinge + 0.02, -0.52)
  g.add(lid)

  g.scale.set(0.75, 0.75, 0.75)
  return g
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // ── Scene setup ────────────────────────────────────────────────────────
    const W = canvasRef.current.offsetWidth
    const H = canvasRef.current.offsetHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    canvasRef.current.appendChild(renderer.domElement)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.set(0, 0, 6)

    // ── Lighting ───────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0x8899ff, 2.5)
    keyLight.position.set(3, 5, 5)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x4466ff, 1.2)
    fillLight.position.set(-4, 2, 2)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8)
    rimLight.position.set(0, -3, -5)
    scene.add(rimLight)

    const purpleLight = new THREE.PointLight(0x7755ff, 3, 8)
    purpleLight.position.set(-2, 2, 3)
    scene.add(purpleLight)

    // ── Products ───────────────────────────────────────────────────────────
    const products: ProductModel[] = [
      { name: 'iPhone 17 Pro Max', build: buildIPhone },
      { name: 'Ray-Ban Meta', build: buildRayBan },
      { name: 'WHOOP', build: buildWhoop },
      { name: 'MacBook', build: buildMacBook },
    ]

    // Shuffle order
    const shuffled = [...products].sort(() => Math.random() - 0.5)

    // Build all, hide non-active
    const groups = shuffled.map(p => {
      const grp = p.build(scene)
      grp.visible = false
      scene.add(grp)
      return grp
    })

    // Transition state
    let current = 0
    let next = 1
    let phase: 'show' | 'hold' | 'swap' = 'show'
    let phaseTimer = 0

    const HOLD_TIME = 3.5   // seconds to display each model
    const SWAP_TIME = 0.6   // fade/slide out duration
    const SHOW_TIME = 0.8   // fade/slide in duration

    // Start first model
    groups[current].visible = true
    groups[current].position.set(2.2, -0.3, 0)
    groups[current].rotation.set(0.1, -0.3, 0.05)

    // Target pose per product (visual sweetspot)
    const targetPoses = [
      { pos: new THREE.Vector3(2.0, -0.2, 0), rot: new THREE.Euler(0.12, -0.4, 0.06) },   // iPhone
      { pos: new THREE.Vector3(2.1, 0.1, 0), rot: new THREE.Euler(0.05, -0.3, 0.02) },    // RayBan
      { pos: new THREE.Vector3(1.9, -0.1, 0), rot: new THREE.Euler(0.1, -0.35, 0.08) },   // WHOOP
      { pos: new THREE.Vector3(2.3, -0.4, 0), rot: new THREE.Euler(0.3, -0.5, 0.1) },     // MacBook
    ]

    // Slide-in entry position (off to the right)
    const offScreen = new THREE.Vector3(5, -0.5, 0)

    // Mouse parallax
    let mouseX = 0
    let mouseY = 0
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!canvasRef.current) return
      const w = canvasRef.current.offsetWidth
      const h = canvasRef.current.offsetHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // ── Animate ────────────────────────────────────────────────────────────
    let lastTime = performance.now()
    let rafId = 0

    function animate() {
      rafId = requestAnimationFrame(animate)
      const now = performance.now()
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      phaseTimer += dt

      const cur = groups[current]
      const nxt = groups[next]
      const tPose = targetPoses[current % targetPoses.length]

      if (phase === 'show') {
        // Slide in from right
        const t = Math.min(phaseTimer / SHOW_TIME, 1)
        const ease = 1 - Math.pow(1 - t, 3)
        cur.position.lerpVectors(offScreen, tPose.pos, ease)
        cur.rotation.x = lerp(0.5, tPose.rot.x, ease)
        cur.rotation.y = lerp(-0.8, tPose.rot.y, ease)
        cur.rotation.z = lerp(0.2, tPose.rot.z, ease)
        if (t >= 1) { phase = 'hold'; phaseTimer = 0 }
      }

      else if (phase === 'hold') {
        // Gentle float + parallax
        const floatY = Math.sin(now * 0.001) * 0.06
        cur.position.y = tPose.pos.y + floatY
        cur.rotation.x = tPose.rot.x + mouseY * 0.08
        cur.rotation.y = tPose.rot.y + mouseX * 0.06
        if (phaseTimer >= HOLD_TIME) {
          // Prepare next
          nxt.visible = true
          nxt.position.copy(offScreen)
          phase = 'swap'
          phaseTimer = 0
        }
      }

      else if (phase === 'swap') {
        // Slide current out left while next slides in from right
        const t = Math.min(phaseTimer / SWAP_TIME, 1)
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // ease in-out

        // Exit current to left
        cur.position.x = lerp(tPose.pos.x, -5, ease)
        cur.position.y = lerp(tPose.pos.y, tPose.pos.y - 0.3, ease)

        const nPose = targetPoses[next % targetPoses.length]
        // Enter next from right
        nxt.position.lerpVectors(offScreen, nPose.pos, ease)
        nxt.rotation.x = lerp(0.4, nPose.rot.x, ease)
        nxt.rotation.y = lerp(-0.7, nPose.rot.y, ease)
        nxt.rotation.z = lerp(0.15, nPose.rot.z, ease)

        if (t >= 1) {
          cur.visible = false
          current = next
          next = (next + 1) % groups.length
          phase = 'hold'
          phaseTimer = 0
        }
      }

      // Slow base spin on visible model
      groups[current].rotation.y += 0.0025

      // Subtle purple light pulse
      purpleLight.intensity = 3 + Math.sin(now * 0.0015) * 0.8
      purpleLight.position.x = -2 + Math.sin(now * 0.0008) * 0.5

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      canvasRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <section className="relative w-full min-h-screen bg-[#0a0a0f] overflow-hidden flex flex-col">

      {/* ── Stars background ───────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>

      {/* ── Purple glow blobs ──────────────────────────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(99,66,255,0.18) 0%, transparent 70%)',
          top: '-10%',
          right: '10%',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(60,120,255,0.12) 0%, transparent 70%)',
          bottom: '5%',
          left: '5%',
          filter: 'blur(50px)',
        }}
      />

      {/* ── 3D Canvas (right half) ─────────────────────────────────────────── */}
      <div
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      />

      {/* ── Text content (left half, above canvas) ────────────────────────── */}
      <div
        className="relative flex flex-col justify-center h-screen px-8 md:px-16 lg:px-24 max-w-[52%]"
        style={{ zIndex: 2 }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 w-fit">
          <span
            className="text-xs font-medium tracking-widest uppercase text-white/60 border border-white/10 px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}
          >
            ● Официальный дилер · Москва
          </span>
        </div>

        {/* Logo */}
        <h1 className="mb-4">
          <span
            className="font-black text-white select-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            abc
          </span>
          <span
            className="font-black select-none"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #6642ff 0%, #3c78ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            store
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="text-white/40 uppercase tracking-[0.25em] text-sm mb-4"
        >
          Гаджеты для жизни
        </p>

        {/* Value prop */}
        <p
          className="text-white/70 mb-10 leading-relaxed max-w-md"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
        >
          iPhone, Ray-Ban Meta, MacBook, WHOOP — оригинальная техника с гарантией,
          доставкой по Москве и поддержкой 24/7.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/catalog"
            className="group flex items-center gap-3 font-semibold text-white rounded-xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #6642ff 0%, #3c78ff 100%)',
              padding: '0.85rem 2rem',
              boxShadow: '0 0 40px rgba(100,66,255,0.4)',
              fontSize: '1rem',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 60px rgba(100,66,255,0.65)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(100,66,255,0.4)')}
          >
            Перейти в каталог
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>

          <a
            href="/contacts"
            className="flex items-center gap-2 font-medium text-white/60 hover:text-white/90 transition-colors duration-200"
            style={{ fontSize: '0.95rem' }}
          >
            Контакты
            <span className="text-white/30">↗</span>
          </a>
        </div>

        {/* Stats bar */}
        <div
          className="flex items-center gap-8 mt-14 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          {[
            { value: '20+', label: 'Товаров' },
            { value: '1 год', label: 'Гарантия' },
            { value: '24/7', label: 'Поддержка' },
            { value: '0 ₽', label: 'Доставка' },
          ].map(s => (
            <div key={s.label} className="flex flex-col">
              <span className="text-white font-bold" style={{ fontSize: '1.25rem', lineHeight: 1 }}>{s.value}</span>
              <span className="text-white/35 text-xs mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Model label (bottom right) ─────────────────────────────────────── */}
      <div
        className="absolute bottom-8 right-8 text-white/20 text-xs tracking-widest uppercase select-none"
        style={{ zIndex: 2 }}
      >
        3D Preview
      </div>
    </section>
  )
}