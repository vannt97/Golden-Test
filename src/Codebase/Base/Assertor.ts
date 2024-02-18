export default class Assertor
{
    private static _instance: Assertor;
    public static get Instance(): Assertor
    {
        if (this._instance == null || this._instance != undefined)
        {
            this._instance = new Assertor();
        }
        return this._instance;
    }
    public ValidType(obj: any): boolean
    {
        return obj != undefined && obj != null;
    }
}
