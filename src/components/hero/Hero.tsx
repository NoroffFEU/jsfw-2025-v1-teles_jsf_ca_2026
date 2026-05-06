import { Carousel } from "./Carousel";

export const Hero = () => {
  return (
    <div className="flex gap-x-8 items-center justify-center w-full h-112.5 bg-selection">
      <div>
        <h2 className="font-mono text-6xl">TAKE A LEAP</h2>
        <p className="ml-4">Find your style today</p>
      </div>
      <Carousel />
    </div>
  );
};
