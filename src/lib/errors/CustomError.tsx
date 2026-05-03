import { type ErrorComponentProps, useNavigate } from "@tanstack/react-router";
import { defaultSearch } from "@/lib/zod/searchSchema";
import { Button } from "@/components/ui/button/Button";
import { classifyError } from "@/lib/errors/errorTypes";

export const CustomError = ({ error, reset }: ErrorComponentProps) => {
  const navigate = useNavigate();
  const type = classifyError(error);

  const errorInfo =
    type === "network"
      ? {
          title: "Network issue",
          message: "Could not reach the server. Check your connection.",
          showRetry: true,
        }
      : type === "missingProduct"
        ? {
            title: "Product not found",
            message: "This product does not exist or the URL is invalid.",
            showRetry: false,
          }
        : {
            title: "Something went wrong",
            message: error.message || "An unexpected error occurred.",
            showRetry: true,
          };

  return (
    <div className="flex flex-col gap-2 justify-center items-center pt-12">
      <h2 className="text-red-700 text-2xl mb-1">{errorInfo.title}</h2>{" "}
      <p>
        <strong>Error: </strong>
        {errorInfo.message}
      </p>
      {errorInfo.showRetry && (
        <Button
          className="bg-amber-500 text-black hover:brightness-90 cursor-pointer"
          onClick={() => reset()}
        >
          Retry
        </Button>
      )}
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
