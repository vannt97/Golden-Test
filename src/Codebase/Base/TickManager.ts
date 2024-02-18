import IInitializable from "../Interfaces/IInitializable";
import ITickable from "../Interfaces/ITickable";
export default class TickManager implements IInitializable<void>
{
    public m_PreviousTime: number;
    public m_Ticks: ITickable<number>[];
    private _uscaleTicks: ITickable<number>[];
    public get UscaleTicks(): ITickable<number>[]
    {
        return this._uscaleTicks;
    }
    private static m_Instance: TickManager;
    public static get Instance(): TickManager
    {
        if (this.m_Instance == null)
        {
            this.m_Instance = new TickManager();
        }
        return this.m_Instance;
    }
    constructor ()
    {
        console.log("TickManager is created...");
        this.CoreTicks = this.CoreTicks.bind(this);
        this.m_Ticks = [];
        this._uscaleTicks = [];
    }
    Initialize(): void
    {
        console.log("TickManager is started...");
        requestAnimationFrame(this.CoreTicks);
    }
    public CoreTicks(tickTime: number): void
    {
        if (this.m_PreviousTime == -1)
        {
            this.m_PreviousTime = tickTime;
        }
        let deltaTime = tickTime - this.m_PreviousTime;
        this.m_PreviousTime = tickTime;
        if (this.m_Ticks != null)
            this.m_Ticks.map((element) =>
            {
                element.Tick(deltaTime / 1000);
            });
        if (this._uscaleTicks != null)
            this._uscaleTicks.map((element) =>
            {
                element.Tick(tickTime);
            });
        requestAnimationFrame(this.CoreTicks);
    }
    /**
     * Subscribe to this object to be updated every frame
     * @param tick This object must be implemented from ITickble
     */
    public Subscribe(tick: ITickable<number>): void
    {
        if (!this.m_Ticks.includes(tick))
            this.m_Ticks.push(tick);
    }
    public UnSubscribe(tick: ITickable<number>)
    {
        if (this.m_Ticks.includes(tick))
        {
            let ticks = this.m_Ticks;
            ticks = ticks.filter((item) => item === tick);
            this.m_Ticks = ticks;
        }
    }
}
