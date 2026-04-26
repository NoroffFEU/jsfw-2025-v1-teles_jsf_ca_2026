import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import { removeItem, updateQuantity } from "@/lib/redux/slices/cartSlice";

import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button/Button";
import { AlertBox } from "@/components/alerts/AlertBox";
import { Trash2 } from "lucide-react";

const CartDisplay = () => {
  const [pendingItem, setIsPendingItem] = useState<string | null>(null);
  const itemsMap = useAppSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const itemsArray = Object.values(itemsMap);
  if (itemsArray.length === 0) {
    return <p className="mt-6 mb-4">Shopping cart is empty.</p>;
  }

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

      <ul className="grid gap-2 w-fit sm:w-200 justify-self-center p-8 rounded-sm bg-gray-100">
        {itemsArray.map((item) => {
          const hasDiscount = item.discountedPrice < item.price;

          return (
            <li key={item.productId} className="grid gap-2 m-2 p-2">
              <h3 className="font-semibold">{item.title}</h3>
              <div className="flex w-40 h-40 overflow-hidden">
                <img
                  src={item.image.url}
                  alt={item.image.alt}
                  className="w-full rounded-xs object-cover"
                />
              </div>
              {!hasDiscount && (
                <p>
                  <span className="font-bold">Price:</span> {item.price} NOK
                </p>
              )}
              {hasDiscount && (
                <div className="text-sm">
                  <p className="font-bold">
                    Discount price:{" "}
                    <span className="text-green-600 font-bold">
                      {item.discountedPrice} NOK
                    </span>
                  </p>
                  <s className="text-xs text-gray-500">
                    Original price: {item.price} NOK
                  </s>
                </div>
              )}

              <div className="flex gap-2 items-center justify-self-end">
                <span className="text-sm">Quantity: {item.quantity}</span>

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
                  <Trash2 aria-label="Remove item from cart" />
                </Button>
              </div>
              <hr />
            </li>
          );
        })}
      </ul>

      <CartSummary />
    </div>
  );
};

export default CartDisplay;
