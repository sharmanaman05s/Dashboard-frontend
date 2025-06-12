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

export function AddCustomerDialog({ onCustomerAdded, formError, setFormError }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onCustomerAdded({ name, email, phone });
      setOpen(false); // Close the dialog on success
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      // Error is caught and set by the parent, but we don't close the dialog
      console.log("Dialog caught error, not closing.")
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setFormError(""); // Clear error when dialog is closed
    }}>
      <DialogTrigger asChild>
        <Button>Add Customer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Enter the details for the new customer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          {formError && <p className="text-red-500 text-sm text-center">{formError}</p>}
          <DialogFooter>
            <Button type="submit">Save Customer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 