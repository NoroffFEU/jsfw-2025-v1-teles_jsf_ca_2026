export const DeliveryOptions = {
  home: {
    id: "home",
    title: "Home Delivery",
    desc: "Your order will be delivered at your registered delivery address.",
    price: 149,
    deliveryTime: "2-6 days",
  },
  office: {
    id: "office",
    title: "Post Office",
    desc: "Your order will be available for pick-up at your nearest post-office.",
    price: 99,
    deliveryTime: "1-3 days",
  },
  box: {
    id: "box",
    title: "Post Box",
    desc: "Your order will be available for pick-up at your nearest post-box.",
    price: 49,
    deliveryTime: "2-3 days",
  },
} as const;

export type DeliveryMethod = keyof typeof DeliveryOptions;
