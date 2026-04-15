import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 justify-self-center">
      <h1 className="text-4xl">Online Shop - Home</h1>
    </div>
  );
}
