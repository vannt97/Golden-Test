export enum DebugColor
{
    ERROR = '#FF0000',
    WARNING = '#FFFF00',
    SUCCESS = '#008000',
    INFO = '#FFAF87'
}
export interface ILogger
{
    Log(messge: string,color: string): void;
}
export class DebugLogger implements ILogger
{
    public Log(messge: string,color: string): void
    {
        console.log('%c' + messge,'color:' + color);
    }
}
export class ReleaseLogger implements ILogger
{
    Log(messge: string,color: string): void
    {
    }
}
