import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item/Item";
import { Spinner } from "@/components/ui/spinner/Spinner";
import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import { selectTotalPrice } from "@/lib/redux/slices/cartSlice";

export const PaymentProcessing = () => {
  const totalPrice = useAppSelector(selectTotalPrice);
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
        </ItemContent>
        <ItemContent className="flex-none justify-end">
          <span className="text-sm tabular-nums">{totalPrice} NOK</span>
        </ItemContent>
      </Item>
    </div>
  );
};
