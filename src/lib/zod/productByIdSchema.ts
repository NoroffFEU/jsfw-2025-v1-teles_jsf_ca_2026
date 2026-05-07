import z from "zod";
import { productSchema } from "./productSchema";

export const productByIdSchema = z.object({
  data: productSchema,
  meta: z.object({}),
});
