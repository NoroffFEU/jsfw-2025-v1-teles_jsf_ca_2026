import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import { removeItem, updateQuantity } from "@/lib/redux/slices/cartSlice";
import { Button } from "@/components/ui/button/Button";

const CartDisplay = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const itemsMap = useAppSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const itemsArray = Object.values(itemsMap);
  if (itemsArray.length === 0) {
    return <p>Shopping cart is empty.</p>;
  }

  const handleProceedToCheckout = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 500);
  };

  return (
    <div className="grid gap-4">
      <h2>Shopping Cart</h2>
      <ul className="grid gap-2 p-8 rounded-sm bg-gray-100">
        {itemsArray.map((item) => (
          <li
            key={item.productId}
            style={{
              margin: "10px 0",
              borderBottom: "1px solid #eee",
              paddingBottom: "5px",
            }}
          >
            <span>Produkt ID: {item.productId}</span>
            <br />
            <span>Antall: {item.quantity}</span>

            <button
              onClick={() =>
                dispatch(
                  updateQuantity({
                    productId: item.productId,
                    quantity: item.quantity - 1,
                  }),
                )
              }
              style={{ marginLeft: "10px" }}
            >
              -
            </button>

            <button
              onClick={() =>
                dispatch(
                  updateQuantity({
                    productId: item.productId,
                    quantity: item.quantity + 1,
                  }),
                )
              }
              style={{ marginLeft: "5px" }}
            >
              +
            </button>

            <button
              onClick={() => dispatch(removeItem(item.productId))}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Fjern
            </button>
          </li>
        ))}
      </ul>

      {itemsArray.length !== 0 && (
        <Button
          className={
            isDisabled
              ? "flex justify-self-end brightness-90"
              : "flex justify-self-end hover:brightness-90"
          }
          disabled={isDisabled}
          onClick={handleProceedToCheckout}
        >
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
};

export default CartDisplay;
