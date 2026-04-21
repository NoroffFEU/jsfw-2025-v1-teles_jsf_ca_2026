import React, { useState } from "react";
import z from "zod";
import { toast } from "react-hot-toast";
import { formSchema } from "@/lib/zod/formSchema";

import { Button } from "@/components/ui/button/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/Card";
import {
  Field,
  FieldError,
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

const ContactForm = () => {
  const [values, setValues] = useState({
    email: "",
    fullname: "",
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string[] }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleReset = () => {
    setValues({ email: "", fullname: "", title: "", description: "" });
    setErrors({});
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = formSchema.safeParse(values);

    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setErrors(fieldErrors);
    } else {
      setErrors({});
      toast("Thank you for your inquiry. We'll get back to you soon! :)");
      // ?? dispatch(submitContactForm(result.data));
      handleReset();
    }
  };

  return (
    <Card className="w-150 mt-10 mx-auto shadow-xl">
      <CardHeader>
        <CardTitle>Reach Out</CardTitle>
        <CardDescription>Let us know what's on your mind.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="contact-form" onSubmit={handleSubmit}>
          <FieldGroup>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                placeholder="Email..."
                autoComplete="on"
              />
              {errors.email && <FieldError errors={errors.email} />}
            </Field>

            <Field data-invalid={!!errors.fullname}>
              <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
              <Input
                id="fullname"
                name="fullname"
                value={values.fullname}
                onChange={handleChange}
                aria-invalid={!!errors.fullname}
                placeholder="Full Name..."
                autoComplete="on"
              />
              {errors.email && <FieldError errors={errors.fullname} />}
            </Field>

            <Field data-invalid={!!errors.title}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                aria-invalid={!!errors.title}
                placeholder="Title..."
                autoComplete="off"
              />
              {errors.title && <FieldError errors={errors.title} />}
            </Field>

            <Field data-invalid={!!errors.description}>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  placeholder="Write your inquiry here..."
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={!!errors.description}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {values.description.length}/100 characters
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {errors.description && <FieldError errors={errors.description} />}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="hover:brightness-90 cursor-pointer"
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="contact-form"
            className="hover:brightness-90 cursor-pointer"
          >
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default ContactForm;
