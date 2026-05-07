import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { HeadContent, Outlet } from "@tanstack/react-router";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { DefaultNotFound, CustomError } from "@/lib/routeStates/index";

import { Footer, Header } from "@/components/layout/index";
import { Separator } from "@/components/ui/separator/Separator";

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
    <Separator />
    <main>
      <Outlet />
    </main>
    <Footer />
    <TanStackRouterDevtools />
  </>
);

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
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
  errorComponent: CustomError,
  notFoundComponent: DefaultNotFound,
  component: RootLayout,
});
