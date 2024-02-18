import { Group,ShaderMaterial,Vector2,Vector3 } from "three";
import GameViewManagementSystem from "../../ClientApp/AR/GameViewManagementSystem";
import EventManager from '../../Codebase/Base/EventManager';
import IInitializable from "../../Codebase/Interfaces/IInitializable";
import { EventType } from '../../Codebase/Types/EventType';
import Item,{ HORIZONTAL_PIVOT,VERTICAL_PIVOT } from "../Elements/Item";
import AssetsManager from "./AssetsManager";
export default class HUDManager implements IInitializable<void>
{
    private _initialized: boolean;
    private _gameViewManager: GameViewManagementSystem;
    private _balo: Item;
    private _group: Group;
    private _non: Item;
    private _sua: Item;
    private _binhnuoc: Item;
    private _huoubong: Item;
    private _demso: Item;
    private _chu: Item;
    private _item_1: Item;
    private _item_2: Item;
    constructor (gameViewManager: GameViewManagementSystem)
    {
        this._gameViewManager = gameViewManager;
        this._initialized = false;
        this._group = new Group();
        this._group.visible = true;
    }

    async Initialize(arg: void): Promise<void>
    {
        if (this._initialized) return;
        this._initialized = true;
        let angle = 0;
        this._gameViewManager.Scene.add(this._group);
        // balo
        this._balo = new Item(AssetsManager.Instance.GetTexture(0),
            new Vector3(0,-1.75,0.02),
            new Vector3(angle,0,angle),
            new Vector2(5,5),
            VERTICAL_PIVOT.TOP,
            HORIZONTAL_PIVOT.MIDDLE
        );
        this._balo.GameObject.userData.updateVisible = false;
        this._group.add(this._balo.GameObject);
        EventManager.Instance.Subscribe(EventType.BA_LO,() =>
        {
            this.EnableItem(0);
        });
        // non
        this._non = new Item(
            AssetsManager.Instance.GetTexture(1),
            new Vector3(0,.25,0),
            new Vector3(0,0,0),
            new Vector2(3,1),
            VERTICAL_PIVOT.BOTTOM,
            HORIZONTAL_PIVOT.MIDDLE);
        this._non.GameObject.userData.updateVisible = false;
        this._group.add(this._non.GameObject);
        EventManager.Instance.Subscribe(EventType.NON,() =>
        {
            this.EnableItem(1);
        });
        // sua
        this._sua = new Item(
            AssetsManager.Instance.GetTexture(2),
            new Vector3(0,-.9,0),
            new Vector3(angle,0,angle),
            new Vector2(1.5,1),
            VERTICAL_PIVOT.TOP,
            HORIZONTAL_PIVOT.MIDDLE);
        this._sua.GameObject.userData.updateVisible = false;
        this._group.add(this._sua.GameObject);
        EventManager.Instance.Subscribe(EventType.SUA,() =>
        {
            this.EnableItem(2);
        });
        // binh nuoc
        this._binhnuoc = new Item(
            AssetsManager.Instance.GetTexture(3),
            new Vector3(0,-1.75,0.02),
            new Vector3(angle,0,angle),
            new Vector2(1.5,5),
            VERTICAL_PIVOT.TOP,
            HORIZONTAL_PIVOT.MIDDLE);
        this._binhnuoc.GameObject.userData.updateVisible = false;
        this._group.add(this._binhnuoc.GameObject);
        EventManager.Instance.Subscribe(EventType.BINH_NUOC,() =>
        {
            this.EnableItem(3);
        });
        // huou bong
        this._huoubong = new Item(
            AssetsManager.Instance.GetTexture(4),
            new Vector3(1,-1.75,0.02),
            new Vector3(angle,0,angle),
            new Vector2(5,5),
            VERTICAL_PIVOT.TOP,
            HORIZONTAL_PIVOT.LEFT);
        this._huoubong.GameObject.userData.updateVisible = false;
        this._group.add(this._huoubong.GameObject);
        EventManager.Instance.Subscribe(EventType.HUOU_BONG,() =>
        {
            this.EnableItem(4);
        });
        this._balo.Visible = false;
        this._non.Visible = false;
        this._sua.Visible = false;
        this._binhnuoc.Visible = false;
        this._huoubong.Visible = false;
        // dem so
        this._demso = new Item(
            AssetsManager.Instance.GetTexture(5),
            new Vector3(0,1.5,0),
            new Vector3(angle,0,angle),
            new Vector2(4,1),
            VERTICAL_PIVOT.MIDDLE,
            HORIZONTAL_PIVOT.MIDDLE);
        this._demso.GameObject.userData.updateVisible = false;
        this._group.add(this._demso.GameObject);
        EventManager.Instance.Subscribe(EventType.DIEM_SO,() =>
        {
            this.EnableSuggestItem(5);
        });
        // chu cai
        this._chu = new Item(
            AssetsManager.Instance.GetTexture(6),
            new Vector3(0,1.5,0),
            new Vector3(angle,0,angle),
            new Vector2(4,1),
            VERTICAL_PIVOT.MIDDLE,
            HORIZONTAL_PIVOT.MIDDLE);
        this._chu.GameObject.userData.updateVisible = false;
        this._group.add(this._chu.GameObject);
        EventManager.Instance.Subscribe(EventType.CHU_CAI,() =>
        {
            this.EnableSuggestItem(6);
        });
        // hoc ve
        EventManager.Instance.Subscribe(EventType.HOC_VE,() =>
        {
            this.EnableSuggestItem(0);
        });
        // hoc hat
        EventManager.Instance.Subscribe(EventType.HOC_HAT,() =>
        {
            this.EnableSuggestItem(0);
        });
        // bong ro
        EventManager.Instance.Subscribe(EventType.BONG_RO,() =>
        {
            this.EnableSuggestItem(0);
        });
        // cau truoc
        EventManager.Instance.Subscribe(EventType.CAU_TRUOT,() =>
        {
            this.EnableSuggestItem(0);
        });
        // thu nhung
        EventManager.Instance.Subscribe(EventType.THU_NHUN,() =>
        {
            this.EnableSuggestItem(0);
        });
        // xich du
        EventManager.Instance.Subscribe(EventType.XICH_DU,() =>
        {
            this.EnableSuggestItem(0);
        });
        this._demso.Visible = false;
        this._chu.Visible = false;
        EventManager.Instance.Subscribe(EventType.FACE_FOUND,(landmarks) =>
        {
            if (!this._group.visible) this._group.visible = true;
            let landmark = landmarks[0][0];
            this._group.position.set(landmark.position.x,landmark.position.y,landmark.position.z);
            this._group.scale.set(landmark.scale.x,landmark.scale.y,landmark.scale.z);
            this._group.rotation.set(landmark.rotation.x,landmark.rotation.y,landmark.rotation.z);
        });
        EventManager.Instance.Subscribe(EventType.FACE_NOT_FOUND,() =>
        {
            if (this._group.visible) this._group.visible = false;
        });
        EventManager.Instance.Subscribe(EventType.CLEAR_ITEM_STAGE_2,() =>
        {
            this._balo.Visible = false;
            this._non.Visible = false;
            this._sua.Visible = false;
            this._binhnuoc.Visible = false;
            this._huoubong.Visible = false;
        });
        EventManager.Instance.Subscribe(EventType.CLEAR_ITEM_STAGE_3,() =>
        {
            this._demso.Visible = false;
            this._chu.Visible = false;
        });
    }
    public SliderMaterial()
    {
        let material = new ShaderMaterial({
            vertexShader: `
                  varying vec2 vUv;
                  void main() {
                    vUv = uv;
                    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_Position = projectionMatrix * modelViewPosition;
                  }`
            ,
            fragmentShader:
                `
                uniform float time;
                varying vec2 vUv;
                void main() {
                    vec2 uv = vUv ;
                    float xp = smoothstep(time - 0.01,time+0.01,uv.x);
                    vec3 color = mix(vec3(1.0,0.0,0.0),vec3(0.0,1.0,0.0),xp);
                    vec4 finalColor = vec4(color,xp);
                    gl_FragColor = finalColor;
                }
            `,
            uniforms:
            {
                time: {
                    value: 0
                }
            },
            transparent: true
        });
        return material;
    }
    private EnableItem(index: number)
    {
        this._balo.Visible = false;
        this._non.Visible = false;
        this._sua.Visible = false;
        this._binhnuoc.Visible = false;
        this._huoubong.Visible = false;
        switch (index)
        {
            case 0:
                this._balo.Visible = true;
                break;
            case 1:
                this._non.Visible = true;
                break;
            case 2:
                this._sua.Visible = true;
                break;
            case 3:
                this._binhnuoc.Visible = true;
                break;
            case 4:
                this._huoubong.Visible = true;
                break;
        }
    }
    private EnableSuggestItem(index: number)
    {
        this._demso.Visible = false;
        this._chu.Visible = false;
        switch (index)
        {
            case 5:
                this._demso.Visible = true;
                break;
            case 6:
                this._chu.Visible = true;
                break;
        }
    }
}
