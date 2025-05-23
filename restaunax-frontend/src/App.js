import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Tabs, Tab } from '@mui/material';
import OrderList from './components/OrderList';
import OrderChart from './components/OrderChart';

function App() {
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    fetchOrders(tab === 'all' ? '' : tab);
  }, [tab]);

  const fetchOrders = async (status) => {
    const url = status ? `http://localhost:5000/orders?status=${status}` : 'http://localhost:5000/orders';
    const response = await fetch(url);
    const data = await response.json();
    setOrders(data);
  };

  const handleStatusUpdate = async (id, status) => {
    await fetch(`http://localhost:5000/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchOrders(tab === 'all' ? '' : tab);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Restaunax Order Dashboard</Typography>
      <OrderChart orders={orders} />
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered sx={{ mb: 4 }}>
        <Tab label="All" value="all" />
        <Tab label="Pending" value="pending" />
        <Tab label="Preparing" value="preparing" />
        <Tab label="Ready" value="ready" />
        <Tab label="Delivered" value="delivered" />
      </Tabs>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <OrderList orders={orders} onStatusUpdate={handleStatusUpdate} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;