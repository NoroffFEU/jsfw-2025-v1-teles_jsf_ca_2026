import { BASE_URL, SHOP_URL } from "@/services/api/config";
import { ApiError } from "@/services/api/apiError";
import type { ApiProduct } from "@/services/models/product";
import { apiProductSchema } from "@/lib/zod/apiProductSchema";

export const fetchProducts = async (): Promise<ApiProduct> => {
  const response = await fetch(`${BASE_URL}${SHOP_URL}`);

  if (!response.ok) {
    throw new ApiError("Invalid API response", response.status);
  }

  const payload: unknown = await response.json();
  const parsedPayload = apiProductSchema.safeParse(payload);
  if (!parsedPayload.success) {
    throw new ApiError(
      "Payload failed schema validation",
      500,
      parsedPayload.error,
    );
  }

  return parsedPayload.data;
};
