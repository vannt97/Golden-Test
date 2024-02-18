import { Vector3 } from "three";
import * as MEDIAPIPE_FACEMESH from '@mediapipe/face_mesh';
import EventManager from '../../../Base/EventManager';
import IInitializable from "../../../Interfaces/IInitializable";
import ITickable from "../../../Interfaces/ITickable";
import { EventType } from '../../../Types/EventType';
import NormalizedLandmarkPointToTransform from "../../../Types/NormalizedLandmarkPointToTransform";
import { ScaleLandmark,TransformLandmarks } from "../Helpers/LandmarksHelper";
export default class FaceTrackerSystem
{
    private _width: number;
    private _height: number;
    private _initialized: boolean;
    private readonly _ticks: ITickable<void>[];
    private _faceLandmarker: MEDIAPIPE_FACEMESH.FaceMesh;
    private _solutionOptions: { maxNumFaces: number; refineLandmarks: boolean; minDetectionConfidence: number; minTrackingConfidence: number; selfieMode: boolean; };
    constructor (
        faceCount: number,
        detectionConfidence: number,
        trackingConfidence: number)
    {
        this._ticks = [];
        this._initialized = false;
        this._solutionOptions = {
            maxNumFaces: faceCount,
            refineLandmarks: false,
            minDetectionConfidence: detectionConfidence,
            minTrackingConfidence: trackingConfidence,
            selfieMode: true

        };
    }
    public async Initialize(): Promise<void>
    {
        if (this._initialized) return;
        this._faceLandmarker = await new MEDIAPIPE_FACEMESH.FaceMesh({
            locateFile: (file: any) =>
            {
                let url = `Source/Providers/face_mesh/${ file }`;
                return url;
            }
        });

        let onResults = this.OnResults.bind(this);
        this._faceLandmarker.setOptions(this._solutionOptions);
        this._faceLandmarker.onResults(onResults);
        await this._faceLandmarker.initialize();
        EventManager.Instance.Emit(EventType.IS_LOADED_FACETRACKER)
        //  Make label
        // document.getElementById("log").innerText = "Done loading";
        this._initialized = true;
    }
    public UpdateCanvasSize(width: number,height: number): void
    {
        this._width = width;
        this._height = height;
    }
    public SubscribeFPSCounter(tick: ITickable<void>)
    {
        this._ticks.push(tick);
    }
    private NormalizeLandmarkPoints(m_Landmarks: any): NormalizedLandmarkPointToTransform[][]
    {
        let midEyes = ScaleLandmark(m_Landmarks[168],this._width,this._height);
        let leftEyeInnerCorner = ScaleLandmark(m_Landmarks[463],this._width,this._height);
        let rightEyeInnerCorner = ScaleLandmark(m_Landmarks[243],this._width,this._height);
        let noseBottom = ScaleLandmark(m_Landmarks[2],this._width,this._height);
        let leftEyeUpper1 = ScaleLandmark(m_Landmarks[446],this._width,this._height);
        let rightEyeUpper1 = ScaleLandmark(m_Landmarks[226],this._width,this._height);
        let leftMouth = ScaleLandmark(m_Landmarks[15],this._width,this._height);
        let rightMouth = ScaleLandmark(m_Landmarks[12],this._width,this._height);
        let mouthPosition = {
            x: (leftMouth.x + rightMouth.x) / 2,
            y: (leftMouth.y + rightMouth.y) / 2,
            z: (leftMouth.z + rightMouth.z) / 2
        }
        // console.log(midEyes);
        let a = new Vector3(m_Landmarks[14].x,m_Landmarks[14].y,m_Landmarks[14].z);
        let b = new Vector3(m_Landmarks[13].x,m_Landmarks[13].y,m_Landmarks[13].z);
        let distance = a.distanceTo(b);
        if (distance >= 0.05)
        {
            if (!this._isOpenMouth)
            {
                EventManager.Instance.Emit(EventType.OPEN_MOUTH);
                this._isOpenMouth = true;
            }
        };
        // scale to make glasses
        // as wide as distance between
        // left eye corner and right eye corner
        const eyeDist = Math.sqrt(
            (leftEyeUpper1.x - rightEyeUpper1.x) ** 2 +
            (leftEyeUpper1.y - rightEyeUpper1.y) ** 2 +
            (leftEyeUpper1.z - rightEyeUpper1.z) ** 2
        );
        // 1.4 is width of 3d model of glasses
        const scale = eyeDist / 1.4;
        // use two vectors to rotate glasses
        // Vertical Vector from midEyes to noseBottom
        // is used for calculating rotation around x and z axis
        // Horizontal Vector from leftEyeCorner to rightEyeCorner
        // us use to calculate rotation around y axis
        let upVector = new Vector3(
            midEyes.x - noseBottom.x,
            midEyes.y - noseBottom.y,
            midEyes.z - noseBottom.z,
        ).normalize();
        let sideVector = new Vector3(
            leftEyeInnerCorner.x - rightEyeInnerCorner.x,
            leftEyeInnerCorner.y - rightEyeInnerCorner.y,
            leftEyeInnerCorner.z - rightEyeInnerCorner.z,
        ).normalize();
        let zRot = (new Vector3(1,0,0)).angleTo(
            upVector.clone().projectOnPlane(
                new Vector3(0,0,1)
            )
        ) - (Math.PI / 2)
        let xRot = (Math.PI / 2) - (new Vector3(0,0,1)).angleTo(
            upVector.clone().projectOnPlane(
                new Vector3(1,0,0)
            )
        );
        let yRot = (
            new Vector3(sideVector.x,0,sideVector.z)
        ).angleTo(new Vector3(0,0,1)) - (Math.PI / 2);
        let transform: NormalizedLandmarkPointToTransform[] = [];
        transform.push({
            position: new Vector3(midEyes.x,midEyes.y,midEyes.z),
            scale: new Vector3(scale,scale,scale),
            rotation: new Vector3(0,0,0)
        });
        let transformMouth: NormalizedLandmarkPointToTransform[] = [];
        transformMouth.push({
            position: new Vector3(mouthPosition.x,mouthPosition.y,mouthPosition.z),
            scale: new Vector3(scale,scale,scale),
            rotation: new Vector3(0,0,0)
        });
        return [transform,transformMouth];
    }
    private _isOpenMouth: boolean = false;
    /**
     * Send image to get landmark points back from callbacks
     * @param image HTMLVideoElement as an input parameter
     * @returns
     */
    public SendVideo(image: MEDIAPIPE_FACEMESH.InputMap)
    {
        if (this._initialized)
            return this._faceLandmarker.send(image);

    }
    private lastVideoTime: number = -1;
    private OnResults(results: MEDIAPIPE_FACEMESH.Results): void
    {
        if (results.multiFaceLandmarks != null)
        {
            let landmarks: MEDIAPIPE_FACEMESH.NormalizedLandmarkList[] = [];
            results.multiFaceLandmarks.map((element) =>
            {
                if (element != null && element != undefined && element.length >= 468)
                {
                    let multiFaceLandmark: MEDIAPIPE_FACEMESH.NormalizedLandmarkList = TransformLandmarks(element);
                    landmarks.push(multiFaceLandmark);
                }
            });
            if (landmarks != null && landmarks != undefined && landmarks.length > 0)
            {
                let normalizedMultipleFaces: NormalizedLandmarkPointToTransform[][] = [];
                landmarks.map((landmark: any) =>
                {
                    normalizedMultipleFaces.push(this.NormalizeLandmarkPoints(landmark)[0],this.NormalizeLandmarkPoints(landmark)[1]);
                });
                EventManager.Instance.Emit(EventType.FACE_FOUND,normalizedMultipleFaces);
                EventManager.Instance.Emit(EventType.MOUTH_FOUND,normalizedMultipleFaces);

            }
            else
            {
                EventManager.Instance.Emit(EventType.FACE_NOT_FOUND);
            }

        }
    }
}
