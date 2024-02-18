import { Scene } from "three";
import { ObjectType } from "../../Types/ObjectType";
import TrackedObject from "./BaseObjects/TrackedObject";
import ComponentData,{ ComponentID } from "./ComponentData/BaseObjects/ComponentData";
export default class TrackedBuiltInObject extends TrackedObject
{
    private readonly m_ShapeType: any;
    constructor (
        scene: Scene,
        assetSource: any,
        componentDatum: ComponentData[])
    {
        super(scene,assetSource,componentDatum);
        // this.m_ShapeType = assetSource;
        this.m_Type = ObjectType.BUILT_IN;
    }
    public override Clone(cloneObject: any = null): TrackedBuiltInObject
    {
        let trackedObject = null;
        if (cloneObject != null)
        {
            trackedObject = new TrackedBuiltInObject(this.m_Scene,cloneObject,this.m_ComponentDatum);
        }
        else trackedObject = new TrackedBuiltInObject(this.m_Scene,this.m_GameObject,this.m_ComponentDatum);
        trackedObject.Components[ComponentID.MESH] = { resoureURL: this.m_Id };
        trackedObject.m_ParentId = this.m_Id;
        this.m_CloneObjects.push(trackedObject);
        return trackedObject;
    }
    public override Select(): void
    {
    }
}
