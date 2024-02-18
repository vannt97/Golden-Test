import { AmbientLight,Camera,DirectionalLight,Object3D,Raycaster,Scene,WebGLRenderer } from "three";
import { DebugLogger,ILogger } from "../Debuggings/Logger";
import IInitializable from "../Interfaces/IInitializable";
import RendererSystem from "./RendererSystem";
export default class SceneManagementSystemBase implements IInitializable<void>
{
    protected readonly m_Canvas: HTMLCanvasElement;
    protected readonly m_Viewport: HTMLDivElement;
    protected readonly m_Scene: Scene;
    protected readonly m_Renderer: WebGLRenderer;
    protected readonly m_Raycaster: Raycaster;
    protected readonly m_Logger: ILogger;
    protected _sceneObjects: Object3D[];
    protected _camera: Camera;
    protected _initialized: boolean;
    protected readonly m_RendererSystem: RendererSystem;
    constructor (
        canvas: HTMLCanvasElement,
        viewport: HTMLDivElement,
        logger: ILogger = new DebugLogger())
    {
        this._initialized = false;
        this.m_Canvas = canvas;
        this.m_Viewport = viewport;
        this.m_Logger = logger;
        this._sceneObjects = [];
        // create threejs scene
        this.m_Scene = new Scene();
        this.m_Raycaster = new Raycaster();
        this.m_RendererSystem = new RendererSystem(canvas,false);
        this.m_Renderer = this.m_RendererSystem.Renderer;
    }
    Initialize(): void
    {
        if (this._initialized) return;
        this._initialized = true;
        console.log("Initialize scene management system...");
        // add lights in threejs scene
        this.AddLights();
        this.m_RendererSystem.AddRenderTask(1000,(data: any) =>
        {
            this.m_Renderer.render(this.m_Scene,this._camera);
        });
    }
    protected AddLights(): void
    {
        const directionalLight = new DirectionalLight(0xffffff,0.75);
        directionalLight.position.set(1,1,1);
        this.m_Scene.add(directionalLight);
        const ambient = new AmbientLight("white",0.3);
        this.m_Scene.add(ambient);
    }
    public get Raycaster(): THREE.Raycaster
    {
        return this.m_Raycaster;
    }
    public get Camera(): Camera
    {
        return this._camera;
    }
    public get Renderer(): THREE.WebGLRenderer
    {
        return this.m_Renderer;
    }
    public get Scene(): THREE.Scene
    {
        return this.m_Scene;
    }
    public get Canvas(): HTMLCanvasElement
    {
        return this.m_Canvas;
    }
    public get SceneObjects(): Object3D[]
    {
        return this._sceneObjects;
    }
    public get Viewport()
    {
        return this.m_Viewport;
    }
}
