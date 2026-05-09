import { useState } from "react";

/**
 * Custom hook for managing pending item in cart.
 *
 * Provides state and handlers for a "pending" flow,
 * typically used for cart item removal with user confirmation.
 *
 * @returns {Object} Pending item state and deletion handlers
 * @returns {string | null} returns.pendingItem - ID of item pending deletion (null if none)
 * @returns {(id: string | null) => void} returns.setIsPendingItem - Sets pending item ID
 *
 * @example
 * const { pendingItem, setIsPendingItem } = usePendingItem();
 *
 * // Set pending when user clicks delete
 * <button onClick={() => setIsPendingItem(itemId)}>
 *   Delete
 * </button>
 *
 */
export const usePendingItem = () => {
  const [pendingItem, setIsPendingItem] = useState<string | null>(null);

  return { pendingItem, setIsPendingItem };
};
