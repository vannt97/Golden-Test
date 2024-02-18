import { Camera } from "@mediapipe/camera_utils";
import { DebugLogger,ILogger } from "../Debuggings/Logger";
import IInitializable from "../Interfaces/IInitializable";
import TickManager from "./TickManager";
export default class CoreEngineBase implements IInitializable<void>
{
    protected m_Camera: Camera;
    protected readonly m_VideoElement: HTMLVideoElement;
    protected readonly m_CanvasElement: HTMLCanvasElement;
    protected readonly m_ViewportElement: HTMLDivElement;
    protected static _instance: CoreEngineBase;
    Logger: ILogger = new DebugLogger();
    constructor (canvasElement: HTMLCanvasElement,videoElement: HTMLVideoElement,viewportElement: HTMLDivElement)
    {
        console.log("CoreEngineBase is created...");
        this.m_VideoElement = videoElement;
        this.m_CanvasElement = canvasElement;
        this.m_ViewportElement = viewportElement;
    }
    async Initialize()
    {
        console.log("CoreEngineBase is started...");
        TickManager.Instance.Initialize();
    }
}
