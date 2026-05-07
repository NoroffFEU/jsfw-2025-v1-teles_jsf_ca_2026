import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import { usePaymentProcess } from "@/hooks/usePaymentProcess";
import { Link } from "@tanstack/react-router";
import {
  selectTotalCartQuantity,
  selectTotalDiscount,
  selectTotalOriginalPrice,
  selectTotalPrice,
} from "@/lib/redux/slices/cartSlice";

import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/input/Input";
import { PaymentProcessing } from "./index";

export const CheckoutSummary = () => {
  const totalItems = useAppSelector(selectTotalCartQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);
  const fixedTotal = totalPrice.toFixed(2);
  const originalPrice = useAppSelector(selectTotalOriginalPrice).toFixed(2);
  const discount = useAppSelector(selectTotalDiscount).toFixed(2);
  const deliveryFee = 49;
  const totalPriceToPay = totalPrice + deliveryFee;

  const { handlePaymentProcess, openDialog, isDisabled } = usePaymentProcess();

  return (
    <div className="flex flex-cols gap-4 items-center justify-between">
      {openDialog && <PaymentProcessing open={openDialog} />}

      <div className="grid gap-2">
        <p>
          Discount code: <Input id="discount-input" placeholder="SUMMER_26" />
        </p>
        <div className="flex justify-between">
          <p>Original price:</p>
          <span>{originalPrice},-</span>
        </div>
        <div className="flex justify-between">
          <p>Discount:</p>
          <span>-{discount},-</span>
        </div>
        <div className="flex justify-between">
          <p>Price after discount:</p>
          <span>{fixedTotal},-</span>
        </div>
        <div className="flex justify-between">
          <p>Delivery fee:</p>
          <span>{deliveryFee},-</span>
        </div>

        <h3 className="font-bold mt-6 pt-6 border-t-2 border-t-black">
          Payment Summary
        </h3>
        <p>
          Total: <strong>{totalPriceToPay.toFixed(2)} NOK</strong>
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
