import { appHeight } from "./main-util";

export const appHeightWidth169Handler = () => {
  appHeight();
  window.addEventListener("resize", appHeight);
};

export const scaleCanvas = () => {
  let unityCanvas = document.getElementById("viewportLayout");
  let factorCanvas = window.innerHeight / window.innerWidth;
  if (factorCanvas < 16 / 9) {
    console.log("Under" + factorCanvas);
    unityCanvas.style.width = window.innerHeight * (9 / 16) + "px";
    unityCanvas.style.height = window.innerHeight + "px";
  } else {
    console.log("Above" + factorCanvas);
    unityCanvas.style.width = window.innerWidth + "px";
    unityCanvas.style.height = window.innerWidth * (16 / 9) + "px";
  }
};
