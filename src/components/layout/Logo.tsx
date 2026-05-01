import { defaultSearch } from "@/lib/zod/searchSchema";
import { Link } from "@tanstack/react-router";

export const BrandLogo = () => {
  return (
    <div>
      <Link to="/" search={defaultSearch}>
        <img src="/ShopNet.svg" alt="Brand Logo" className="w-28 md:w-45" />
      </Link>
    </div>
  );
};
