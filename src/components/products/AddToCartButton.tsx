import { Button } from "@/components/ui/button/Button";
import { useState } from "react";

export const AddToCartButton = ({ productId }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isAdded, setAdded] = useState(false);
  const [count, setCount] = useState(0);

  const handleAddToCart = () => {
    setIsDisabled(true);
    setAdded(true);
    setCount((prev) => prev + 1);

    setTimeout(() => {
      setIsDisabled(false);
    }, 500);
  };

  return (
    <>
      <Button
        children={"ADD TO CART"}
        onClick={handleAddToCart}
        disabled={isDisabled}
        className={
          isDisabled
            ? `opacity-50 cursor-not-allowed`
            : `hover:brightness-80 cursor-pointer`
        }
      />
      {isAdded && <div>{count} ADDED TO CART</div>}
    </>
  );
};
