import { useRef, useState, useEffect } from "react";
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
  const alertRef = useRef<HTMLDivElement | null>(null);
  const totalItems = useAppSelector(selectTotalCartQuantity);
  const itemsMap = useAppSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pendingItem || !alertRef.current) return;

    const rect = alertRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const offset = 150;

    window.scrollTo({
      top: rect.top + scrollTop - offset,
      behavior: "smooth",
    });
  }, [pendingItem]);

  const itemsArray = Object.values(itemsMap);
  if (itemsArray.length === 0) {
    return <p>Shopping cart is empty.</p>;
  }

  const hasMultipleItems = itemsArray.some((item) => item.quantity > 1);

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
      <section id="user-info" className="grid gap-6">
        <div>
          <h3 className="text-lg font-semibold">MY INFORMATION</h3>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p className="w-fit underline hover:no-underline cursor-pointer">
            Edit info
          </p>
        </div>
        <hr />

        <div id="user-billing" className="">
          <h3 className="text-lg font-semibold">BILLING ADDRESS</h3>
          <p>
            {user.address}, {user.postalCode}
          </p>
          <p>{user.city}</p>
          <p>{user.country}</p>
          <p className="w-fit underline hover:no-underline cursor-pointer">
            Edit info
          </p>
        </div>
        <hr />

        <MethodPicker />
      </section>

      <section id="user-products" className="justify-self-center">
        {pendingItem && (
          <div ref={alertRef}>
            <AlertBox
              open={true}
              action={true}
              title="Remove from cart?"
              description="This will remove the selected product(s) from your cart."
              onConfirm={confirmDelete}
              onCancel={cancelRemove}
            />
          </div>
        )}
        <ul className="grid grid-cols-1 xl:grid-cols-2 gap-2">
          {itemsArray.map((item) => (
            <li
              key={item.productId}
              className="grid gap-2 m-2 p-2 justify-items-center text-center"
            >
              <div className="grid grid-cols-2 items-center">
                <h3 className="font-semibold">{item.title}</h3>
                <Button
                  onClick={() => setIsPendingItem(item.productId)}
                  className="text-red-600 bg-transparent m-0 p-0"
                >
                  <Trash2 />
                </Button>
              </div>

              <div className="flex w-40 h-40 overflow-hidden">
                <img
                  src={item.image.url}
                  alt={item.image.alt}
                  className="w-full rounded-xs object-cover"
                />
              </div>
            </li>
          ))}
        </ul>

        {hasMultipleItems && (
          <p className="text-xs mb-2 justify-self-end">
            Some products could have a higher quantity
          </p>
        )}

        <p className="justify-self-end">
          Total products: <strong>{totalItems}</strong>
        </p>
      </section>

      <section id="summary" className="grid gap-6">
        <div className="bg-white lg:fixed justify-self-center lg:justify-self-end">
          <CheckoutSummary />
        </div>
      </section>
    </div>
  );
};

export default CheckoutDisplay;
