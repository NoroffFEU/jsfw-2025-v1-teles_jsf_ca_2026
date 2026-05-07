import { Separator } from "@/components/ui/separator/Separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const url = "https://telecasternilsen.com";

  return (
    <footer className="w-full mt-12 justify-self-center justify-items-center">
      <Separator className="w-full" />
      <div className="mt-4">
        &copy; {currentYear} -{" "}
        <a href={url} className="hover:underline">
          Devtones Studio
        </a>
      </div>
    </footer>
  );
};
