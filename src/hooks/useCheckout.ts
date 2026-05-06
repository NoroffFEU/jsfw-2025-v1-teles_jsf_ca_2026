import { useRef, useEffect } from "react";
import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import { usePendingItem } from "./usePendingItem";

export const useCheckout = () => {
  const { pendingItem, setIsPendingItem } = usePendingItem();
  const alertRef = useRef<HTMLDivElement | null>(null);
  const itemsMap = useAppSelector((state) => state.cart.items);

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

  return {
    pendingItem,
    setIsPendingItem,
    alertRef,
    itemsMap,
  };
};
