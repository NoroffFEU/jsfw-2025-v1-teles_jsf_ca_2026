import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"; // for dev
// import { TanStackRouterDevtoolsInProd } from '@tanstack/react-router-devtools' // for prod
import { HeadContent, Outlet } from "@tanstack/react-router";
import { createRootRoute } from "@tanstack/react-router";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Toaster } from "react-hot-toast";

const RootLayout = () => (
  <>
    <HeadContent />
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 5000,
        style: {
          color: "#1e40af",
          backgroundColor: "#dbeafe",
          border: "1px solid #93c5fd",
        },
        success: {
          style: {
            color: "#166534",
            backgroundColor: "#f0fdf4",
            border: "1px solid #86efac",
          },
        },
        error: {
          style: {
            color: "#991b1b",
            backgroundColor: "#fef2f2",
            border: "1px solid #fca5a5",
          },
        },
      }}
    />

    <Header />
    <hr />
    <main>
      <Outlet />
    </main>
    <Footer />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Online retail shop selling various products",
      },
      {
        title: "ShopNet",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/ShopNet.svg",
      },
    ],
  }),
  component: RootLayout,
});
