import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import { usePaymentProcess } from "@/hooks/usePaymentProcess";
import { Link } from "@tanstack/react-router";
import {
  selectTotalCartQuantity,
  selectTotalDiscount,
  selectTotalOriginalPrice,
  selectTotalPrice,
} from "@/lib/redux/slices/cartSlice";
import { formatCurrency } from "@/lib/helpers/formatCurrency";

import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/input/Input";
import { PaymentProcessing } from "./index";
import {
  selectSelectedDelivery,
  selectSelectedDeliveryFee,
} from "@/lib/redux/slices/checkoutSlice";
import { DeliveryOptions } from "@/lib/data";

/**
 * Checkout payment summary with discount breakdown and final payment trigger.
 *
 * Shows complete pricing breakdown:
 * - Original price vs discounted price
 * - Delivery fee
 * - Final total to pay
 * - Discount code input field
 *
 * Integrates `usePaymentProcess()` for payment flow with loading state.
 * Includes terms agreement link and conditional pay button.
 *
 * @returns {JSX.Element} Payment summary panel
 *
 * @example
 * // Used in CheckoutDisplay right sidebar
 * <CheckoutSummary />
 */
export const CheckoutSummary = () => {
  const totalItems = useAppSelector(selectTotalCartQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);
  const originalPrice = useAppSelector(selectTotalOriginalPrice);
  const discount = useAppSelector(selectTotalDiscount);
  const deliveryFee = useAppSelector(selectSelectedDeliveryFee);
  const selectedDelivery = useAppSelector(selectSelectedDelivery);
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
          <span>{formatCurrency(originalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <p>Discount:</p>
          <span>-{formatCurrency(discount)}</span>
        </div>
        <div className="flex justify-between">
          <p>Price after discount:</p>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <p>Delivery fee:</p>
          <span>{formatCurrency(deliveryFee)}</span>
        </div>
        {selectedDelivery && (
          <p className="text-xs">
            Delivery method: {DeliveryOptions[selectedDelivery].title}
          </p>
        )}

        <h3 className="font-bold mt-6 pt-6 border-t-2 border-t-black">
          Payment Summary
        </h3>
        <p>
          Total: <strong>{formatCurrency(totalPriceToPay)}</strong>
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
