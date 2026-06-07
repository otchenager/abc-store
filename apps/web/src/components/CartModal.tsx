import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { ProductWithRelations } from "../shared/api/product";

interface CartItem {
  product: ProductWithRelations;
  qty: number;
}

interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

const formatRub = (n: number) => n.toLocaleString("ru-RU") + " ₽";

export function CartModal({ open, onClose }: CartModalProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!open) return;
    try {
      setItems(JSON.parse(localStorage.getItem("cart") ?? "[]"));
    } catch { /* ignore */ }
  }, [open]);

  const total = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  const remove = (id: string) => {
    const updated = items.filter(i => i.product.id !== id);
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  if (!open) return null;

  const telegramText = items
    .map(i => `${i.product.name} ×${i.qty}`)
    .join(", ");

  return createPortal(
    <>
      <style>{`
        .cart-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 200;
          backdrop-filter: blur(4px);
        }
        .cart-drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: 400px;
          background: #13131a;
          border-left: 1px solid rgba(255,255,255,0.08);
          z-index: 201;
          display: flex; flex-direction: column;
          overflow: hidden;
        }
        .cart-header {
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: space-between;
          flex-shrink: 0;
        }
        .cart-body {
          flex: 1; overflow-y: auto; padding: 16px;
        }
        .cart-item {
          display: flex; gap: 12px; align-items: flex-start;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .cart-item-img {
          width: 80px; height: 80px;
          border-radius: 8px;
          background: #f5f5f7;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .cart-item-info { flex: 1; min-width: 0; }
        .cart-footer {
          padding: 16px 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
        }
        .cart-checkout-btn {
          display: block; width: 100%;
          padding: 14px;
          background: #6366f1; color: #fff;
          border: none; border-radius: 12px;
          font-size: 16px; font-weight: 700;
          cursor: pointer; text-align: center;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s;
        }
        .cart-checkout-btn:hover { background: #4f52d8; }
        @media (max-width: 768px) {
          .cart-drawer {
            top: auto; left: 0; right: 0; bottom: 0;
            width: 100%;
            max-height: 90vh;
            overflow: hidden;
            padding: 0;
            border-left: none;
            border-top: 1px solid rgba(255,255,255,0.08);
            border-radius: 20px 20px 0 0;
          }
          .cart-item {
            align-items: center;
          }
          .cart-item-img {
            width: 56px; height: 56px;
          }
          .cart-item-info {
            font-size: 13px;
          }
          .cart-footer {
            padding: 12px 16px;
          }
        }
      `}</style>

      <div className="cart-overlay" onClick={onClose} />

      <div className="cart-drawer">
        <div className="cart-header">
          <span style={{ fontSize: 18, fontWeight: 700, color: "#f0f0f5", fontFamily: "'DM Sans', sans-serif" }}>
            Корзина {count > 0 && `(${count})`}
          </span>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#6b6b80", fontSize: 20, cursor: "pointer", lineHeight: 1, padding: 4 }}
          >✕</button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 16px", color: "#6b6b80" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
              <div style={{ fontSize: 15 }}>Корзина пуста</div>
            </div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item.product.id}>
                <div className="cart-item-img">
                  {item.product.imageUrl
                    ? <img src={item.product.imageUrl} alt={item.product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    : <span style={{ fontSize: 28, opacity: 0.3 }}>📦</span>
                  }
                </div>
                <div className="cart-item-info">
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#f0f0f5", lineHeight: 1.3, marginBottom: 4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
                    {item.product.name}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#6366f1" }}>{formatRub(item.product.price)}</div>
                  <div style={{ fontSize: 12, color: "#6b6b80", marginTop: 2 }}>× {item.qty}</div>
                </div>
                <button
                  onClick={() => remove(item.product.id)}
                  style={{ background: "none", border: "none", color: "#6b6b80", cursor: "pointer", fontSize: 16, padding: 4, flexShrink: 0 }}
                >✕</button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 15, fontWeight: 600, color: "#f0f0f5" }}>
              <span>Итого</span>
              <span>{formatRub(total)}</span>
            </div>
            <a
              href={`https://t.me/ABCapplemanager?text=${encodeURIComponent(`Хочу оформить заказ: ${telegramText}`)}`}
              target="_blank"
              rel="noreferrer"
              className="cart-checkout-btn"
            >
              Оформить заказ ✈️
            </a>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
