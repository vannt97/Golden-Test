import { update } from '@tweenjs/tween.js';
import TickManager from '../../Codebase/Base/TickManager';
import IInitializable from '../../Codebase/Interfaces/IInitializable';
import ITickable from '../../Codebase/Interfaces/ITickable';

export default class TweenEngine implements IInitializable<void>,ITickable<number>
{
    private static _instance: TweenEngine;
    constructor ()
    {
    }
    Initialize(arg: void): void
    {
        TickManager.Instance.UscaleTicks.push(this);
    }
    Tick(deltaTime: number): void
    {
        // console.log("Time",deltaTime);
        update(deltaTime);
    }
    public static get Instance(): TweenEngine
    {
        if (this._instance)
            return this._instance;
        else
        {
            this._instance = new TweenEngine();
        }
        return this._instance;
    }
}
