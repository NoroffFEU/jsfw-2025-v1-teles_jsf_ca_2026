import { Button } from "@/components/ui/button/Button";
import { useNavigate } from "@tanstack/react-router";

export const DefaultNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center pt-12">
      <h2 className="text-red-700 text-2xl mb-1">PAGE NOT FOUND</h2>{" "}
      <Button
        className="hover:brightness-90 cursor-pointer"
        onClick={() =>
          navigate({
            to: "/",
            search: (prev) => ({
              ...prev,
            }),
          })
        }
      >
        Back to products
      </Button>
    </div>
  );
};
