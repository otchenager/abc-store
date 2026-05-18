import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductBySlug, type ProductWithRelations } from "../shared/api/product";

const formatRub = (n: number) => n.toLocaleString("ru-RU") + " ₽";

const CATEGORY_LABEL: Record<string, string> = {
  iphone: "iPhone", macbook: "MacBook", airpods: "AirPods",
  watches: "Apple Watch", vision: "Apple Vision", dji: "DJI",
  "smart-glasses": "Ray-Ban", fitness: "WHOOP", dictaphones: "Plaud", headphones: "Beats",
};

const SPECS: Record<string, { icon: string; label: string; value: string }[]> = {
  iphone:        [{ icon: "🔋", label: "Батарея", value: "До 29 часов" }, { icon: "📸", label: "Камера", value: "48 Мп, 5× зум" }, { icon: "⚡", label: "Чип", value: "A18 Pro" }, { icon: "💾", label: "Хранилище", value: "256 / 512 GB" }],
  macbook:       [{ icon: "🔋", label: "Батарея", value: "До 18 часов" }, { icon: "⚡", label: "Чип", value: "Apple M4" }, { icon: "💾", label: "Память", value: "16 GB Unified" }, { icon: "🖥️", label: "Дисплей", value: "Liquid Retina" }],
  airpods:       [{ icon: "🎵", label: "Звук", value: "Пространственный" }, { icon: "🔇", label: "Шум", value: "Активное ANC" }, { icon: "🔋", label: "Батарея", value: "До 30 ч с кейсом" }, { icon: "⚡", label: "Чип", value: "H2" }],
  watches:       [{ icon: "❤️", label: "Здоровье", value: "ЧСС, ЭКГ, SpO2" }, { icon: "📍", label: "GPS", value: "Точный L1/L5" }, { icon: "🔋", label: "Батарея", value: "До 36 часов" }, { icon: "💧", label: "Защита", value: "WR50" }],
  vision:        [{ icon: "🥽", label: "Дисплей", value: "micro-OLED 4K" }, { icon: "🧠", label: "Чипы", value: "M2 + R1" }, { icon: "👆", label: "Управление", value: "Взглядом и руками" }, { icon: "📦", label: "Память", value: "256 GB" }],
  dji:           [{ icon: "🛸", label: "Дальность", value: "До 20 км" }, { icon: "📸", label: "Видео", value: "4K 120fps" }, { icon: "⏱️", label: "Полёт", value: "45 минут" }, { icon: "🎯", label: "Стабил.", value: "3-осевой" }],
  "smart-glasses": [{ icon: "📸", label: "Камера", value: "12 Мп" }, { icon: "🤖", label: "AI", value: "Meta AI" }, { icon: "🔊", label: "Звук", value: "Открытые динамики" }, { icon: "🔋", label: "Батарея", value: "До 6 часов" }],
  fitness:       [{ icon: "❤️", label: "ЧСС", value: "24/7 мониторинг" }, { icon: "💤", label: "Сон", value: "Анализ фаз" }, { icon: "📊", label: "HRV", value: "Стресс и восст." }, { icon: "🔋", label: "Батарея", value: "До 5 дней" }],
  dictaphones:   [{ icon: "🎙️", label: "Запись", value: "30 часов" }, { icon: "🌍", label: "Языки", value: "59 языков" }, { icon: "📝", label: "Саммари", value: "Встречи и лекции" }, { icon: "🔋", label: "Батарея", value: "До 20 часов" }],
  headphones:    [{ icon: "🔇", label: "ANC", value: "Активное" }, { icon: "🎵", label: "Звук", value: "Hi-Fi" }, { icon: "🔋", label: "Батарея", value: "До 40 часов" }, { icon: "📱", label: "Совм.", value: "iOS и Android" }],
};

