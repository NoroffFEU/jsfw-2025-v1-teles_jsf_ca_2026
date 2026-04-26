import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/contact/thank-you")({
  component: ThankYou,
});

function ThankYou() {
  return (
    <div className="w-full pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center justify-items-center">
      <div className="grid grid-template-rows gap-4 justify-items-center">
        <h1 className="text-4xl mt-4 mb-4 p-1 rounded-sm font-mono bg-selection">
          Thank you for your inquiry!
        </h1>
        <p className="text-xl mt-8">We wil get back to you shortly.</p>

        <Link to="/" className="w-fit flex gap-2 items-center hover:underline">
          <ArrowLeft /> Go home
        </Link>
      </div>
    </div>
  );
}
