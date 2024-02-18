import { Group,Vector2,Vector3 } from "three";
import EventManager from "../../Codebase/Base/EventManager";
import Mathf from "../../Codebase/Base/Mathf/Mathf";
import TickManager from "../../Codebase/Base/TickManager";
import IInitializable from "../../Codebase/Interfaces/IInitializable";
import ITickable from "../../Codebase/Interfaces/ITickable";
import { EventType } from "../../Codebase/Types/EventType";
import Item,{ HORIZONTAL_PIVOT,VERTICAL_PIVOT } from "../Elements/Item";
import AssetsManager from "./AssetsManager";
import GameViewManagementSystem from "../../ClientApp/AR/GameViewManagementSystem";
export default class ItemManager implements IInitializable<void>,ITickable<number>
{
    private _gameViewManager: GameViewManagementSystem;
    private _target: Item;
    private _items: Item[];
    private _speed: number;
    private _milkbottle: Item;
    private _group: Group;
    constructor (gameViewManager: GameViewManagementSystem)
    {
        this._gameViewManager = gameViewManager;
        this._items = [];
        this._speed = 3000;
    }
    private wpos = new Vector3();
    private wpos_2 = new Vector3();
    Tick(deltaTime: number): void
    {
        for (let i: number = 0; i < this._items.length; i++)
        {
            if (!this._items[i].Visible) continue;
            if (this._items[i].GameObject.userData.duration >= 0)
            {
                this._items[i].GameObject.userData.duration -= deltaTime;
                continue;
            }
            this._target.GameObject.getWorldPosition(this.wpos);
            let direction = this.wpos.clone().sub(this._items[i].GameObject.position).normalize();
            let newPos = this._items[i].GameObject.position.clone().add(direction.clone().multiplyScalar(deltaTime * this._speed));
            this._items[i].GameObject.position.set(newPos.x,newPos.y,newPos.z);
            this._items[i].GameObject.getWorldPosition(this.wpos_2);
            let distance = Math.sqrt(Math.pow(this.wpos.x - this.wpos_2.x,2) + Math.pow(this.wpos.y - this.wpos_2.y,2));
            if (distance <= 50)
            {
                if (this._items[i].Visible)
                    this._items[i].Visible = false;
            }
        }
    }
    private get DeviceType()
    {
        const ua = navigator.userAgent;
        if (
            /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
                ua
            )
        )
        {
            return "mobile";
        } else if (
            /(ipad|tablet|(android(?!.mobile))|(windows(?!.phone)(.touch))|kindle|playbook|silk|(puffin(?!.(IP|AP|WP))))/.test(
                ua
            )
        )
        {
            return "tablet";
        }
        return "desktop";
    }
    async Initialize(arg: void): Promise<void>
    {
        console.log(this.DeviceType);
        let ratio = 1;
        if (this.DeviceType == "mobile")
        {
            ratio = 2;
        }
        // first scene
        let angle = Mathf.DegreeToRadian(180);
        console.log(this._gameViewManager.Viewport.clientWidth,this._gameViewManager.Viewport.clientHeight)
        let position: THREE.Vector3 = Mathf.ScreenToWorld(this._gameViewManager.Camera,0,-0.6);
        this._group = new Group();
        this._gameViewManager.Scene.add(this._group);
        this._group.position.set(position.x,position.y,position.z);
        this._milkbottle = new Item(
            AssetsManager.Instance.GetTexture(2),
            new Vector3(0,0,0),
            new Vector3(0,0,0),
            new Vector2(this._gameViewManager.Viewport.clientWidth / 4,200),
            VERTICAL_PIVOT.BOTTOM,
            HORIZONTAL_PIVOT.MIDDLE);
        this._group.add(this._milkbottle.GameObject);
        this._target = new Item(AssetsManager.Instance.GetTexture(9),
            new Vector3(0,0,0),
            new Vector3(0,0,0),
            new Vector2(1,1),
            VERTICAL_PIVOT.MIDDLE,
            HORIZONTAL_PIVOT.MIDDLE);
        this._gameViewManager.Scene.add(this._target.GameObject);
        this._target.Visible = false;
        let offset = this._milkbottle.Size.y - 5;
        let x = position.x + this._gameViewManager.Viewport.clientWidth / 15;

        // item 1
        let item_1 = new Item(AssetsManager.Instance.GetTexture(12),
            new Vector3(x,position.y + offset,position.z),
            new Vector3(angle,0,angle),
            new Vector2(this._gameViewManager.Viewport.clientWidth / 5,500),
            VERTICAL_PIVOT.MIDDLE,
            HORIZONTAL_PIVOT.MIDDLE);
        item_1.GameObject.userData.duration = 0;
        this._gameViewManager.Scene.add(item_1.GameObject);
        this._items.push(item_1);
        // item 2
        let item_2 = new Item(AssetsManager.Instance.GetTexture(10),
            new Vector3(x,position.y + offset,position.z),
            new Vector3(angle,0,angle),
            new Vector2(this._gameViewManager.Viewport.clientWidth / 5,500),
            VERTICAL_PIVOT.MIDDLE,
            HORIZONTAL_PIVOT.MIDDLE);
        item_2.GameObject.userData.duration = this._speed * 0.0001;
        this._gameViewManager.Scene.add(item_2.GameObject);
        this._items.push(item_2);
        //item 3
        let item_3 = new Item(AssetsManager.Instance.GetTexture(11),
            new Vector3(x,position.y + offset,position.z),
            new Vector3(angle,0,angle),
            new Vector2(this._gameViewManager.Viewport.clientWidth / 5,500),
            VERTICAL_PIVOT.MIDDLE,
            HORIZONTAL_PIVOT.MIDDLE);
        item_3.GameObject.userData.duration = 2 * this._speed * 0.0001;
        this._gameViewManager.Scene.add(item_3.GameObject);
        this._items.push(item_3);
        // item 4
        let item_4 = new Item(AssetsManager.Instance.GetTexture(9),
            new Vector3(x,position.y + offset,position.z),
            new Vector3(angle,0,angle),
            new Vector2(this._gameViewManager.Viewport.clientWidth / 5,500),
            VERTICAL_PIVOT.MIDDLE,
            HORIZONTAL_PIVOT.MIDDLE);
        item_4.GameObject.userData.duration = 3 * this._speed * 0.0001;
        this._gameViewManager.Scene.add(item_4.GameObject);
        this._items.push(item_4);
        EventManager.Instance.Subscribe(EventType.OPEN_MOUTH,() =>
        {
            console.log("Open mouth");
            TickManager.Instance.Subscribe(this);
        });
        EventManager.Instance.Subscribe(EventType.MOUTH_FOUND,(landmarks) =>
        {
            let landmark = landmarks[1][0];
            this._target.GameObject.position.set(landmark.position.x,landmark.position.y,landmark.position.z);
            this._target.GameObject.scale.set(landmark.scale.x,landmark.scale.y,landmark.scale.z);
            this._target.GameObject.rotation.set(landmark.rotation.x,landmark.rotation.y,landmark.rotation.z);
        });
        this._gameViewManager.Canvas.addEventListener('click',() =>
        {
        });
        EventManager.Instance.Subscribe(EventType.NEXT_SCENE,() =>
        {
            this._milkbottle.GameObject.visible = false;
            for (let i: number = 0; i < this._items.length; i++)
            {
                this._items[i].Visible = false;
            }
        })
    }
}
