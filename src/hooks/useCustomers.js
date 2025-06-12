import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import api from '../services/api';

export const useCustomers = () => {
  const { getToken } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const res = await api.get('/customers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch customers.');
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  const createCustomer = useCallback(async (customerData) => {
    try {
      const token = await getToken();
      const res = await api.post('/customers', customerData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers((prev) => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      console.error("Failed to create customer:", err);
      // Re-throw the error to be caught in the component
      throw err;
    }
  }, [getToken]);

  const deleteCustomer = useCallback(async (customerId) => {
    try {
      const token = await getToken();
      await api.delete(`/customers/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers((prev) => prev.filter((c) => c._id !== customerId));
    } catch (err) {
      console.error("Failed to delete customer:", err);
      throw new Error("Failed to delete customer.");
    }
  }, [getToken]);


  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { customers, loading, error, createCustomer, deleteCustomer };
}; 