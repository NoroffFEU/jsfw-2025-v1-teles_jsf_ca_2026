import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cart/checkout")({
  component: Checkout,
});

function Checkout() {
  console.log("Checkout rendering...");
  return (
    <div className="pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center">
      <h1 className="text-3xl mb-2 font-mono">Checkout</h1>
    </div>
  );
}
