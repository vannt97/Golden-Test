import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./routes/App";
import * as React from "react";
import ErrorPage from "./routes/ErrorPage";
import Play from "./routes/Play";
import Play11 from "./routes/Play11";
import Play2 from "./routes/Play2";
import Play3 from "./routes/Play3";
import Play4BongRo from "./routes/Play4BongRo";
import Play4XichDu from "./routes/Play4XichDu";
import Play4Chu from "./routes/Play4Chu";
import Play4Hat from "./routes/Play4Hat";
import Play4ThuNhun from "./routes/Play4ThuNhun";
import Play4Toan from "./routes/Play4Toan";
import Play4Ve from "./routes/Play4Ve";
import Play4CauTruot from "./routes/Play4CauTruot";
import Review from "./routes/Review";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Play11 />,
  },
  {
    path: "/play1",
    element: <Play />,
  },
  {
    path: "/step-2",
    element: <Play2 />,
  },
  {
    path: "/step-3",
    element: <Play3 />,
  },
  {
    path: "/mon-hoc-dem-so",
    element: <Play4Toan />,
  },
  {
    path: "/mon-hoc-chu",
    element: <Play4Chu />,
  },
  {
    path: "/mon-hoc-ve",
    element: <Play4Ve />,
  },
  {
    path: "/mon-hoc-hat",
    element: <Play4Hat />,
  },
  {
    path: "/tro-choi-bong-ro",
    element: <Play4BongRo />,
  },
  {
    path: "/tro-choi-cau-truot",
    element: <Play4CauTruot />,
  },
  {
    path: "/tro-choi-thu-nhun",
    element: <Play4ThuNhun />,
  },
  {
    path: "/tro-choi-xich-du",
    element: <Play4XichDu />,
  },
  {
    path: "/review",
    element: <Review />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
