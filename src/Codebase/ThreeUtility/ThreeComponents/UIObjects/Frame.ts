import { Scene,Vector2,Vector3 } from "three/src/Three";
import { ObjectType } from "../../../Types/ObjectType";
import BaseObject from "../BaseObjects/BaseObject";
import ComponentData,{ ComponentID } from "../ComponentData/BaseObjects/ComponentData";
export default class Frame extends BaseObject
{
    private _viewport: HTMLDivElement;
    private _ndcRatio: Vector2;
    constructor (scene: Scene,assetSource: any,componentDatum: ComponentData[])
    {
        super(scene,assetSource,componentDatum);
        this._viewport = null;
        this._ndcRatio = new Vector2(0,0);
        this.m_Type = ObjectType.SPRITE;
    }
    public set Viewport(viewport: HTMLDivElement)
    {
        this._viewport = viewport;
    }
    public set NDCRatio(ndc: Vector2)
    {
        this._ndcRatio = ndc;
        this.Children.map((object) =>
        {
            (object as Frame).NDCRatio = ndc;
        });
    }
    public override set Position(position: Vector3)
    {
        if (this._viewport != null)
        {
            // console.log("Child NDC:",this._ndcRatio);
            let x = this._viewport.clientWidth * this._ndcRatio.x/2;
            let y = this._viewport.clientHeight * this._ndcRatio.y/2;
            this.m_GameObject.position.set(x,y,position.z);
        }
        else
        {
            // console.log("Parent NDC:",this._ndcRatio);
            this.m_GameObject.position.set(position.x,position.y,position.z);
        }
        // console.log("Update position Sprite:",this.m_GameObject.position);
        this.Children.map((object) =>
        {
            object.Position = this.m_GameObject.position;
        });
    }
    public override Clone(cloneObject?: any): Frame
    {
        let trackedObject = null;
        if (cloneObject != null)
            trackedObject = new Frame(this.m_Scene,cloneObject,this.m_ComponentDatum);
        else trackedObject = new Frame(this.m_Scene,this.m_GameObject.clone(),this.m_ComponentDatum);
        trackedObject.m_ParentId = this.m_Id;
        this.m_CloneObjects.push(trackedObject);
        return trackedObject;
    }
}
