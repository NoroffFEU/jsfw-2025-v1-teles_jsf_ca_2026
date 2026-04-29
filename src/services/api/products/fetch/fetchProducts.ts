import { BASE_URL, SHOP_URL } from "@/services/api/config";
import { ApiError } from "@/services/api/apiError";
import type { ApiProduct } from "@/services/models/product";

export const fetchProducts = async (): Promise<ApiProduct> => {
  const response = await fetch(`${BASE_URL}${SHOP_URL}`);
  const payload = await response.json();

  if (!response.ok) {
    throw new ApiError(
      payload.error ?? payload.message ?? "Get all products failed",
      response.status || 400,
      payload,
    );
  }

  return payload as ApiProduct;
};
