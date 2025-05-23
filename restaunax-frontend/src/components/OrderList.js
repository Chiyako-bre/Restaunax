import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import OrderDetails from './OrderDetails';

const OrderList = ({ orders = [], onStatusUpdate }) => {
  // Ensure orders is an array
  const validOrders = Array.isArray(orders) ? orders : [];

  return (
    <Box>
      {validOrders.map((order) => (
        <Card key={order.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{order.customerName}</Typography>
            <Typography color="textSecondary">Type: {order.orderType}</Typography>
            <Typography color="textSecondary">Status: {order.status}</Typography>
            <Typography color="textSecondary">Total: ${order.total.toFixed(2)}</Typography>
            <OrderDetails order={order} onStatusUpdate={onStatusUpdate} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default OrderList;