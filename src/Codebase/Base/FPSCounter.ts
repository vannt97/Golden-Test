import { ICallbacks } from "../Callbacks/ICallbacks";
import ITickable from "../Interfaces/ITickable";
export default class FPSCounter implements ITickable<void> {
    private i: number;
    private counter: number;
    private m_Callback: ICallbacks<number>;
    private readonly performance: Performance;
    constructor( callback: ICallbacks<number> )
    {
        this.counter = 0;
        this.i = 0;
        this.m_Callback = callback;
    }
    public Tick ()
    {
        var a = Math.floor( performance.now() / 1E3 );
        1 <= a - this.i && ( this.ra( this.counter ), this.i = a, this.counter = 0 );
        ++this.counter;
    }
    private ra ( fps: number )
    {
        this.m_Callback( fps );
    }
}
