import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/redux/hooks/useAppSelector";
import { removeItem } from "@/lib/redux/slices/cartSlice";
import CheckoutSummary from "./CheckoutSummary";
import { selectTotalCartQuantity } from "@/lib/redux/slices/cartSlice";
import { Button } from "../ui/button/Button";
import { Trash2 } from "lucide-react";
import { AlertBox } from "../alerts/AlertBox";
import { MethodPicker } from "./MethodPicker";

type User = {
  name: string;
  email: string;
  address: string;
  postalCode: number;
  city: string;
  country: string;
};

const user: User = {
  name: "Tele Caster Nilsen",
  email: "nilsen@email.com",
  address: "Engelsviken 8",
  postalCode: 1664,
  city: "Fredrikstad",
  country: "Norway",
};

const CheckoutDisplay = () => {
  const [pendingItem, setIsPendingItem] = useState<string | null>(null);
  const totalItems = useAppSelector(selectTotalCartQuantity);
  const itemsMap = useAppSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const itemsArray = Object.values(itemsMap);
  if (itemsArray.length === 0) {
    return <p>Shopping cart is empty.</p>;
  }

  const confirmDelete = () => {
    if (!pendingItem) return;
    dispatch(removeItem(pendingItem));
    setIsPendingItem(null);
  };

  const cancelRemove = () => {
    setIsPendingItem(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <section className="grid grid-area-1 gap-6">
        <div id="user-info">
          <h3 className="text-lg font-semibold">MY INFORMATION</h3>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
        <hr />

        <div id="user-billing" className="">
          <h3 className="text-lg font-semibold">BILLING ADDRESS</h3>
          <p>
            {user.address}, {user.postalCode}
          </p>
          <p>{user.city}</p>
          <p>{user.country}</p>
        </div>
        <hr />

        <MethodPicker />
      </section>

      <section id="user-products">
        <div className="justify-self-center">
          {pendingItem && (
            <AlertBox
              open={true}
              action={true}
              title="Remove from cart?"
              description="This will remove the selected product(s) from your cart."
              onConfirm={confirmDelete}
              onCancel={cancelRemove}
            />
          )}

          <ul className="grid gap-2">
            {itemsArray.map((item) => (
              <li key={item.productId} className="m-2 p-2">
                <span>Product ID: {item.productId}</span>
                <br />
                <span>Quantity: {item.quantity}</span>

                <Button
                  onClick={() => setIsPendingItem(item.productId)}
                  className="ml-2 p-0 text-red-600 bg-transparent"
                >
                  <Trash2 />
                </Button>
              </li>
            ))}
          </ul>

          <p className="justify-self-end">
            Total products: <strong>{totalItems}</strong>
          </p>
        </div>
      </section>

      <section className="grid grid-area-2 gap-6">
        <div className="lg:fixed justify-self-end">
          <CheckoutSummary />
        </div>
      </section>
    </div>
  );
};

export default CheckoutDisplay;
