import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import api from '../services/api'; // We'll use the configured axios instance

export const useOrders = () => {
  const { getToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      
      const res = await api.get('/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders. Are you signed in?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  const createOrder = useCallback(async (orderData) => {
    try {
      const token = await getToken();
      const res = await api.post('/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Add the new order to the start of the list
      setOrders((prevOrders) => [res.data, ...prevOrders]);
      return res.data;
    } catch (err) {
      console.error("Failed to create order:", err);
      // Optionally set an error state for the form
      throw new Error("Failed to create order.");
    }
  }, [getToken]);

  const deleteOrder = useCallback(async (orderId) => {
    try {
      const token = await getToken();
      await api.delete(`/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove the order from the list
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Failed to delete order:", err);
      throw new Error("Failed to delete order.");
    }
  }, [getToken]);

  const updateOrderStatus = useCallback(async (orderId, status) => {
    try {
      const token = await getToken();
      const res = await api.put(`/orders/${orderId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update the order in the local list
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? res.data : order
        )
      );
      return res.data;
    } catch (err) {
      console.error("Failed to update order status:", err);
      throw new Error("Failed to update order status.");
    }
  }, [getToken]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, error, fetchOrders, createOrder, deleteOrder, updateOrderStatus };
}; 