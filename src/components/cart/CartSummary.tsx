import { useSelector } from "react-redux";
import { selectTotalCartQuantity } from "../../lib/redux/cartSlice";

const CartSummary = () => {
  const totalItems = useSelector(selectTotalCartQuantity);
  // const totalPrice = useSelector(selectTotalPrice);

  const itemsArray = Object.values(itemsMap);

  if (itemsArray.length === 0) {
    return <p>Shopping cart is empty.</p>;
  }

  return (
    <div
      style={{
        marginTop: "20px",
        borderTop: "2px solid black",
        paddingTop: "10px",
      }}
    >
      <h3>Summary</h3>
      <p>
        Total products in the cart: <strong>{totalItems}</strong>
      </p>
      {/* <p>Total pris: <strong>{totalPrice} NOK</strong></p> */}
    </div>
  );
};

export default CartSummary;
