export default class APIGatewayService
{
    private m_AccessToken: string;
    private static m_Instance: APIGatewayService;
    public static get Instance(): APIGatewayService
    {
        if (this.m_Instance == null)
        {
            this.m_Instance = new APIGatewayService();
        }
        return this.m_Instance;
    }
    public GetAssetByType(type: number)
    {

    }
    public GetYourAssetByType(type: number)
    {

    }
}
