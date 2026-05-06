import { Link } from "react-router-dom";

export function ContactsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        :root {
          --bg: #0a0a0f; --card-bg: #13131a; --border: rgba(255,255,255,0.08);
          --text: #f0f0f5; --muted: #6b6b80; --accent: #6366f1;
        }
        * { box-sizing: border-box; }
        body { margin: 0; background: var(--bg); }
        a { color: inherit; text-decoration: none; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "'DM Sans',system-ui,sans-serif", color: "var(--text)" }}>

        {/* Header */}
        <header style={{
          borderBottom: "1px solid var(--border)", padding: "0 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 60, position: "sticky", top: 0,
          background: "rgba(10,10,15,0.9)", backdropFilter: "blur(16px)", zIndex: 100,
        }}>
          <Link to="/" style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em" }}>
            abc<span style={{ color: "var(--accent)" }}>store</span>
          </Link>
          <nav style={{ display: "flex", gap: 28, fontSize: 14 }}>
            <Link to="/" style={{ color: "var(--muted)" }}>Главная</Link>
            <Link to="/catalog" style={{ color: "var(--muted)" }}>Каталог</Link>
            <Link to="/contacts" style={{ color: "var(--text)", fontWeight: 600 }}>Контакты</Link>
          </nav>
          <Link to="/catalog" style={{
            padding: "8px 20px", borderRadius: 10, background: "var(--accent)",
            color: "#fff", fontSize: 13, fontWeight: 700,
          }}>Смотреть товары</Link>
        </header>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 32px" }}>
          <h1 style={{ margin: "0 0 8px", fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em" }}>Контакты</h1>
          <p style={{ margin: "0 0 48px", color: "var(--muted)", fontSize: 15 }}>
            Свяжитесь с нами любым удобным способом — ответим быстро
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 32 }}>

            {/* Telegram */}
            <a href="https://t.me/ABCapplemanager" target="_blank" rel="noreferrer" style={{
              display: "flex", flexDirection: "column", gap: 10,
              background: "var(--card-bg)", border: "1px solid var(--border)",
              borderRadius: 16, padding: "24px 26px", transition: "border-color 0.15s, transform 0.15s",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#2AABEE";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 32 }}>✈️</div>
              <div style={{ fontSize: 13, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Telegram</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>@ABCapplemanager</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>Отвечаем за 5 минут</div>
            </a>

            {/* Phone */}
            <a href="tel:+79284703000" style={{
              display: "flex", flexDirection: "column", gap: 10,
              background: "var(--card-bg)", border: "1px solid var(--border)",
              borderRadius: 16, padding: "24px 26px", transition: "border-color 0.15s, transform 0.15s",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 32 }}>📞</div>
              <div style={{ fontSize: 13, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Телефон</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>+7 928 470-30-00</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>Пн–Вс, 9:00–21:00</div>
            </a>

            {/* Address */}
            <div style={{
              display: "flex", flexDirection: "column", gap: 10,
              background: "var(--card-bg)", border: "1px solid var(--border)",
              borderRadius: 16, padding: "24px 26px",
            }}>
              <div style={{ fontSize: 32 }}>📍</div>
              <div style={{ fontSize: 13, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Адрес офиса</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Багратионовский проезд 12А</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>Москва · м. Багратионовская</div>
            </div>
          </div>

          {/* Map placeholder */}
          <div style={{
            borderRadius: 20, overflow: "hidden",
            border: "1px solid var(--border)", marginBottom: 32,
          }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?text=Багратионовский+проезд+12А+Москва&z=16"
              width="100%"
              height="380"
              style={{ display: "block", border: "none", filter: "invert(0.9) hue-rotate(180deg)" }}
              title="Карта"
              loading="lazy"
            />
          </div>

          {/* Hours */}
          <div style={{
            background: "var(--card-bg)", border: "1px solid var(--border)",
            borderRadius: 16, padding: "24px 28px",
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Режим работы</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 40px" }}>
              {[
                ["Понедельник – Пятница", "9:00 – 21:00"],
                ["Суббота", "10:00 – 20:00"],
                ["Воскресенье", "10:00 – 19:00"],
                ["Онлайн (Telegram)", "24/7"],
              ].map(([day, hours]) => (
                <div key={day} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ color: "var(--muted)" }}>{day}</span>
                  <span style={{ fontWeight: 600 }}>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid var(--border)", padding: "24px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12, fontSize: 13, color: "var(--muted)",
        }}>
          <span>© 2026 abcstore — Багратионовский проезд 12А, Москва</span>
          <div style={{ display: "flex", gap: 20 }}>
            <Link to="/catalog" style={{ color: "var(--muted)" }}>Каталог</Link>
            <Link to="/contacts" style={{ color: "var(--muted)" }}>Контакты</Link>
            <a href="https://t.me/ABCapplemanager" target="_blank" rel="noreferrer" style={{ color: "var(--muted)" }}>Telegram</a>
          </div>
        </footer>
      </div>
    </>
  );
}