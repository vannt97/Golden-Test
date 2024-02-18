import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ICallbacks } from '../../../Callbacks/ICallbacks';
export function LoadGLTF(file: string,callback: ICallbacks<Group>): Promise<Group>
{
    return new Promise((res,rej) =>
    {
        const loader = new GLTFLoader();
        loader.load(file,function(gltf)
        {
            res(gltf.scene);
            callback(gltf.scene);
        },undefined,function(error)
        {
            rej(error);
        });
    });
}
