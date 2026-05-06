import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAppDispatch } from "@/lib/redux/hooks/useAppDispatch";
import { paymentSuccessLinkOptions } from "@/lib/helpers/linkOptions";
import { clearCart } from "@/lib/redux/slices/cartSlice";
import toast from "react-hot-toast";

export const usePaymentProcess = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlePaymentProcess = () => {
    setIsDisabled(true);
    setOpenDialog(true);

    setTimeout(() => {
      toast.success("Payment success");
      setIsDisabled(false);
      dispatch(clearCart());
      navigate(paymentSuccessLinkOptions);
    }, 1500);
  };

  return { handlePaymentProcess, openDialog, isDisabled };
};
