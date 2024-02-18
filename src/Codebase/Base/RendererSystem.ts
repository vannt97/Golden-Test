import { Color, WebGLRenderer } from "three";
import { ICallbacks } from "../Callbacks/ICallbacks";
import ITickable from "../Interfaces/ITickable";
import TickManager from "./TickManager";
export default class RendererSystem implements ITickable<number> {
  private readonly m_ClearColor: Color;
  private readonly m_Renderer: WebGLRenderer;
  private readonly m_RenderTasks: Map<any, any>;
  private readonly m_GlobalCanvas: HTMLCanvasElement;
  private readonly m_SupportMultipleScene: boolean;
  constructor(canvas: HTMLCanvasElement, multiScene: boolean) {
    this.m_ClearColor = new Color("#395b64");
    this.m_RenderTasks = new Map();
    this.m_GlobalCanvas = canvas;
    this.m_SupportMultipleScene = multiScene;
    let antialias: boolean = false;
    if (multiScene) {
      antialias = true;
    }
    this.m_Renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: antialias,
      canvas: canvas,
      preserveDrawingBuffer: true,
    });
    TickManager.Instance.Subscribe(this);
  }
  Tick(deltaTime: number): void {
    const width = this.m_GlobalCanvas.clientWidth;
    const height = this.m_GlobalCanvas.clientHeight;
    if (
      this.m_GlobalCanvas.width !== width ||
      this.m_GlobalCanvas.height !== height
    ) {
      this.m_Renderer.setSize(width, height, false);
    }
    if (this.m_SupportMultipleScene) {
      this.m_Renderer.setScissorTest(false);
      this.m_Renderer.setClearColor(this.m_ClearColor, 1);
      this.m_Renderer.clear(true, true);
      this.m_Renderer.setScissorTest(true);
    }
    this.m_RenderTasks.forEach((value, key) => {
      let domElement = this.m_RenderTasks.get(key)["domElement"];
      if (domElement != null && domElement != undefined) {
        const { left, right, top, bottom, width, height } =
          domElement.getBoundingClientRect();
        const positiveYUpBottom =
          this.m_Renderer.domElement.clientHeight - bottom;
        // check if it's offscreen. If so skip it
        if (
          bottom < 0 ||
          top > this.Renderer.domElement.clientHeight ||
          right < 0 ||
          left > this.Renderer.domElement.clientWidth
        ) {
          return; // it's off screen
        }
        this.m_Renderer.setScissor(left, positiveYUpBottom, width, height);
        this.m_Renderer.setViewport(left, positiveYUpBottom, width, height);
      }
      if (value["renderTask"] != null && value["renderTask"] != undefined)
        value["renderTask"](deltaTime);
    });
  }
  public get Renderer(): WebGLRenderer {
    return this.m_Renderer;
  }
  public AddRenderTask(
    id: number,
    renderTask: ICallbacks<any>,
    domElement: HTMLDivElement = null
  ) {
    if (!this.m_RenderTasks.has(id)) {
      // console.log("Add new render task");
      this.m_RenderTasks.set(id, { renderTask, domElement });
    }
  }
  public RemoveTask(id: number) {
    if (this.m_RenderTasks.has(id)) {
      // console.log("Remove render task",id);
      this.m_RenderTasks.delete(id);
    }
  }
}
