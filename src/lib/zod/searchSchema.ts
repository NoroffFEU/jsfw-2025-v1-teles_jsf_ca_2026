import z from "zod";

const sortValues = ["newest", "onSale", "ratingHigh", "priceLow", "priceHigh"];

export type ProductSort = (typeof sortValues)[number];

export const defaultSearch = {
  page: 1,
  query: "",
  sort: "newest" as ProductSort,
};

export const searchSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  query: z.string().trim().default(""),
  sort: z.enum(sortValues).default(defaultSearch.sort),
});
