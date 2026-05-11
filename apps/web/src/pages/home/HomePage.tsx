import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HeroSection from '../../components/HeroSection'

export function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated particle grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = 18;
      const rows = 10;
      const cw = canvas.width / cols;
      const ch = canvas.height / rows;

      for (let x = 0; x <= cols; x++) {
        for (let y = 0; y <= rows; y++) {
          const wave = Math.sin(t * 0.8 + x * 0.4 + y * 0.6) * 0.5 + 0.5;
          const opacity = wave * 0.18 + 0.03;
          const size = wave * 1.5 + 0.5;
          ctx.beginPath();
          ctx.arc(x * cw, y * ch, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.fill();
        }
      }

      // Horizontal scan line
      const scanY = ((Math.sin(t * 0.3) * 0.5 + 0.5)) * canvas.height;
      const grad = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
      grad.addColorStop(0, "rgba(99,102,241,0)");
      grad.addColorStop(0.5, "rgba(99,102,241,0.04)");
      grad.addColorStop(1, "rgba(99,102,241,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 80, canvas.width, 160);

      t += 0.016;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0a0a0f;
          --card-bg: #13131a;
          --border: rgba(255,255,255,0.08);
          --text: #f0f0f5;
          --muted: #6b6b80;
          --accent: #6366f1;
        }
        body { background: var(--bg); }

        .hw { min-height:100vh; background:var(--bg); font-family:'DM Sans',system-ui,sans-serif; color:var(--text); display:flex; flex-direction:column; position:relative; overflow:hidden; }

        .hw-canvas { position:fixed; inset:0; z-index:0; pointer-events:none; }

        /* top glow */
        .hw-glow { position:fixed; top:-160px; left:50%; transform:translateX(-50%); width:800px; height:500px; background:radial-gradient(ellipse, rgba(99,102,241,0.13) 0%, transparent 65%); pointer-events:none; z-index:0; }

        /* header */
        .hw-header { position:relative; z-index:10; height:60px; padding:0 32px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border); background:rgba(10,10,15,0.7); backdrop-filter:blur(16px); }
        .hw-logo { font-size:17px; font-weight:800; letter-spacing:-0.03em; color:var(--text); text-decoration:none; }
        .hw-logo span { color:var(--accent); }
        .hw-nav { display:flex; gap:28px; font-size:13px; }
        .hw-nav a { color:var(--muted); text-decoration:none; transition:color 0.2s; }
        .hw-nav a:hover { color:var(--text); }

        /* main */
        .hw-main { position:relative; z-index:10; flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:40px 24px; }

        .hw-tag { display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:var(--accent); background:rgba(99,102,241,0.08); border:1px solid rgba(99,102,241,0.2); border-radius:100px; padding:6px 16px; margin-bottom:40px; animation:fadeUp 0.7s ease both; }
        .hw-tag-dot { width:6px; height:6px; border-radius:50%; background:var(--accent); animation:pulse 2s ease-in-out infinite; }

        .hw-title { font-size:clamp(56px,11vw,120px); font-weight:800; letter-spacing:-0.05em; line-height:0.9; margin-bottom:8px; animation:fadeUp 0.7s ease 0.1s both; }
        .hw-title-accent { color:var(--accent); }

        .hw-slogan { font-size:clamp(14px,2vw,18px); font-weight:300; color:var(--muted); letter-spacing:0.15em; text-transform:uppercase; margin-top:20px; margin-bottom:52px; animation:fadeUp 0.7s ease 0.2s both; }

        .hw-cta { display:inline-flex; align-items:center; gap:12px; padding:14px 32px; border-radius:12px; background:var(--accent); color:#fff; font-size:14px; font-weight:700; letter-spacing:-0.01em; text-decoration:none; transition:opacity 0.2s, transform 0.2s; animation:fadeUp 0.7s ease 0.3s both; }
        .hw-cta:hover { opacity:0.85; transform:translateY(-2px); }
        .hw-cta-arrow { font-size:18px; transition:transform 0.2s; }
        .hw-cta:hover .hw-cta-arrow { transform:translateX(4px); }

        /* stats row */
        .hw-stats { display:flex; gap:0; margin-top:72px; border:1px solid var(--border); border-radius:16px; overflow:hidden; background:rgba(19,19,26,0.8); backdrop-filter:blur(12px); animation:fadeUp 0.7s ease 0.4s both; }
        .hw-stat { padding:20px 36px; display:flex; flex-direction:column; align-items:center; gap:4px; position:relative; }
        .hw-stat + .hw-stat::before { content:''; position:absolute; left:0; top:20%; height:60%; width:1px; background:var(--border); }
        .hw-stat-num { font-size:22px; font-weight:800; letter-spacing:-0.03em; color:var(--text); }
        .hw-stat-label { font-size:11px; color:var(--muted); letter-spacing:0.05em; white-space:nowrap; }

        /* footer */
        .hw-footer { position:relative; z-index:10; padding:20px 32px; border-top:1px solid var(--border); display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--muted); }
        .hw-footer a { color:var(--muted); text-decoration:none; transition:color 0.2s; }
        .hw-footer a:hover { color:var(--text); }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity:1; }
          50% { opacity:0.3; }
        }
      `}</style>

      <div className="hw">
        <canvas ref={canvasRef} className="hw-canvas" />
        <div className="hw-glow" />

        <header className="hw-header">
          <Link to="/" className="hw-logo">abc<span>store</span></Link>
          <nav className="hw-nav">
            <Link to="/">Главная</Link>
            <Link to="/catalog">Каталог</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>
        </header>

        <main className="hw-main">
          <div className="hw-tag">
            <span className="hw-tag-dot" />
            Официальный дилер · Москва
          </div>

          <h1 className="hw-title">
            abc<span className="hw-title-accent">store</span>
          </h1>

          <p className="hw-slogan">Гаджеты для жизни</p>

          <Link to="/catalog" className="hw-cta">
            Перейти в каталог
            <span className="hw-cta-arrow">→</span>
          </Link>

          <div className="hw-stats">
            <div className="hw-stat">
              <span className="hw-stat-num">20+</span>
              <span className="hw-stat-label">Товаров в наличии</span>
            </div>
            <div className="hw-stat">
              <span className="hw-stat-num">1 год</span>
              <span className="hw-stat-label">Гарантия</span>
            </div>
            <div className="hw-stat">
              <span className="hw-stat-num">24/7</span>
              <span className="hw-stat-label">Поддержка</span>
            </div>
            <div className="hw-stat">
              <span className="hw-stat-num">0 ₽</span>
              <span className="hw-stat-label">Доставка по Москве</span>
            </div>
          </div>
        </main>

        <footer className="hw-footer">
          <span>© 2026 abcstore · Багратионовский проезд 12А</span>
          <a href="https://t.me/ABCapplemanager" target="_blank" rel="noreferrer">@ABCapplemanager</a>
        </footer>
      </div>
    </>
  );
}