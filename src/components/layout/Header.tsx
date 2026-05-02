import { Link } from "@tanstack/react-router";
import { SearchBar } from "@/components/search/index";
import { navOptions } from "@/lib/helpers/linkOptions";
import { ShoppingBag, BrandLogo } from "./index";

export const Header = () => {
  return (
    <header className="fixed w-full top-0 left-0 p-6 bg-background flex flex-row flex-wrap md:flex-nowrap gap-2 items-center justify-between shadow-sm z-50">
      <BrandLogo />
      <SearchBar />
      <nav className="p-2 flex gap-4">
        {navOptions.map((item) => {
          return (
            <Link
              {...item.link}
              key={item.label}
              className="[&.active]:border-selection [&.active]:font-semibold font-mono border-b-2 border-transparent hover:border-b-2 hover:border-selection"
            >
              {item.icon ? <ShoppingBag aria-label={item.label} /> : item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
