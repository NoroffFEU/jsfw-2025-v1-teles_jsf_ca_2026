import { toast } from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type formSchemaType } from "@/lib/zod/formSchema";
import { contactSuccessLinkOptions } from "@/lib/helpers/linkOptions";

import { Button } from "@/components/ui/button/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/Card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/input/field/Field";
import { Input } from "@/components/ui/input/input/Input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input/input/InputGroup";

/**
 * Contact form with Zod validation and React Hook Form integration.
 *
 * Handles user inquiries with fields: email, full name, title, description (200 char limit).
 * Provides real-time character counter, form reset, success/error toasts, and success page navigation.
 * Full a11y with `aria-invalid`, `role="alert"` error messages.
 *
 * Validates via `formSchema` (Zod) with `onBlur` mode.
 *
 * @returns {JSX.Element} Validated contact form UI
 *
 * @example
 * // Contact page main component
 * <ContactForm />
 */
const ContactForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const descriptionValue = useWatch({
    control,
    name: "description",
    defaultValue: "",
  });

  const onSubmit = (data: formSchemaType) => {
    try {
      toast.success(`Message sent by: ${data.email}`);
      navigate(contactSuccessLinkOptions);
      reset();
    } catch (error) {
      toast.error(
        `Sending failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

  return (
    <Card className="w-full max-w-xl mt-10 mx-auto shadow-xl">
      <CardHeader>
        <CardTitle>Reach Out</CardTitle>
        <CardDescription>Let us know what's on your mind.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register("email")}
                aria-invalid={!!errors.email}
                placeholder="Email..."
                autoComplete="on"
              />
              {errors.email && <p role="alert">{errors.email.message}</p>}
            </Field>

            <Field data-invalid={!!errors.fullname}>
              <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
              <Input
                {...register("fullname")}
                aria-invalid={!!errors.fullname}
                placeholder="Full Name..."
                autoComplete="on"
              />
              {errors.fullname && <p role="alert">{errors.fullname.message}</p>}
            </Field>

            <Field data-invalid={!!errors.title}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                {...register("title")}
                aria-invalid={!!errors.title}
                placeholder="Title..."
                autoComplete="off"
              />
              {errors.title && <p role="alert">{errors.title.message}</p>}
            </Field>

            <Field data-invalid={!!errors.description}>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...register("description")}
                  placeholder="Write your inquiry here..."
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={!!errors.description}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {descriptionValue.length}/200 characters
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {errors.description && (
                <p role="alert">{errors.description.message}</p>
              )}
            </Field>
          </FieldGroup>

          <Field orientation="horizontal" className="justify-end p-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              className="hover:brightness-90 cursor-pointer"
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="hover:brightness-90 cursor-pointer"
            >
              Submit
            </Button>
          </Field>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
