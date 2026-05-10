import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import { selectTotalCartQuantity } from "@/lib/redux/slices/cartSlice";
import { useCheckout } from "@/hooks/useCheckout";
import { user } from "@/lib/data/User";

import { Button } from "@/components/ui/button/Button";
import { Trash2 } from "lucide-react";
import { AlertBox } from "@/components/alert/AlertBox";
import { MethodPicker, CheckoutSummary } from "./index";
import { Separator } from "@/components/ui/separator/Separator";
import toast from "react-hot-toast";

/**
 * Main checkout page layout with 3-column responsive design.
 *
 * Renders complete checkout experience:
 * - User info & billing address (with edit links)
 * - Compact cart items list with delete confirmation
 * - Fixed checkout summary sidebar
 * - Multiple quantity warning
 *
 * Integrates `useCheckout()` for scroll-to-alert behavior and `usePendingItem()` for deletions.
 *
 * @returns {JSX.Element} Full checkout layout or empty cart message
 *
 * @example
 * // Main checkout page component
 * <CheckoutDisplay />
 */
export const CheckoutDisplay = () => {
  const totalItems = useAppSelector(selectTotalCartQuantity);
  const {
    alertRef,
    itemsMap,
    pendingItem,
    setIsPendingItem,
    confirmDelete,
    cancelRemove,
  } = useCheckout();

  const itemsArray = Object.values(itemsMap);
  if (itemsArray.length === 0) {
    return <p>Shopping cart is empty.</p>;
  }

  const hasMultipleItems = itemsArray.some((item) => item.quantity > 1);

  const handleClickEdit = () => {
    toast.remove();
    toast("Feature coming soon...");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <section id="user-info" className="grid gap-6">
        <div>
          <h2 className="text-lg font-semibold">MY INFORMATION</h2>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <Button
            onClick={handleClickEdit}
            variant="link"
            className="w-fit p-0 underline hover:no-underline cursor-pointer"
          >
            Edit info
          </Button>
        </div>
        <Separator />

        <div id="user-billing" className="">
          <h3 className="text-lg font-semibold">BILLING ADDRESS</h3>
          <p>
            {user.address}, {user.postalCode}
          </p>
          <p>{user.city}</p>
          <p>{user.country}</p>
          <Button
            onClick={handleClickEdit}
            variant="link"
            className="w-fit p-0 underline hover:no-underline cursor-pointer"
          >
            Edit info
          </Button>
        </div>
        <Separator />

        <MethodPicker />
      </section>

      <section id="user-products" className="justify-self-center">
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
        <ul className="grid grid-cols-1 xl:grid-cols-2 gap-2 rounded bg-gray-100">
          {itemsArray.map((item) => (
            <li
              key={item.productId}
              className="grid gap-2 m-2 p-2 justify-items-center text-center"
            >
              <div className="grid grid-cols-2 items-center">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <Button
                  onClick={() => setIsPendingItem(item.productId)}
                  className="text-red-600 bg-transparent m-0 p-0"
                >
                  <Trash2 aria-label="Remove item from cart" />
                </Button>
              </div>

              <div className="flex w-full overflow-hidden">
                <img
                  src={item.image.url}
                  alt={item.image.alt}
                  fetchPriority="high"
                  className="w-40 h-40 rounded-xs object-cover"
                />
              </div>
            </li>
          ))}
        </ul>

        {hasMultipleItems && (
          <p className="text-xs mt-2 mb-2 justify-self-end">
            Some products could have a higher quantity
          </p>
        )}

        <p className="mt-2 justify-self-end">
          Total products: <strong>{totalItems}</strong>
        </p>
      </section>

      <section id="summary" className="grid gap-6">
        <div className="bg-white lg:fixed justify-self-center lg:justify-self-end">
          <CheckoutSummary />
        </div>
      </section>
    </div>
  );
};
