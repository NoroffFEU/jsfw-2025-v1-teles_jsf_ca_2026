import { createFileRoute } from "@tanstack/react-router";
import ContactForm from "@/components/ui/form/ContactForm";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  return (
    <div className="pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center">
      <h1 className="text-4xl mb-2">Contact</h1>
      <p>Please fill out the form below, and we'll soon be in touch.</p>
      <ContactForm />
    </div>
  );
}