const REVIEWS_BY_CAT: Record<string, { name: string; city: string; text: string }[]> = {
  iphone:   [{ name: "Алексей М.", city: "Москва",         text: "Камера просто нереальная — снимает в темноте лучше чем ожидал. Пришёл за 3 часа." }, { name: "Юлия К.",    city: "Санкт-Петербург", text: "Упаковка запечатана, всё оригинальное. Менеджер ответил моментально." }, { name: "Дмитрий Р.", city: "Казань",           text: "Лучший iPhone что у меня был. Рекомендую всем без раздумий!" }],
  macbook:  [{ name: "Иван П.",    city: "Москва",          text: "M4 просто летает. Финальный кат в DaVinci Resolve — за минуты." }, { name: "Светлана Л.", city: "Новосибирск",   text: "18 часов батарея — правда! Весь рабочий день без зарядки." }, { name: "Артём С.",   city: "Екатеринбург",   text: "Красивый, тонкий, мощный. Стоит каждой копейки." }],
  dji:      [{ name: "Павел Н.",   city: "Москва",          text: "Снимки с воздуха — просто кино. Стабилизация идеальная." }, { name: "Кирилл В.", city: "Сочи",            text: "Дальность 20 км — это реально. Тест провёл лично." }, { name: "Наталья Ф.", city: "Краснодар",     text: "Менеджер помог с регистрацией дрона. Всё официально." }],
  default:  [{ name: "Анна С.",    city: "Москва",          text: "Отличный товар, доставка в тот же день. Всё оригинальное." }, { name: "Роман К.",  city: "Москва",          text: "Цена лучше чем в официальном магазине. Рекомендую!" }, { name: "Ольга Д.",  city: "Санкт-Петербург", text: "Быстро, надёжно, с гарантией. Третий раз беру тут." }],
};

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [added, setAdded] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [imgZoomed, setImgZoomed] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true); setNotFound(false);
    getProductBySlug(slug)
      .then(p => { setProduct(p); setLoading(false); document.title = `${p.name} — ABC Store`; })
      .catch(() => { setNotFound(true); setLoading(false); });
    return () => { document.title = "ABC Store — Гаджеты для жизни"; };
  }, [slug]);

  useEffect(() => {
    if (!product) return;
    try {
      const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
      setAdded(cart.some((i: { product: { id: string } }) => i.product.id === product.id));
    } catch { /* ignore */ }
  }, [product]);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setStickyVisible(!e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    try {
      const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
      const existing = cart.find((i: { product: { id: string } }) => i.product.id === product.id);
      localStorage.setItem("cart", JSON.stringify(
        existing
          ? cart.map((i: { product: { id: string }; qty: number }) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i)
          : [...cart, { product, qty: 1 }]
      ));
    } catch { /* ignore */ }
    setAdded(true);
  };

  const hasDiscount = product?.oldPrice != null && product.oldPrice > product.price;
  const discount = hasDiscount ? Math.round(((product!.oldPrice! - product!.price) / product!.oldPrice!) * 100) : null;
  const savings = hasDiscount ? product!.oldPrice! - product!.price : 0;
  const specs = product ? (SPECS[product.category.slug] ?? SPECS.iphone) : [];
  const reviews = product ? (REVIEWS_BY_CAT[product.category.slug] ?? REVIEWS_BY_CAT.default) : [];
  const catLabel = product ? (CATEGORY_LABEL[product.category.slug] ?? product.category.name) : "";

  return (
    <>
      <style>{`
        :root{--bg:#0a0a0f;--card-bg:#13131a;--border:rgba(255,255,255,0.08);--text:#f0f0f5;--muted:#6b6b80;--accent:#6366f1;}
        *{box-sizing:border-box;}body{margin:0;background:var(--bg);color:var(--text);}
        @keyframes pulse{0%,100%{opacity:.4}50%{opacity:.7}}
        @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
        .sticky-buy{animation:slideUp 0.25s ease;}
        .pp-layout{display:grid;grid-template-columns:3fr 2fr;gap:60px;align-items:start;}
        .pp-img{transition:transform 0.4s ease;}
        .pp-img:hover{transform:scale(1.06);}
        .tab-btn{padding:10px 20px;border:none;background:transparent;cursor:pointer;font-size:14px;font-weight:600;border-bottom:2px solid transparent;transition:all 0.2s;font-family:'DM Sans',sans-serif;color:var(--muted);}
        .tab-btn.active{color:var(--accent);border-bottom-color:var(--accent);}
        .trust-item{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;}
        @media(max-width:768px){.pp-layout{grid-template-columns:1fr;gap:32px;}.pp-content{padding:20px 16px!important;}.pp-header{padding:0 16px!important;}}
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {/* Header */}
        <header className="pp-header" style={{ borderBottom: "1px solid var(--border)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, background: "rgba(10,10,15,0.9)", backdropFilter: "blur(16px)", zIndex: 100 }}>
          <Link to="/" style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)", textDecoration: "none" }}>abc<span style={{ color: "var(--accent)" }}>store</span></Link>
          <nav style={{ display: "flex", gap: 20, fontSize: 13 }}>
            <Link to="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Главная</Link>
            <Link to="/catalog" style={{ color: "var(--text)", textDecoration: "none", fontWeight: 600 }}>Каталог</Link>
          </nav>
        </header>

        <div className="pp-content" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px" }}>
          {loading && <LoadingSkeleton />}
          {notFound && <NotFoundBlock />}

          {product && !loading && (
            <>
              {/* Breadcrumb */}
              <nav style={{ fontSize: 12, color: "var(--muted)", marginBottom: 28, display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                <Link to="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Главная</Link>
                <span>/</span>
                <Link to="/catalog" style={{ color: "var(--muted)", textDecoration: "none" }}>Каталог</Link>
                <span>/</span>
                <Link to={`/catalog?category=${product.category.slug}`} style={{ color: "var(--muted)", textDecoration: "none" }}>{catLabel}</Link>
                <span>/</span>
                <span style={{ color: "var(--text)" }}>{product.name}</span>
              </nav>

              <div className="pp-layout">
                {/* LEFT: Image */}
                <div>
                  <div style={{ background: "#f5f5f7", borderRadius: 24, padding: 48, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 480, position: "relative", overflow: "hidden", cursor: "zoom-in" }}
                    onClick={() => setImgZoomed(z => !z)}>
                    {product.imageUrl
                      ? <img src={product.imageUrl} alt={product.name} className="pp-img"
                          style={{ width: "100%", maxHeight: 440, objectFit: "contain", transform: imgZoomed ? "scale(1.15)" : "scale(1)" }} />
                      : <div style={{ fontSize: 80, opacity: 0.2 }}>📦</div>
                    }
                    {discount && (
                      <span style={{ position: "absolute", top: 16, right: 16, background: "#ef4444", color: "#fff", borderRadius: 8, padding: "4px 14px", fontSize: 14, fontWeight: 700 }}>
                        -{discount}%
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 8 }}>Нажмите на изображение для увеличения</p>
                </div>

                {/* RIGHT: Info */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {/* Brand badge */}
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(99,102,241,0.12)", color: "#6366f1", padding: "3px 10px", borderRadius: 6 }}>
                      {product.brand?.name ?? catLabel}
                    </span>
                  </div>

                  {/* Name */}
                  <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.03em" }}>{product.name}</h1>

                  {/* Stars */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#f59e0b", fontSize: 16, letterSpacing: 2 }}>★★★★★</span>
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>5.0 (128 отзывов)</span>
                  </div>

                  {/* Price block */}
                  <div style={{ background: "var(--card-bg)", borderRadius: 14, padding: "18px 20px", border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                      <span style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-0.03em" }}>{formatRub(product.price)}</span>
                      {product.oldPrice && (
                        <span style={{ fontSize: 20, color: "var(--muted)", textDecoration: "line-through" }}>{formatRub(product.oldPrice)}</span>
                      )}
                    </div>
                    {discount && (
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
                        <span style={{ background: "#ef4444", color: "#fff", padding: "2px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>-{discount}%</span>
                        <span style={{ fontSize: 13, color: "#22c55e", fontWeight: 600 }}>Вы экономите {formatRub(savings)}</span>
                      </div>
                    )}
                  </div>

                  <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "0" }} />

                  {/* Key specs */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {specs.map(s => (
                      <div key={s.label} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
                        <span style={{ fontSize: 18 }}>{s.icon}</span>
                        <div>
                          <div style={{ color: "var(--muted)", fontSize: 11 }}>{s.label}</div>
                          <div style={{ fontWeight: 600 }}>{s.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button ref={ctaRef} onClick={handleAddToCart} style={{ height: 56, borderRadius: 14, border: "none", background: added ? "#22c55e" : "var(--accent)", color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer", transition: "background 0.2s, transform 0.15s" }}
                    onMouseEnter={e => { if (!added) (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}>
                    {added ? "✓ Добавлено в корзину" : "Добавить в корзину"}
                  </button>

                  <a href="https://t.me/ABCapplemanager" target="_blank" rel="noreferrer" style={{ height: 48, borderRadius: 14, border: "1px solid var(--border)", background: "transparent", color: "var(--text)", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "border-color 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#2AABEE"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
                    ✈️ Написать менеджеру в Telegram
                  </a>

                  {/* Trust strip */}
                  <div style={{ display: "flex", gap: 4, background: "var(--card-bg)", borderRadius: 12, padding: "14px 12px", border: "1px solid var(--border)" }}>
                    {[["🔒", "Безопасная оплата"], ["📦", "Доставка за 1 день"], ["🛡️", "Гарантия 1 год"], ["↩️", "Возврат 14 дней"]].map(([icon, label]) => (
                      <div key={label} className="trust-item">
                        <span style={{ fontSize: 20 }}>{icon}</span>
                        <span style={{ fontSize: 10, color: "var(--muted)", textAlign: "center", lineHeight: 1.3 }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab section */}
              <div style={{ marginTop: 64 }}>
                <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: 28 }}>
                  {([["desc", "Описание"], ["specs", "Характеристики"], ["reviews", "Отзывы"]] as const).map(([key, label]) => (
                    <button key={key} className={`tab-btn${activeTab === key ? " active" : ""}`} onClick={() => setActiveTab(key)}>{label}</button>
                  ))}
                </div>

                {activeTab === "desc" && (
                  <div style={{ maxWidth: 700, fontSize: 15, lineHeight: 1.8, color: "#d0d0d8" }}>
                    <p style={{ margin: "0 0 16px" }}>{product.description}</p>
                    <p style={{ margin: "0 0 16px" }}>Каждый товар в ABC Store прошёл проверку подлинности. Мы работаем напрямую с официальными поставщиками и гарантируем 100% оригинальность всей продукции.</p>
                    <p style={{ margin: 0 }}>Доставка по Москве в день заказа, по всей России — от 1 дня. Гарантийное обслуживание 12 месяцев.</p>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div style={{ maxWidth: 600 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                      <tbody>
                        {specs.map(s => (
                          <tr key={s.label} style={{ borderBottom: "1px solid var(--border)" }}>
                            <td style={{ padding: "12px 0", color: "var(--muted)", width: "40%" }}>{s.icon} {s.label}</td>
                            <td style={{ padding: "12px 0", fontWeight: 600 }}>{s.value}</td>
                          </tr>
                        ))}
                        <tr style={{ borderBottom: "1px solid var(--border)" }}>
                          <td style={{ padding: "12px 0", color: "var(--muted)" }}>✓ Гарантия</td>
                          <td style={{ padding: "12px 0", fontWeight: 600 }}>1 год официальная</td>
                        </tr>
                        <tr>
                          <td style={{ padding: "12px 0", color: "var(--muted)" }}>📦 Комплектация</td>
                          <td style={{ padding: "12px 0", fontWeight: 600 }}>Полная оригинальная</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 700 }}>
                    {reviews.map((r, i) => (
                      <div key={i} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                          <div>
                            <span style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</span>
                            <span style={{ color: "var(--muted)", fontSize: 12, marginLeft: 8 }}>{r.city}</span>
                          </div>
                          <span style={{ color: "#f59e0b", letterSpacing: 2 }}>★★★★★</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 14, color: "#d0d0d8", lineHeight: 1.7 }}>"{r.text}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Sticky bar */}
        {product && stickyVisible && (
          <div className="sticky-buy" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 150, background: "rgba(10,10,15,0.95)", backdropFilter: "blur(16px)", borderTop: "1px solid var(--border)", padding: "12px 24px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{formatRub(product.price)}</div>
            </div>
            <button onClick={handleAddToCart} style={{ flexShrink: 0, padding: "12px 28px", borderRadius: 12, border: "none", background: added ? "#22c55e" : "var(--accent)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "background 0.2s", whiteSpace: "nowrap" }}>
              {added ? "✓ В корзине" : "Добавить в корзину"}
            </button>
          </div>
        )}

        <a href="https://t.me/ABCapplemanager" target="_blank" rel="noreferrer" style={{ position: "fixed", bottom: 28, right: 28, background: "#2AABEE", color: "#fff", borderRadius: 100, padding: "12px 20px", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 24px rgba(42,171,238,0.4)", zIndex: 99 }}>
          ✈️ Написать менеджеру
        </a>
      </div>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="pp-layout">
      <div style={{ borderRadius: 24, background: "var(--card-bg)", minHeight: 480, animation: "pulse 1.5s ease-in-out infinite" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[20, 48, 24, 80, 160, 56, 48, 64].map((h, i) => (
          <div key={i} style={{ height: h, borderRadius: 10, background: "var(--card-bg)", animation: "pulse 1.5s ease-in-out infinite" }} />
        ))}
      </div>
    </div>
  );
}

function NotFoundBlock() {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
      <h2 style={{ margin: "0 0 12px", fontSize: 24, fontWeight: 700 }}>Товар не найден</h2>
      <p style={{ color: "var(--muted)", marginBottom: 24, fontSize: 15 }}>Возможно, товар был удалён или ссылка устарела.</p>
      <Link to="/catalog" style={{ padding: "12px 28px", borderRadius: 12, background: "var(--accent)", color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 700 }}>
        Вернуться в каталог
      </Link>
    </div>
  );
}
