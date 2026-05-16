import { z } from "zod";
import { ApiError } from "@/services/api/apiError";
import { withApiHandler } from "@/services/api/handler";

describe("withApiHandler", () => {
  const schema = z.object({
    id: z.string(),
    title: z.string(),
  });

  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  test("returns parsed payload when valid", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ id: "1", title: "Product 1" }),
    } as Response);

    const handler = withApiHandler({
      endpoint: (id: string) => `/products/${id}`,
      schema,
      baseUrl: "online-shop",
    });

    await expect(handler("1")).resolves.toEqual({
      id: "1",
      title: "Product 1",
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "online-shop/products/1",
      undefined,
    );
  });

  test("throws error when payload fails validation", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ id: 123, title: "Wrong type" }),
    } as Response);

    const handler = withApiHandler({
      endpoint: (id: string) => `/products/${id}`,
      schema,
      baseUrl: "online-shop",
    });

    const result = handler("1");

    await expect(result).rejects.toBeInstanceOf(ApiError);
    await expect(result).rejects.toMatchObject({
      message: "Payload failed schema validation",
      status: 500,
    });
  });

  test("throws error when response !ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);

    const handler = withApiHandler({
      endpoint: "/unknown",
      schema,
      baseUrl: "online-shop",
    });

    await expect(handler()).rejects.toBeInstanceOf(ApiError);
    await expect(handler()).rejects.toMatchObject({
      message: "Invalid response",
      status: 404,
    });
  });
});
