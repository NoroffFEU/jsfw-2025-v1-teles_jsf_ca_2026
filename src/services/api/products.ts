import { apiProductSchema } from "@/lib/zod/apiProductSchema";
import { productByIdSchema } from "@/lib/zod/productByIdSchema";
import { withApiHandler } from "./handler";
import { SHOP_URL } from "./config";

export const getAllProducts = withApiHandler({
  endpoint: SHOP_URL,
  schema: apiProductSchema,
});

export const getProductById = withApiHandler({
  endpoint: (id: string) => `${SHOP_URL}/${id}`,
  schema: productByIdSchema,
});
