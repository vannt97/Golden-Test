export default class IDGenerator
{
    private static m_Instance: IDGenerator;
    private readonly m_InternalID: any[];
    public static get Instance(): IDGenerator
    {
        if (this.m_Instance == null || this.m_Instance == undefined)
        {
            this.m_Instance = new IDGenerator();
        }
        return this.m_Instance;
    }
    constructor ()
    {
        this.m_InternalID = [];
    }
    public GetID(): any
    {
        let id = this.m_InternalID.length;
        this.m_InternalID.push(id);
        return id;
    }

}
