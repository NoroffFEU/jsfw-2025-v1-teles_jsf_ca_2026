import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import { updateQuantity } from "@/lib/redux/slices/cartSlice";
import { useAppDispatch } from "@/lib/redux/hooks/useAppDispatch";

import { CartSummary } from "@/components/cart/index";
import { Button } from "@/components/ui/button/Button";
import { AlertBox } from "@/components/alert/AlertBox";
import { Separator } from "@/components/ui/separator/Separator";
import { Trash2 } from "lucide-react";
import { useCheckout } from "@/hooks/useCheckout";
import { formatCurrency } from "@/lib/helpers/formatCurrency";

/**
 * Displays the complete shopping cart with interactive items.
 *
 * Renders cart items with image, pricing (with discount strikethrough),
 * quantity controls (+/- buttons), and delete confirmation flow.
 * Shows empty state when no items present.
 *
 * Integrates with `usePendingItem` for delete confirmation UX.
 *
 * @returns {JSX.Element} Cart display with items or empty state
 *
 * @example
 * // Used in cart/checkout pages
 * <CartDisplay />
 */
export const CartDisplay = () => {
  const itemsMap = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const {
    alertRef,
    pendingItem,
    setIsPendingItem,
    confirmDelete,
    cancelRemove,
  } = useCheckout();

  const itemsArray = Object.values(itemsMap);
  if (itemsArray.length === 0) {
    return <p className="mt-6 mb-4">Nothing here yet it seems...</p>;
  }

  return (
    <div className="grid gap-4 mt-6">
      {pendingItem && (
        <div ref={alertRef}>
          <AlertBox
            open={true}
            action={true}
            title="Remove from cart?"
            description="This will remove the selected product(s) from your cart."
            onConfirm={confirmDelete}
            onCancel={cancelRemove}
          />
        </div>
      )}

      <ul className="grid gap-2 w-fit sm:w-200 justify-self-center p-8 rounded-sm bg-gray-100">
        {itemsArray.map((item) => {
          const hasDiscount = item.discountedPrice < item.price;
          return (
            <li
              key={item.productId}
              className="grid gap-2 m-2 p-2 justify-items-center"
            >
              <h2 className="font-semibold">{item.title}</h2>
              <div className="flex w-full overflow-hidden">
                <img
                  src={item.image.url}
                  alt={item.image.alt}
                  fetchPriority="high"
                  className="w-40 h-40 rounded-xs object-cover"
                />
              </div>
              {!hasDiscount && (
                <p>
                  <span className="font-bold">Price:</span>{" "}
                  {formatCurrency(item.price)}
                </p>
              )}
              {hasDiscount && (
                <div className="text-sm">
                  <p className="font-bold">
                    Discount price:{" "}
                    <span className="text-green-700 font-bold">
                      {formatCurrency(item.discountedPrice)}
                    </span>
                  </p>
                  <s className="text-xs text-gray-800">
                    Original price: {formatCurrency(item.price)}
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
              <Separator />
            </li>
          );
        })}
      </ul>

      <CartSummary />
    </div>
  );
};
