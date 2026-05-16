import { getProductCardMeta } from "@/lib/helpers/getProductCardMeta";

describe("getProductCardMeta", () => {
  test("should return the product meta", () => {
    expect(
      getProductCardMeta({
        price: 100,
        discountedPrice: 90,
        tags: [],
        reviews: [
          {
            id: "1",
            rating: 4,
            username: "John Doe",
            description: "It was very useful",
          },
          {
            id: "2",
            rating: 3,
            username: "Jane Doe",
            description: "It was OK",
          },
        ],
      }),
    ).toEqual({
      hasDiscount: true,
      hasTags: false,
      discount: 10,
      hasReviews: true,
      highestRating: 4,
    });
  });
});
