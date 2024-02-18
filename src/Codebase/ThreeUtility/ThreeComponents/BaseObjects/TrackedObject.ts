import { Group,Object3D,Scene } from 'three';
// import * as SceneUtils from 'three/examples/jsm/utils/SceneUtils.js';
import ILandmarks from '../../../Interfaces/ILandmarks';
import NormalizedLandmarkPointToTransform from '../../../Types/NormalizedLandmarkPointToTransform';
import ComponentData,{ ComponentID } from '../ComponentData/BaseObjects/ComponentData';
import BaseObject from './BaseObject';
export default class TrackedObject extends BaseObject implements ILandmarks
{
    private _isTracked: boolean;
    protected m_Group: Group;
    constructor (scene: Scene,assetSource: any,componentDatum: ComponentData[] = [])
    {
        super(scene,assetSource,componentDatum);
        this.m_Group = new Group();
        scene.add(this.m_Group);
        this.m_Group.add(this.m_GameObject);
        this._isTracked = false;
    }
    OnLandmarks(landmark: NormalizedLandmarkPointToTransform): void
    {
        if (this.m_Group && this._isTracked == true)
        {
            this.m_Group.position.set(landmark.position.x,landmark.position.y,landmark.position.z);
            this.m_Group.scale.set(landmark.scale.x,landmark.scale.y,landmark.scale.z);
            this.m_Group.rotation.set(landmark.rotation.x,landmark.rotation.y,landmark.rotation.z);
        }
    }
    /**
     * Remove object from getting anchored by tracker system
     */
    public DeLandmark(): Object3D
    {
        this._isTracked = false;
        let hasChild = this.m_Group.children.findIndex((item) => item.uuid == this.m_GameObject.uuid);
        if (hasChild != -1)
        {
            // SceneUtils.detach(this.m_GameObject,this.m_Group,this.m_Scene);
            return this.m_GameObject;
        }
        return null;
    }
    /**
    * Retarget object from getting anchored by tracker system
    */
    public ReLandmark(): Object3D
    {
        this._isTracked = true;
        let hasChild = this.m_Group.children.findIndex((item) => item.uuid == this.m_GameObject.uuid);
        if (hasChild == -1)
        {
            // SceneUtils.attach(this.m_GameObject,this.m_Scene,this.m_Group);
            return this.m_GameObject;
        }
        return null;
    }
    public get Anchor(): Object3D
    {
        return this.m_Group;
    }
    public override Dispose(): void
    {
        super.Dispose();
        this._isTracked = false;
    }
    public override Clone(cloneObject?: any): TrackedObject
    {
        let trackedObject = null;
        if (cloneObject != null)
        {
            trackedObject = new TrackedObject(this.m_Scene,cloneObject,this.m_ComponentDatum);
        }
        else trackedObject = new TrackedObject(this.m_Scene,this.m_GameObject.clone(),this.m_ComponentDatum);
        trackedObject.Components[ComponentID.MESH] = { resoureURL: this.m_Id };
        trackedObject.m_ParentId = this.m_Id;
        this.m_CloneObjects.push(trackedObject);
        return trackedObject;
    }
    public get IsTracked()
    {
        return this._isTracked;
    }
    public set IsTracked(tracked: boolean)
    {
        this._isTracked = tracked;
        this.Children.map((item: TrackedObject) =>
        {
            item.IsTracked = tracked;
        });
    }
}
