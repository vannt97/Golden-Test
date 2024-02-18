import { Scene } from "three/src/Three";
import BaseObjects from "../BaseObjects/BaseObjects";
import ComponentData from "../ComponentData/BaseObjects/ComponentData";

export default class Image extends BaseObjects
{
    constructor (scene: Scene,assetSource: any,componentDatum: ComponentData[])
    {
        super(scene,assetSource,componentDatum);
    }

}
