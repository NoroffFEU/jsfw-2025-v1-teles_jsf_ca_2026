import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  return (
    <div className="p-2 justify-self-center">
      <h1 className="text-4xl">Online Shop - Contact</h1>
    </div>
  );
}
