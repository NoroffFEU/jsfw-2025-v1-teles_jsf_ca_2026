import { createFileRoute } from "@tanstack/react-router";
import ContactForm from "@/components/contact/ContactForm";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  return (
    <div className="w-full h-screen pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center justify-items-center">
      <h1 className="w-fit p-1 rounded-sm text-3xl mt-4 mb-2 font-mono bg-green-300">
        Contact
      </h1>
      <p>Please fill out the form below, and we'll be in touch soon.</p>
      <ContactForm />
    </div>
  );
}
