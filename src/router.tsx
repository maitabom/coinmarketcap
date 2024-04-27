import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Error404 from "./pages/Error404";
import MainLayout from "./layouts/main";

const router = createBrowserRouter([
  {
    element: <MainLayout/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/detail/:cripto", element: <Detail /> },
      { path: "*", element: <Error404 /> },
    ],
  },
]);

export { router };
