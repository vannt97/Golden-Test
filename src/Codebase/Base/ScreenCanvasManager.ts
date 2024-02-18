import { ClampToEdgeWrapping,Color,LinearFilter,Scene,Texture,Vector2,VideoTexture } from "three";
import { ICallbacks } from "../Callbacks/ICallbacks";
import IInitializable from "../Interfaces/IInitializable";
export default class ScreenCanvasManager implements IInitializable<void>
{
    private m_Initialized: boolean;
    private readonly m_Scene: Scene;
    private readonly m_Viewport: HTMLElement;
    private readonly m_Callbacks: ICallbacks<any>[];
    private m_Background: Texture;
    constructor (scene: Scene,viewport: HTMLDivElement)
    {
        this.m_Scene = scene;
        this.m_Viewport = viewport;
        this.m_Initialized = false;
        this.m_Callbacks = [];
        new ResizeObserver(() =>
        {
            this.UpdateCanvas(this.m_Viewport.clientWidth,this.m_Viewport.clientHeight);
        }).observe(viewport);
    }
    Initialize(): void
    {
        if (this.m_Initialized) return;
        this.m_Initialized = true;
        this.UpdateCanvas(this.m_Viewport.clientWidth,this.m_Viewport.clientHeight);
    }
    public SubscribeEvent(callback: ICallbacks<any>)
    {
        this.m_Callbacks.push(callback);
    }
    public UpdateCanvas(width: number,height: number): void
    {
        this.m_Callbacks.map((callback) =>
        {
            callback({ width: width,height: height });
        })
    }
    public SetBackground(background: any = null): void
    {
        this.m_Background?.dispose();
        // construct viewport background
        if (background instanceof (HTMLElement))
        {
            this.m_Background = new VideoTexture(background as HTMLVideoElement);
            this.m_Background.needsUpdate = true;
            this.m_Background.center = new Vector2(0.5,0.5);
            this.m_Background.rotation = Math.PI;
            this.m_Background.flipY = false;
            this.m_Background.minFilter = LinearFilter;
            this.m_Background.wrapS = ClampToEdgeWrapping;
            this.m_Background.wrapT = ClampToEdgeWrapping;
            this.m_Scene.background = this.m_Background;
        }
        if (background instanceof Color)
        {
            this.m_Scene.background = background;
        }
    }
}
