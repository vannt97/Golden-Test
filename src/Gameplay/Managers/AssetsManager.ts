import { LoadingManager,Texture,TextureLoader } from "three";
import EventManager from "../../Codebase/Base/EventManager";
import IInitializable from "../../Codebase/Interfaces/IInitializable";
import { EventType } from "../../Codebase/Types/EventType";
export default class AssetsManager implements IInitializable<void>
{
    private readonly _textureLoader: TextureLoader;
    private readonly _loadingManager: LoadingManager;
    private readonly _sourcePath: string;
    private static _instance: AssetsManager;
    private _textures: Texture[];
    constructor ()
    {
        this._sourcePath = 'Assets/Textures/';
        this._loadingManager = new LoadingManager();
        this._textureLoader = new TextureLoader(this._loadingManager);
    }
    async Initialize(arg: void): Promise<void>
    {
        console.log("Loading assets...")
        this._textures = await Promise.all([
            this.LoadTexture(this._sourcePath + "balo.png"),
            this.LoadTexture(this._sourcePath + "hat.png"),
            this.LoadTexture(this._sourcePath + "milk_bottle.png"),
            this.LoadTexture(this._sourcePath + "bottle.png"),
            this.LoadTexture(this._sourcePath + "huou.png"),
            this.LoadTexture(this._sourcePath + "demso.png"),
            this.LoadTexture(this._sourcePath + "abc.png"),
            this.LoadTexture(this._sourcePath + "mic.png"),
            this.LoadTexture(this._sourcePath + "note.png"),
            this.LoadTexture(this._sourcePath + "canxi.png"),
            this.LoadTexture(this._sourcePath + "dha.png"),
            this.LoadTexture(this._sourcePath + "FOS_1.png"),
            this.LoadTexture(this._sourcePath + "protein.png"),
        ]);
        
        console.log("Complete loading assets!");
    }
    private LoadTexture(sourcePath: string): Promise<Texture>
    {
        return this._textureLoader.loadAsync(sourcePath);
    }
    public static get Instance(): AssetsManager
    {
        if (this._instance)
            return this._instance;
        else
        {
            this._instance = new AssetsManager();
        }
        return this._instance;
    }
    public GetTexture(id: number): Texture
    {
        return this._textures[id];
    }
}
