import { Spinner } from "@/components/ui/spinner/Spinner";

export const CustomPending = () => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 z-50"
    >
      <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
        Loading something awesome...
      </h2>{" "}
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm">
        Just wait and see...
      </p>
      <div className="flex items-center">
        <Spinner />
      </div>
    </div>
  );
};
