import { Camera,Object3D,Vector3 } from "three";

export default class Mathf
{
    public static PI = 3.141592653589;
    public static PI2 = 6.28318530718;
    public static Lerp(start_value: Vector3,end_value: Vector3,t: number): Vector3
    {
        return new Vector3(
            start_value.x + (end_value.x - start_value.x) * t,
            start_value.y + (end_value.y - start_value.y) * t,
            start_value.z + (end_value.z - start_value.z) * t
        );
    }
    public static ScreenToWorld(_camera: Camera,x: number,y: number,z: number = -1): Vector3
    {
        let vector = new Vector3(x,y,-1).unproject(_camera);
        return vector;
    }
    public static WorldToScreen(widthHalf: number,heightHalf: number,camera: Camera,object: Object3D)
    {
        let pos: Vector3 = new Vector3();
        object.getWorldPosition(pos);
        pos.project(camera);
        // pos.x = (pos.x * widthHalf) + widthHalf;
        // pos.y = - (pos.y * heightHalf) + widthHalf;
        return pos;
    }
    public static DegreeToRadian(value: number): number
    {
        return value / 180 * Mathf.PI;
    }
}
