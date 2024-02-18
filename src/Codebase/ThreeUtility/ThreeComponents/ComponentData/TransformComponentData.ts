import { Vector3 } from "three";
import ComponentData from "./BaseObjects/ComponentData";
export default interface TransformComponentData extends ComponentData
{
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;
}
