import { Mesh } from "three";
import ComponentData from "./BaseObjects/ComponentData";
export default interface TextComponentData extends ComponentData
{
    text: string;
    font: string;
}
