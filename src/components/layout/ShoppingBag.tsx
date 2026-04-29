import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge/Badge";
import { selectTotalCartQuantity } from "@/lib/redux/slices/cartSlice";
import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";

export const ShoppingBag = () => {
  const totalItems = useAppSelector(selectTotalCartQuantity);
  return (
    <div className="flex p-0 m-0">
      <ShoppingCart />
      <Badge
        className="-ml-1 bg-green-300 rounded-full items-center justify-items-center"
        variant="secondary"
        children={totalItems}
      />
    </div>
  );
};
