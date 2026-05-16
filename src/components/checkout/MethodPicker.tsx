import toast from "react-hot-toast";
import { DeliveryOptions, PaymentOptions } from "@/lib/data/index";
import { useAppDispatch } from "@/lib/redux/hooks/useAppDispatch";
import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import {
  selectSelectedDelivery,
  selectSelectedPayment,
  setSelectedPayment,
  setSelectedDelivery,
} from "@/lib/redux/slices/checkoutSlice";
import type { PaymentMethod, DeliveryMethod } from "@/lib/data/index";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item/Item";
import { Separator } from "@/components/ui/separator/Separator";
import { Button } from "@/components/ui/button/Button";
import { formatCurrency } from "@/lib/helpers/formatCurrency";

/**
 * Payment and delivery method selector for checkout flow.
 *
 * Radio-group style picker for:
 * - **Payment**: Klarna, Vipps, Card (Visa/Mastercard)
 * - **Delivery**: Home, Post Office, Post Box
 *
 * Provides toast feedback on selection with `toast.remove()` to clear previous.
 * Full a11y support with `role="radio"` + ARIA labels/descriptions.
 *
 * @returns {JSX.Element} Payment & delivery method picker UI
 *
 * @example
 * // Used in CheckoutDisplay user-info section
 * <MethodPicker />
 */
export const MethodPicker = () => {
  const dispatch = useAppDispatch();
  const selectedPay = useAppSelector(selectSelectedPayment);
  const selectedDelivery = useAppSelector(selectSelectedDelivery);

  const handleSelectPayment = (type: PaymentMethod) => {
    toast.remove();
    dispatch(setSelectedPayment(type));
    toast(`Selected payment: ${type}`);
  };

  const handleSelectDelivery = (type: DeliveryMethod) => {
    toast.remove();
    dispatch(setSelectedDelivery(type));
    toast(`Selected delivery: ${type}`);
  };

  return (
    <div className="grid grid-rows-2 gap-4">
      <h3 className="text-lg font-semibold">PAYMENT</h3>
      <h4 className="text-sm">Select your preferred payment method</h4>
      <div role="radiogroup">
        {Object.values(PaymentOptions).map((option) => (
          <Item key={option.id}>
            <ItemContent>
              <ItemMedia variant="icon">
                {" "}
                <div className="grid grid-cols-2 justify-center items-center">
                  {option.logo.map((img) => (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      fetchPriority="high"
                      className="w-10 h-auto rounded-sm"
                    />
                  ))}
                </div>
              </ItemMedia>
              <ItemTitle
                className="sr-only"
                id={`title-${option.id}`}
                aria-label={option.id}
              >
                {option.title}
              </ItemTitle>
              <ItemDescription id={`desc-${option.id}`}>
                {option.desc}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                role="radio"
                aria-labelledby={`title-${option.id}`}
                aria-describedby={`desc-${option.id}`}
                aria-checked={selectedPay === option.id}
                onClick={() => handleSelectPayment(option.id)}
              >
                Select
              </Button>
            </ItemActions>
          </Item>
        ))}
      </div>

      <Separator />

      <h3 className="text-lg font-semibold">DELIVERY</h3>
      <h4 className="text-sm">Select your preferred delivery method</h4>

      <div role="radiogroup">
        {Object.values(DeliveryOptions).map((option) => (
          <Item key={option.id}>
            <ItemContent>
              <ItemTitle id={`title-${option.id}`} aria-label={option.id}>
                {option.title}
              </ItemTitle>
              <ItemDescription id={`desc-${option.id}`}>
                {option.desc}: {formatCurrency(option.price)}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                role="radio"
                aria-labelledby={`title-${option.id}`}
                aria-describedby={`desc-${option.id}`}
                aria-checked={selectedDelivery === option.id}
                onClick={() => handleSelectDelivery(option.id)}
              >
                Select
              </Button>
            </ItemActions>
          </Item>
        ))}
      </div>
    </div>
  );
};
