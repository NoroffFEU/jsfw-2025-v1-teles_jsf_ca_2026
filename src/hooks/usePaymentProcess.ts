import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAppDispatch } from "@/lib/redux/hooks/useAppDispatch";
import { paymentSuccessLinkOptions } from "@/lib/helpers/linkOptions";
import { resetCheckoutSelection } from "@/lib/redux/slices/checkoutSlice";
import { clearCart } from "@/lib/redux/slices/cartSlice";
import toast from "react-hot-toast";

/**
 * Custom hook for managing the payment processing workflow.
 *
 * Handles the complete payment flow including:
 * - UI state for success dialog and button disable state
 * - Simulated payment processing with loading delay
 * - Success toast notification
 * - Cart clearing after successful payment
 * - Navigation to payment success page
 *
 * **Note:** Uses a 1.5s artificial delay to simulate payment processing.
 *
 * @returns {Object} Payment process state and handlers
 * @returns {() => void} returns.handlePaymentProcess - Triggers the full payment flow
 * @returns {boolean} returns.openDialog - Controls success dialog visibility
 * @returns {boolean} returns.isDisabled - Button disable state during processing
 *
 * @example
 * const { handlePaymentProcess, openDialog, isDisabled } = usePaymentProcess();
 *
 * return (
 *   <button
 *     onClick={handlePaymentProcess}
 *     disabled={isDisabled}
 *   >
 *     Process Payment
 *   </button>
 *
 *   {openDialog && <SuccessDialog />}
 * );
 */
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
      dispatch(resetCheckoutSelection());
      navigate(paymentSuccessLinkOptions);
    }, 1500);
  };

  return { handlePaymentProcess, openDialog, isDisabled };
};
