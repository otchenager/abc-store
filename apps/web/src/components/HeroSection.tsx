// ─── Stars (stable, no re-randomise on render) ───────────────────────────────
const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  size: Math.random() * 2 + 0.6,
  top: Math.random() * 100,
  left: Math.random() * 100,
  opacity: Math.random() * 0.5 + 0.08,
  anim: `twinkle ${(Math.random() * 4 + 2).toFixed(1)}s ease-in-out infinite ${(Math.random() * 3).toFixed(1)}s`,
}))

// Sketchfab embed — iPhone 17 Pro (transparent bg, dark theme, auto-spin)
const MODEL_URL =
  'https://sketchfab.com/models/60600f1e4ba94fc6ac592b2f72651c65/embed' +
  '?autospin=0.25&autostart=1&preload=1&ui_theme=dark' +
  '&ui_infos=0&ui_controls=0&ui_stop=0&ui_hint=0' +
  '&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0' +
  '&ui_fullscreen=0&ui_annotations=0&ui_watermark=0' +
  '&transparent=1&dnt=1'

export default function HeroSection() {
  return (
    <>
      {/* Keyframe for star twinkle */}
      <style>{`
        @keyframes twinkle {
          0%,100% { opacity: var(--op); }
          50%      { opacity: calc(var(--op) * 0.3); }
        }
      `}</style>

      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#07070e',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Navbar ───────────────────────────────────────────────────────── */}
        <nav
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.2rem 2.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(16px)',
            backgroundColor: 'rgba(7,7,14,0.6)',
          }}
        >
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontWeight: 900, color: '#fff', fontSize: '1.4rem', letterSpacing: '-0.03em' }}>abc</span>
            <span style={{
              fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg,#6642ff 0%,#3c78ff 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>store</span>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {[{ label: 'Каталог', href: '/catalog' }, { label: 'Контакты', href: '/contacts' }].map(({ label, href }) => (
              <a key={label} href={href}
                style={{ color: 'rgba(255,255,255,0.52)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.52)')}
              >{label}</a>
            ))}
            <a href="/catalog" style={{
              color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600,
              background: 'linear-gradient(135deg,#6642ff 0%,#3c78ff 100%)',
              padding: '0.5rem 1.25rem', borderRadius: '0.5rem',
            }}>Купить</a>
          </div>
        </nav>

        {/* ── Stars ────────────────────────────────────────────────────────── */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {STARS.map(s => (
            <div key={s.id} style={{
              position: 'absolute',
              borderRadius: '50%',
              backgroundColor: '#fff',
              width: s.size + 'px',
              height: s.size + 'px',
              top: s.top + '%',
              left: s.left + '%',
              opacity: s.opacity,
              ['--op' as string]: s.opacity,
              animation: s.anim,
            }} />
          ))}
        </div>

        {/* ── Glow blobs ───────────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', pointerEvents: 'none', zIndex: 0,
          width: 720, height: 720, borderRadius: '50%',
          background: 'radial-gradient(ellipse,rgba(100,66,255,0.16) 0%,transparent 68%)',
          top: '-14%', right: '6%', filter: 'blur(55px)',
        }} />
        <div style={{
          position: 'absolute', pointerEvents: 'none', zIndex: 0,
          width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(ellipse,rgba(56,110,255,0.10) 0%,transparent 68%)',
          bottom: '4%', left: '2%', filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', pointerEvents: 'none', zIndex: 0,
          width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(ellipse,rgba(0,180,255,0.08) 0%,transparent 68%)',
          top: '30%', right: '18%', filter: 'blur(45px)',
        }} />

        {/* ── Sketchfab 3D Model ───────────────────────────────────────────── */}
        <iframe
          src={MODEL_URL}
          title="iPhone 17 Pro 3D Model"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '48%',
            height: '100%',
            border: 'none',
            zIndex: 2,
            background: 'transparent',
          }}
        />

        {/* ── Hero text ────────────────────────────────────────────────────── */}
        <div style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          paddingLeft: 'clamp(2rem, 6vw, 6rem)',
          paddingRight: '1rem',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          maxWidth: '48%',
        }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '1.8rem', width: 'fit-content' }}>
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
              letterSpacing: '-0.035em', lineHeight: 1, userSelect: 'none',
            }}>abc</span>
            <span style={{
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 5.8vw, 5.5rem)',
              letterSpacing: '-0.035em', lineHeight: 1, userSelect: 'none',
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
            margin: '0 0 1.2rem',
            padding: '0.5rem 1rem',
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
            <a href="/catalog"
              style={{
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
            </a>
            <a href="/contacts"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 500, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.93rem' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.88)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              Контакты <span style={{ color: 'rgba(255,255,255,0.25)' }}>↗</span>
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1.8rem',
            marginTop: '3.2rem', paddingTop: '1.6rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            {[['20+','Товаров'],['1 год','Гарантия'],['24/7','Поддержка'],['0 ₽','Доставка']].map(([v, l]) => (
              <div key={l} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.15rem', lineHeight: 1 }}>{v}</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', marginTop: '0.2rem' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Drag hint ────────────────────────────────────────────────────── */}
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
