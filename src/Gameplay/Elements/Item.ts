import { Box3,Color,DoubleSide,Matrix4,Mesh,MeshBasicMaterial,Object3D,PlaneGeometry,Texture,Vector2,Vector3 } from "three";
import Mathf from "../../Codebase/Base/Mathf/Mathf";
export enum VERTICAL_PIVOT
{

    TOP = -1,
    BOTTOM = 1,
    MIDDLE = 0
}
export enum HORIZONTAL_PIVOT
{
    LEFT = 1,
    RIGHT = -1,
    MIDDLE = 0
}

export default class Item
{
    private readonly _child: Item[];
    public get Child(): Item[]
    {
        return this._child;
    }
    private readonly _gameObject: Object3D;
    private _size: Vector2;
    private readonly _material: MeshBasicMaterial;
    protected m_cubeBoundingBox: Box3;
    private _aspect: number;
    constructor (
        texture: Texture | Color,
        position: Vector3,
        rotation: Vector3,
        size: Vector2,
        ver_pivot: VERTICAL_PIVOT = VERTICAL_PIVOT.MIDDLE,
        hor_pivot: HORIZONTAL_PIVOT = HORIZONTAL_PIVOT.MIDDLE)
    {

        if (texture instanceof (Texture))
            this._aspect = texture.image.naturalHeight / texture.image.naturalWidth;
        else this._aspect = size.y / size.x;
        let width = size.x;
        let height = size.x * this._aspect;
        this._size = new Vector2(width,height);
        let geometry = new PlaneGeometry(width,height);
        if (texture instanceof (Texture))
            this._material = new MeshBasicMaterial({ color: 0xFFFFFF,side: DoubleSide,map: texture,transparent: true });
        else this._material = new MeshBasicMaterial({ color: texture,side: DoubleSide,map: null,transparent: true,});

        this._material.needsUpdate = true;
        this._gameObject = new Mesh(geometry,this._material);
        (this._gameObject as Mesh).geometry.applyMatrix4(new Matrix4().makeTranslation(hor_pivot * width / 2,ver_pivot * height / 2,0));
        this._gameObject.position.set(position.x,position.y,position.z);
        this._gameObject.rotation.set(rotation.x,rotation.y,rotation.z);
        this.m_cubeBoundingBox = new Box3();
        console.log("Size",size.x);
        this._child = [];
    }

    public get GameObject(): Object3D
    {
        return this._gameObject;
    }
    public get BoxSize(): Vector3
    {
        this.m_cubeBoundingBox.setFromObject(this._gameObject);
        let boxSize = new Vector3();
        this.m_cubeBoundingBox.getSize(boxSize);
        return boxSize;
    }
    public set Size(value: Vector2)
    {
        console.log("Size",value.x);
        let geometry = new PlaneGeometry(value.x,value.x * this._aspect);
        (this._gameObject as Mesh).geometry = geometry;
        this._size = value;
    }
    public Update(deltaTime: number)
    {
        let vector = this._gameObject.position;
    }
    private _layerIndex: number;
    public get LayerIndex(): number
    {
        return this._layerIndex;
    }
    public set LayerIndex(value: number)
    {
        this._layerIndex = value;
        this._gameObject.renderOrder = value;
    }
    public set Visible(value: boolean)
    {
        if (this._gameObject.visible != value)
            this._gameObject.visible = value
        this._child.map((item) =>
        {
            if (item.GameObject.visible != value)
                item.GameObject.visible = value
        })
    }
    public get Visible(): boolean
    {
        return this._gameObject.visible;
    }
    public get Size(): Vector2
    {
        return this._size.clone().multiplyScalar(this._gameObject.scale.x);
    }
}
