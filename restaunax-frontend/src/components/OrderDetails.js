import React, { useState } from 'react';
import { Button, Box, Typography, Collapse } from '@mui/material';

const OrderDetails = ({ order, onStatusUpdate }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button onClick={() => setOpen(!open)}>{open ? 'Hide Details' : 'Show Details'}</Button>
      <Collapse in={open}>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Items:</Typography>
          {order.items.map((item) => (
            <Typography key={item.id}>
              {item.name} x{item.quantity} - ${item.price.toFixed(2)}
            </Typography>
          ))}
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Update Status:</Typography>
            {['pending', 'preparing', 'ready', 'delivered'].map((status) => (
              <Button
                key={status}
                variant="outlined"
                onClick={() => onStatusUpdate(order.id, status)}
                disabled={order.status === status}
                sx={{ mr: 1 }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default OrderDetails;