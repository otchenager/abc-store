import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const SERVICES = [
  {
    icon: "⚡",
    title: "Производство электромонтажных работ",
    description: "Профессиональный монтаж электрических систем любой сложности. Проектирование, прокладка кабелей, установка щитов и автоматики.",
  },
  {
    icon: "🛡️",
    title: "Установка охранных систем",
    description: "Проектирование и монтаж систем охранной сигнализации. Интеграция с умным домом и мобильным приложением.",
  },
  {
    icon: "📷",
    title: "Установка систем видеонаблюдения",
    description: "Монтаж IP-камер и систем видеонаблюдения. Удалённый доступ с любого устройства 24/7.",
  },
  {
    icon: "🔧",
    title: "Обслуживание охранных систем",
    description: "Техническое обслуживание и ремонт охранных систем. Выезд специалиста в день обращения.",
  },
];

function ServiceCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#13131a",
        border: `1px solid ${hovered ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 20,
        padding: 32,
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        boxShadow: hovered ? "0 16px 48px rgba(99,102,241,0.12)" : "none",
        cursor: "default",
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 20 }}>{icon}</div>
      <h3 style={{
        margin: "0 0 12px",
        fontSize: 18,
        fontWeight: 700,
        color: "#f0f0f5",
        lineHeight: 1.3,
        fontFamily: "'DM Sans', sans-serif",
      }}>{title}</h3>
      <p style={{
        margin: 0,
        fontSize: 14,
        color: "#8888a0",
        lineHeight: 1.7,
      }}>{description}</p>
    </div>
  );
}

export function ServicesPage() {
  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0f0f5", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Navbar />

      {/* Hero */}
      <section style={{
        padding: "clamp(64px, 10vw, 120px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)",
        textAlign: "center",
        maxWidth: 800,
        margin: "0 auto",
      }}>
        <h1 style={{
          margin: "0 0 16px",
          fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
        }}>
          Профессиональные услуги
        </h1>
        <p style={{
          margin: 0,
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "#6b6b80",
          lineHeight: 1.6,
        }}>
          Комплексные решения для вашего бизнеса и дома
        </p>
      </section>

      {/* Services grid */}
      <section style={{ padding: "0 clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)", maxWidth: 1000, margin: "0 auto" }}>
        <div className="services-grid">
          {SERVICES.map(s => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "clamp(48px, 8vw, 80px) clamp(16px, 4vw, 32px)",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <h2 style={{
          margin: "0 0 12px",
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
        }}>
          Получите бесплатную консультацию
        </h2>
        <p style={{ margin: "0 0 32px", fontSize: 16, color: "#6b6b80" }}>
          Ответим на все вопросы и подберём оптимальное решение
        </p>
        <a
          href="https://t.me/ABCapplemanager"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            padding: "14px 36px",
            borderRadius: 14,
            background: "#6366f1",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 16,
            boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          ✈️ Написать в Telegram
        </a>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "32px", textAlign: "center", color: "#6b6b80", fontSize: 13 }}>
        <Link to="/" style={{ color: "#6366f1", textDecoration: "none" }}>← На главную</Link>
      </footer>
    </div>
  );
}
