import { useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks/useAppDispatch";
import { removeItem } from "@/lib/redux/slices/cartSlice";
import toast from "react-hot-toast";

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
