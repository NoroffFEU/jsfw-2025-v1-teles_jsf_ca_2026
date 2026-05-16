import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about/")({
  component: About,
});

/** Placeholder route for the about page. */
function About() {
  return <div>About page coming soon...</div>;
}
