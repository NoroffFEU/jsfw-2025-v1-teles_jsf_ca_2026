export const PaymentOptions = {
  klarna: {
    id: "klarna",
    title: "Klarna",
    desc: "Get your order now and pay later with Klarna invoice.",
    logo: { src: "/payment-methods/klarna-rosa.jpg", alt: "Klarna logo" },
  },
  vipps: {
    id: "vipps",
    title: "Vipps",
    desc: "Easy payment with Vipps Mobile Pay.",
    logo: { src: "/payment-methods/vipps-mobilepay.png", alt: "Vipps logo" },
  },
  card: {
    id: "card",
    title: "Card Payment",
    desc: "Pay with your preferred debit or mastercard.",
    logo: [
      { src: "/payment-methods/Visa-Symbol.png", alt: "Visa logo" },
      {
        src: "/payment-methods/Mastercard-logo-730x410.jpg",
        alt: "Mastercard logo",
      },
    ],
  },
};
