import { Object3D } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import IInitializable from "../Interfaces/IInitializable";
import ITickable from "../Interfaces/ITickable";
import SceneManagementSystemBase from "./SceneManagementSystemBase";
import TickManager from "./TickManager";
export default class ScenePostprocessingBase implements IInitializable<void>,ITickable<number>
{
    protected readonly m_Composer: EffectComposer;
    protected readonly m_SceneManagementSystem: SceneManagementSystemBase;
    protected readonly m_EffectedSelectionObjects: Object3D[];
    protected readonly m_RenderPass: RenderPass;
    constructor (sceneManagementSystem: SceneManagementSystemBase)
    {
        this.m_EffectedSelectionObjects = [];
        this.m_SceneManagementSystem = sceneManagementSystem;
        this.m_Composer = new EffectComposer(this.m_SceneManagementSystem.Renderer);
        this.m_RenderPass = new RenderPass(this.m_SceneManagementSystem.Scene,this.m_SceneManagementSystem.Camera);
        this.m_Composer.addPass(this.m_RenderPass);
    }
    public UpdateComposerResolution(width: number,height: number): void
    {
        this.m_Composer.setSize(width,height);
    }
    Initialize(): void
    {
        this.m_Composer.setSize(this.m_SceneManagementSystem.Canvas.clientWidth,this.m_SceneManagementSystem.Canvas.clientHeight);
        TickManager.Instance.Subscribe(this);
    }
    Tick(deltaTime: number): void
    {
        this.m_Composer.render();
    }
}
