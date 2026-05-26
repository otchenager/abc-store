import { useState } from 'react'
import { Link } from 'react-router-dom'

const LINKS = [
  { label: 'Каталог', to: '/catalog' },
  { label: 'Контакты', to: '/contacts' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <style>{`
        .abc-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem 2.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          backdrop-filter: blur(16px);
          background: rgba(7,7,14,0.88);
        }
        .abc-nav-links { display: flex; align-items: center; gap: 2rem; }
        .abc-nav-link {
          color: rgba(255,255,255,0.52);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .abc-nav-link:hover { color: #fff; }
        .abc-burger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          color: rgba(255,255,255,0.85);
          flex-direction: column;
          gap: 5px;
          line-height: 1;
        }
        .abc-burger-bar {
          display: block;
          width: 22px;
          height: 2px;
          background: currentColor;
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.2s ease;
        }
        .abc-mobile-menu {
          background: rgba(7,7,14,0.97);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          animation: navSlideDown 0.22s ease;
        }
        .abc-mobile-link {
          display: block;
          padding: 1rem 1.5rem;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.15s, color 0.15s;
        }
        .abc-mobile-link:hover { background: rgba(255,255,255,0.04); color: #fff; }
        .abc-mobile-cta {
          display: block;
          margin: 1rem 1.5rem 1.25rem;
          text-align: center;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          background: linear-gradient(135deg,#6642ff 0%,#3c78ff 100%);
          color: #fff;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.95rem;
        }
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .abc-nav { padding: 1rem 1.25rem; }
          .abc-nav-links { display: none; }
          .abc-burger { display: flex; }
        }
      `}</style>

      <nav className="abc-nav">
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline' }}>
          <span style={{ fontWeight: 900, color: '#fff', fontSize: '1.4rem', letterSpacing: '-0.03em' }}>abc</span>
          <span style={{
            fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg,#6642ff 0%,#3c78ff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>store</span>
        </Link>

        <div className="abc-nav-links">
          {LINKS.map(({ label, to }) => (
            <Link key={label} to={to} className="abc-nav-link">{label}</Link>
          ))}
          <Link to="/catalog" style={{
            color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600,
            background: 'linear-gradient(135deg,#6642ff 0%,#3c78ff 100%)',
            padding: '0.5rem 1.25rem', borderRadius: '0.5rem',
          }}>Купить</Link>
        </div>

        <button
          className="abc-burger"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
        >
          <span className="abc-burger-bar" style={open ? { transform: 'translateY(7px) rotate(45deg)' } : {}} />
          <span className="abc-burger-bar" style={open ? { opacity: 0 } : {}} />
          <span className="abc-burger-bar" style={open ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}} />
        </button>
      </nav>

      {open && (
        <div className="abc-mobile-menu">
          {LINKS.map(({ label, to }) => (
            <Link key={label} to={to} className="abc-mobile-link" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link to="/catalog" className="abc-mobile-cta" onClick={() => setOpen(false)}>
            Купить
          </Link>
        </div>
      )}
    </div>
  )
}
