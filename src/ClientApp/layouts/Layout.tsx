import * as React from "react";
import { useEffect } from "react";

function Layout(props: any) {
  return <div className=" h-full mx-auto container">{props.children}</div>;
}

export default Layout;
