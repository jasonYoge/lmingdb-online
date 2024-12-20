import { createBrowserRouter } from "react-router";
import loadable from '@loadable/component';
import App from "./App";

const Search = loadable(() => import('./pages/search'));
const Upload = loadable(() => import('./pages/upload'));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/search",
        Component: Search,
      },
      {
        path: "/upload",
        Component: Upload,
      },
    ],
  },
]);