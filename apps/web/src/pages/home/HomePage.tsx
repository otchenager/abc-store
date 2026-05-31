import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getProducts } from "../../shared/api/product";
import type { ProductWithRelations } from "../../shared/api/product";
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
    { src: "/images/iphone17.png",        animClass: "float-a", local: true },
    { src: "/images/applewatchultra.png", animClass: "float-b", local: true },
    { src: "/images/DJI_Mavic_4.png",     animClass: "float-b", local: true },
    { src: "/images/ray-ban.png",         animClass: "float-a", local: true },
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
        .fl-0 { top:12%;    left:8%;  }
        .fl-1 { top:12%;    right:6%; }
        .fl-2 { bottom:15%; left:8%;  }
        .fl-3 { bottom:18%; right:7%; }
        @media (max-width:768px) {
          .hero-floater img { width:70px; }
          .fl-0 { top:6%;    left:2%;  right:auto; bottom:auto; }
          .fl-1 { top:6%;    right:2%; left:auto;  bottom:auto; }
          .fl-2 { bottom:10%; left:2%;  right:auto; top:auto; }
          .fl-3 { bottom:10%; right:2%; left:auto;  top:auto; }
        }
      `}</style>

      {/* Pulsing radial glow */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse at 50% 40%, rgba(99,102,241,0.12) 0%, transparent 60%)",
        animation: "heroPulse 4s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Floating images */}
      {floaters.map((f, i) => (
        <div key={i} className={`hero-floater fl-${i} ${f.animClass}`} style={{
          position: "absolute", zIndex: 0, background: "transparent", border: "none",
        }}>
          <img src={f.src} alt="" style={{
            width: 112, display: "block",
            filter: "drop-shadow(0 16px 48px rgba(99,102,241,0.45))",
            ...(f.local ? { mixBlendMode: "screen" as const } : {}),
          }} />
        </div>
      ))}

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
  { image: "/images/11.png", name: "Apple" },
  { image: "/images/djimic2.png", name: "DJI" },
  { image: "/images/ray-ban.png", name: "Ray-Ban" },
  { image: "/images/whoop.png", name: "WHOOP" },
  { image: "/images/plaude.png", name: "Plaud" },
  { image: "/images/Sony PS5.png", name: "Sony" },
  { image: "/images/yandex.png", name: "Yandex" },
  { image: "/images/dyson.png", name: "Dyson" },

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
            <span key={i} className="brand-item"><img src={b.image} style={{ height: 32, width: "auto", objectFit: "contain" }} /> {b.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Featured Products ─────────────────────────────────────────────────────────
function MiniCard({ product }: { product: ProductWithRelations }) {
  console.log("MiniCard product:", product);
  const hasDiscount = product.oldPrice != null && product.oldPrice > product.price;
  const discount = hasDiscount ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100) : null;

  return (
    <Link to={`/product/${product.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{
        background: "#13131a", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16, overflow: "hidden",
        opacity: 1,
        transition: "transform 0.2s, box-shadow 0.2s, opacity 0.3s ease",
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
  useScrollReveal(products);

  console.log("Products state:", products);
  console.log("Loading state:", loading);

  useEffect(() => {
    getProducts({ featured: true, limit: 8 })
      .then(r => {
        console.log("Full response:", r);
        console.log("r.data:", r.data);
        console.log("r.products:", (r as any).products);
        const products = r.data ?? (r as any).products ?? r;
        console.log("Final products:", products);
        setProducts(Array.isArray(products) ? products : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  console.log("Rendering products count:", products.length);
  console.log("First product:", products[0]);

  return (
    <section style={{ padding: "clamp(40px,6vw,72px) clamp(16px,4vw,32px)", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <h2 style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", fontFamily: "'DM Sans', sans-serif" }}>Хиты продаж</h2>
        <Link to="/catalog?featured=true" style={{ fontSize: 14, color: "#6366f1", textDecoration: "none", fontWeight: 600 }}>Все товары →</Link>
      </div>

      <style>{`
        .feat-row { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        @media (max-width:1024px) { .feat-row { grid-template-columns:repeat(3,1fr); } }
        @media (max-width:768px)  { .feat-row { grid-template-columns:repeat(2,1fr); gap:12px; } }
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
  // Row 1 — категории
  { slug: "iphone",      name: "Смартфоны",        desc: "iPhone 14–17, Samsung Galaxy",   gradient: "135deg, #1a1a2e 0%, #16213e 100%",  image: "/images/iphone17.png" as string | null, glowColor: "rgba(99,102,241,0.3)",   blend: "screen" as const, emoji: "📱" },
  { slug: "macbook",     name: "Ноутбуки",          desc: "MacBook Air и Pro 2025",         gradient: "135deg, #0d1b2a 0%, #1b2838 100%",  image: "/images/macbook.png" as string | null,  glowColor: "rgba(99,102,241,0.25)",  blend: "screen" as const, emoji: "💻" },
  { slug: "gaming",      name: "Консоли",           desc: "PlayStation 5, Xbox Series",     gradient: "135deg, #1a0a1a 0%, #2a1535 100%",  image: "/images/Sony PS5.png" as string | null, glowColor: "rgba(139,92,246,0.3)",   blend: "normal" as const, emoji: "🎮" },
  // Row 2 — бренды
  { slug: "dji",         name: "DJI",               desc: "Дроны, камеры, микрофоны",       gradient: "135deg, #1a0a0a 0%, #2d1515 100%",  image: "/images/DJI_Mavic_4.png" as string | null, glowColor: "rgba(239,68,68,0.25)", blend: "normal" as const, emoji: "🚁" },
  { slug: "rayban",      name: "Ray-Ban",            desc: "Умные очки с AI",                gradient: "135deg, #0a0f1a 0%, #151e2d 100%",  image: "/images/ray-ban.png" as string | null,  glowColor: "rgba(99,102,241,0.2)",   blend: "normal" as const, emoji: "🕶️" },
  { slug: "whoop",       name: "WHOOP",              desc: "Биометрика 24/7",                gradient: "135deg, #0a1a10 0%, #0d2d1a 100%",  image: "/images/whoop.png" as string | null,    glowColor: "rgba(34,197,94,0.25)",   blend: "normal" as const, emoji: "💚" },
  // Row 3 — остальные бренды
  { slug: "yandex",      name: "Яндекс",             desc: "Станция 2, Станция Макс",        gradient: "135deg, #0a0f1a 0%, #0d1520 100%",  image: "/images/yandex.png" as string | null,   glowColor: "rgba(252,56,56,0.25)",   blend: "normal" as const, emoji: "🔴" },
  { slug: "dyson",       name: "Dyson",              desc: "Умная техника для дома",         gradient: "135deg, #1a0f0a 0%, #2d1f15 100%",  image: "/images/dyson.png" as string | null,    glowColor: "rgba(234,88,12,0.25)",   blend: "normal" as const, emoji: "🌀" },
  { slug: "plaud-brand", name: "Plaud",              desc: "AI-диктофоны нового поколения",  gradient: "135deg, #1a1a0a 0%, #2d2d15 100%",  image: "/images/plaude.png" as string | null,   glowColor: "rgba(234,179,8,0.2)",    blend: "normal" as const, emoji: "🎙️" },
];

function CategoryShowcase() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section style={{ padding: "clamp(40px,6vw,72px) clamp(16px,4vw,32px)", maxWidth: 1280, margin: "0 auto" }}>
      <h2 className="reveal" style={{ margin: "0 0 6px", fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", fontFamily: "'DM Sans', sans-serif" }}>
        Найдите своё устройство
      </h2>
      <p className="reveal" style={{ margin: "0 0 24px", fontSize: 14, color: "#6b6b80" }}>Выберите категорию и погрузитесь в мир технологий</p>
      <style>{`
        .cat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .cat-card  { height:200px; }
        @media (max-width:768px) { .cat-grid { grid-template-columns:repeat(2,1fr); } .cat-card { height:140px; } }
        @media (max-width:480px) { .cat-grid { grid-template-columns:1fr; } .cat-card { height:140px; } }
      `}</style>
      <div className="cat-grid">
        {CATEGORIES.map((cat, idx) => {
          const on = hovered === idx;
          return (
            <Link key={cat.slug} to={`/catalog?category=${cat.slug}`}
              style={{ textDecoration: "none", display: "block" }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="reveal cat-card" style={{
                position: "relative", borderRadius: 20,
                background: `linear-gradient(${cat.gradient})`,
                border: `1px solid ${on ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
                overflow: "hidden", cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                transform: on ? "translateY(-6px) scale(1.01)" : "none",
                boxShadow: on ? `0 20px 60px ${cat.glowColor}` : "none",
              }}>
                {/* Left fade overlay */}
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0, width: "60%",
                  background: "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 100%)",
                  pointerEvents: "none", zIndex: 1,
                }} />

                {/* Product image or emoji */}
                {cat.image
                  ? <img src={cat.image} alt={cat.name} style={{
                      position: "absolute", right: -10, bottom: 0,
                      height: "85%", width: "auto", maxWidth: "55%",
                      objectFit: "contain", objectPosition: "bottom right",
                      filter: `drop-shadow(0 10px 30px ${cat.glowColor})`,
                      transition: "transform 0.3s ease",
                      transform: on ? "scale(1.08) translateY(-4px)" : "none",
                      mixBlendMode: cat.blend,
                    }} />
                  : <span style={{
                      position: "absolute", right: 20, bottom: 20,
                      fontSize: 80, lineHeight: 1, opacity: 0.6,
                      filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
                      transition: "transform 0.3s ease",
                      transform: on ? "scale(1.08) translateY(-4px)" : "none",
                      display: "block",
                    }}>{cat.emoji}</span>
                }

                {/* Arrow */}
                <div style={{
                  position: "absolute", top: 16, right: 16, zIndex: 2,
                  width: 28, height: 28, borderRadius: "50%",
                  background: on ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, color: on ? "white" : "rgba(255,255,255,0.4)",
                  transition: "all 0.3s",
                  transform: on ? "translate(2px, -2px)" : "none",
                }}>→</div>

                {/* Text */}
                <div style={{ position: "absolute", left: 20, bottom: 20, zIndex: 2 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#f0f0f5", marginBottom: 4, letterSpacing: "-0.02em", fontFamily: "'DM Sans', sans-serif" }}>{cat.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{cat.desc}</div>
                </div>
              </div>
            </Link>
          );
        })}
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
    <section style={{ padding: "clamp(40px,6vw,72px) clamp(16px,4vw,32px)", maxWidth: 1280, margin: "0 auto" }}>
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
      <Navbar />
      <CinematicHero />
      <BrandStrip />
      <FeaturedProducts />
      <CategoryShowcase />
      <ReviewsSection />
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "32px", textAlign: "center", color: "#6b6b80", fontSize: 13 }}>
        Обращаем ваше внимание на то, что данный Интернет-сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации. Для получения подробной информации о стоимости техники обращайтесь к менеджерам по продажам из вкладки «Контакты». Права на сайт принадлежат ООО «ABC STORE» (ИНН 054702011845, ОГРН 325050000141850 от 02 февраля 2026 года), тел. +7 928 470-30-00, e-mail: abc-store-email@gmail.com <a href="https://t.me/ABCapplemanager" target="_blank" rel="noreferrer" style={{ color: "#6366f1", textDecoration: "none" }}>@ABCapplemanager</a>
      </footer>
    </div>
  );
}
