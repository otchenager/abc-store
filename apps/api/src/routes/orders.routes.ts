import { Router } from "express";
import { prisma } from "../database/prisma.js";

export const ordersRouter = Router();

interface OrderItemInput {
  productId: string;
  quantity: number;
  price: number;
}

// POST /api/orders
ordersRouter.post("/", async (req, res) => {
  try {
    const { customerName, customerPhone, comment, items } = req.body as {
      customerName?: string;
      customerPhone?: string;
      comment?: string;
      items?: OrderItemInput[];
    };

    if (!customerName?.trim() || !customerPhone?.trim()) {
      res.status(400).json({ error: "customerName and customerPhone are required" });
      return;
    }
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "items must be a non-empty array" });
      return;
    }

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await prisma.order.create({
      data: {
        customerName: customerName.trim(),
        customerEmail: null,
        customerPhone: customerPhone.trim(),
        comment: comment?.trim() || null,
        totalAmount,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("POST /api/orders error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});
