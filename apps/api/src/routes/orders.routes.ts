import { Router } from "express";
import { prisma } from "../database/prisma";
import { env } from "../config/env";

export const ordersRouter = Router();

interface OrderItemInput {
  productId: string;
  quantity: number;
  price: number;
  name?: string;
  qty?: number;
}

async function sendTelegramNotification(text: string) {
  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chatId } = env;
  if (!token || !chatId || token === "your_token_here") return;
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
  } catch (e) {
    console.error("Telegram notification failed:", e);
  }
}

function formatOrderMessage(params: {
  name: string;
  phone: string;
  comment?: string;
  items: { name: string; price: number; qty: number }[];
  total: number;
}) {
  const { name, phone, comment, items, total } = params;
  const now = new Date();
  const time = now.toLocaleString("ru-RU", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Moscow",
  });

  const itemLines = items
    .map(i => `• ${i.name} — ${i.price.toLocaleString("ru-RU")} ₽ × ${i.qty}`)
    .join("\n");

  return [
    "🛒 <b>Новый заказ!</b>",
    "",
    `👤 Имя: ${name}`,
    `📞 Телефон: ${phone}`,
    comment ? `💬 Комментарий: ${comment}` : "",
    "",
    "📦 Состав заказа:",
    itemLines,
    "",
    `💰 Итого: ${total.toLocaleString("ru-RU")} ₽`,
    `⏰ Время: ${time}`,
  ].filter(line => line !== "").join("\n");
}

// POST /api/orders
ordersRouter.post("/", async (req, res) => {
  try {
    const body = req.body as {
      customerName?: string;
      customerPhone?: string;
      name?: string;
      phone?: string;
      comment?: string;
      items?: OrderItemInput[];
      total?: number;
    };

    const customerName = (body.customerName ?? body.name ?? "").trim();
    const customerPhone = (body.customerPhone ?? body.phone ?? "").trim();
    const { comment, items } = body;

    if (!customerName || !customerPhone) {
      res.status(400).json({ error: "name and phone are required" });
      return;
    }
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "items must be a non-empty array" });
      return;
    }

    // Validate product IDs and fetch prices from DB to prevent client-side manipulation
    const requestedIds = items.map(i => i.productId).filter(Boolean) as string[];
    const existingProducts = await prisma.product.findMany({
      where: { id: { in: requestedIds } },
      select: { id: true, price: true, name: true },
    });
    const productMap = new Map(existingProducts.map(p => [p.id, p]));

    const validItems = items.filter(i => i.productId && productMap.has(i.productId));

    if (validItems.length === 0) {
      res.status(400).json({ error: "no valid items" });
      return;
    }

    // Always use DB prices
    const totalAmount = validItems.reduce(
      (sum, item) => sum + productMap.get(item.productId!)!.price * (item.quantity ?? item.qty ?? 1),
      0
    );

    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail: null,
        customerPhone,
        comment: comment?.trim() || null,
        totalAmount,
        items: {
          create: validItems.map(item => ({
            productId: item.productId!,
            quantity: item.quantity ?? item.qty ?? 1,
            price: productMap.get(item.productId!)!.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    void order; // included for future use; telegram uses productMap directly

    const telegramItems = validItems.map(item => ({
      name: productMap.get(item.productId!)!.name,
      price: productMap.get(item.productId!)!.price,
      qty: item.quantity ?? item.qty ?? 1,
    }));

    const message = formatOrderMessage({
      name: customerName,
      phone: customerPhone,
      comment: comment?.trim(),
      items: telegramItems,
      total: totalAmount,
    });

    sendTelegramNotification(message); // fire-and-forget

    res.status(201).json({ id: order.id });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});
