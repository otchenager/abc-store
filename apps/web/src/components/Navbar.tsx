import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
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
          <Link key={label} to={to}
            style={{ color: 'rgba(255,255,255,0.52)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}
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
  )
}
