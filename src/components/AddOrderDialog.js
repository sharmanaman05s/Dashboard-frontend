import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function AddOrderDialog({ onOrderAdded }) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState('');
  const [total, setTotal] = useState('');
  // Status will default to 'Processing' on the backend

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the new order data to the parent component
    onOrderAdded({ customer, total: parseFloat(total) });
    setOpen(false); // Close the dialog
    // Reset form
    setCustomer('');
    setTotal('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Order</DialogTitle>
            <DialogDescription>
              Enter the details for the new order. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customer" className="text-right">
                Customer
              </Label>
              <Input
                id="customer"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="total" className="text-right">
                Total ($)
              </Label>
              <Input
                id="total"
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 