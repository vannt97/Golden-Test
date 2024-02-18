import { ICallbacks } from "../Callbacks/ICallbacks";
export default interface IDatabase
{
    IsDatabaseExisted(name: string): Promise<boolean>;
    CreateProjectDatabase(name: string,callback: ICallbacks<any>): void;
    OpenProjectDatabase(name: string,callback: ICallbacks<void>): void;
    GetAllFromTable(tableName: string,callback: ICallbacks<any[]>): void;
    GetOneItemFromTable(tableName: string,itemID: any,callback: ICallbacks<any>): void;
    InsertToTable(tableName: string,record: any): void;
    GetAllDatabases(): Promise<IDBDatabaseInfo[]>;
    DeleteDatabase(name: string): void;
}
