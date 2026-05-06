import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item/Item";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner/Spinner";
import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import { selectTotalPrice } from "@/lib/redux/slices/cartSlice";

type PaymentProcessingProps = {
  open: boolean;
};

export const PaymentProcessing = ({ open }: PaymentProcessingProps) => {
  const totalPrice = useAppSelector(selectTotalPrice);
  const fixedTotal = totalPrice.toFixed(2);
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Payment Processing</DialogTitle>
          <DialogDescription className="sr-only"></DialogDescription>
          <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
            <Item variant="muted">
              <ItemMedia>
                <Spinner />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="line-clamp-1" aria-live="assertive">
                  Processing payment...
                </ItemTitle>
              </ItemContent>
              <ItemContent className="flex-none justify-end">
                <span className="text-sm tabular-nums">{fixedTotal} NOK</span>
              </ItemContent>
            </Item>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
