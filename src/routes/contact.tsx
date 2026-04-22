import { createFileRoute } from "@tanstack/react-router";
import ContactForm from "@/components/contact/ContactForm";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  return (
    <div className="pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center">
      <h1 className="text-3xl mb-2 font-mono">Contact</h1>
      <p>Please fill out the form below, and we'll be in touch soon.</p>
      <ContactForm />
    </div>
  );
}
