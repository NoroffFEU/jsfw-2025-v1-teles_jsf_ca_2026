import { Separator } from "@/components/ui/separator/Separator";
import { brandSettings } from "@/lib/data/index";
import { handleComingFeature } from "@/lib/helpers/handleComingFeature";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const url = "https://telecasternilsen.com";

  return (
    <footer className="w-full mt-12">
      <Separator className="w-full" />

      <div className="flex flex-col gap-4 items-center md:flex-row md:justify-between w-full p-4 mt-4 text-sm">
        <div className="flex gap-2 items-center">
          <img
            className="w-15 h-auto"
            src={brandSettings.logo}
            alt={`${brandSettings.name} logo`}
            fetchPriority="high"
          />{" "}
          All rights reserved.
        </div>

        <div>
          <ul className="grid gap-1">
            <li>
              {/* Switch Giftcards to <a> when feature exists.
                <a href="/faq">Giftcards</a> */}
              <button
                className="hover:underline cursor-pointer"
                onClick={handleComingFeature}
              >
                Giftcards
              </button>
            </li>
            <li className="hover:underline">
              <a href="/terms#7">Return policy</a>
            </li>
            <li className="hover:underline">
              <a href="/contact">Contact us</a>
            </li>
            <li className="hover:underline">
              <a href="/terms">Terms & Conditions</a>
            </li>
            <li className="hover:underline">
              <a href="/about/accessibility">Accessibility Commitment</a>
            </li>
          </ul>
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
