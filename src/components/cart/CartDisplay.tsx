import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../../lib/redux/cartSlice";

const CartDisplay = () => {
  const itemsMap = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const itemsArray = Object.values(itemsMap);

  if (itemsArray.length === 0) {
    return <p>Shopping cart is empty.</p>;
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
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
    </div>
  );
};

export default CartDisplay;
