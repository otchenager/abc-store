import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  getProducts,
  getProductFilters,
  postOrder,
  type ProductWithRelations,
  type ProductsResponse,
  type FiltersResponse,
  type ProductFilters,
} from "../shared/api/product";

const formatRub = (rub: number) => rub.toLocaleString("ru-RU") + " ₽";

function seededRand(seed: string, min: number, max: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  return min + (Math.abs(h) % (max - min + 1));
}

interface CartItem { product: ProductWithRelations; qty: number; }

// ─── Переводы категорий ───────────────────────────────────────────────────────
const CATEGORY_RU: Record<string, string> = {
  // Категориальные (Apple + конкуренты)
  iphone: "Смартфоны",
  macbook: "Ноутбуки",
  airpods: "Наушники",
  watches: "Носимые",
  vision: "VR / AR",
  gaming: "Консоли",
  // Бренды (нишевые)
  dji: "DJI",
  microphones: "Микрофоны",
  cameras: "Камеры DJI",
  rayban: "Ray-Ban",
  whoop: "WHOOP",
  garmin: "Garmin",
  "smart-home": "Умный дом",
  dyson: "Dyson",
  yandex: "Яндекс",
  "plaud-brand": "Plaud",
  "smart-glasses": "Умные очки",
  dictaphones: "AI-гаджеты",
};
const CATEGORY_EMOJI: Record<string, string> = {
  iphone: "",
  macbook: "",
  airpods: "",
  watches: "",
  vision: "",
  gaming: "",
  dji: "",
  microphones: "",
  cameras: "",
  rayban: "",
  whoop: "",
  garmin: "",
  "smart-home": "",
  dyson: "",
  yandex: "",
  "plaud-brand": "",
  "smart-glasses": "",
  dictaphones: "",
};

// ─── Стили ────────────────────────────────────────────────────────────────────
const filterBtn = (active: boolean): React.CSSProperties => ({
  display: "flex", alignItems: "center", padding: "7px 10px", borderRadius: 8,
  border: active ? "1px solid var(--accent)" : "1px solid transparent",
  background: active ? "rgba(99,102,241,0.1)" : "transparent",
  color: active ? "var(--accent)" : "var(--text)",
  fontSize: 13, fontWeight: active ? 600 : 400,
  cursor: "pointer", textAlign: "left", width: "100%",
});
const pageBtn = (active: boolean, disabled: boolean): React.CSSProperties => ({
  padding: "7px 14px", borderRadius: 8,
  border: active ? "1px solid var(--accent)" : "1px solid var(--border)",
  background: active ? "var(--accent)" : "transparent",
  color: active ? "#fff" : disabled ? "var(--muted)" : "var(--text)",
  fontSize: 13, cursor: disabled ? "default" : "pointer",
  opacity: disabled ? 0.4 : 1, fontWeight: active ? 600 : 400,
});

// ─── Корзина (sidebar) ────────────────────────────────────────────────────────
function CartSidebar({
  cart, onClose, onChangeQty, onRemove, onOrder,
}: {
  cart: CartItem[];
  onClose: () => void;
  onChangeQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onOrder: () => void;
}) {
  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
        zIndex: 200, backdropFilter: "blur(4px)",
      }} />
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "min(380px, 100vw)",
        background: "var(--card-bg)", borderLeft: "1px solid var(--border)",
        zIndex: 201, display: "flex", flexDirection: "column",
        animation: "slideIn 0.25s ease",
      }}>
        <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 17, fontWeight: 700 }}>Корзина {cart.length > 0 && `(${cart.reduce((s, i) => s + i.qty, 0)})`}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 22, lineHeight: 1 }}>×</button>
        </div>

        {cart.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--muted)", gap: 12 }}>
            <div style={{ fontSize: 48 }}>🛒</div>
            <div style={{ fontSize: 15 }}>Корзина пуста</div>
            <button onClick={onClose} style={{ marginTop: 8, padding: "9px 22px", borderRadius: 10, border: "1px solid var(--border)", background: "transparent", color: "var(--text)", cursor: "pointer", fontSize: 13 }}>
              Перейти в каталог
            </button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
              {cart.map(({ product, qty }) => (
                <div key={product.id} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 10, background: "var(--img-bg)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                    {product.imageUrl
                      ? <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 10 }} />
                      : CATEGORY_EMOJI[product.category.slug] ?? "📦"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)" }}>{formatRub(product.price)}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                      <button onClick={() => onChangeQty(product.id, -1)} style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid var(--border)", background: "transparent", color: "var(--text)", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ fontSize: 13, fontWeight: 600, minWidth: 20, textAlign: "center" }}>{qty}</span>
                      <button onClick={() => onChangeQty(product.id, 1)} style={{ width: 26, height: 26, borderRadius: 6, border: "1px solid var(--border)", background: "transparent", color: "var(--text)", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                      <button onClick={() => onRemove(product.id)} style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 18 }}>🗑</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 15 }}>
                <span style={{ color: "var(--muted)" }}>Итого</span>
                <span style={{ fontWeight: 800, fontSize: 18 }}>{total.toLocaleString("ru-RU")} ₽</span>
              </div>
              <button onClick={onOrder} style={{
                width: "100%", padding: "14px 0", borderRadius: 12,
                background: "var(--accent)", color: "#fff",
                border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer",
              }}>
                Оформить заказ →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ─── Форма заказа ─────────────────────────────────────────────────────────────
