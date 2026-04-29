import { linkOptions } from "@tanstack/react-router";

export const checkoutLinkOptions = linkOptions({
  to: "/cart/checkout",
  search: { search: "" },
});

export const paymentSuccessLinkOptions = linkOptions({
  to: "/cart/success",
  search: { search: "" },
});

export const contactSuccessLinkOptions = linkOptions({
  to: "/contact/thank-you",
  search: { search: "" },
});

export const navOptions = [
  {
    link: linkOptions({ to: "/", activeOptions: { exact: true } }),
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
