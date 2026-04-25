import { PaymentProcessing } from "@/components/checkout/PaymentProcessing";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cart/success")({
  component: Success,
});

function Success() {
  return (
    <div className="w-full h-screen pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center justify-items-center">
      <PaymentProcessing />
    </div>
  );
}
