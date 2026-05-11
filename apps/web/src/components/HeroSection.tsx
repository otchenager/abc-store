import { useEffect, useRef, useMemo, useState, Suspense, Component, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

class CanvasErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

// ─── Stars ───────────────────────────────────────────────────────────────────
const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  size: Math.random() * 2 + 0.6,
  top: Math.random() * 100,
  left: Math.random() * 100,
  opacity: Math.random() * 0.5 + 0.08,
  anim: `twinkle ${(Math.random() * 4 + 2).toFixed(1)}s ease-in-out infinite ${(Math.random() * 3).toFixed(1)}s`,
}))

const CSS = `
  @keyframes twinkle {
    0%,100% { opacity: var(--op); }
    50%      { opacity: calc(var(--op) * 0.3); }
  }

`

// ─── Logo texture for iPhone screen ──────────────────────────────────────────
function makeScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // Background
  ctx.fillStyle = '#05051a'
  ctx.fillRect(0, 0, 1024, 1024)

  // Purple glow
  const grad = ctx.createRadialGradient(512, 480, 60, 512, 480, 420)
  grad.addColorStop(0, 'rgba(100,66,255,0.25)')
  grad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1024, 1024)

  // "abc" white
  ctx.font = 'bold 200px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffffff'
  ctx.fillText('abc', 340, 460)

  // "store" purple
  ctx.fillStyle = '#6642ff'
  ctx.fillText('store', 730, 460)

  // Tagline
  ctx.font = '52px Arial'
  ctx.fillStyle = 'rgba(255,255,255,0.3)'
  ctx.fillText('ГАДЖЕТЫ ДЛЯ ЖИЗНИ', 512, 610)

  // Blue dot indicator
  ctx.beginPath()
  ctx.arc(512, 720, 18, 0, Math.PI * 2)
  ctx.fillStyle = '#5ac8fa'
  ctx.shadowColor = '#5ac8fa'
  ctx.shadowBlur = 20
  ctx.fill()

  return new THREE.CanvasTexture(canvas)
}

