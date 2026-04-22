import { Button } from "@/components/ui/button/Button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { Product } from "@/services/models/product";
import { useAppDispatch } from "@/lib/redux/hooks/useAppDispatch";
import { addItem } from "@/lib/redux/slices/cartSlice";

type AddToCartProps = {
  productId: Product["id"];
};

export const AddToCartButton = ({ productId }: AddToCartProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isAdded, setAdded] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    toast.remove();

    dispatch(addItem({ productId }));

    setIsDisabled(true);
    setAdded(true);
    setCount((prev) => prev + 1);

    setTimeout(() => {
      setIsDisabled(false);
    }, 500);

    toast(`Added to cart. ID: ${productId}`);
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
            : `hover:brightness-80 hover:shadow-lg cursor-pointer`
        }
      />
      {isAdded && <div>{count} ADDED TO CART</div>}
    </>
  );
};
