
/**
 * Mediapipe uses different convention for axis
 * than three js. This function adapts mediapipe
 * landmarks for three js.
 * @param {*} landmarks
 */
export const TransformLandmarks = (landmarks: any) =>
{
    if (!landmarks)
    {
        return landmarks;
    }
    let hasVisiblity = !!landmarks.find((l: any) => l.visibility);
    let minZ = 1e-4;
    // currently mediapipe facemesh js
    // has visibility set to undefined
    // so we use a heuristic to set z position of facemesh
    if (hasVisiblity)
    {
        landmarks.forEach((landmark: any) =>
        {
            let { z,visibility } = landmark;
            z = -z;
            if (z < minZ && visibility)
            {
                minZ = z;
            }
        });
    } else
    {
        minZ = Math.max(-landmarks[7].z,-landmarks[8].z);
    }
    return landmarks.map((landmark: any) =>
    {
        let { x,y,z } = landmark;
        return {
            x: -0.5 + x,
            y: 0.5 - y,
            z: -z - minZ,
            visibility: landmark.visibility,
        };
    });
};
/**
 * Scales landmark by width and height
 * @param {*} landmark
 * @param {*} width
 * @param {*} height
 */
export const ScaleLandmark = (landmark: any,width: number,height: number) =>
{
    let { x,y,z } = landmark;
    return {
        ...landmark,
        x: x * width,
        y: y * height,
        z: z * width,
    };
};
export const smoothingFactor = (te: any,cutoff: any) =>
{
    const r = 2 * Math.PI * cutoff * te;
    return r / (r + 1);
}

export const exponentialSmoothing = (a: any,x: any,xPrev: any) =>
{
    return a * x + (1 - a) * xPrev;
}

export default class OneEuroFilter
{
    minCutOff: any;
    beta: any;
    dCutOff: any;
    xPrev: any;
    dxPrev: any;
    tPrev: any;
    initialized: boolean;
    constructor (minCutOff: any,beta: any)
    {
        this.minCutOff = minCutOff;
        this.beta = beta;
        this.dCutOff = 0.001; // period in milliseconds, so default to 0.001 = 1Hz

        this.xPrev = null;
        this.dxPrev = null;
        this.tPrev = null;
        this.initialized = false;
    }

    public reset()
    {
        this.initialized = false;
    }

    public filter(t: any,x: any)
    {
        if (!this.initialized)
        {
            this.initialized = true;
            this.xPrev = x;
            this.dxPrev = x.map(() => 0);
            this.tPrev = t;
            return x;
        }

        const { xPrev,tPrev,dxPrev } = this;

        //console.log("filter", x, xPrev, x.map((xx, i) => x[i] - xPrev[i]));

        const te = t - tPrev;

        const ad = smoothingFactor(te,this.dCutOff);

        const dx = [];
        const dxHat = [];
        const xHat = [];
        for (let i = 0; i < x.length; i++)
        {
            // The filtered derivative of the signal.
            dx[i] = (x[i] - xPrev[i]) / te;
            dxHat[i] = exponentialSmoothing(ad,dx[i],dxPrev[i]);

            // The filtered signal
            const cutOff = this.minCutOff + this.beta * Math.abs(dxHat[i]);
            const a = smoothingFactor(te,cutOff);
            xHat[i] = exponentialSmoothing(a,x[i],xPrev[i]);
        }

        // update prev
        this.xPrev = xHat;
        this.dxPrev = dxHat;
        this.tPrev = t;

        return xHat;
    }
}