// ─── iPhone 3D Model ─────────────────────────────────────────────────────────
function IPhoneModel({ onLoaded }: { onLoaded: () => void }) {
  const { scene } = useGLTF('/models/iphone17pro.glb')
  const groupRef = useRef<THREE.Group>(null)
  const screenTex = useMemo(() => makeScreenTexture(), [])

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name: string = child.material?.name || ''
        if (
          name === 'Display_Blue' ||
          name === 'Display' ||
          name === 'Display_orange'
        ) {
          child.material = new THREE.MeshStandardMaterial({
            map: screenTex,
            emissive: new THREE.Color(0x1a0a4a),
            emissiveMap: screenTex,
            emissiveIntensity: 0.6,
            roughness: 0.05,
            metalness: 0.0,
          })
        }
      }
    })
    onLoaded()
  }, [scene, onLoaded])

  // Floating + slow rotation animation
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = Math.PI + 0.3 + Math.sin(t * 0.3) * 0.12
    groupRef.current.position.y = Math.sin(t * 0.7) * 0.06
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.08, Math.PI + 0.3, 0.05]} scale={0.22}>
      <primitive object={scene} />
    </group>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroSection() {
  const [modelLoaded, setModelLoaded] = useState(false)
  return (
    <>
      <style>{CSS}</style>

      <section style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#07070e',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Navbar */}
        <nav style={{
          position: 'relative', zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.2rem 2.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(7,7,14,0.6)',
        }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontWeight: 900, color: '#fff', fontSize: '1.4rem', letterSpacing: '-0.03em' }}>abc</span>
            <span style={{
              fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg,#6642ff 0%,#3c78ff 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>store</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {[{ label: 'Каталог', to: '/catalog' }, { label: 'Контакты', to: '/contacts' }].map(({ label, to }) => (
              <Link key={label} to={to} style={{ color: 'rgba(255,255,255,0.52)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.52)')}
              >{label}</Link>
            ))}
            <Link to="/catalog" style={{
              color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600,
              background: 'linear-gradient(135deg,#6642ff 0%,#3c78ff 100%)',
              padding: '0.5rem 1.25rem', borderRadius: '0.5rem',
            }}>Купить</Link>
          </div>
        </nav>

        {/* Stars */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {STARS.map(s => (
            <div key={s.id} style={{
              position: 'absolute', borderRadius: '50%', backgroundColor: '#fff',
              width: s.size + 'px', height: s.size + 'px',
              top: s.top + '%', left: s.left + '%',
              opacity: s.opacity, ['--op' as string]: s.opacity, animation: s.anim,
            }} />
          ))}
        </div>

        {/* Glow blobs */}
        {[
          { w: 720, h: 720, top: '-14%', right: '6%', color: 'rgba(100,66,255,0.16)', blur: 55 },
          { w: 480, h: 480, bottom: '4%', left: '2%', color: 'rgba(56,110,255,0.10)', blur: 60 },
          { w: 350, h: 350, top: '30%', right: '18%', color: 'rgba(0,180,255,0.08)', blur: 45 },
        ].map((b, i) => (
          <div key={i} style={{
            position: 'absolute', pointerEvents: 'none', zIndex: 0,
            width: b.w, height: b.h, borderRadius: '50%',
            background: `radial-gradient(ellipse,${b.color} 0%,transparent 68%)`,
            top: b.top, right: b.right, bottom: b.bottom, left: b.left,
            filter: `blur(${b.blur}px)`,
          }} />
        ))}

        {/* 3D Canvas */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '50%',
          height: '100%',
          zIndex: 2,
        }}>
          <CanvasErrorBoundary>
          {!modelLoaded && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                border: '2px solid rgba(100,66,255,0.15)',
                borderTop: '2px solid rgba(100,66,255,0.7)',
                animation: 'spin 1s linear infinite',
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}
          <Canvas
            camera={{ position: [0, 0, 5], fov: 42 }}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
            gl={{ alpha: true, antialias: true }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 5, 5]} intensity={2} color="#8899ff" />
            <directionalLight position={[-4, 2, 2]} intensity={1.2} color="#4466ff" />
            <directionalLight position={[0, -3, -5]} intensity={1.8} color="#ffffff" />
            <pointLight position={[-2, 2, 3]} intensity={3} color="#7755ff" />
            <Suspense fallback={null}>
              <IPhoneModel onLoaded={() => setModelLoaded(true)} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
          </CanvasErrorBoundary>
        </div>

        {/* Hero text */}
        <div style={{
          position: 'relative', zIndex: 5,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', flex: 1,
          paddingLeft: 'clamp(2rem, 6vw, 6rem)',
          paddingRight: '1rem',
          paddingTop: '2rem', paddingBottom: '2rem',
          maxWidth: '48%',
        }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', marginBottom: '1.8rem', width: 'fit-content' }}>
            <span style={{
              fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '0.32rem 0.9rem', borderRadius: '9999px',
              background: 'rgba(255,255,255,0.035)', backdropFilter: 'blur(8px)',
            }}>
              ● Официальный дилер · Москва
            </span>
          </div>

          {/* Logo */}
          <h1 style={{ margin: '0 0 0.7rem', lineHeight: 1 }}>
            <span style={{
              fontWeight: 900, color: '#fff',
              fontSize: 'clamp(2.8rem, 5.8vw, 5.5rem)',
              letterSpacing: '-0.035em', userSelect: 'none',
            }}>abc</span>
            <span style={{
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 5.8vw, 5.5rem)',
              letterSpacing: '-0.035em', userSelect: 'none',
              background: 'linear-gradient(135deg,#6642ff 0%,#3c78ff 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>store</span>
          </h1>

          {/* Tagline */}
          <p style={{ color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.8rem', margin: '0 0 0.9rem' }}>
            Гаджеты для жизни
          </p>

          {/* Product callout */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            margin: '0 0 1.2rem', padding: '0.5rem 1rem',
            borderRadius: '0.6rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            width: 'fit-content',
          }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#5ac8fa', display: 'inline-block', boxShadow: '0 0 8px #5ac8fa' }} />
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', fontWeight: 500 }}>
              iPhone 17 Pro Max — Blue Titanium
            </span>
          </div>

          {/* Description */}
          <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, maxWidth: '27rem', fontSize: 'clamp(0.92rem, 1.3vw, 1.08rem)', margin: '0 0 2.2rem' }}>
            iPhone, Ray-Ban Meta, MacBook, WHOOP — оригинальная техника с гарантией, доставкой по Москве и поддержкой 24/7.
          </p>

          {/* CTA */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
            <Link to="/catalog" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.65rem',
              fontWeight: 600, color: '#fff', borderRadius: '0.75rem',
              background: 'linear-gradient(135deg,#6642ff 0%,#3c78ff 100%)',
              padding: '0.82rem 1.85rem',
              boxShadow: '0 0 38px rgba(100,66,255,0.36)',
              fontSize: '0.98rem', textDecoration: 'none',
            }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 58px rgba(100,66,255,0.60)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 38px rgba(100,66,255,0.36)')}
            >
              Перейти в каталог <span>→</span>
            </Link>
            <Link to="/contacts" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontWeight: 500, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.93rem',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.88)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              Контакты <span style={{ color: 'rgba(255,255,255,0.25)' }}>↗</span>
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1.8rem',
            marginTop: '3.2rem', paddingTop: '1.6rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            {[['20+', 'Товаров'], ['1 год', 'Гарантия'], ['24/7', 'Поддержка'], ['0 ₽', 'Доставка']].map(([v, l]) => (
              <div key={l} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.15rem', lineHeight: 1 }}>{v}</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', marginTop: '0.2rem' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Drag hint */}
        <div style={{
          position: 'absolute', bottom: '1.6rem', right: '2rem',
          color: 'rgba(255,255,255,0.18)', fontSize: '0.68rem',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          userSelect: 'none', zIndex: 6,
        }}>
          Drag to rotate · Scroll to zoom
        </div>
      </section>
    </>
  )
}