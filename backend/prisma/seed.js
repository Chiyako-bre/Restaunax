const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const orders = [
    {
      customerName: 'Alex Johnson',
      orderType: 'delivery',
      status: 'pending',
      total: 42.5,
      createdAt: new Date('2025-05-20T18:30:00Z'),
      items: {
        create: [
          { name: 'Margherita Pizza', quantity: 2, price: 15.99 },
          { name: 'Caesar Salad', quantity: 1, price: 8.99 },
        ],
      },
    },
    {
      customerName: 'Sarah Lee',
      orderType: 'pickup',
      status: 'preparing',
      total: 25.0,
      createdAt: new Date('2025-05-20T19:00:00Z'),
      items: {
        create: [{ name: 'Pepperoni Pizza', quantity: 1, price: 17.99 }],
      },
    },
  ];

  for (const order of orders) {
    await prisma.order.create({
      data: order,
    });
  }

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });