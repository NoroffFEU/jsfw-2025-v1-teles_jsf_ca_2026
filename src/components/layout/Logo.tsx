import { defaultSearch } from "@/lib/zod/searchSchema";
import { Link } from "@tanstack/react-router";
import { brandSettings } from "@/lib/data/index";

export const BrandLogo = () => {
  return (
    <div>
      <Link to="/" search={defaultSearch}>
        <img
          src={brandSettings.logo}
          alt={`${brandSettings.name} Logo`}
          className="w-28 h-auto md:w-45"
          fetchPriority="high"
        />
      </Link>
    </div>
  );
};
