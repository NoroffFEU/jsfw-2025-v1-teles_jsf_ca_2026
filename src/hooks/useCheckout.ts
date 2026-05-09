import { useRef, useEffect } from "react";
import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import { usePendingItem } from "./usePendingItem";
import { useAppDispatch } from "@/lib/redux/hooks/useAppDispatch";
import { removeItem } from "@/lib/redux/slices/cartSlice";
import toast from "react-hot-toast";

/**
 * Custom hook for managing checkout-related UI state and behavior.
 *
 * Responsibilities:
 * - Tracks the currently pending item (e.g., item awaiting user action)
 * - Exposes a ref for an alert element tied to the pending item
 * - Automatically scrolls the alert into view when a pending item appears
 * - Provides access to the current cart items map from the Redux store
 *
 * @returns {Object} Checkout state and helpers
 * @returns {*} returns.pendingItem - The current pending item, if any
 * @returns {(value: boolean) => void} returns.setIsPendingItem - Setter to update pending item state
 * @returns {React.RefObject<HTMLDivElement>} returns.alertRef - Ref to attach to the alert element
 * @returns {Object} returns.itemsMap - Map of cart items from the Redux store
 *
 * @example
 * const { pendingItem, alertRef } = useCheckout();
 *
 * return (
 *   <div ref={alertRef}>
 *     {pendingItem && <Alert message="Action required" />}
 *   </div>
 * );
 */
export const useCheckout = () => {
  const { pendingItem, setIsPendingItem } = usePendingItem();
  const alertRef = useRef<HTMLDivElement | null>(null);
  const itemsMap = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!pendingItem || !alertRef.current) return;

    const rect = alertRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const offset = 150;

    window.scrollTo({
      top: rect.top + scrollTop - offset,
      behavior: "smooth",
    });
  }, [pendingItem]);

  const confirmDelete = () => {
    if (!pendingItem) return;
    toast("Removed from cart");
    dispatch(removeItem(pendingItem));
    setIsPendingItem(null);
  };

  const cancelRemove = () => {
    setIsPendingItem(null);
  };

  return {
    pendingItem,
    setIsPendingItem,
    alertRef,
    itemsMap,
    cancelRemove,
    confirmDelete,
  };
};
