import { BASE_URL, SHOP_URL } from "@/services/api/config";
import { ApiError } from "@/services/api/apiError";
import { productByIdSchema } from "@/lib/zod/productByIdSchema";
import z from "zod";

export const fetchProductById = async (
  id: string,
): Promise<z.infer<typeof productByIdSchema>> => {
  const response = await fetch(`${BASE_URL}${SHOP_URL}/${id}`);

  if (!response.ok) {
    throw new ApiError("Invalid API response", response.status);
  }

  const payload: unknown = await response.json();
  const parsedPayload = productByIdSchema.safeParse(payload);
  if (!parsedPayload.success) {
    throw new ApiError("Invalid parsed API response", 500, parsedPayload.error);
  }

  return parsedPayload.data;
};
