import { ILogger,DebugLogger,DebugColor } from "../../Codebase/Debuggings/Logger";
import IDatabase from "../../Codebase/Interfaces/IDatabase";

export default class SceneAssetManagementSystemClient
{
    private m_Initialized: boolean;
    private readonly m_Logger: ILogger;
    private readonly m_DatabaseManagementSystem: IDatabase;
    constructor (
        databaseManagementSystem: IDatabase,
        logger = new DebugLogger())
    {
        this.m_Initialized = false;
        this.m_Logger = logger;
        this.m_DatabaseManagementSystem = databaseManagementSystem;
    }
    public async Initialize()
    {
        if (this.m_Initialized) return;
        this.m_Initialized = true;
        this.m_Logger.Log("SceneAssetManagementSystemClient is started...",DebugColor.SUCCESS);
        //#region OPEN PROPJECT
        // EventManager.Instance.Subscribe(EventType.OPEN_PROJECT,(name: string) =>
        // {
        //     fetch(`${ PUBLIC_PATH }/sceneConfiguration.json`,{ method: "Get" }).then(res => res.json()).then((json) =>
        //     {
        //         let sceneConfiguration: { id: string,objectType: ObjectType,components: string }[] = JSON.parse(JSON.stringify(json));
        //         console.log(sceneConfiguration);
        //         sceneConfiguration?.map((item) =>
        //         {
        //             let componentDatum: ComponentData[] = JSON.parse(item.components) as ComponentData[];
        //             fetch(`${ PUBLIC_PATH }/Assets/${ item.id }.json`,{ method: "Get" }).then(res => res.text()).then((json) =>
        //             {
        //                 EventManager.Instance.Emit(EventType.LOAD_OBJECT,{ resoureAsset: json,item: item });
        //             });

        //         });
        //     });
        // });
        //#endregion
        // EventManager.Instance.Emit(EventType.OPEN_PROJECT,`${ USER_ID }.${ PROJECT_NAME }`);
    }
}
