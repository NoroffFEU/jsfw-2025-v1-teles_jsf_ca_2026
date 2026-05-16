import toast from "react-hot-toast";

export const handleComingFeature = () => {
  toast.remove();
  toast("Feature coming soon...");
};
