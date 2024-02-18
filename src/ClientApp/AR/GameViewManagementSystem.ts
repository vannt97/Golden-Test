import { OrthographicCamera,Texture } from "three";
import EventManager from "../../Codebase/Base/EventManager";
import SceneManagementSystemBase from "../../Codebase/Base/SceneManagementSystemBase";
import ScreenCanvasManager from "../../Codebase/Base/ScreenCanvasManager";
import FaceTrackerSystem from "../../Codebase/TrackerSystems/MediapipeSystem/Systems/FaceTrackerSystem";
import { EventType } from "../../Codebase/Types/EventType";
import HUDManager from "../../Gameplay/Managers/HUDManager";
import ItemManager from "../../Gameplay/Managers/ItemManager";
import SoundManager from "../../Gameplay/Managers/SoundManager";

// import SegmentationSystem from "../Codebase/TrackerSystems/MediapipeSystem/Systems/SegmentationSystem";
export default class GameViewManagementSystem extends SceneManagementSystemBase
{
  private _videoElement: HTMLVideoElement;
  private readonly _trackerSystem: FaceTrackerSystem;
  private readonly _screenCanvasManager: ScreenCanvasManager;
  private readonly _hubManager: HUDManager;
  private readonly _itemManager: ItemManager;
  private readonly _soundManager: SoundManager;
  public get HubManager(): HUDManager
  {
    return this._hubManager;
  }
  public get ItemManager(): ItemManager
  {
    return this._itemManager;
  }
  constructor (
    canvas: HTMLCanvasElement,
    viewport: HTMLDivElement,
    landmarksNormalizingsystem: FaceTrackerSystem,
    videoElement: HTMLVideoElement
  )
  {
    super(canvas,viewport);
    this._trackerSystem = landmarksNormalizingsystem;
    this._videoElement = videoElement;
    this._camera = new OrthographicCamera(
      -this.m_Renderer.domElement.width / 2,
      this.m_Renderer.domElement.width / 2,
      this.m_Renderer.domElement.height / 2,
      -this.m_Renderer.domElement.height / 2,
      -1300,
      1300
    );
    this._screenCanvasManager = new ScreenCanvasManager(
      this.m_Scene,
      this.m_Viewport
    );
    this._hubManager = new HUDManager(this);
    this._itemManager = new ItemManager(this);
    this._soundManager = new SoundManager(this._camera);
    this._soundManager.Initialize();
    EventManager.Instance.Subscribe(EventType.ON_CLICK,() =>
    {
      this._soundManager.AddPointSound();
    })
  }
  public Initialize(): void
  {
    if (this._initialized) return;
    super.Initialize();
    //#region TRACKING EVENT
    // FACE_FOUND is raising....
    //#endregion
    this._screenCanvasManager.SubscribeEvent(({ width,height }) =>
    {
      console.log("Resize gameview",width,height);
      let videoAspect =
        this._videoElement.videoWidth / this._videoElement.videoHeight;
      let windowAspect = width / height;
      let scaledWidth: number;
      let scaledHeight: number;
      if (videoAspect > windowAspect)
      {
        scaledWidth = height * videoAspect;
        scaledHeight = height;
      } else
      {
        scaledWidth = width;
        scaledHeight = width / videoAspect;
      }
      (this._camera as OrthographicCamera).left = -scaledWidth / 2;
      (this._camera as OrthographicCamera).right = scaledWidth / 2;
      (this._camera as OrthographicCamera).top = scaledHeight / 2;
      (this._camera as OrthographicCamera).bottom = -scaledHeight / 2;
      (this._camera as OrthographicCamera).updateProjectionMatrix();
      this._trackerSystem.UpdateCanvasSize(scaledWidth,scaledHeight);
      this.m_Renderer.setSize(scaledWidth,scaledHeight);
    });
    this._screenCanvasManager.Initialize();
    this._hubManager.Initialize();
    this._itemManager.Initialize();
  }
  public SetVideo(videoElement: HTMLVideoElement): void
  {
    console.log("Update video");
    this._videoElement = videoElement;
    this._screenCanvasManager.UpdateCanvas(
      this.m_Viewport.clientWidth,
      this.m_Viewport.clientHeight
    );
    this._screenCanvasManager.SetBackground(videoElement);
  }
  public SetImage(image: ImageData)
  {
    var texture = new Texture(image);
    texture.needsUpdate = true;
    this._screenCanvasManager.SetBackground(texture);
  }
  public get ScreenCanvasManager(): ScreenCanvasManager
  {
    return this._screenCanvasManager;
  }
}
