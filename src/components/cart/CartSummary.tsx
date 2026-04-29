import { useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import { useNavigate } from "@tanstack/react-router";
import { checkoutLinkOptions } from "@/lib/linkOptions";
import {
  selectTotalCartQuantity,
  selectTotalPrice,
} from "@/lib/redux/slices/cartSlice";
import { Button } from "@/components/ui/button/Button";

const CartSummary = () => {
  const totalItems = useAppSelector(selectTotalCartQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 500);

    navigate(checkoutLinkOptions);
  };

  return (
    <div className="flex flex-cols gap-4 mt-6 pt-6 items-center justify-between border-t-2 border-t-black">
      <div>
        <h3 className="font-bold">Summary</h3>
        <p>
          Total products: <strong>{totalItems}</strong>
        </p>
        <p>
          Total price: <strong>{totalPrice.toFixed(2)} NOK</strong>
        </p>
      </div>

      {totalItems !== 0 && (
        <Button
          className={
            isDisabled
              ? "flex justify-self-end p-4 text-md brightness-90 cursor-not-allowed"
              : "flex justify-self-end p-4 text-md hover:brightness-90"
          }
          disabled={isDisabled}
          onClick={handleProceedToCheckout}
        >
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
};

export default CartSummary;
