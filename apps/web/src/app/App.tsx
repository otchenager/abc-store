import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

window.history.scrollRestoration = "manual";
import { useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { HomePage } from "../pages/home/HomePage";
import { CatalogPage } from "../pages/CatalogPage";
import { ContactsPage } from "../pages/ContactsPage";
import { ProductPage } from "../pages/ProductPage";

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("page-enter");
    void el.offsetWidth; // reflow to retrigger animation
    el.classList.add("page-enter");
  }, [location.pathname]);

  return <div ref={ref} className="page-enter">{children}</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageTransition>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageTransition>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
