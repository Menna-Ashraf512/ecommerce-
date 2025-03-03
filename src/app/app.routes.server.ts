import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dynamic routes with parameters using SSR (fetches API data at runtime)
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Server // SSR fetches API data on each request
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Server // SSR fetches API data on each request
  },
  // Wildcard for static routes (prerender static pages)
  {
    path: '**',
    renderMode: RenderMode.Prerender // Prerender static routes only
  }
];