import z from "zod";

export const reviewSchema = z.object({
  id: z.string(),
  username: z.string(),
  rating: z.number(),
  description: z.string(),
});

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountedPrice: z.number(),
  image: z.object({
    url: z.string(),
    alt: z.string(),
  }),
  rating: z.number(),
  tags: z.array(z.string()),
  reviews: z.array(reviewSchema),
});

export const productMetaSchema = z.object({
  currentPage: z.number().int(),
  isFirstPage: z.boolean(),
  isLastPage: z.boolean(),
  nextPage: z.number().int().nullable(),
  pageCount: z.number().int(),
  previousPage: z.number().int().nullable(),
  totalCount: z.number().int(),
});
