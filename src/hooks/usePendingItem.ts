import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "@/lib/redux/slices/cartSlice";

export const usePendingItem = () => {
  const [pendingItem, setIsPendingItem] = useState<string | null>(null);
  const dispatch = useDispatch();

  const confirmDelete = () => {
    if (!pendingItem) return;
    dispatch(removeItem(pendingItem));
    setIsPendingItem(null);
  };

  const cancelRemove = () => {
    setIsPendingItem(null);
  };

  return { pendingItem, setIsPendingItem, confirmDelete, cancelRemove };
};
