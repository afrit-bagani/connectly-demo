"use client";
import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export function FundDialog({ project, open, onOpenChange }) {
  const [amount, setAmount] = useState("500");
  const initialMethod = useMemo(() => {
    if (!project?.paymentDetails) return "card";
    return project.paymentDetails.method === "upi" ? "upi" : "card";
  }, [project]);
  const [method, setMethod] = useState(initialMethod);

  React.useEffect(() => {
    setMethod(initialMethod);
  }, [initialMethod]);

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Fund "{project.title}"</DialogTitle>
          <DialogDescription>₹26,500 raised</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Payment method</Label>
            <RadioGroup
              className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2"
              value={method}
              onValueChange={(v) => setMethod(v)}
            >
              <div className="border rounded-md p-3 flex items-center gap-2">
                <RadioGroupItem id="m-card" value="card" />
                <Label htmlFor="m-card" className="cursor-pointer">
                  Card
                </Label>
              </div>
              <div className="border rounded-md p-3 flex items-center gap-2">
                <RadioGroupItem id="m-upi" value="upi" />
                <Label htmlFor="m-upi" className="cursor-pointer">
                  UPI
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {method === "card" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <Label htmlFor="card-name">Name on card</Label>
                <Input id="card-name" placeholder="Jane Doe" className="mt-1" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="card-number">Card number</Label>
                <Input
                  id="card-number"
                  placeholder="4242 4242 4242 4242"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="card-exp">Expiry</Label>
                <Input id="card-exp" placeholder="MM/YY" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="card-cvv">CVV</Label>
                <Input id="card-cvv" placeholder="***" className="mt-1" />
              </div>
            </div>
          ) : (
            // UPI: keep single-column even on desktop per requirement
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input
                  id="upi-id"
                  placeholder="name@okbank"
                  className="mt-1"
                  defaultValue={
                    project.paymentDetails?.method === "upi"
                      ? project.paymentDetails.upiId
                      : ""
                  }
                />
              </div>
              {project.paymentDetails?.method === "upi" &&
              project.paymentDetails.qrImageUrl ? (
                <div className="flex items-center justify-center">
                  <img
                    src={
                      project.paymentDetails.qrImageUrl ||
                      "/donation/upi-qr-code.jpg"
                    }
                    alt="UPI QR code"
                    className="w-56 h-56 object-contain rounded-md border"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <img
                    src="/donation/upi-qr-code.jpg"
                    alt="UPI QR placeholder"
                    className="w-56 h-56 object-contain rounded-md border"
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <Button>Simulate payment</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
