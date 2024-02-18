import { ICallbacks } from "../../Codebase/Callbacks/ICallbacks";
import { ILogger,DebugLogger,DebugColor } from "../../Codebase/Debuggings/Logger";
import IDatabase from "../../Codebase/Interfaces/IDatabase";

export default class DatabaseManagementSystem implements IDatabase
{
    private readonly m_Logger: ILogger;
    private m_IndexDB: IDBDatabase;
    constructor (logger: ILogger = new DebugLogger())
    {
        this.m_Logger = logger;
    }
    DeleteDatabase(name: string): void
    {
        throw new Error("Method not implemented.");
    }
    async IsDatabaseExisted(name: string): Promise<boolean>
    {
        let databases = await indexedDB.databases();
        return new Promise<boolean>((res,rej) =>
        {
            for (let i: number = 0; i < databases.length; i++)
            {
                if (databases[i].name === `${ name }`)
                {
                    res(true);
                }
            }
            return res(false);
        });
    }
    private OnSuccess = function(result: any)
    {
        this.m_IndexDB = result;
        this.m_Logger.Log(`Open ${ (this.m_IndexDB as IDBDatabase).name } database successfully!`,DebugColor.SUCCESS);
    }
    CreateProjectDatabase(name: string): void
    {
    }
    OpenProjectDatabase(name: string,callback: ICallbacks<void>): void
    {
        let request = indexedDB.open(`${ name }`);
        let onSuccess = this.OnSuccess.bind(this);
        request.onsuccess = function()
        {
            onSuccess(request.result);
            callback();
        }
    }
    GetAllFromTable(tableName: string,callback: ICallbacks<any[]>): void
    {
    }
    GetOneItemFromTable(tableName: string,itemID: any,callback: ICallbacks<any>): void
    {
        const transaction = this.m_IndexDB.transaction(tableName);
        const objectStore = transaction.objectStore(tableName);
        const request = objectStore.get(itemID);
        request.onerror = (event) =>
        {
            // Handle errors!
        };
        request.onsuccess = (event) =>
        {
            callback(request.result);
        };
    }
    InsertToTable(tableName: string,record: any): void
    {
    }
    GetAllDatabases(): Promise<IDBDatabaseInfo[]>
    {
        return null;
    }
}
