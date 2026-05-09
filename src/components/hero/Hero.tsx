import { useState } from "react";
import { Carousel } from "./Carousel";
import { X } from "lucide-react";
import { Button } from "../ui/button/Button";

export const Hero = () => {
  const [isHidden, setIsHidden] = useState(false);

  const handleRemoveHero = () => {
    setIsHidden(true);
  };

  return (
    <div>
      {!isHidden && (
        <div className="relative flex flex-wrap gap-x-8 items-center justify-center w-full h-112.5 bg-selection">
          <div>
            <h2 className="pt-6 md:pt-0 font-mono text-4xl md:text-6xl">
              TAKE A LEAP
            </h2>
            <p className="ml-4">Find your style today</p>
          </div>
          <Carousel />

          <Button
            onClick={handleRemoveHero}
            variant="link"
            className="absolute top-0 right-0 m-8 p-2 hover:bg-green-200 rounded-md"
          >
            <X />
          </Button>
        </div>
      )}
    </div>
  );
};
