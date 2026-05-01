import z from "zod";

const sortValues = ["newest", "onSale", "ratingHigh", "priceLow", "priceHigh"];

export type ProductSort = (typeof sortValues)[number];

export const defaultSearch = {
  page: 1,
  query: "",
  sort: "newest" as ProductSort,
};

export const searchSchema = z.object({
  page: z.coerce.number().int().min(1).catch(1),
  query: z.string().trim().catch(""),
  sort: z.enum(sortValues).catch(defaultSearch.sort),
});
