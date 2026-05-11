import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { HomePage } from "../pages/home/HomePage";
import { CatalogPage } from "../pages/CatalogPage";
import { ContactsPage } from "../pages/ContactsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}