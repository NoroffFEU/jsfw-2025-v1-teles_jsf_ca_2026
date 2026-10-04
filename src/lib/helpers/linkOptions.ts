import { linkOptions } from "@tanstack/react-router";
import { defaultSearch } from "@/lib/zod/searchSchema";

export const checkoutLinkOptions = linkOptions({
  to: "/cart/checkout",
});

export const paymentSuccessLinkOptions = linkOptions({
  to: "/cart/success",
});

export const contactSuccessLinkOptions = linkOptions({
  to: "/contact/thank-you",
});

export const navOptions = [
  {
    link: linkOptions({
      to: "/",
      search: defaultSearch,
      activeOptions: { exact: true },
    }),
    label: "Products",
    icon: false,
  },
  {
    link: linkOptions({ to: "/contact" }),
    label: "Contact",
    icon: false,
  },
  {
    link: linkOptions({ to: "/cart" }),
    label: "Cart",
    icon: true,
  },
];
