import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import TickManager from '../../../Base/TickManager';
import { ICallbacks } from '../../../Callbacks/ICallbacks';
import { DebugColor,DebugLogger,ILogger } from '../../../Debuggings/Logger';
import ITickable from '../../../Interfaces/ITickable';
export default class ResourcesLoadingManagementSystem implements ITickable<number>
{
    private readonly m_QueueLoadingWorkLoads: Map<any,any[]>;
    private readonly m_LoadedAssets: Map<any,any>;
    private readonly m_Logger: ILogger;
    private static m_Instance: ResourcesLoadingManagementSystem;
    public static get Instance(): ResourcesLoadingManagementSystem
    {
        if (this.m_Instance == null || this.m_Instance == undefined)
        {
            this.m_Instance = new ResourcesLoadingManagementSystem();
        }
        return this.m_Instance;
    }
    constructor (logger: ILogger = new DebugLogger())
    {
        this.m_Logger = logger;
        console.log("Created resources management system...",DebugColor.SUCCESS);
        this.m_QueueLoadingWorkLoads = new Map<any,any[]>();
        this.m_LoadedAssets = new Map<any,any>();
        TickManager.Instance.Subscribe(this);
    }
    Tick(deltaTime: number): void
    {
        for (let [key,value] of this.m_QueueLoadingWorkLoads)
        {
            console.log(key,value);
            this.LazyLoadGLTF(key,(loadedObject) =>
            {
                if (!this.m_LoadedAssets.has(key))
                    this.m_LoadedAssets.set(key,loadedObject);
                value.map((element) =>
                {
                    let clonedObject = loadedObject.clone();
                    element(clonedObject);
                });
            });
            this.m_QueueLoadingWorkLoads.delete(key);
        }
    }
    public async LoadGLTF()
    {
        let t = await this.LoadGLTFAsync
    }
    public async LoadGLTFAsync(url: string,callback: ICallbacks<Group>)
    {
        if (this.m_LoadedAssets.has(url))
        {
            this.m_Logger.Log(`cloned from cache:${ url }`,DebugColor.SUCCESS);
            callback(this.m_LoadedAssets.get(url).clone());
            return;
        }
        if (!this.m_QueueLoadingWorkLoads.has(url))
        {
            let callbacks = [];
            callbacks.push(callback);
            this.m_QueueLoadingWorkLoads.set(url,callbacks);
            this.m_Logger.Log(`load new file:${ url }`,DebugColor.WARNING);
        }
        else
        {
            this.m_QueueLoadingWorkLoads.get(url).push(callback);
            this.m_Logger.Log(`reload file:${ url }`,DebugColor.WARNING);
        }
    }
    private LazyLoadGLTF(file: string,callback: ICallbacks<Group>): Promise<Group>
    {
        return new Promise((res,rej) =>
        {
            const loader = new GLTFLoader();
            loader.load(file,function(gltf)
            {
                res(gltf.scene);
                callback(gltf.scene);
            },undefined,function(error)
            {
                rej(error);
            });
        });
    }
}