function OrderModal({
  cart, onClose, onSuccess,
}: {
  cart: CartItem[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) { setError("Заполните имя и телефон"); return; }
    setSending(true); setError("");
    try {
      await postOrder({
        customerName: name.trim(),
        customerPhone: phone.trim(),
        comment: comment.trim() || undefined,
        items: cart.map(i => ({
          productId: i.product.id,
          quantity: i.qty,
          price: i.product.price,
        })),
      });
      setSending(false);
      onSuccess();
    } catch {
      setSending(false);
      setError("Не удалось отправить заказ. Попробуйте снова или напишите в Telegram.");
    }
  };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 300, backdropFilter: "blur(6px)" }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "min(480px, 95vw)", background: "var(--card-bg)",
        border: "1px solid var(--border)", borderRadius: 20,
        zIndex: 301, padding: "32px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <span style={{ fontSize: 18, fontWeight: 700 }}>Оформление заказа</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 22 }}>×</button>
        </div>

        {/* Состав заказа */}
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
          {cart.map(({ product, qty }) => (
            <div key={product.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "5px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--muted)" }}>{product.name} × {qty}</span>
              <span style={{ fontWeight: 600 }}>{(product.price * qty).toLocaleString("ru-RU")} ₽</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontWeight: 700, fontSize: 15 }}>
            <span>Итого</span>
            <span style={{ color: "var(--accent)" }}>{total.toLocaleString("ru-RU")} ₽</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя *"
            style={inputStyle}
          />
          <input
            value={phone} onChange={(e) => setPhone(e.target.value)}
            placeholder="Телефон или Telegram *"
            style={inputStyle}
          />
          <textarea
            value={comment} onChange={(e) => setComment(e.target.value)}
            placeholder="Комментарий к заказу (необязательно)"
            rows={3}
            style={{ ...inputStyle, resize: "none", fontFamily: "inherit" }}
          />
          {error && <div style={{ color: "var(--color-text-danger, #ef4444)", fontSize: 13 }}>{error}</div>}
          <button type="submit" disabled={sending} style={{
            padding: "13px 0", borderRadius: 12, background: sending ? "var(--muted)" : "var(--accent)",
            color: "#fff", border: "none", fontSize: 15, fontWeight: 700,
            cursor: sending ? "default" : "pointer", marginTop: 4,
          }}>
            {sending ? "Отправляем..." : "Подтвердить заказ"}
          </button>
          <div style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", lineHeight: 1.5 }}>
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных.<br />
            Менеджер свяжется с вами в течение 15 минут.
          </div>
        </form>
      </div>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "11px 14px", borderRadius: 10,
  border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)",
  color: "var(--text)", fontSize: 14, outline: "none", width: "100%",
};

// ─── Успешный заказ ───────────────────────────────────────────────────────────
function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 300, backdropFilter: "blur(6px)" }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "min(400px, 90vw)", background: "var(--card-bg)",
        border: "1px solid rgba(99,102,241,0.3)", borderRadius: 20,
        zIndex: 301, padding: "40px 32px", textAlign: "center",
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Заказ принят!</div>
        <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 24 }}>
          Наш менеджер свяжется с вами в течение 15 минут.<br />
          Или напишите сами: <a href="https://t.me/ABCapplemanager" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>@ABCapplemanager</a>
        </div>
        <button onClick={onClose} style={{
          width: "100%", padding: "12px 0", borderRadius: 12,
          background: "var(--accent)", color: "#fff", border: "none",
          fontSize: 14, fontWeight: 700, cursor: "pointer",
        }}>
          Продолжить покупки
        </button>
      </div>
    </>
  );
}

