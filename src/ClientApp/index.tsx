import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./css/main.css";
import { logger } from "./utils/main-util";
import { appHeightWidth169Handler } from "./utils/required-util";
import App from "./routes/AppClass";



appHeightWidth169Handler();
logger();
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* <RouterProvider router={route} /> */}
    <App></App>
    <video
      className="input_video"
      style={{ display: "none" }}
      muted
      playsInline
    ></video>
  </>
);
