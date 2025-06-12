import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useCustomers } from "../hooks/useCustomers";
import { AddCustomerDialog } from "../components/AddCustomerDialog";

function Customers() {
  const { customers, loading, error, createCustomer, deleteCustomer } = useCustomers();
  const [searchQuery, setSearchQuery] = useState("");
  const [formError, setFormError] = useState("");

  const handleAddCustomer = async (customerData) => {
    try {
      setFormError(""); // Clear previous errors
      await createCustomer(customerData);
    } catch (err) {
      setFormError(err.response?.data?.msg || "Failed to add customer.");
      // Re-throw to prevent dialog from closing if needed
      throw err;
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      await deleteCustomer(customerId);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="p-6">Loading customers...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="flex gap-4">
          <Input
            type="search"
            placeholder="Search by name or email..."
            className="w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AddCustomerDialog onCustomerAdded={handleAddCustomer} formError={formError} setFormError={setFormError} />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <Card key={customer._id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{customer.name}</h3>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                    <p className="text-sm text-muted-foreground">{customer.phone}</p>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCustomer(customer._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No customers found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers; 