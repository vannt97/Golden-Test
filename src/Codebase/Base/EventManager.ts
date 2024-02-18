import { ICallbacks } from "../Callbacks/ICallbacks";
export default class EventManager {
    private m_Events: ICallbacks<any>[][];
    public static get Instance(): EventManager {
        if (this.instance == null) {
            this.instance = new EventManager();
        }
        return this.instance;
    }
    private static instance: EventManager;
    constructor() {
        this.m_Events = [];
        console.log("Event manager is created...");
    }
    Emit(eventId: any, value: any = null): void {
        if (this.m_Events[eventId] == null || this.m_Events[eventId] == undefined) return;
        this.m_Events[eventId].map((element) => {
            element(value);
        });
    }
    public Subscribe(eventId: any, callback: ICallbacks<any>): void {
        if (this.m_Events[eventId] == null || this.m_Events[eventId] === undefined) {
            console.log(`${eventId} list is created...`);
            this.m_Events[eventId] = [];
        }
        this.m_Events[eventId].push(callback);
    }
    public Unsubcribe(eventId: any): void {
        let index = this.m_Events.findIndex((item, index) => index === eventId)
        if (index !== -1) {
            this.m_Events.splice(index, 1);
        }
    }
}
