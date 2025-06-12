import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useOrders } from "../hooks/useOrders";
import { AddOrderDialog } from "../components/AddOrderDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

function Orders() {
  const { orders, loading, error, createOrder, deleteOrder, updateOrderStatus } = useOrders();
  const orderStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const handleAddOrder = async (orderData) => {
    try {
      await createOrder(orderData);
    } catch (error) {
      // Handle error
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(orderId);
      } catch (error) {
        // Handle error
      }
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      // Handle error
    }
  };

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <AddOrderDialog onOrderAdded={handleAddOrder} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Here are the latest orders from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {orderStatuses.map((status) => (
                              <DropdownMenuItem
                                key={status}
                                onSelect={() => handleStatusChange(order._id, status)}
                                disabled={order.status === status}
                              >
                                {status}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteOrder(order._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-8">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Orders; 