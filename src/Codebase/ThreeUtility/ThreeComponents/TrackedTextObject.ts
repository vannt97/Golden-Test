import { Scene } from "three";
import { ObjectType } from "../../Types/ObjectType";
import TrackedObject from "./BaseObjects/TrackedObject";
import ComponentData,{ ComponentID } from "./ComponentData/BaseObjects/ComponentData";
export default class TrackedTextObject extends TrackedObject
{
    private m_Text: string;
    constructor (
        scene: Scene,
        assetSource: any,
        componentDatum: ComponentData[] = [])
    {
        super(scene,assetSource,componentDatum);
        this.m_Type = ObjectType.TEXT;
    }
    public override Select(): void
    {
    }
    public get Text(): string
    {
        return this.m_Text;
    }
    public override Clone(cloneObject: any = null): TrackedTextObject
    {
        let trackedObject = null;
        if (cloneObject != null)
            trackedObject = new TrackedTextObject(this.m_Scene,cloneObject,this.m_ComponentDatum);
        else trackedObject = new TrackedTextObject(this.m_Scene,this.m_GameObject.clone(),this.m_ComponentDatum);
        trackedObject.Components[ComponentID.MESH] = { resoureURL: this.m_Id };
        trackedObject.m_ParentId = this.m_Id;
        this.m_CloneObjects.push(trackedObject);
        return trackedObject;
    }
}
