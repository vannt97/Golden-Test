import { Camera } from "@mediapipe/camera_utils";

import DatabaseManagementSystem from "./DatabaseManagementSystem";
import GameViewManagementSystem from "./GameViewManagementSystem";
import SceneAssetManagementSystemClient from "./SceneAssetManagementSystemClient";
import SceneManagementSystemClient from "./SceneManagementSystemClient";
import TweenEngine from "./TweeenEngine";
import CoreEngineBase from "../../Codebase/Base/CoreEngineBase";
import EventManager from "../../Codebase/Base/EventManager";
import FPSCounter from "../../Codebase/Base/FPSCounter";
import { ILogger,DebugLogger } from "../../Codebase/Debuggings/Logger";
import FaceTrackerSystem from "../../Codebase/TrackerSystems/MediapipeSystem/Systems/FaceTrackerSystem";
import { EventType } from "../../Codebase/Types/EventType";
import AssetsManager from "../../Gameplay/Managers/AssetsManager";
import CaptureImage from "../utils/CaptureImage";

export default class CoreEngineClient extends CoreEngineBase
{
  private m_SceneManagementSystemClient: SceneManagementSystemClient;
  private _captureImage: CaptureImage;
  private _tracker: FaceTrackerSystem;
  public static get Instance(): CoreEngineBase
  {
    if (this._instance == null)
    {
      this._instance = new CoreEngineClient();
    }
    return this._instance;
  }
  loadedVideo: boolean = false;
  constructor() {
    let videoElement = document.getElementsByClassName(
      "input_video"
    )[0] as HTMLVideoElement;
    let canvasElement = document.getElementById(
      "output_canvas"
    ) as HTMLCanvasElement;
    let viewportElement = document.getElementById(
      "viewportLayout"
    ) as HTMLDivElement;
    super(canvasElement,videoElement,viewportElement);
    this._tracker = new FaceTrackerSystem(2,0.5,0.5);
    let canvasWrapper = document.getElementById(
      "canvas-wrapper"
    ) as HTMLDivElement;
    this._captureImage = new CaptureImage(viewportElement);
    this._tracker.SubscribeFPSCounter(
      new FPSCounter((fps) =>
      {
        EventManager.Instance.Emit(EventType.FPS,fps);
      })
    );

    this.m_Camera = new Camera(this.m_VideoElement,{
      onFrame: async () =>
      {
        this.m_SceneManagementSystemClient.Initialize();
        await this._tracker.SendVideo({ image: videoElement });
        EventManager.Instance.Emit(EventType.IS_LOADED_CAMERA)
      },
      width: 1280,
      height: 720,
      facingMode: "user",
    });
  }
  Logger: ILogger = new DebugLogger();
  public override async Initialize(): Promise<void> {
    super.Initialize();
    await AssetsManager.Instance.Initialize();
    this._tracker.Initialize();
    this._captureImage.Initialize();
    TweenEngine.Instance.Initialize();
    let gameManager = new GameViewManagementSystem(
      this.m_CanvasElement,
      this.m_ViewportElement,
      this._tracker,
      this.m_VideoElement
    );
    this.m_SceneManagementSystemClient = new SceneManagementSystemClient(
      gameManager,
      new SceneAssetManagementSystemClient(new DatabaseManagementSystem())
    );
    this.m_SceneManagementSystemClient.GameViewManager.SetVideo(
      this.m_VideoElement
    );
    this.m_Camera.start();
  }
}
