import { ParsedFrame, ParsedGif, decompressFrames, parseGIF } from "gifuct-js";

export default class GifToolS {
  protected static _instance: GifToolS;
  c: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  tempCanvas: HTMLCanvasElement;
  tempCtx: CanvasRenderingContext2D;
  gifCanvas: HTMLCanvasElement;
  gifCtx: CanvasRenderingContext2D;
  gif: ParsedGif;
  loadedFrames: ParsedFrame[];
  frameIndex: number;   
  playing = false;
  needsDisposal = false;
  frameImageData: any;
  pixelPercent = 100;
  public static get Instance(): GifToolS {
    if (this._instance == null) {
      this._instance = new GifToolS();
    }
    return this._instance;
  }

  init() {
    this.c = document.getElementById("c") as HTMLCanvasElement;
    this.ctx = this.c.getContext("2d");
    this.tempCanvas = document.createElement("canvas");
    this.tempCtx = this.tempCanvas.getContext("2d");

    this.gifCanvas = document.createElement("canvas");
    this.gifCtx = this.gifCanvas.getContext("2d");

    this.loadGIF();
  }

  loadGIF() {
    fetch("/Assets/gif/bongro.gif")
      .then((response) => response.arrayBuffer())
      .then((result) => {
        this.gif = parseGIF(result);
        let frames = decompressFrames(this.gif, true);
        console.log("frames: ", frames);
        this.renderGIF(frames);
      });
  }

  renderGIF(frames: ParsedFrame[]) {
    this.loadedFrames = frames;
    this.frameIndex = 0;

    this.c.width = frames[0].dims.width;
    this.c.height = frames[0].dims.height;

    this.gifCanvas.width = this.c.width;
    this.gifCanvas.height = this.c.height;

    if (!this.playing) {
      this.playpause();
    }
  }

  playpause() {
    this.playing = !this.playing;
    if (this.playing) {
      this.renderFrame();
    }
  }

  play56() {
    // let frame = this.loadedFrames[56];

    this.drawPatch(this.loadedFrames[this.frameIndex]);
    this.captureImage();
  }

  drawPatch(frame: ParsedFrame) {
    let dims = frame.dims;
    if (
      !this.frameImageData ||
      dims.width != this.frameImageData.width ||
      dims.height != this.frameImageData.height
    ) {
      this.tempCanvas.width = dims.width;
      this.tempCanvas.height = dims.height;
      this.frameImageData = this.tempCtx.createImageData(
        dims.width,
        dims.height
      );
    }

    // set the patch data as an override
    this.frameImageData.data.set(frame.patch);

    // draw the patch back over the canvas
    this.tempCtx.putImageData(this.frameImageData, 0, 0);

    this.gifCtx.drawImage(this.tempCanvas, dims.left, dims.top);
  }

  manipulate() {
    let imageData = this.gifCtx.getImageData(
      0,
      0,
      this.gifCanvas.width,
      this.gifCanvas.height
    );
    let other = this.gifCtx.createImageData(
      this.gifCanvas.width,
      this.gifCanvas.height
    );

    var pixelsX =
      5 + Math.floor((this.pixelPercent / 100) * (this.c.width - 5));
    var pixelsY = (pixelsX * this.c.height) / this.c.width;
    this.ctx.putImageData(imageData, 0, 0);
    this.ctx.drawImage(
      this.c,
      0,
      0,
      this.c.width,
      this.c.height,
      0,
      0,
      pixelsX,
      pixelsY
    );
    this.ctx.drawImage(
      this.c,
      0,
      0,
      pixelsX,
      pixelsY,
      0,
      0,
      this.c.width,
      this.c.height
    );

    // let urlImage = this.c.toDataURL();
    // const a = document.createElement("a");
    // a.style.display = "none";
    // a.href = this.c.toDataURL();;
    // a.download = "record.png";
    // document.body.appendChild(a);
    // a.click();
    // setTimeout(() => {
    //   document.body.removeChild(a);
    //   window.URL.revokeObjectURL(urlImage);
    // }, 100);
  }

  captureImage() {
    this.manipulate();

    let urlImage = this.c.toDataURL();
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = this.c.toDataURL();
    a.download = "record.png";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(urlImage);
    }, 100);
  }

  renderFrame() {
    // get the frame
    let frame = this.loadedFrames[this.frameIndex];

    let start = new Date().getTime();

    if (frame.disposalType === 2) {
      this.gifCtx.clearRect(0, 0, this.c.width, this.c.height);
    }

    // draw the patch
    this.drawPatch(frame);

    // perform manipulation
    this.manipulate();

    // update the frame index
    this.frameIndex++;
    if (this.frameIndex >= this.loadedFrames.length) {
      this.frameIndex = 0;
    }

    var end = new Date().getTime();
    var diff = end - start;

    if (this.playing) {
      // delay the next gif frame
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.renderFrame();
        });
        //renderFrame();
      }, Math.max(0, Math.floor(frame.delay - diff)));
    }
  }
}
