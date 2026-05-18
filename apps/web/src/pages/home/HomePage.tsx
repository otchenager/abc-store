import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getProducts, type ProductWithRelations } from "../../shared/api/product";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const formatRub = (n: number) => n.toLocaleString("ru-RU") + " ₽";

// ─── Cinematic Hero ────────────────────────────────────────────────────────────
function CinematicHero() {
  const [tagline, setTagline] = useState("");
  const T = "ГАДЖЕТЫ ДЛЯ ЖИЗНИ";
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started || tagline.length >= T.length) return;
    const t = setTimeout(() => setTagline(T.slice(0, tagline.length + 1)), 55);
    return () => clearTimeout(t);
  }, [started, tagline]);

  const floaters = [
    { src: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=300&fmt=png-alpha", top: "12%", left: "6%",  animClass: "float-a", apple: false },
    { src: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-13-m4-midnight-select-202503?wid=300&fmt=png-alpha",               top: "8%",  right: "6%", animClass: "float-b", apple: false },
    { src: "https://abcdemo1.vercel.app/DJI_Mavic_4.png",                                                                      bottom: "15%", left: "8%",  animClass: "float-b", apple: false },
    { src: "https://abcdemo1.vercel.app/ray-ban.png",                                                                          bottom: "18%", right: "7%", animClass: "float-a", apple: false },
  ];

  return (
    <section style={{
      position: "relative", minHeight: "100vh",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden", padding: "80px 24px",
      background: "#0a0a0f",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
        @keyframes float-a { 0%,100%{transform:translateY(-12px)} 50%{transform:translateY(12px)} }
        @keyframes float-b { 0%,100%{transform:translateY(-8px)}  50%{transform:translateY(8px)}  }
        @keyframes heroPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes caretBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        .float-a { animation: float-a 5s ease-in-out infinite; }
        .float-b { animation: float-b 6s ease-in-out infinite 1s; }
        @keyframes scrollBounce { 0%,100%{transform:translateY(0);opacity:0.5} 50%{transform:translateY(7px);opacity:1} }
        .scroll-arrow { animation: scrollBounce 1.8s ease-in-out infinite; }
        @media (max-width: 768px) { .hero-floater { display:none !important; } }
      `}</style>

      {/* Pulsing radial glow */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse at 50% 40%, rgba(99,102,241,0.12) 0%, transparent 60%)",
        animation: "heroPulse 4s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Floating images */}
      {floaters.map((f, i) => {
        const { src, animClass, ...pos } = f as { src: string; animClass: string; apple: boolean; top?: string; bottom?: string; left?: string; right?: string };
        return (
          <div key={i} className={`hero-floater ${animClass}`} style={{
            position: "absolute", zIndex: 0, background: "transparent",
            ...pos,
          }}>
            <img src={src} alt="" style={{
              width: 160, display: "block",
              filter: "drop-shadow(0 16px 48px rgba(99,102,241,0.45))",
            }} />
          </div>
        );
      })}

      {/* Headline */}
      <div style={{ textAlign: "center", zIndex: 1, position: "relative" }}>
        <div style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(72px, 15vw, 160px)",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          userSelect: "none",
        }}>
          <span style={{ color: "#f0f0f5" }}>abc</span><span style={{ color: "#6366f1" }}>store</span>
        </div>

        <div style={{
          marginTop: 20,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: "clamp(16px, 2.5vw, 24px)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#6b6b80",
          minHeight: "1.4em",
        }}>
          {tagline}
          {tagline.length < T.length && (
            <span style={{ animation: "caretBlink 0.9s step-end infinite", borderRight: "2px solid #6b6b80", marginLeft: 1 }} />
          )}
        </div>

        <div style={{ marginTop: 40, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/catalog" style={{
            padding: "14px 32px", borderRadius: 14,
            background: "#6366f1", color: "#fff",
            textDecoration: "none", fontWeight: 600, fontSize: 16,
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
          }}>
            Открыть каталог →
          </Link>
          <a href="https://t.me/ABCapplemanager" target="_blank" rel="noreferrer" style={{
            padding: "14px 32px", borderRadius: 14,
            background: "transparent", color: "#f0f0f5",
            textDecoration: "none", fontWeight: 600, fontSize: 16,
            fontFamily: "'DM Sans', sans-serif",
            border: "1px solid rgba(255,255,255,0.15)",
          }}>
            ✈️ Написать менеджеру
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        color: "#6b6b80",
      }}>
        <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Прокрутите вниз</span>
        <span className="scroll-arrow" style={{ fontSize: 18 }}>↓</span>
      </div>
    </section>
  );
}

// ─── Brand Strip ───────────────────────────────────────────────────────────────
const BRANDS = [
  { emoji: "🍎", name: "Apple" }, { emoji: "🚁", name: "DJI" },
  { emoji: "🕶️", name: "Ray-Ban" }, { emoji: "💚", name: "WHOOP" },
  { emoji: "🎙️", name: "Plaud" }, { emoji: "🎵", name: "Beats" },
];

function BrandStrip() {
  const items = [...BRANDS, ...BRANDS, ...BRANDS];
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "20px 0", overflow: "hidden" }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6b80", textAlign: "center", marginBottom: 14 }}>Официальные партнёры</div>
      <style>{`
        @keyframes marquee { from { transform:translateX(0) } to { transform:translateX(-33.33%) } }
        .brand-strip { display:flex; gap:48px; animation:marquee 18s linear infinite; width:max-content; }
        .brand-item { display:flex; align-items:center; gap:8px; font-size:18px; font-weight:700; color:#6b6b80; white-space:nowrap; transition:color 0.2s; cursor:default; font-family:'DM Sans',sans-serif; }
        .brand-item:hover { color:#6366f1; }
      `}</style>
      <div style={{ display: "flex", overflow: "hidden" }}>
        <div className="brand-strip">
          {items.map((b, i) => (
            <span key={i} className="brand-item"><span style={{ fontSize: 22 }}>{b.emoji}</span> {b.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Featured Products ─────────────────────────────────────────────────────────
function MiniCard({ product }: { product: ProductWithRelations }) {
  const hasDiscount = product.oldPrice != null && product.oldPrice > product.price;
  const discount = hasDiscount ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100) : null;

  return (
    <Link to={`/product/${product.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="reveal" style={{
        background: "#13131a", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16, overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        flexShrink: 0, width: 220,
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(99,102,241,0.15)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
      >
        <div style={{ background: "#f5f5f7", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative" }}>
          {product.imageUrl
            ? <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} loading="lazy" />
            : <span style={{ fontSize: 40, opacity: 0.3 }}>📦</span>
          }
          {discount && (
            <span style={{ position: "absolute", top: 8, right: 8, background: "#ef4444", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 5 }}>-{discount}%</span>
          )}
        </div>
        <div style={{ padding: "12px 14px 14px" }}>
          <div style={{ fontSize: 10, color: "#6b6b80", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{product.brand?.name ?? ""}</div>
          <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3, marginBottom: 8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{product.name}</div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{formatRub(product.price)}</div>
        </div>
      </div>
    </Link>
  );
}

function FeaturedProducts() {
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProducts({ featured: true, limit: 8 })
      .then(r => { setProducts(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section style={{ padding: "72px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <h2 style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", fontFamily: "'DM Sans', sans-serif" }}>Хиты продаж</h2>
        <Link to="/catalog?featured=true" style={{ fontSize: 14, color: "#6366f1", textDecoration: "none", fontWeight: 600 }}>Все товары →</Link>
      </div>

      <style>{`
        .feat-row { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        @media (max-width:1024px) { .feat-row { grid-template-columns:repeat(3,1fr); } }
        @media (max-width:768px)  { .feat-row { display:flex; overflow-x:auto; gap:12px; padding-bottom:8px; scrollbar-width:none; } .feat-row::-webkit-scrollbar { display:none; } }
      `}</style>

      {loading ? (
        <div className="feat-row">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ borderRadius: 16, background: "#13131a", aspectRatio: "3/4", animation: "pulse 1.5s ease-in-out infinite" }} />
          ))}
        </div>
      ) : (
        <div className="feat-row" ref={rowRef}>
          {products.map(p => <MiniCard key={p.id} product={p} />)}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <Link to="/catalog" style={{
          display: "inline-block", padding: "12px 32px", borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.12)", color: "#f0f0f5",
          textDecoration: "none", fontSize: 14, fontWeight: 600,
          transition: "border-color 0.2s, background 0.2s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#6366f1"; (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.08)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.background = ""; }}
        >
          Смотреть весь каталог →
        </Link>
      </div>
    </section>
  );
}

// ─── Category Showcase ────────────────────────────────────────────────────────
const CATEGORIES = [
  { slug: "iphone",      name: "iPhone",       emoji: "📱", gradient: "135deg, #1a1a2e 0%, #16213e 100%", desc: "От 14 до 17 серии" },
  { slug: "macbook",     name: "MacBook",      emoji: "💻", gradient: "135deg, #0d1b2a 0%, #1b2838 100%", desc: "Все модели 2025 года" },
  { slug: "dji",         name: "DJI",          emoji: "🚁", gradient: "135deg, #1a0a0a 0%, #2d1515 100%", desc: "Дроны и камеры" },
  { slug: "smart-glasses", name: "Ray-Ban Meta", emoji: "🕶️", gradient: "135deg, #0a1a0a 0%, #152d15 100%", desc: "Умные очки с AI" },
  { slug: "fitness",     name: "WHOOP",        emoji: "💚", gradient: "135deg, #0a1a10 0%, #0d2d1a 100%", desc: "Биометрика 24/7" },
  { slug: "dictaphones", name: "Plaud",        emoji: "🎙️", gradient: "135deg, #1a1a0a 0%, #2d2d15 100%", desc: "AI-диктофоны" },
];

function CategoryShowcase() {
  return (
    <section style={{ padding: "72px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <h2 className="reveal" style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", fontFamily: "'DM Sans', sans-serif" }}>
        Найдите своё устройство
      </h2>
      <p className="reveal" style={{ margin: "0 0 40px", fontSize: 15, color: "#6b6b80" }}>Выберите категорию и погрузитесь в мир технологий</p>
      <style>{`
        .cat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        @media (max-width:768px) { .cat-grid { grid-template-columns:repeat(2,1fr); } }
        .cat-card { transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
        .cat-card:hover { transform:scale(1.02); box-shadow:0 20px 60px rgba(99,102,241,0.15); border-color:rgba(99,102,241,0.4) !important; }
        .cat-card:hover .cat-arrow { opacity:1; transform:translateX(0); color:#6366f1; }
        .cat-arrow { opacity:0; transform:translateX(-6px); transition:all 0.2s; font-size:18px; }
      `}</style>
      <div className="cat-grid">
        {CATEGORIES.map(cat => (
          <Link key={cat.slug} to={`/catalog?category=${cat.slug}`} style={{ textDecoration: "none" }}>
            <div className="cat-card reveal" style={{
              background: `linear-gradient(${cat.gradient})`,
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20, height: 180,
              padding: "24px 28px",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              cursor: "pointer",
            }}>
              <span style={{ fontSize: 48 }}>{cat.emoji}</span>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#f0f0f5", fontFamily: "'DM Sans', sans-serif" }}>{cat.name}</div>
                  <span className="cat-arrow">→</span>
                </div>
                <div style={{ fontSize: 13, color: "#6b6b80", marginTop: 2 }}>{cat.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
const REVIEWS = [
  { name: "Алексей М.", city: "Москва", text: "Заказал iPhone 17 Pro Max — привезли в тот же день. Коробка запечатана, чек с гарантией. Это не магазин, это сервис мирового уровня.", product: "iPhone 17 Pro Max", stars: 5 },
  { name: "Мария С.", city: "Москва", text: "Купила Ray-Ban Meta — влюбилась с первой минуты. Цена лучше чем везде, менеджер помог с настройкой AI-функций.", product: "Ray-Ban Meta Wayfarer", stars: 5 },
  { name: "Дмитрий К.", city: "Алматы", text: "DJI Mavic 4 Pro пришёл оригинальный с полной комплектацией. Менеджер помог с регистрацией дрона. Рекомендую!", product: "DJI Mavic 4 Pro", stars: 5 },
];

function ReviewsSection() {
  return (
    <section style={{ padding: "72px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2 className="reveal" style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", fontFamily: "'DM Sans', sans-serif" }}>Нам доверяют</h2>
        <p className="reveal" style={{ margin: 0, fontSize: 15, color: "#6b6b80" }}>5 000+ довольных клиентов по всей России</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        {REVIEWS.map((r, i) => (
          <div key={i} className="reveal" style={{ background: "#13131a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
            <div>{Array.from({ length: r.stars }).map((_, j) => <span key={j} style={{ color: "#f59e0b", fontSize: 16 }}>★</span>)}</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#d0d0d8" }}>"{r.text}"</p>
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{r.name}</div>
                <div style={{ fontSize: 12, color: "#6b6b80" }}>{r.city}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#6366f1", background: "rgba(99,102,241,0.12)", padding: "3px 10px", borderRadius: 6, whiteSpace: "nowrap" }}>{r.product}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────
export function HomePage() {
  useScrollReveal();
  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0f0f5", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.7} }`}</style>
      <CinematicHero />
      <BrandStrip />
      <FeaturedProducts />
      <CategoryShowcase />
      <ReviewsSection />
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "32px", textAlign: "center", color: "#6b6b80", fontSize: 13 }}>
        © 2026 ABC Store · Москва · <a href="https://t.me/ABCapplemanager" target="_blank" rel="noreferrer" style={{ color: "#6366f1", textDecoration: "none" }}>@ABCapplemanager</a>
      </footer>
    </div>
  );
}
