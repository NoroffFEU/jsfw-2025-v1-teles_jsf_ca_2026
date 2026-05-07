import { z } from "zod";
import { productSchema, productMetaSchema } from "./productSchema";

export const apiProductSchema = z.object({
  data: z.array(productSchema),
  meta: productMetaSchema,
});
