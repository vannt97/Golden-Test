export default interface ITickable<T>
{
    Tick ( deltaTime: T ): void;
}
