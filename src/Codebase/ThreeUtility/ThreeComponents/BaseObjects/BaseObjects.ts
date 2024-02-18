import { BufferGeometry,Group,Material,Mesh,MeshBasicMaterial,Object3D,Scene,Vector3 } from "three";
import IDGenerator from '../../../Base/IDGenerator';
import { ObjectType } from "../../../Types/ObjectType";
import ComponentData,{ ComponentID } from "../ComponentData/BaseObjects/ComponentData";
import MaterialComponentData from "../ComponentData/MaterialComponentData";
import MeshComponentData from "../ComponentData/MeshComponentData";
export default class BaseObjects
{
    protected m_GameObject: THREE.Object3D;
    protected m_Type: ObjectType;
    protected m_Group: Group;
    protected m_Scene: Scene;
    protected m_IsInstanced: boolean;
    protected m_ContainedUUIDs: string[];
    protected m_Visible: boolean;
    protected m_Id: string;
    protected m_ParentId: string;
    protected m_CloneObjects: BaseObjects[];
    protected readonly m_ComponentDatum: ComponentData[];
    constructor (
        scene: THREE.Scene,
        assetSource: any,
        componentDatum: ComponentData[])
    {
        this.m_Id = IDGenerator.Instance.GetID() as string;
        this.m_CloneObjects = [];
        this.m_ContainedUUIDs = [];
        this.m_ParentId = null;
        this.m_Group = new Group();
        this.m_ComponentDatum = [];
        this.m_Scene = scene;
        scene.add(this.m_Group);
        this.m_IsInstanced = true;
        this.m_Visible = true;
        this.m_GameObject = (assetSource as Object3D)
        this.m_Group.add(this.m_GameObject);
        this.m_GameObject.traverse((object) =>
        {
            this.m_ContainedUUIDs.push(object.uuid);
        })
        componentDatum.map((component) =>
        {
            let index = componentDatum.indexOf(component);
            this.m_ComponentDatum[index] = component;
        })
        let meshData: MeshComponentData = {
            resourceURL: this.m_Id
        };
        console.log(meshData);
        this.m_ComponentDatum[ComponentID.MESH] = meshData;
    }
    /**
     * Return uuid list of children of this object
     */
    public get ContainedUUIDs(): string[]
    {
        return this.m_ContainedUUIDs;
    }
    /**
     * Return boolean that whether this object was instanced or not
     */
    public get IsInstanced(): boolean
    {
        return this.m_IsInstanced;
    }
    /**
     * Return the object3d which was managed by this object
     */
    public get GameObject(): Object3D
    {
        if (this.m_GameObject == undefined || this.m_GameObject == null)
        {
            return null;
        }
        return this.m_GameObject;
    }
    private set GameObject(object: Object3D)
    {
        if (object != null && object != undefined)
            this.m_GameObject = object;
    }
    /**
     * Return type of this object that is one of these
     *  TEXT, OBJECT3D, SPRITE, BUILTIN
     */
    public get Type(): ObjectType
    {
        return this.m_Type;
    }
    /**
     *Return boolean that this object is visible or invisible in scene
     */
    public get Visible(): boolean
    {
        return this.m_Visible;
    }
    /**
     * Set true or false to hide the object
     */
    public set Visible(visible: boolean)
    {
        this.m_Group.visible = visible;
        if (this.m_GameObject)
        {
            this.m_GameObject.traverse((element) =>
            {
                element.visible = visible;
            });
        }
        this.m_GameObject.visible = visible;
        this.m_Visible = visible;
    }
    /**
     * Return id of this object
     */
    public get Id(): string
    {
        return this.m_Id;
    }
    private set Id(id: string)
    {
        this.m_Id = id;
    }
    public Contains(uuid: string): boolean
    {
        return this.m_ContainedUUIDs.includes(uuid,0);
    }/**
     * Do something when this object was selected
     */
    public Select(): void
    {
        console.log("Select object in scene");
    }
    /**
     * Clone this object
     */
    public Clone(): any
    {
        let baseObject = new BaseObjects(this.m_Scene,this.m_GameObject.clone(),this.m_ComponentDatum);
        baseObject.ParentId = this.m_Id;
        this.m_CloneObjects.push(baseObject);
        return baseObject;
    }
    /**
     * Get ComponentDatum of this object
     */
    public get Components(): ComponentData[]
    {
        return this.m_ComponentDatum;
    }
    public set Geometry(geometry: BufferGeometry)
    {
        if (this.m_GameObject.type == "Group")
        {
            (this.m_GameObject.children[0] as Mesh).geometry = geometry;
        }
        else
        {
            (this.m_GameObject as Mesh).geometry = geometry;
        }
        this.Children.map((object) =>
        {
            object.Geometry = geometry;
        });
    }
    public AttachTo(scene: Scene): void
    {
        this.m_Scene.remove(this.m_GameObject);
        scene.add(this.m_GameObject);
        this.m_Scene = scene;
    }
    public get Children(): BaseObjects[]
    {
        return this.m_CloneObjects;
    }
    public set Position(position: THREE.Vector3)
    {
        this.m_GameObject.position.set(position.x,position.y,position.z);
        this.Children.map((object) =>
        {
            object.Position = this.m_GameObject.position;
        });
    }
    public set Scale(scale: THREE.Vector3)
    {
        this.m_GameObject.scale.set(scale.x,scale.y,scale.z);
        this.Children.map((object) =>
        {
            object.Scale = this.m_GameObject.scale;
        });
    }
    public set Rotation(rotation: THREE.Vector3)
    {
        this.m_GameObject.rotation.set(rotation.x,rotation.y,rotation.z);
        this.Children.map((object) =>
        {
            let rotation = new Vector3(this.m_GameObject.rotation.x,this.m_GameObject.rotation.y,this.m_GameObject.rotation.z);
            object.Rotation = rotation;
        });
    }
    public set Color(color: any)
    {
        let materialData = (this.Components[ComponentID.MATERIAL] as MaterialComponentData);
        materialData.color = color;
        if (this.m_GameObject.type == "Group")
        {
            ((this.m_GameObject.children[0] as Mesh).material as MeshBasicMaterial).color.set(color);
        }
        else
        {
            ((this.m_GameObject as Mesh).material as MeshBasicMaterial).color.set(color);
        }
        this.Children.map((object) =>
        {
            object.Color = color;
        });
    }
    public set Texture(texture: any)
    {
        let material: any;
        if (this.m_GameObject.type == "Group")
        {
            material = ((this.m_GameObject.children[0] as Mesh).material as MeshBasicMaterial);
        }
        else
        {
            material = ((this.m_GameObject as Mesh).material as MeshBasicMaterial);
        }
        if (!material.needsUpdate) material.needsUpdate = true;
        material.map = texture;
        this.Children.map((object) =>
        {
            object.Texture = texture;
        });
    }
    public get ParentId(): string
    {
        return this.m_ParentId;
    }
    public set ParentId(parentId: string)
    {
        this.m_ParentId = parentId;
    }
    public Dispose()
    {
        this.m_GameObject.visible = false;
        this.m_Scene.remove(this.m_GameObject);
        this.m_GameObject.traverse((item) =>
        {
            if (item.type == "Mesh")
            {
                (item as Mesh).geometry.dispose();
                ((item as Mesh).material as Material).dispose();
                item = undefined;
            }
        });
        this.m_GameObject = undefined;
        if (this.Children.length > 0)
            this.Children.forEach(element =>
            {
                element.Dispose();
            });
    }
}
