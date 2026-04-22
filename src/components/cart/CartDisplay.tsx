import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import { removeItem, updateQuantity } from "@/lib/redux/slices/cartSlice";
import { Button } from "@/components/ui/button/Button";
import { AlertBox } from "@/components/alerts/AlertBox";
import { Trash2 } from "lucide-react";

const CartDisplay = () => {
  const [pendingItem, setIsPendingItem] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const itemsMap = useAppSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const itemsArray = Object.values(itemsMap);
  if (itemsArray.length === 0) {
    return <p>Shopping cart is empty.</p>;
  }

  const handleProceedToCheckout = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 500);
  };

  const confirmDelete = () => {
    if (!pendingItem) return;
    dispatch(removeItem(pendingItem));
    setIsPendingItem(null);
  };

  const cancelRemove = () => {
    setIsPendingItem(null);
  };

  return (
    <div className="grid gap-4 mt-6">
      {pendingItem && (
        <AlertBox
          open={true}
          action={true}
          title="Remove from cart?"
          description="This will remove the selected product(s) from your cart."
          onConfirm={confirmDelete}
          onCancel={cancelRemove}
        />
      )}

      <ul className="grid gap-2 p-8 rounded-sm bg-gray-100">
        {itemsArray.map((item) => (
          <li key={item.productId} className="m-2 p-2">
            <span>Product ID: {item.productId}</span>
            <br />

            <div className="flex gap-2 items-center justify-self-end">
              <span>Quantity: {item.quantity}</span>

              <Button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      productId: item.productId,
                      quantity: item.quantity - 1,
                    }),
                  )
                }
                className="ml-2 w-8 h-8 bg-gray-300 text-black rounded-sm"
              >
                -
              </Button>

              <Button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      productId: item.productId,
                      quantity: item.quantity + 1,
                    }),
                  )
                }
                className="ml-1 w-8 h-8 bg-gray-300 text-black rounded-sm"
              >
                +
              </Button>

              <Button
                onClick={() => setIsPendingItem(item.productId)}
                className="ml-2 p-0 text-red-600 bg-transparent"
              >
                <Trash2 />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {itemsArray.length !== 0 && (
        <Button
          className={
            isDisabled
              ? "flex justify-self-end brightness-90 cursor-not-allowed"
              : "flex justify-self-end hover:brightness-90"
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

export default CartDisplay;
