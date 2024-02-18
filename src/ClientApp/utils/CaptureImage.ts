import EventManager from "../../Codebase/Base/EventManager";
import IInitializable from "../../Codebase/Interfaces/IInitializable";

import html2canvas from "html2canvas";
import { EventType } from "../../Codebase/Types/EventType";
export default class CaptureImage implements IInitializable<void> {
  private _canvasGameViewPort: HTMLDivElement;
  constructor(canvasGameViewPort: HTMLDivElement) {
    this._canvasGameViewPort = canvasGameViewPort;
  }
  Initialize(arg: void): void {
    EventManager.Instance.Subscribe(EventType.CAPTURE_IMAGE, (callback) => {
      html2canvas(document.getElementById("canvas-wrapper")).then((canvas) => {
        let urlImage = canvas.toDataURL();
        callback(urlImage);

        // console.log("image: ", urlImage);
        // const a = document.createElement("a");
        // a.style.display = "none";
        // a.href = urlImage;
        // a.download = "record.png";
        // document.body.appendChild(a);
        // a.click();
        // setTimeout(() => {
        //   document.body.removeChild(a);
        //   window.URL.revokeObjectURL(urlImage);
        // }, 100);
      });
    });
  }
}
