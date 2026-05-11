import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  getProducts,
  getProductFilters,
  postOrder,
  type ProductWithRelations,
  type ProductsResponse,
  type FiltersResponse,
  type ProductFilters,
} from "../shared/api/product";

// ─── Курс доллара ─────────────────────────────────────────────────────────────
const USD_TO_RUB = 90;
const toRub = (usd: number) => Math.round(usd * USD_TO_RUB);
const formatRub = (usd: number) =>
  toRub(usd).toLocaleString("ru-RU") + " ₽";

interface CartItem { product: ProductWithRelations; qty: number; }

// ─── Переводы категорий ───────────────────────────────────────────────────────
const CATEGORY_RU: Record<string, string> = {
  phones: "Смартфоны", laptops: "Ноутбуки", tablets: "Планшеты",
  headphones: "Наушники", watches: "Часы",
};
const CATEGORY_EMOJI: Record<string, string> = {
  phones: "📱", laptops: "💻", tablets: "🖥️", headphones: "🎧", watches: "⌚",
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
  const total = cart.reduce((s, i) => s + toRub(i.product.price) * i.qty, 0);
  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
        zIndex: 200, backdropFilter: "blur(4px)",
      }} />
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 380,
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

  const total = cart.reduce((s, i) => s + toRub(i.product.price) * i.qty, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) { setError("Заполните имя и телефон"); return; }
    setSending(true); setError("");
    try {
      await postOrder({
        customerName: name.trim(),
        customerPhone: phone.trim(),
        comment: comment.trim() || undefined,
        items: cart.map((i) => ({
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
              <span style={{ fontWeight: 600 }}>{(toRub(product.price) * qty).toLocaleString("ru-RU")} ₽</span>
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
function ProductCard({ product, onAddToCart, inCart }: {
  product: ProductWithRelations;
  onAddToCart: (p: ProductWithRelations) => void;
  inCart: boolean;
}) {
  const hasDiscount = product.oldPrice !== null && product.oldPrice > product.price;
  const discount = hasDiscount ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100) : null;
  const emoji = CATEGORY_EMOJI[product.category.slug] ?? "📦";

  return (
    <article style={{
      background: "var(--card-bg)", border: "1px solid var(--border)",
      borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column",
      transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer",
    }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div style={{ aspectRatio: "4/3", background: "var(--img-bg)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {product.imageUrl
          ? <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 16 }} loading="lazy" />
          : <div style={{ fontSize: 52, opacity: 0.2 }}>{emoji}</div>
        }
        {discount !== null && (
          <span style={{ position: "absolute", top: 10, right: 10, background: "var(--accent)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>
            -{discount}%
          </span>
        )}
        {product.isFeatured && (
          <span style={{ position: "absolute", top: 10, left: 10, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", color: "var(--text)", fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Хит
          </span>
        )}
      </div>
      <div style={{ padding: "14px 16px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {product.brand?.name ?? CATEGORY_RU[product.category.slug] ?? product.category.name}
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{product.name}</div>
        {product.description && (
          <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5, flexGrow: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {product.description}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
          <span style={{ fontSize: 18, fontWeight: 700 }}>{formatRub(product.price)}</span>
          {product.oldPrice !== null && (
            <span style={{ fontSize: 13, color: "var(--muted)", textDecoration: "line-through" }}>
              {formatRub(product.oldPrice)}
            </span>
          )}
        </div>
        <button
          onClick={() => onAddToCart(product)}
          style={{
            marginTop: 10, padding: "9px 0", borderRadius: 10,
            border: inCart ? "none" : "1px solid var(--border)",
            background: inCart ? "var(--accent)" : "transparent",
            color: inCart ? "#fff" : "var(--text)",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            transition: "all 0.15s", width: "100%",
          }}
          onMouseEnter={(e) => { if (!inCart) { (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)"; } }}
          onMouseLeave={(e) => { if (!inCart) { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; } }}
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
  const toUsd = (rub: number) => Math.round(rub / USD_TO_RUB);
  const PRICE_RANGES = [
    { label: "До 15 000 ₽", min: 0, max: toUsd(15000) },
    { label: "15 000 – 60 000 ₽", min: toUsd(15000), max: toUsd(60000) },
    { label: "60 000 – 100 000 ₽", min: toUsd(60000), max: toUsd(100000) },
    { label: "Свыше 100 000 ₽", min: toUsd(100000), max: 99999 },
  ];
  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>Категория</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <button onClick={() => onChange({ category: undefined, page: 1 })} style={filterBtn(!activeFilters.category)}>
            Все <span style={{ marginLeft: "auto", opacity: 0.4 }}>{totalCount}</span>
          </button>
          {filters.categories.filter((c) => c.count > 0).map((cat) => (
            <button key={cat.id} onClick={() => onChange({ category: cat.slug, page: 1 })} style={filterBtn(activeFilters.category === cat.slug)}>
              {CATEGORY_EMOJI[cat.slug]} {CATEGORY_RU[cat.slug] ?? cat.name}
              <span style={{ marginLeft: "auto", opacity: 0.4 }}>{cat.count}</span>
            </button>
          ))}
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
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
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "'DM Sans',system-ui,sans-serif", color: "var(--text)" }}>

        {/* Header */}
        <header style={{
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
          <nav style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 13 }}>
            <Link to="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Главная</Link>
            <Link to="/catalog" style={{ color: "var(--text)", textDecoration: "none", fontWeight: 600 }}>Каталог</Link>
            <Link to="/contacts" style={{ color: "var(--muted)", textDecoration: "none" }}>Контакты</Link>
            <button onClick={() => setCartOpen(true)} style={{
              position: "relative", background: cartCount > 0 ? "var(--accent)" : "var(--card-bg)",
              border: "1px solid var(--border)", borderRadius: 10, padding: "7px 14px",
              color: "var(--text)", fontSize: 13, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              🛒 Корзина
              {cartCount > 0 && (
                <span style={{ background: "#fff", color: "var(--accent)", borderRadius: 100, fontSize: 11, fontWeight: 800, padding: "1px 7px" }}>{cartCount}</span>
              )}
            </button>
          </nav>
        </header>

        {/* Content */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px" }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em" }}>{titleRu}</h1>
            {!loading && (
              <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--muted)" }}>
                {meta.total} {meta.total === 1 ? "товар" : meta.total < 5 ? "товара" : "товаров"}
                {activeFilters.search ? ` по запросу «${activeFilters.search}»` : ""}
              </p>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "210px 1fr", gap: 32 }}>
            {filterData && <FilterSidebar filters={filterData} activeFilters={activeFilters} onChange={updateFilters} />}

            <div>
              {loading && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} style={{ borderRadius: 16, background: "var(--card-bg)", aspectRatio: "3/4", animation: "pulse 1.5s ease-in-out infinite" }} />
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
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
                    {products.map((p) => (
                      <ProductCard key={p.id} product={p} onAddToCart={addToCart} inCart={cart.some((i) => i.product.id === p.id)} />
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