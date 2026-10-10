import { createRootRoute } from '@tanstack/react-router';
import { Body, Footer, Header } from '@/components';
import React from 'react';

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import('@tanstack/react-router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    );

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="bg-slate-800 text-slate-200 w-screen h-screen flex justify-center">
        <div className="container py-2 flex flex-col justify-between">
          <Header />
          <Body />
          <Footer />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
