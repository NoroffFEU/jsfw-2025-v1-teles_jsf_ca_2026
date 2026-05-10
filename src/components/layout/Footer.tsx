import { Separator } from "@/components/ui/separator/Separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const url = "https://telecasternilsen.com";

  return (
    <footer className="w-full mt-12">
      <Separator className="w-full" />

      <div className="flex flex-col items-center md:flex-row md:justify-between w-full p-4 mt-4 text-sm">
        <div className="flex gap-2 items-center">
          <img
            className="w-15 h-auto"
            src="/ShopNet.svg"
            alt="Shopnet logo"
            fetchPriority="high"
          />{" "}
          All rights reserved.
        </div>
        <div>
          &copy; {currentYear} -{" "}
          <a href={url} className="hover:underline">
            Devtones Studio
          </a>
        </div>
      </div>
    </footer>
  );
};
