import { useEffect, useState } from "react";
import { getHealth, type HealthResponse } from "./lib/api";

export default function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getHealth();
        setHealth(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return (
    <div className="page">
      <div className="container">
        <header className="hero">
          <p className="eyebrow">ABC STORE</p>
          <h1>Frontend запущен</h1>
          <p className="subtitle">
            Сейчас мы проверяем связку:
            <br />
            React → API → backend
          </p>
        </header>

        <section className="card">
          <h2>Статус API</h2>

          {loading && <p>Проверяем API...</p>}

          {error && (
            <div className="error">
              <strong>Ошибка:</strong> {error}
            </div>
          )}

          {health && (
            <div className="success">
              <p>
                <strong>Status:</strong> {health.status}
              </p>
              <p>
                <strong>Timestamp:</strong> {health.timestamp}
              </p>
            </div>
          )}
        </section>

        <section className="card">
          <h2>Что дальше</h2>
          <ul>
            <li>добавим таблицу товаров в PostgreSQL</li>
            <li>сделаем endpoint `GET /api/products`</li>
            <li>выведем цены товаров на сайте</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
