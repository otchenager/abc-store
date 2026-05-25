import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductBySlug, type ProductWithRelations } from "../shared/api/product";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

const formatRub = (n: number) => n.toLocaleString("ru-RU") + " ₽";

const CATEGORY_LABEL: Record<string, string> = {
  iphone: "Смартфоны", macbook: "Ноутбуки", airpods: "Наушники",
  watches: "Носимые", vision: "VR / AR", gaming: "Консоли",
  dji: "DJI", cameras: "Камеры DJI", microphones: "Микрофоны",
  rayban: "Ray-Ban", whoop: "WHOOP", garmin: "Garmin",
  dyson: "Dyson", yandex: "Яндекс", "plaud-brand": "Plaud",
  "smart-glasses": "Умные очки", dictaphones: "AI-гаджеты",
};



const PRODUCT_VARIANTS: Record<string, {
  colors?: { name: string; hex: string }[];
  storage?: string[];
}> = {
  // ── iPhone 17 Pro Max ──────────────────────────────────────────────────────
  "iphone-17-pro-max-256": {
    colors: [
      { name: "Cosmic Orange", hex: "#C84B2F" },
      { name: "Deep Blue",     hex: "#1B2B4B" },
      { name: "Silver",        hex: "#E8E8E8" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  "iphone-17-pro-max-512": {
    colors: [
      { name: "Cosmic Orange", hex: "#C84B2F" },
      { name: "Deep Blue",     hex: "#1B2B4B" },
      { name: "Silver",        hex: "#E8E8E8" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  // ── iPhone 17 Pro ──────────────────────────────────────────────────────────
  "iphone-17-pro-256": {
    colors: [
      { name: "Cosmic Orange", hex: "#C84B2F" },
      { name: "Deep Blue",     hex: "#1B2B4B" },
      { name: "Silver",        hex: "#E8E8E8" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  "iphone-17-pro-512": {
    colors: [
      { name: "Cosmic Orange", hex: "#C84B2F" },
      { name: "Deep Blue",     hex: "#1B2B4B" },
      { name: "Silver",        hex: "#E8E8E8" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  // ── iPhone 17 ─────────────────────────────────────────────────────────────
  "iphone-17-128": {
    colors: [
      { name: "Black",     hex: "#1C1C1E" },
      { name: "White",     hex: "#F5F5F0" },
      { name: "Lavender",  hex: "#C8B8D8" },
      { name: "Mist Blue", hex: "#8EB4C8" },
      { name: "Sage",      hex: "#8FA88A" },
    ],
    storage: ["128GB", "256GB", "512GB"],
  },
  "iphone-17-256": {
    colors: [
      { name: "Black",     hex: "#1C1C1E" },
      { name: "White",     hex: "#F5F5F0" },
      { name: "Lavender",  hex: "#C8B8D8" },
      { name: "Mist Blue", hex: "#8EB4C8" },
      { name: "Sage",      hex: "#8FA88A" },
    ],
    storage: ["128GB", "256GB", "512GB"],
  },
  // ── iPhone 16 Pro Max ─────────────────────────────────────────────────────
  "iphone-16-pro-max-256": {
    colors: [
      { name: "Desert Titanium", hex: "#C8A882" },
      { name: "Natural Titanium", hex: "#E3DDD4" },
      { name: "White Titanium", hex: "#F5F5F0" },
      { name: "Black Titanium", hex: "#2C2C2E" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  // ── iPhone 16 Pro ─────────────────────────────────────────────────────────
  "iphone-16-pro-256": {
    colors: [
      { name: "Desert Titanium", hex: "#C8A882" },
      { name: "Natural Titanium", hex: "#E3DDD4" },
      { name: "White Titanium", hex: "#F5F5F0" },
      { name: "Black Titanium", hex: "#2C2C2E" },
    ],
    storage: ["128GB", "256GB", "512GB", "1TB"],
  },
  // ── iPhone 16 ─────────────────────────────────────────────────────────────
  "iphone-16-128": {
    colors: [
      { name: "Black", hex: "#1C1C1E" },
      { name: "White", hex: "#F5F5F0" },
      { name: "Pink", hex: "#F4CEDB" },
      { name: "Teal", hex: "#5B8A8B" },
      { name: "Ultramarine", hex: "#4B6CB7" },
    ],
    storage: ["128GB", "256GB", "512GB"],
  },
  // ── iPhone 15 Pro Max ─────────────────────────────────────────────────────
  "iphone-15-pro-max-256": {
    colors: [
      { name: "Natural Titanium", hex: "#E3DDD4" },
      { name: "Blue Titanium", hex: "#4E6E8E" },
      { name: "White Titanium", hex: "#F5F5F0" },
      { name: "Black Titanium", hex: "#2C2C2E" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  // ── iPhone 15 Pro ─────────────────────────────────────────────────────────
  "iphone-15-pro-256": {
    colors: [
      { name: "Natural Titanium", hex: "#E3DDD4" },
      { name: "Blue Titanium", hex: "#4E6E8E" },
      { name: "White Titanium", hex: "#F5F5F0" },
      { name: "Black Titanium", hex: "#2C2C2E" },
    ],
    storage: ["128GB", "256GB", "512GB"],
  },
  // ── iPhone 15 ─────────────────────────────────────────────────────────────
  "iphone-15-128": {
    colors: [
      { name: "Black", hex: "#1C1C1E" },
      { name: "Green", hex: "#C0D5C2" },
      { name: "Yellow", hex: "#F9E27A" },
      { name: "Pink", hex: "#F4CEDB" },
      { name: "Blue", hex: "#A2B8D0" },
    ],
    storage: ["128GB", "256GB", "512GB"],
  },
  // ── iPhone 14 Pro Max ─────────────────────────────────────────────────────
  "iphone-14-pro-max-256": {
    colors: [
      { name: "Deep Purple", hex: "#4F3660" },
      { name: "Gold", hex: "#F4E4C1" },
      { name: "Silver", hex: "#F1F2ED" },
      { name: "Space Black", hex: "#1C1B1E" },
    ],
    storage: ["128GB", "256GB", "512GB", "1TB"],
  },
  // ── iPhone 14 ─────────────────────────────────────────────────────────────
  "iphone-14-128": {
    colors: [
      { name: "Midnight", hex: "#1F2024" },
      { name: "Starlight", hex: "#F2EFE7" },
      { name: "Blue", hex: "#A2B4C8" },
      { name: "Purple", hex: "#D3C6E0" },
      { name: "Product Red", hex: "#BF2E35" },
      { name: "Yellow", hex: "#FAE7A0" },
    ],
    storage: ["128GB", "256GB", "512GB"],
  },
  // ── MacBook Air 13 M4 ─────────────────────────────────────────────────────
  "macbook-air-13-m4-256": {
    colors: [
      { name: "Midnight", hex: "#1C2B3A" },
      { name: "Starlight", hex: "#E8E0D0" },
      { name: "Sky Blue", hex: "#B8D4E8" },
      { name: "Silver", hex: "#E0E0E0" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  "macbook-air-13-m4-512": {
    colors: [
      { name: "Midnight", hex: "#1C2B3A" },
      { name: "Starlight", hex: "#E8E0D0" },
      { name: "Sky Blue", hex: "#B8D4E8" },
      { name: "Silver", hex: "#E0E0E0" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  // ── MacBook Air 15 M4 ─────────────────────────────────────────────────────
  "macbook-air-15-m4-512": {
    colors: [
      { name: "Midnight", hex: "#1C2B3A" },
      { name: "Starlight", hex: "#E8E0D0" },
      { name: "Sky Blue", hex: "#B8D4E8" },
      { name: "Silver", hex: "#E0E0E0" },
    ],
    storage: ["512GB", "1TB"],
  },
  // ── MacBook Pro 14 M4 ─────────────────────────────────────────────────────
  "macbook-pro-14-m4-512": {
    colors: [
      { name: "Space Black", hex: "#1C1C1E" },
      { name: "Silver", hex: "#E0E0E0" },
    ],
    storage: ["512GB", "1TB", "2TB"],
  },
  "macbook-pro-14-m4-pro-512": {
    colors: [
      { name: "Space Black", hex: "#1C1C1E" },
      { name: "Silver", hex: "#E0E0E0" },
    ],
    storage: ["512GB", "1TB", "2TB"],
  },
  // ── MacBook Pro 16 M4 Pro ─────────────────────────────────────────────────
  "macbook-pro-16-m4-pro-512": {
    colors: [
      { name: "Space Black", hex: "#1C1C1E" },
      { name: "Silver", hex: "#E0E0E0" },
    ],
    storage: ["512GB", "1TB", "2TB"],
  },
  // ── AirPods ───────────────────────────────────────────────────────────────
  "airpods-pro-2-usb-c": {
    colors: [
      { name: "White", hex: "#F5F5F0" },
    ],
    storage: undefined,
  },
  "airpods-max-usb-c": {
    colors: [
      { name: "Midnight", hex: "#1C2B3A" },
      { name: "Starlight", hex: "#E8E0D0" },
      { name: "Blue", hex: "#A2B8D0" },
      { name: "Purple", hex: "#D3C6E0" },
      { name: "Orange", hex: "#E8845A" },
    ],
    storage: undefined,
  },
  // ── Samsung Galaxy S26 Ultra ──────────────────────────────────────────────
  "samsung-galaxy-s26-ultra": {
    colors: [
      { name: "Black",  hex: "#1C1C1E" },
      { name: "White",  hex: "#F5F5F0" },
      { name: "Blue",   hex: "#B8D4E8" },
      { name: "Purple", hex: "#4A3B6E" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  // ── Samsung Galaxy S26+ ───────────────────────────────────────────────────
  "samsung-galaxy-s26-plus": {
    colors: [
      { name: "Black",    hex: "#1C1C1E" },
      { name: "White",    hex: "#F5F5F0" },
      { name: "Sky Blue", hex: "#B8D4E8" },
      { name: "Purple",   hex: "#4A3B6E" },
    ],
    storage: ["256GB", "512GB"],
  },
  // ── Samsung Galaxy S26 ────────────────────────────────────────────────────
  "samsung-galaxy-s26": {
    colors: [
      { name: "Black",    hex: "#1C1C1E" },
      { name: "White",    hex: "#F5F5F0" },
      { name: "Sky Blue", hex: "#B8D4E8" },
      { name: "Purple",   hex: "#4A3B6E" },
    ],
    storage: ["256GB", "512GB"],
  },
  // ── Samsung Galaxy S25 Edge ───────────────────────────────────────────────
  "samsung-galaxy-s25-edge": {
    colors: [
      { name: "Titanium Silver", hex: "#E0E0E0" },
      { name: "Titanium Jetblack", hex: "#1C1C1E" },
      { name: "Titanium Icyblue", hex: "#B8CFDF" },
    ],
    storage: ["256GB", "512GB"],
  },
  // ── Samsung Galaxy Z Fold 7 ───────────────────────────────────────────────
  "samsung-galaxy-z-fold-7": {
    colors: [
      { name: "Blue Shadow",   hex: "#4A6FA5" },
      { name: "Silver Shadow", hex: "#C8C8CC" },
      { name: "Jet Black",     hex: "#1C1C1E" },
      { name: "Mint",          hex: "#B5CFC0" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  // ── Samsung Galaxy Z Flip 7 ───────────────────────────────────────────────
  "samsung-galaxy-z-flip-7": {
    colors: [
      { name: "Blue Shadow", hex: "#4A6FA5" },
      { name: "Jet Black",   hex: "#1C1C1E" },
      { name: "Coral Red",   hex: "#E8503A" },
      { name: "Mint",        hex: "#B5CFC0" },
    ],
    storage: ["256GB", "512GB"],
  },
  // ── Garmin ────────────────────────────────────────────────────────────────
  "garmin-fenix-8-solar": {
    colors: [
      { name: "Carbon Gray", hex: "#2C2C2E" },
      { name: "Titanium", hex: "#8E8E93" },
      { name: "Mineral Blue", hex: "#4A6FA5" },
    ],
    storage: undefined,
  },
  "garmin-fenix-8": {
    colors: [
      { name: "Carbon Gray", hex: "#2C2C2E" },
      { name: "Titanium", hex: "#8E8E93" },
      { name: "Sapphire Carbon Gray", hex: "#1C1C1E" },
    ],
    storage: undefined,
  },
  "garmin-forerunner-965": {
    colors: [
      { name: "Carbon Gray", hex: "#2C2C2E" },
      { name: "White", hex: "#F5F5F0" },
    ],
    storage: undefined,
  },
  "garmin-epix-pro-gen-2": {
    colors: [
      { name: "Carbon Gray", hex: "#2C2C2E" },
      { name: "Titanium", hex: "#8E8E93" },
    ],
    storage: undefined,
  },
};

function getVariants(slug: string) {
  if (PRODUCT_VARIANTS[slug]) return PRODUCT_VARIANTS[slug];
  const key = Object.keys(PRODUCT_VARIANTS).find(k => slug.startsWith(k));
  return key ? PRODUCT_VARIANTS[key] : null;
}

const STORAGE_PRICES: Record<string, Record<string, number>> = {
  "iphone-17-pro-max-256":     { "256GB": 119900, "512GB": 134900, "1TB": 154900 },
  "iphone-17-pro-max-512":     { "256GB": 119900, "512GB": 134900, "1TB": 154900 },
  "iphone-17-pro-256":         { "256GB": 104900, "512GB": 119900, "1TB": 139900 },
  "iphone-17-pro-512":         { "256GB": 104900, "512GB": 119900, "1TB": 139900 },
  "iphone-17-128":             { "128GB":  84900, "256GB":  94900, "512GB": 114900 },
  "iphone-17-256":             { "128GB":  84900, "256GB":  94900, "512GB": 114900 },
  "iphone-16-pro-max-256":     { "256GB":  99900, "512GB": 114900, "1TB": 134900 },
  "iphone-16-pro-256":         { "256GB":  89900, "512GB": 104900, "1TB": 124900 },
  "iphone-16-128":             { "128GB":  74900, "256GB":  84900, "512GB": 104900 },
  "iphone-15-pro-max-256":     { "256GB":  84900, "512GB":  99900, "1TB": 119900 },
  "iphone-15-pro-256":         { "256GB":  74900, "512GB":  89900, "1TB": 109900 },
  "iphone-15-128":             { "128GB":  64900, "256GB":  74900, "512GB":  94900 },
  "iphone-14-pro-max-256":     { "256GB":  69900, "512GB":  84900, "1TB":  99900 },
  "iphone-14-128":             { "128GB":  54900, "256GB":  64900, "512GB":  74900 },
  "macbook-air-13-m4-256":     { "256GB": 109900, "512GB": 124900, "1TB": 149900 },
  "macbook-air-13-m4-512":     { "256GB": 109900, "512GB": 124900, "1TB": 149900 },
  "macbook-air-15-m4-512":     { "512GB": 139900, "1TB": 159900 },
  "macbook-pro-14-m4-512":     { "512GB": 179900, "1TB": 209900, "2TB": 249900 },
  "macbook-pro-14-m4-pro-512": { "512GB": 219900, "1TB": 249900, "2TB": 289900 },
  "macbook-pro-16-m4-pro-512": { "512GB": 259900, "1TB": 289900, "2TB": 329900 },
  "samsung-galaxy-s26-ultra":  { "256GB": 129900, "512GB": 149900, "1TB": 174900 },
  "samsung-galaxy-s26-plus":   { "256GB": 109900, "512GB": 129900 },
  "samsung-galaxy-s26":        { "256GB":  89900, "512GB": 109900 },
  "samsung-galaxy-s25-edge":   { "256GB": 109900, "512GB": 129900 },
  "samsung-galaxy-z-fold-7":   { "256GB": 179900, "512GB": 209900, "1TB": 249900 },
  "samsung-galaxy-z-flip-7":   { "256GB": 119900, "512GB": 139900 },
};

const COLOR_FOLDER: Record<string, string> = {
  "iphone-17-pro-max-256": "iphone-17-pro-max",
  "iphone-17-pro-max-512": "iphone-17-pro-max",
  "iphone-17-pro-256":     "iphone-17-pro",
  "iphone-17-pro-512":     "iphone-17-pro",
  "iphone-17-128":         "iphone-17",
  "iphone-17-256":         "iphone-17",
  "iphone-16-pro-max-256": "iphone-16-pro-max",
  "iphone-16-pro-256":     "iphone-16-pro",
  "iphone-16-128":         "iphone-16",
  "iphone-15-pro-max-256": "iphone-15-pro-max",
  "iphone-15-pro-256":     "iphone-15-pro",
  "iphone-15-128":         "iphone-15",
  "iphone-14-pro-max-256": "iphone-14-pro-max",
  "iphone-14-128":         "iphone-14",
  "macbook-air-13-m4-256": "macbook-air-13-m4",
  "macbook-air-13-m4-512": "macbook-air-13-m4",
  "macbook-air-15-m4-512": "macbook-air-15-m4",
  "macbook-pro-14-m4-512":     "macbook-pro-14-m4",
  "macbook-pro-14-m4-pro-512": "macbook-pro-14-m4",
  "macbook-pro-16-m4-pro-512": "macbook-pro-16-m4",
  "samsung-galaxy-s26-ultra":  "samsung-galaxy-s26-ultra",
  "samsung-galaxy-s26-plus":   "samsung-galaxy-s26-plus",
  "samsung-galaxy-s26":        "samsung-galaxy-s26",
  "samsung-galaxy-s25-edge":   "samsung-galaxy-s25-edge",
  "samsung-galaxy-z-fold-7":   "samsung-galaxy-z-fold-7",
  "samsung-galaxy-z-flip-7":   "samsung-galaxy-z-flip-7",
  "airpods-max-usb-c":         "airpods-max",
};

const COLOR_FILE_OVERRIDES: Record<string, Record<string, string>> = {
  "samsung-galaxy-s26": {
    "Black":    "s26black-removebg-preview",
    "White":    "s26white-removebg-preview",
    "Sky Blue": "sky-blue",
    "Purple":   "s26purple-removebg-preview",
  },
  "samsung-galaxy-s26-plus": {
    "Black":    "s26black-removebg-preview",
    "White":    "s26white-removebg-preview",
    "Sky Blue": "sky-blue",
    "Purple":   "s26purple-removebg-preview",
  },
  "samsung-galaxy-z-fold-7": {
    "Jet Black":     "black",
    "Blue Shadow":   "blue",
    "Silver Shadow": "silver",
  },
  "samsung-galaxy-z-flip-7": {
    "Jet Black":   "black-removebg-preview",
    "Blue Shadow": "blue-removebg-preview",
    "Coral Red":   "red-removebg-preview",
  },
};

function getColorImage(slug: string, colorName: string): string | null {
  const folder = COLOR_FOLDER[slug];
  if (!folder) return null;
  const override = COLOR_FILE_OVERRIDES[slug]?.[colorName];
  const filename = override ?? colorName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return `/src/images/${folder}/${filename}.png`;
}

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [added, setAdded] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [imgZoomed, setImgZoomed] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [imgOpacity, setImgOpacity] = useState(1);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!slug) return;

    const key = `clicked_${slug}`;

    // Only fire once per browser session per product
    if (!sessionStorage.getItem(key)) {
      fetch(`${API}/api/products/${slug}/click`, { method: "POST" })
        .catch(() => null);
      sessionStorage.setItem(key, "1");
    }
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true); setNotFound(false);
    setSelectedColor(0); setSelectedStorage(0);
    getProductBySlug(slug)
      .then(p => { setProduct(p); setLoading(false); document.title = `${p.name} — ABC Store`; })
      .catch(() => { setNotFound(true); setLoading(false); });
    return () => { document.title = "ABC Store — Гаджеты для жизни"; };
  }, [slug]);

  useEffect(() => {
    if (!product) return;
    setCurrentImage(product.imageUrl ?? null);
    try {
      const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
      setAdded(cart.some((i: { product: { id: string } }) => i.product.id === product.id));
    } catch { /* ignore */ }
  }, [product]);

  const handleColorSelect = (colorIndex: number) => {
    setSelectedColor(colorIndex);
    if (!variants?.colors || !slug) return;
    const colorName = variants.colors[colorIndex].name;
    const colorImage = getColorImage(slug, colorName);
    if (colorImage) {
      const img = new Image();
      img.onload = () => {
        setImgOpacity(0);
        setTimeout(() => { setCurrentImage(colorImage); setImgOpacity(1); }, 150);
      };
      img.onerror = () => {
        console.log(`Color image not found: ${colorImage}`);
      };
      img.src = colorImage;
    }
  };

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
  const rawSpecs = product?.specs;
  const specsData: Array<{ icon: string; label: string; value: string }> = rawSpecs ? JSON.parse(rawSpecs) : [];
  const rawReviews = product?.reviews;
  const reviewsData: Array<{ name: string; city: string; stars: number; text: string }> = rawReviews ? JSON.parse(rawReviews) : [];
  const catLabel = product ? (CATEGORY_LABEL[product.category.slug] ?? product.category.name) : "";
  const variants = getVariants(slug ?? "");
  const storageOptions = variants?.storage ?? [];
  const selectedStorageKey = storageOptions[selectedStorage] ?? "";
  const exactPrices = slug ? STORAGE_PRICES[slug] : null;
  const displayPrice = exactPrices && selectedStorageKey
    ? (exactPrices[selectedStorageKey] ?? (product?.price ?? 0))
    : (product?.price ?? 0);
  const displayOldPrice = selectedStorage === 0 && product?.oldPrice
    ? product.oldPrice
    : null;

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
                  <div style={{ background: "#0f0f14", borderRadius: 24, padding: 48, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 480, position: "relative", overflow: "hidden", cursor: "zoom-in" }}
                    onClick={() => setImgZoomed(z => !z)}>
                    {(currentImage ?? product.imageUrl)
                      ? <img src={currentImage ?? product.imageUrl ?? ""} alt={product.name} className="pp-img"
                          style={{ width: "100%", maxHeight: 440, objectFit: "contain", transform: imgZoomed ? "scale(1.15)" : "scale(1)", mixBlendMode: "screen", filter: "brightness(1.1)", opacity: imgOpacity, transition: "opacity 0.3s ease" }} />
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
                    <span style={{ color: "#f59e0b", fontSize: 16, letterSpacing: 2 }}>
                      {"★".repeat(Math.floor(product.rating ?? 5))}{"☆".repeat(5 - Math.floor(product.rating ?? 5))}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>
                      {(product.rating ?? 5.0).toFixed(1)} ({(product.reviewCount ?? 0).toLocaleString("ru-RU")} отзывов)
                    </span>
                  </div>

                  {/* Price block */}
                  <div style={{ background: "var(--card-bg)", borderRadius: 14, padding: "18px 20px", border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                      <span style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-0.03em" }}>{displayPrice.toLocaleString("ru-RU") + " ₽"}</span>
                      {displayOldPrice && (
                        <span style={{ fontSize: 20, color: "var(--muted)", textDecoration: "line-through" }}>{displayOldPrice.toLocaleString("ru-RU") + " ₽"}</span>
                      )}
                    </div>
                    {displayOldPrice && displayOldPrice > displayPrice && (
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
                        <span style={{ background: "#ef4444", color: "#fff", padding: "2px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                          -{Math.round(((displayOldPrice - displayPrice) / displayOldPrice) * 100)}%
                        </span>
                        <span style={{ fontSize: 13, color: "#22c55e", fontWeight: 600 }}>
                          Вы экономите {(displayOldPrice - displayPrice).toLocaleString("ru-RU") + " ₽"}
                        </span>
                      </div>
                    )}
                  </div>

                  <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "0" }} />

                  {/* Color selector */}
                  {variants?.colors && (
                    <div>
                      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 10 }}>
                        Цвет: <span style={{ color: "var(--text)", fontWeight: 600 }}>{variants.colors[selectedColor].name}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                        {variants.colors.map((color, idx) => (
                          <button
                            key={color.name}
                            onClick={() => handleColorSelect(idx)}
                            title={color.name}
                            style={{
                              width: 28, height: 28, borderRadius: "50%",
                              background: color.hex, cursor: "pointer",
                              border: idx === selectedColor ? "2px solid white" : "2px solid transparent",
                              boxShadow: idx === selectedColor ? "0 0 0 2px var(--accent)" : "none",
                              transform: idx === selectedColor ? "scale(1.1)" : "scale(1)",
                              transition: "all 0.15s",
                              flexShrink: 0,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Storage selector */}
                  {variants?.storage && (
                    <div>
                      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 10 }}>Память</div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                        {variants.storage.map((size, idx) => (
                          <button
                            key={size}
                            onClick={() => setSelectedStorage(idx)}
                            style={{
                              padding: "7px 16px", borderRadius: 8,
                              fontSize: 13,
                              fontWeight: idx === selectedStorage ? 700 : 500,
                              cursor: "pointer", transition: "all 0.15s",
                              background: idx === selectedStorage ? "var(--accent)" : "transparent",
                              border: idx === selectedStorage ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.12)",
                              color: idx === selectedStorage ? "white" : "var(--text)",
                            }}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key specs */}
                  {specsData.length > 0 && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {specsData.slice(0, 4).map(s => (
                        <div key={s.label} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
                          <span style={{ fontSize: 18 }}>{s.icon}</span>
                          <div>
                            <div style={{ color: "var(--muted)", fontSize: 11 }}>{s.label}</div>
                            <div style={{ fontWeight: 600 }}>{s.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

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
                    {specsData.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {specsData.map((spec, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: 12 }}>
                            <span style={{ fontSize: 18, width: 28, textAlign: "center", flexShrink: 0 }}>{spec.icon}</span>
                            <span style={{ fontSize: 13, color: "var(--muted)", width: 140, flexShrink: 0 }}>{spec.label}</span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ color: "var(--muted)", fontSize: 14 }}>Характеристики не указаны</div>
                    )}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 700 }}>
                    {reviewsData.length > 0 ? reviewsData.map((r, i) => (
                      <div key={i} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                          <div>
                            <span style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</span>
                            <span style={{ color: "var(--muted)", fontSize: 12, marginLeft: 8 }}>{r.city}</span>
                          </div>
                          <span style={{ color: "#f59e0b", letterSpacing: 2 }}>{"★".repeat(r.stars)}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 14, color: "#d0d0d8", lineHeight: 1.7 }}>"{r.text}"</p>
                      </div>
                    )) : (
                      <div style={{ color: "var(--muted)", fontSize: 14 }}>Отзывов пока нет</div>
                    )}
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
              <div style={{ fontSize: 18, fontWeight: 800 }}>{displayPrice.toLocaleString("ru-RU") + " ₽"}</div>
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
