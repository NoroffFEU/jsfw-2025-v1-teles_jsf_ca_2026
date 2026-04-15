import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"; // for dev
// import { TanStackRouterDevtoolsInProd } from '@tanstack/react-router-devtools' // for prod
import { Outlet } from "@tanstack/react-router";
import { createRootRoute } from "@tanstack/react-router";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

const RootLayout = () => (
  <>
    <Header />
    <hr />

    <Outlet />
    <Footer />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
