import { Scene } from "three";
import { ObjectType } from "../../Types/ObjectType";
import TrackedObject from "./BaseObjects/TrackedObject";
import ComponentData,{ ComponentID } from "./ComponentData/BaseObjects/ComponentData";
import MeshComponentData from "./ComponentData/MeshComponentData";
export default class TrackedObject3D extends TrackedObject
{
    private m_MeshComponentData: MeshComponentData;
    constructor (
        scene: Scene,
        assetSource: any,
        componentDatum: ComponentData[] = [])
    {
        super(scene,assetSource,componentDatum);
        this.m_Type = ObjectType.OBJECT3D;
    }
    public override Select(): void
    {
    }
    public set MeshComponentData(data: MeshComponentData)
    {
        this.m_MeshComponentData = data;
    }
    public get MeshComponentData(): MeshComponentData
    {
        return this.m_MeshComponentData;
    }
    public override Clone(cloneObject: any = null): TrackedObject3D
    {
        let trackedObject = null;
        if (cloneObject != null)
            trackedObject = new TrackedObject3D(this.m_Scene,cloneObject,this.m_ComponentDatum);
        else trackedObject = new TrackedObject3D(this.m_Scene,this.m_GameObject,this.m_ComponentDatum);
        trackedObject.Components[ComponentID.MESH] = { resoureURL: this.m_Id };
        trackedObject.m_ParentId = this.m_Id;
        this.m_CloneObjects.push(trackedObject);
        return trackedObject;
    }
}
