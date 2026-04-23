import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import { BrandLogo } from "./Logo";
import { navOptions } from "@/lib/link-options";

export const Header = () => {
  return (
    <header className="fixed w-full top-0 left-0 p-6 bg-background flex flex-row flex-wrap gap-2 items-center justify-between shadow-sm z-50">
      <BrandLogo />
      <SearchBar />
      <nav className="p-2 flex gap-4">
        {navOptions.map((item) => {
          return (
            <Link
              {...item.link}
              key={item.label}
              className=" [&.active]:border-blue-600 [&.active]:font-semibold font-mono border-b-2 border-transparent hover:border-b-2 hover:border-blue-600"
            >
              {item.icon ? <ShoppingCart /> : item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