// ─── ProductCard ──────────────────────────────────────────────────────────────
function ProductCard({ product, onAddToCart, inCart, reveal }: {
  product: ProductWithRelations;
  onAddToCart: (p: ProductWithRelations) => void;
  inCart: boolean;
  reveal?: boolean;
}) {
  const hasDiscount = product.oldPrice !== null && product.oldPrice > product.price;
  const discount = hasDiscount ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100) : null;

  return (
    <article className={`product-card${reveal ? " reveal" : ""}`} style={{
      background: "#13131a",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column",
      transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
    }}>
      <Link to={`/product/${product.slug}`} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", flex: 1 }}
        onClick={() => { fetch(`${import.meta.env.VITE_API_URL ?? "http://localhost:4000"}/api/products/${product.slug}/click`, { method: "POST" }).catch(() => null); }}>
        {/* Image zone */}
        <div className="product-img-zone" style={{
          height: "220px", width: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "8px", background: "#0d0d14", overflow: "hidden",
          position: "relative",
        }}>
          {product.imageUrl
            ? <img className="card-img" src={product.imageUrl} alt={product.name}
                style={{ width: "85%", height: "200px", objectFit: "contain", display: "block", margin: "0 auto", transition: "transform 0.4s ease", mixBlendMode: "screen" }}
                loading="lazy" />
            : <>
                <div style={{ fontSize: 72, lineHeight: 1 }}>
                  {CATEGORY_EMOJI[product.category.slug] ?? "📦"}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", padding: "0 4px" }}>
                  {product.name}
                </div>
              </>
          }
          {discount !== null && (
            <span style={{ position: "absolute", top: 0, right: 0, background: "#ef4444", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: "0 0 0 10px" }}>
              -{discount}%
            </span>
          )}
          {product.isFeatured && (
            <span style={{ position: "absolute", top: 0, left: 0, background: "rgba(99,102,241,0.9)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: "0 0 10px 0", letterSpacing: "0.05em" }}>
              ХИТ
            </span>
          )}
        </div>

        {/* Info zone */}
        <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6366f1", marginBottom: 4 }}>
            {product.brand?.name ?? CATEGORY_RU[product.category.slug] ?? product.category.name}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3, color: "#f0f0f5", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {product.name}
          </div>
          {(() => {
            const rating = product.rating ?? 5.0;
            const reviewCount = product.reviewCount ?? 0;
            const full = Math.floor(rating);
            return (
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 5, marginBottom: 2 }}>
                <span style={{ color: "#f59e0b", fontSize: 11 }}>{"★".repeat(full)}{"☆".repeat(5 - full)}</span>
                <span style={{ color: "var(--muted)", fontSize: 11 }}>{rating.toFixed(1)} ({reviewCount.toLocaleString("ru-RU")})</span>
              </div>
            );
          })()}
          <div style={{ marginTop: 4, display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#f0f0f5" }}>{formatRub(product.price)}</span>
            {product.oldPrice !== null && (
              <span style={{ fontSize: 12, color: "#6b6b80", textDecoration: "line-through" }}>
                {formatRub(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* CTA */}
      <div style={{ padding: "0 16px 16px" }}>
        <button
          className="cta-btn"
          onClick={() => onAddToCart(product)}
          style={{
            width: "100%", padding: "10px 0", borderRadius: 8, marginTop: 0,
            background: inCart ? "#6366f1" : "transparent",
            border: inCart ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.1)",
            color: inCart ? "#fff" : "#f0f0f5",
            fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
          }}
        >
          {inCart ? "✓ В корзине" : "В корзину"}
        </button>
      </div>
    </article>
  );
}

// ─── FilterSidebar ────────────────────────────────────────────────────────────
function FilterSidebar({ filters, activeFilters, onChange }: {
  filters: FiltersResponse;
  activeFilters: ProductFilters;
  onChange: (updates: Partial<ProductFilters>) => void;
}) {
  const totalCount = filters.categories.reduce((s, c) => s + c.count, 0);
  const PRICE_RANGES = [
    { label: "До 15 000 ₽", min: 0, max: 15000 },
    { label: "15 000 – 60 000 ₽", min: 15000, max: 60000 },
    { label: "60 000 – 100 000 ₽", min: 60000, max: 100000 },
    { label: "Свыше 100 000 ₽", min: 100000, max: 9999999 },
  ];
  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>Категория</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <button onClick={() => onChange({ category: undefined, page: 1 })} style={filterBtn(!activeFilters.category)}>
            Все <span style={{ marginLeft: "auto", opacity: 0.4 }}>{totalCount}</span>
          </button>
          {(() => {
            const CAT_FIRST  = ["iphone","macbook","airpods","watches","vision","gaming"];
            const CAT_BRANDS = ["dji","microphones","cameras","rayban","whoop","dyson","yandex","plaud-brand"];
            const allOrder = [...CAT_FIRST, ...CAT_BRANDS];
            const sorted = [...filters.categories]
              .filter(c => allOrder.includes(c.slug))
              .sort((a, b) => allOrder.indexOf(a.slug) - allOrder.indexOf(b.slug));
            const first  = sorted.filter(c => CAT_FIRST.includes(c.slug));
            const brands = sorted.filter(c => CAT_BRANDS.includes(c.slug));
            return (
              <>
                {first.map(cat => (
                  <button key={cat.id} onClick={() => onChange({ category: cat.slug, page: 1 })} style={filterBtn(activeFilters.category === cat.slug)}>
                    {CATEGORY_EMOJI[cat.slug]} {CATEGORY_RU[cat.slug] ?? cat.name}
                    <span style={{ marginLeft: "auto", opacity: 0.4 }}>{cat.count}</span>
                  </button>
                ))}
                {brands.length > 0 && (
                  <>
                    <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 0" }} />
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", padding: "4px 0" }}>Бренды</div>
                    {brands.map(cat => (
                      <button key={cat.id} onClick={() => onChange({ category: cat.slug, page: 1 })} style={filterBtn(activeFilters.category === cat.slug)}>
                        {CATEGORY_EMOJI[cat.slug]} {CATEGORY_RU[cat.slug] ?? cat.name}
                        <span style={{ marginLeft: "auto", opacity: 0.4 }}>{cat.count}</span>
                      </button>
                    ))}
                  </>
                )}
              </>
            );
          })()}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>Бренд</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <button onClick={() => onChange({ brand: undefined, page: 1 })} style={filterBtn(!activeFilters.brand)}>Все бренды</button>
          {filters.brands.filter((b) => b.count > 0).map((brand) => (
            <button key={brand.id} onClick={() => onChange({ brand: brand.slug, page: 1 })} style={filterBtn(activeFilters.brand === brand.slug)}>
              {brand.name} <span style={{ marginLeft: "auto", opacity: 0.4 }}>{brand.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>Цена</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {PRICE_RANGES.map((range) => {
            const isActive = activeFilters.minPrice === range.min && activeFilters.maxPrice === range.max;
            return (
              <button key={range.label} onClick={() => isActive ? onChange({ minPrice: undefined, maxPrice: undefined, page: 1 }) : onChange({ minPrice: range.min, maxPrice: range.max, page: 1 })} style={filterBtn(isActive)}>
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      {(activeFilters.category || activeFilters.brand || activeFilters.minPrice !== undefined) && (
        <button onClick={() => onChange({ category: undefined, brand: undefined, minPrice: undefined, maxPrice: undefined, page: 1 })}
          style={{ padding: "8px 0", borderRadius: 8, border: "1px solid var(--border)", background: "transparent", color: "var(--muted)", fontSize: 12, cursor: "pointer" }}>
          Сбросить фильтры
        </button>
      )}
    </aside>
  );
}

// ─── CatalogPage ──────────────────────────────────────────────────────────────
export function CatalogPage() {
  useEffect(() => { document.title = "Каталог — ABC Store"; return () => { document.title = "ABC Store — Гаджеты для жизни"; }; }, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  useScrollReveal(products);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 12, totalPages: 0 });
  const [filterData, setFilterData] = useState<FiltersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  // Корзина
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("cart") ?? "[]"); } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  // Сохраняем корзину в localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductWithRelations) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  };
  const changeQty = (id: string, delta: number) => {
    setCart((prev) => prev
      .map((i) => i.product.id === id ? { ...i, qty: i.qty + delta } : i)
      .filter((i) => i.qty > 0)
    );
  };
  const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i.product.id !== id));
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const activeFilters: ProductFilters = {
    category: searchParams.get("category") ?? undefined,
    brand: searchParams.get("brand") ?? undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    search: searchParams.get("search") ?? undefined,
    sort: searchParams.get("sort") ?? "popular",
    page: Number(searchParams.get("page") ?? 1),
  };

  const updateFilters = useCallback((updates: Partial<ProductFilters>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([k, v]) => {
        if (v === undefined || v === null) next.delete(k);
        else next.set(k, String(v));
      });
      return next;
    });
  }, [setSearchParams]);

  useEffect(() => {
    getProductFilters().then(setFilterData).catch(() => null);
  }, []);

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  useEffect(() => {
    setLoading(true); setError(null);
    getProducts(activeFilters)
      .then(({ data, meta }) => { setProducts(data); setMeta(meta); })
      .catch(() => setError("Не удалось подключиться к серверу. Убедитесь, что API запущен."))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: search || undefined, page: 1 });
  };

  const titleRu = activeFilters.category ? (CATEGORY_RU[activeFilters.category] ?? "Каталог") : "Каталог";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        :root { --bg:#0a0a0f; --card-bg:#13131a; --border:rgba(255,255,255,0.08); --text:#f0f0f5; --muted:#6b6b80; --accent:#6366f1; --img-bg:#1a1a24; }
        * { box-sizing:border-box; } body { margin:0; background:var(--bg); }
        ::placeholder { color:var(--muted); }
        @keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.7} }
        .product-card { cursor:pointer; }
        .product-card:hover { transform:translateY(-4px); box-shadow:0 16px 48px rgba(0,0,0,0.4); border-color:rgba(99,102,241,0.3) !important; }
        .product-card:hover .card-img { transform:scale(1.06); }
        .cta-btn:hover { background:#6366f1 !important; border-color:#6366f1 !important; color:#fff !important; }
        .catalog-layout { display:grid; grid-template-columns:210px 1fr; gap:32px; }
        .catalog-layout > div { min-width:0; }
        .product-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .mobile-cats { display:none; }
        .header-nav { display:flex; align-items:center; gap:20px; font-size:13px; }
        .cat-burger { display:none; background:none; border:none; cursor:pointer; padding:6px; color:rgba(255,255,255,0.85); flex-direction:column; gap:5px; }
        .cat-burger-bar { display:block; width:22px; height:2px; background:currentColor; border-radius:2px; transition:transform 0.25s ease, opacity 0.2s ease; }
        .cat-mobile-nav { background:rgba(10,10,15,0.97); backdrop-filter:blur(16px); border-bottom:1px solid rgba(255,255,255,0.07); animation:catNavSlide 0.22s ease; position:sticky; top:60px; z-index:99; }
        .cat-mobile-link { display:block; padding:1rem 1.25rem; color:rgba(255,255,255,0.75); text-decoration:none; font-size:1rem; font-weight:500; border-bottom:1px solid rgba(255,255,255,0.05); transition:background 0.15s, color 0.15s; }
        .cat-mobile-link:active { background:rgba(255,255,255,0.05); }
        @keyframes catNavSlide { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width:768px) {
          .catalog-layout { grid-template-columns:1fr; }
          .catalog-sidebar { display:none; }
          .product-grid { grid-template-columns:repeat(2,1fr); }
          .header-nav { display:none; }
          .cat-burger { display:flex; }
          .mobile-cats { display:flex; overflow-x:auto; gap:8px; padding-bottom:4px; margin-bottom:20px; scrollbar-width:none; }
          .mobile-cats::-webkit-scrollbar { display:none; }
          .catalog-header { padding:0 16px !important; }
          .product-img-zone { height:160px !important; }
        }
        @media (min-width:769px) and (max-width:1100px) {
          .product-grid { grid-template-columns:repeat(3,1fr); }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "inherit", color: "var(--text)" }}>

        {/* Header */}
        <header className="catalog-header" style={{
          borderBottom: "1px solid var(--border)", padding: "0 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 60, position: "sticky", top: 0,
          background: "rgba(10,10,15,0.9)", backdropFilter: "blur(16px)", zIndex: 100,
        }}>
          <Link to="/" style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)", textDecoration: "none" }}>
            abc<span style={{ color: "var(--accent)" }}>store</span>
          </Link>
          <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 400, margin: "0 24px" }}>
            <div style={{ position: "relative" }}>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск товаров..."
                style={{ width: "100%", padding: "8px 16px 8px 36px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--text)", fontSize: 13, outline: "none" }} />
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}>⌕</span>
            </div>
          </form>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <nav className="header-nav">
              <Link to="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Главная</Link>
              <Link to="/catalog" style={{ color: "var(--text)", textDecoration: "none", fontWeight: 600 }}>Каталог</Link>
              <Link to="/contacts" style={{ color: "var(--muted)", textDecoration: "none" }}>Контакты</Link>
            </nav>
            <button onClick={() => setCartOpen(true)} style={{
              background: cartCount > 0 ? "var(--accent)" : "var(--card-bg)",
              border: "1px solid var(--border)", borderRadius: 10, padding: "7px 14px",
              color: "var(--text)", fontSize: 13, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              🛒{cartCount > 0 && <span style={{ background: "#fff", color: "var(--accent)", borderRadius: 100, fontSize: 11, fontWeight: 800, padding: "1px 7px" }}>{cartCount}</span>}
            </button>
            <button className="cat-burger" onClick={() => setMobileNavOpen(o => !o)} aria-label={mobileNavOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={mobileNavOpen}>
              <span className="cat-burger-bar" style={mobileNavOpen ? { transform: "translateY(7px) rotate(45deg)" } : {}} />
              <span className="cat-burger-bar" style={mobileNavOpen ? { opacity: 0 } : {}} />
              <span className="cat-burger-bar" style={mobileNavOpen ? { transform: "translateY(-7px) rotate(-45deg)" } : {}} />
            </button>
          </div>
        </header>
        {mobileNavOpen && (
          <div className="cat-mobile-nav">
            <Link to="/" className="cat-mobile-link" onClick={() => setMobileNavOpen(false)}>Главная</Link>
            <Link to="/catalog" className="cat-mobile-link" onClick={() => setMobileNavOpen(false)}>Каталог</Link>
            <Link to="/contacts" className="cat-mobile-link" onClick={() => setMobileNavOpen(false)}>Контакты</Link>
          </div>
        )}

        {/* Content */}
        <div className="catalog-content" style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(20px,3vw,32px) clamp(16px,3vw,32px)" }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ margin: "0 0 12px", fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em" }}>{titleRu}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              {(["new", "price_asc", "price_desc", "popular"] as const).map((v) => {
                const labels = { new: "Новые", price_asc: "Дешевле", price_desc: "Дороже", popular: "Популярные" };
                const active = (activeFilters.sort ?? "new") === v;
                return (
                  <button key={v} onClick={() => updateFilters({ sort: v, page: 1 })} style={{
                    padding: "6px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer", transition: "all 0.15s",
                    background: active ? "var(--accent)" : "transparent",
                    border: active ? "none" : "1px solid var(--border)",
                    color: active ? "white" : "var(--muted)",
                    fontWeight: active ? 600 : 400,
                  }}>{labels[v]}</button>
                );
              })}
            </div>
            {!loading && (
              <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--muted)" }}>
                {meta.total} {meta.total === 1 ? "товар" : meta.total < 5 ? "товара" : "товаров"}
                {activeFilters.search ? ` по запросу «${activeFilters.search}»` : ""}
              </p>
            )}
          </div>

          {filterData && (
            <div className="mobile-cats">
              <button onClick={() => updateFilters({ category: undefined, page: 1 })} style={{ flexShrink: 0, padding: "7px 16px", borderRadius: 20, border: `1px solid ${!activeFilters.category ? "var(--accent)" : "var(--border)"}`, background: !activeFilters.category ? "rgba(99,102,241,0.1)" : "transparent", color: !activeFilters.category ? "var(--accent)" : "var(--text)", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>Все</button>
              {(() => {
                const ORDER = ["iphone","macbook","airpods","watches","vision","gaming","dji","microphones","cameras","rayban","whoop","dyson","yandex","plaud-brand"];
                return filterData.categories.filter(c => c.count > 0)
                  .sort((a, b) => (ORDER.indexOf(a.slug) === -1 ? 99 : ORDER.indexOf(a.slug)) - (ORDER.indexOf(b.slug) === -1 ? 99 : ORDER.indexOf(b.slug)))
                  .map(cat => (
                    <button key={cat.id} onClick={() => updateFilters({ category: cat.slug, page: 1 })} style={{ flexShrink: 0, padding: "7px 16px", borderRadius: 20, border: `1px solid ${activeFilters.category === cat.slug ? "var(--accent)" : "var(--border)"}`, background: activeFilters.category === cat.slug ? "rgba(99,102,241,0.1)" : "transparent", color: activeFilters.category === cat.slug ? "var(--accent)" : "var(--text)", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>
                      {CATEGORY_EMOJI[cat.slug]} {CATEGORY_RU[cat.slug] ?? cat.name}
                    </button>
                  ));
              })()}
            </div>
          )}

          <div className="catalog-layout">
            {filterData && <div className="catalog-sidebar"><FilterSidebar filters={filterData} activeFilters={activeFilters} onChange={updateFilters} /></div>}

            <div>
              {loading && (
                <div className="product-grid">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} style={{ borderRadius: 16, background: "var(--card-bg)", aspectRatio: "1/1", animation: "pulse 1.5s ease-in-out infinite" }} />
                  ))}
                </div>
              )}

              {error && (
                <div style={{ textAlign: "center", padding: "80px 20px" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
                  <div style={{ fontSize: 15, color: "var(--muted)" }}>{error}</div>
                </div>
              )}

              {!loading && !error && products.length === 0 && (
                <div style={{ textAlign: "center", padding: "80px 20px" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                  <div style={{ fontSize: 15, color: "var(--muted)" }}>Ничего не найдено</div>
                  <button onClick={() => { setSearch(""); updateFilters({ category: undefined, brand: undefined, minPrice: undefined, maxPrice: undefined, search: undefined, page: 1 }); }}
                    style={{ marginTop: 16, padding: "8px 20px", borderRadius: 8, border: "1px solid var(--border)", background: "transparent", color: "var(--text)", cursor: "pointer", fontSize: 13 }}>
                    Сбросить фильтры
                  </button>
                </div>
              )}

              {!loading && !error && products.length > 0 && (
                <>
                  <div className="product-grid" key={searchParams.toString()}>
                    {products.map((p, idx) => (
                      <ProductCard key={p.id} product={p} onAddToCart={addToCart} inCart={cart.some((i) => i.product.id === p.id)} reveal={idx < 8} />
                    ))}
                  </div>

                  {meta.totalPages > 1 && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 40 }}>
                      <button disabled={meta.page <= 1} onClick={() => updateFilters({ page: meta.page - 1 })} style={pageBtn(false, meta.page <= 1)}>← Назад</button>
                      {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                        <button key={p} onClick={() => updateFilters({ page: p })} style={pageBtn(p === meta.page, false)}>{p}</button>
                      ))}
                      <button disabled={meta.page >= meta.totalPages} onClick={() => updateFilters({ page: meta.page + 1 })} style={pageBtn(false, meta.page >= meta.totalPages)}>Вперёд →</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Telegram float button */}
        <a href="https://t.me/ABCapplemanager" target="_blank" rel="noreferrer" style={{
          position: "fixed", bottom: 28, right: 28,
          background: "#2AABEE", color: "#fff",
          borderRadius: 100, padding: "12px 20px",
          fontSize: 14, fontWeight: 700, textDecoration: "none",
          display: "flex", alignItems: "center", gap: 8,
          boxShadow: "0 4px 24px rgba(42,171,238,0.4)", zIndex: 99,
        }}>
          ✈️ Написать менеджеру
        </a>
      </div>

      {/* Модалки */}
      {cartOpen && (
        <CartSidebar
          cart={cart}
          onClose={() => setCartOpen(false)}
          onChangeQty={changeQty}
          onRemove={removeFromCart}
          onOrder={() => { setCartOpen(false); setOrderOpen(true); }}
        />
      )}
      {orderOpen && (
        <OrderModal
          cart={cart}
          onClose={() => setOrderOpen(false)}
          onSuccess={() => { setOrderOpen(false); clearCart(); setSuccessOpen(true); }}
        />
      )}
      {successOpen && <SuccessModal onClose={() => setSuccessOpen(false)} />}
    </>
  );
}