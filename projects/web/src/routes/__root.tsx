import { createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Body, Footer, Header } from '../components';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="bg-slate-800 text-slate-200 w-screen h-screen flex justify-center">
        <div className="container py-4">
          <Header />
          <Body />
          <Footer />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
