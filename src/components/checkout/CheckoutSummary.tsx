import { useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import { useNavigate, Link } from "@tanstack/react-router";
import { useAppDispatch } from "@/lib/redux/hooks/useAppDispatch";
import { paymentSuccessLinkOptions } from "@/lib/linkOptions";
import {
  selectTotalCartQuantity,
  selectTotalPrice,
  clearCart,
} from "@/lib/redux/slices/cartSlice";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button/Button";
import { Input } from "../ui/input/input/Input";
import { PaymentProcessing } from "./index";
import toast from "react-hot-toast";

export const CheckoutSummary = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const totalItems = useAppSelector(selectTotalCartQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlePaymentProcess = () => {
    setIsDisabled(true);
    setOpenDialog(true);

    setTimeout(() => {
      toast.success("Payment success");
      setIsDisabled(false);
      dispatch(clearCart());
      navigate(paymentSuccessLinkOptions);
    }, 1500);
  };

  return (
    <div className="flex flex-cols gap-4 items-center justify-between">
      {openDialog && (
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="sr-only">Payment Processing</DialogTitle>
              <DialogDescription className="sr-only"></DialogDescription>
              <PaymentProcessing />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      <div className="grid gap-2">
        <p>
          Discount code: <Input id="discount-input" placeholder="SUMMER_26" />
        </p>
        <p>Order value: {totalPrice},-</p>
        <p>Discount: 0,-</p>
        <p>Delivery fee: 0,-</p>
        <h3 className="font-bold mt-6 pt-6 border-t-2 border-t-black">
          Payment Summary
        </h3>
        <p>
          Total: <strong>{totalPrice.toFixed(2)} NOK</strong>
        </p>

        <p className="text-xs">
          By continuing you agree to{" "}
          <Link to="/terms" className="underline hover:no-underline">
            ShopNet terms and conditions
          </Link>
        </p>

        {totalItems !== 0 && (
          <Button
            className={
              isDisabled
                ? "flex justify-self-end mt-4 p-4 text-md brightness-90 cursor-not-allowed"
                : "flex justify-self-end mt-4 p-4 text-md hover:brightness-90"
            }
            disabled={isDisabled}
            onClick={handlePaymentProcess}
          >
            Pay order
          </Button>
        )}
      </div>
    </div>
  );
};
