
import IInitializable from "../../Codebase/Interfaces/IInitializable";
import GameViewManagementSystem from "./GameViewManagementSystem";
import SceneAssetManagementSystemClient from "./SceneAssetManagementSystemClient";
export default class SceneManagementSystemClient implements IInitializable<void>
{
    private m_Initialized: boolean;
    private readonly m_GameViewManagementSystem: GameViewManagementSystem;
    private readonly m_SceneAssetManagementSystem: SceneAssetManagementSystemClient;
    constructor (gameViewManagementSystem: GameViewManagementSystem,sceneAssetManagementSystem: SceneAssetManagementSystemClient)
    {
        this.m_SceneAssetManagementSystem = sceneAssetManagementSystem;
        this.m_GameViewManagementSystem = gameViewManagementSystem;

    }
    public async Initialize(): Promise<void>
    {
        if (this.m_Initialized) return;
        this.m_Initialized = true;
        // EventManager.Instance.Subscribe(EventType.LOAD_OBJECT,({ resoureAsset,item }) =>
        // {
        //     let type: ObjectType = item['objectType'] as ObjectType;
        //     console.log('load asset',type);
        //     switch (type)
        //     {
        //         case ObjectType.TEXT:
        //             {
        //                 console.log(`Create text: ${ item['components'] } on scene`);
        //                 let componentDatum: ComponentData[] = JSON.parse(item['components']) as ComponentData[];
        //                 CreateText2D((componentDatum[ComponentID.TEXT] as TextComponentData).text,new MeshBasicMaterial({
        //                     color: "#00FF00",
        //                     transparent: true,
        //                     opacity: 0.75
        //                 }),(newObject: Object3D) =>
        //                 {
        //                     let trackedObject: TrackedTextObject = new TrackedTextObject(this.m_GameViewManagementSystem.Scene,newObject,componentDatum);
        //                     trackedObject.AttachTo(this.m_GameViewManagementSystem.Scene);
        //                     trackedObject.Visible = false;
        //                     console.log(trackedObject);
        //                     this.m_GameViewTrackedObjects.push(trackedObject);
        //                     this.m_GameViewTrackedObjectsOnMultiFace.map((element) =>
        //                     {
        //                         let obj = trackedObject.Clone();
        //                         obj.IsTracked = true;
        //                         element.push(obj);
        //                     });
        //                 });
        //             }
        //             break;
        //         case ObjectType.OBJECT3D:
        //             {
        //                 console.log(`Create object3D: ${ item['components'] } on scene`);
        //                 let componentDatum: ComponentData[] = JSON.parse(item['components']) as ComponentData[];
        //                 let objString = Buffer.from(resoureAsset,'base64').toString();
        //                 let objectloaded = JSON.parse(objString);
        //                 let loader = new ObjectLoader();
        //                 let loadedMesh = loader.parse(objectloaded);
        //                 let trackedObject: TrackedObject3D = new TrackedObject3D(this.m_GameViewManagementSystem.Scene,loadedMesh,componentDatum);
        //                 trackedObject.AttachTo(this.m_GameViewManagementSystem.Scene);
        //                 trackedObject.Visible = false;
        //                 console.log(trackedObject);
        //                 this.m_GameViewTrackedObjects.push(trackedObject);
        //                 this.m_GameViewTrackedObjectsOnMultiFace.map((element) =>
        //                 {
        //                     let obj = trackedObject.Clone();
        //                     obj.IsTracked = true;
        //                     element.push(obj);
        //                 });
        //             }
        //             break;
        //         case ObjectType.BUILT_IN:
        //             {
        //                 console.log(`Create builtin: ${ item['components'] } on scene`);
        //                 let componentDatum: ComponentData[] = JSON.parse(item['components']) as ComponentData[];
        //                 let objString = Buffer.from(resoureAsset,'base64').toString();
        //                 let objectloaded = JSON.parse(objString);
        //                 let loader = new ObjectLoader();
        //                 let loadedMesh = loader.parse(objectloaded);
        //                 let trackedObject: TrackedBuiltInObject = new TrackedBuiltInObject(this.m_GameViewManagementSystem.Scene,loadedMesh,componentDatum);
        //                 trackedObject.AttachTo(this.m_GameViewManagementSystem.Scene);
        //                 trackedObject.Visible = false;
        //                 console.log(trackedObject);
        //                 this.m_GameViewTrackedObjects.push(trackedObject);
        //                 this.m_GameViewTrackedObjectsOnMultiFace.map((element) =>
        //                 {
        //                     let obj = trackedObject.Clone();
        //                     obj.IsTracked = true;
        //                     element.push(obj);
        //                 });
        //             }
        //             break;
        //     }
        // });
        await this.m_SceneAssetManagementSystem.Initialize();
        this.m_GameViewManagementSystem.Initialize();
    }
    public get GameViewManager(): GameViewManagementSystem
    {
        return this.m_GameViewManagementSystem;
    }

}
