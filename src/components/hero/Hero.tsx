import { Carousel } from "./Carousel";

export const Hero = () => {
  return (
    <div className="flex flex-wrap gap-x-8 items-center justify-center w-full h-112.5 bg-selection">
      <div>
        <h2 className="pt-6 md:pt-0 font-mono text-4xl md:text-6xl">
          TAKE A LEAP
        </h2>
        <p className="ml-4">Find your style today</p>
      </div>
      <Carousel />
    </div>
  );
};
