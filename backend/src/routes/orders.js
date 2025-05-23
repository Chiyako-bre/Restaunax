const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const { status } = req.query;
  const where = status ? { status } : {};
  try {
    const orders = await prisma.order.findMany({
      where,
      include: { items: true },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['pending', 'preparing', 'ready', 'delivered'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

router.post('/', async (req, res) => {
  const { customerName, orderType, status, total, items } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        customerName,
        orderType,
        status,
        total,
        createdAt: new Date(),
        items: {
          create: items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;