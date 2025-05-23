const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const orderRoutes = require('./routes/orders');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});