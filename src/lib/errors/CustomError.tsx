import { type ErrorComponentProps, useNavigate } from "@tanstack/react-router";
import { defaultSearch } from "@/lib/zod/searchSchema";
import { Button } from "@/components/ui/button/Button";

export const CustomError = ({ error, reset }: ErrorComponentProps) => {
  const navigate = useNavigate();

  const handleReset = () => {
    reset();
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center pt-12">
      <h2 className="text-red-700 text-2xl mb-1">
        Oops... Something went wrong
      </h2>{" "}
      <p>
        <strong>Error message:</strong> {error.message}
      </p>
      <Button
        className="bg-amber-500 text-black hover:brightness-90 cursor-pointer"
        onClick={handleReset}
      >
        Retry
      </Button>
      <Button
        className="hover:brightness-90 cursor-pointer"
        onClick={() =>
          navigate({
            to: "/",
            search: defaultSearch,
          })
        }
      >
        Go back to products
      </Button>
    </div>
  );
};
