import { BASE_URL, SHOP_URL } from "@/services/api/config";
import { ApiError } from "@/services/api/api-error";
import type { Product, ProductMeta } from "@/services/models/product";

export const fetchProductById = async (
  id: string,
): Promise<{ data: Product; meta: ProductMeta }> => {
  const response = await fetch(`${BASE_URL}${SHOP_URL}/${id}`);
  const payload = await response.json();

  if (!response.ok) {
    throw new ApiError(
      payload.error ?? payload.message ?? "Fetching article by id failed",
      response.status || 400,
      payload,
    );
  }

  return payload as { data: Product; meta: ProductMeta };
};
