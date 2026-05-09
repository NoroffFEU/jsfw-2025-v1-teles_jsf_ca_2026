import { useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks/useAppDispatch";
import { removeItem } from "@/lib/redux/slices/cartSlice";
import toast from "react-hot-toast";

/**
 * Custom hook for managing pending item deletion from cart.
 *
 * Provides state and handlers for a "pending delete" confirmation flow,
 * typically used for cart item removal with user confirmation.
 *
 * @returns {Object} Pending item state and deletion handlers
 * @returns {string | null} returns.pendingItem - ID of item pending deletion (null if none)
 * @returns {(id: string | null) => void} returns.setIsPendingItem - Sets pending item ID
 * @returns {() => void} returns.confirmDelete - Confirms deletion, removes item, shows toast
 * @returns {() => void} returns.cancelRemove - Cancels pending deletion
 *
 * @example
 * const { pendingItem, setIsPendingItem, confirmDelete, cancelRemove } = usePendingItem();
 *
 * // Set pending when user clicks delete
 * <button onClick={() => setIsPendingItem(itemId)}>
 *   Delete
 * </button>
 *
 * // Confirmation UI
 * {pendingItem && (
 *   <div>
 *     <button onClick={confirmDelete}>Confirm</button>
 *     <button onClick={cancelRemove}>Cancel</button>
 *   </div>
 * )}
 */
export const usePendingItem = () => {
  const [pendingItem, setIsPendingItem] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const confirmDelete = () => {
    if (!pendingItem) return;
    toast("Removed from cart");
    dispatch(removeItem(pendingItem));
    setIsPendingItem(null);
  };

  const cancelRemove = () => {
    setIsPendingItem(null);
  };

  return { pendingItem, setIsPendingItem, confirmDelete, cancelRemove };
};
