import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item/Item";
import { Button } from "../ui/button/Button";
import { useState } from "react";
import toast from "react-hot-toast";

type PaymentMethod = "klarna" | "vipps" | "card";
type DeliveryMethod = "home" | "office" | "box";

export const MethodPicker = () => {
  const [selectedPay, setSelectedPay] = useState<PaymentMethod | null>(null);
  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryMethod | null>(null);

  const handleSelectPayment = (type: PaymentMethod) => {
    toast.remove();
    setSelectedPay(type);
    toast(`Selected payment: ${type}`);
  };

  const handleSelectDelivery = (type: DeliveryMethod) => {
    toast.remove();
    setSelectedDelivery(type);
    toast(`Selected delivery: ${type}`);
  };

  return (
    <div className="grid grid-rows-2 gap-4">
      <h3 className="text-lg font-semibold">PAYMENT</h3>
      <h4 className="text-sm">Select your preferred payment method</h4>
      <div role="radiogroup">
        <Item>
          <ItemContent>
            <ItemMedia variant="icon">
              {" "}
              <img
                src="/payment-methods/klarna-rosa.jpg"
                alt="Klarna logo"
                className="w-20 -ml-2.5 rounded-sm"
              />
            </ItemMedia>
            <ItemTitle className="sr-only" aria-label="klarna">
              Klarna
            </ItemTitle>
            <ItemDescription id="desc-klarna">
              Get your order now and pay later with Klarna invoice.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              role="radio"
              aria-labelledby="klarna"
              aria-describedby="desc-klarna"
              aria-checked={selectedPay === "klarna"}
              onClick={() => handleSelectPayment("klarna")}
            >
              Select
            </Button>
          </ItemActions>
        </Item>

        <Item>
          <ItemContent>
            <ItemMedia variant="icon">
              {" "}
              <img
                src="/payment-methods/vipps-mobilepay.png"
                alt="Vipps logo"
                className="w-20 -ml-2.5 rounded-sm"
              />
            </ItemMedia>
            <ItemTitle className="sr-only" aria-label="vipps">
              Vipps
            </ItemTitle>
            <ItemDescription id="desc-vipps">
              Easy payment with Vipps Mobile Pay.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              role="radio"
              aria-labelledby="vipps"
              aria-describedby="desc-vipps"
              aria-checked={selectedPay === "vipps"}
              onClick={() => handleSelectPayment("vipps")}
            >
              Select
            </Button>
          </ItemActions>
        </Item>

        <Item>
          <ItemContent>
            <ItemMedia variant="icon">
              {" "}
              <div className="grid grid-cols-2 gap-2 justify-center items-center">
                <img
                  src="/payment-methods/Visa-Symbol.png"
                  alt="Visa logo"
                  className="w-10 rounded-sm"
                />
                <img
                  src="/payment-methods/Mastercard-logo-730x410.jpg"
                  alt="Mastercard logo"
                  className="w-10 rounded-sm"
                />
              </div>
            </ItemMedia>
            <ItemTitle className="sr-only" aria-label="card">
              Card Payment
            </ItemTitle>
            <ItemDescription id="desc-card">
              Pay with your preferred debit or mastercard.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              role="radio"
              aria-labelledby="card"
              aria-describedby="desc-card"
              aria-checked={selectedPay === "card"}
              onClick={() => handleSelectPayment("card")}
            >
              Select
            </Button>
          </ItemActions>
        </Item>
      </div>

      <hr />

      <h3 className="text-lg font-semibold">DELIVERY</h3>
      <h4 className="text-sm">Select your preferred delivery method</h4>
      <div role="radiogroup">
        <Item>
          <ItemContent>
            <ItemTitle aria-label="home">Home Delivery</ItemTitle>
            <ItemDescription id="desc-home">
              Your order will be delivered at your registered delivery address.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              role="radio"
              aria-labelledby="home"
              aria-describedby="desc-home"
              aria-checked={selectedDelivery === "home"}
              onClick={() => handleSelectDelivery("home")}
            >
              Select
            </Button>
          </ItemActions>
        </Item>

        <Item>
          <ItemContent>
            <ItemTitle aria-label="office">Post Office</ItemTitle>
            <ItemDescription id="desc-office">
              Your order will be available for pick-up at your nearest
              post-office.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              role="radio"
              aria-labelledby="office"
              aria-describedby="desc-office"
              aria-checked={selectedDelivery === "office"}
              onClick={() => handleSelectDelivery("office")}
            >
              Select
            </Button>
          </ItemActions>
        </Item>

        <Item>
          <ItemContent>
            <ItemTitle aria-label="box"> Post Box</ItemTitle>
            <ItemDescription id="desc-box">
              Your order will be available for pick-up at your nearest post-box.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              role="radio"
              aria-labelledby="box"
              aria-describedby="desc-box"
              aria-checked={selectedDelivery === "box"}
              onClick={() => handleSelectDelivery("box")}
            >
              Select
            </Button>
          </ItemActions>
        </Item>
      </div>
    </div>
  );
};
