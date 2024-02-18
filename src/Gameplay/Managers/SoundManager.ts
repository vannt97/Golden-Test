import { Audio,AudioListener,AudioLoader,Camera } from "three";
import EventManager from "../../Codebase/Base/EventManager";
import { ICallbacks } from "../../Codebase/Callbacks/ICallbacks";
import IInitializable from "../../Codebase/Interfaces/IInitializable";
import { EventType } from "../../Codebase/Types/EventType";
export default class SoundManager implements IInitializable<void>
{
    private _initialized: boolean;
    private _camera: Camera;
    private _addSounds: Audio[] = [];
    private _subSounds: Audio[] = [];
    private _stepAudio: Audio[] = [];
    private _subBuffer: AudioBuffer;
    private _addBuffer: AudioBuffer;
    _listener: AudioListener;
    constructor (camera: Camera)
    {
        this._initialized = false;
        this._camera = camera;
    }
    async Initialize(arg: void): Promise<void>
    {
        if (this._initialized) return;
        this._initialized = true;
        this._listener = new AudioListener();
        this._camera.add(this._listener);
        const audioLoader = new AudioLoader();
        let listener = this._listener;
        let audios = this._stepAudio;
        let addSound = function(sound: AudioBuffer)
        {
            this._addBuffer = sound;
        }
        let add = addSound.bind(this);
        audioLoader.load('Assets/Sounds/click_sound.mp3',function(buffer)
        {
            add(buffer);
        });
        // let subSound = function(sound: AudioBuffer)
        // {
        //     this._subBuffer = sound;
        // }
        // let sub = subSound.bind(this);
        // audioLoader.load('Assets/Sounds/sub_point.wav',function(buffer)
        // {
        //     sub(buffer);
        // });
        let sound_2 = new Audio(this._listener);
        audioLoader.load('Assets/Sounds/bg_sound.mp3',function(buffer)
        {
            sound_2.setBuffer(buffer);
            sound_2.setVolume(.5);
            sound_2.setLoop(true);
            sound_2.offset = 3;
            console.log("Background sound is playing:",sound_2.isPlaying);
            EventManager.Instance.Subscribe(EventType.ON_START_GAME,() =>
            {
                sound_2.play();
            });
        });

        // let sound_3 = new Audio(this._listener);
        // audioLoader.load('Assets/Sounds/win.wav',function(buffer)
        // {
        //     sound_3.setBuffer(buffer);
        //     sound_3.setVolume(1.5);
        //     EventManager.Instance.Subscribe(EventType.ON_COMPLETED,(time) =>
        //     {
        //         sound_2.stop();
        //         sound_3.play();
        //     });
        // });

        // for (let i: number = 0; i <= 12; i++)
        // {
        //     let buffer = await audioLoader.loadAsync(`Assets/Sounds/${ i }.wav`);
        //     let sound = new Audio(listener);
        //     sound.setBuffer(buffer);
        //     sound.setVolume(1.5);
        //     this._stepAudio.push(sound);
        //     console.log(i);
        // }
    }
    public AddPointSound()
    {
        for (let i: number = 0; i < this._addSounds.length; i++)
        {
            if (!this._addSounds[i]?.isPlaying)
            {
                this._addSounds[i].playbackRate = 3;
                this._addSounds[i].play();
                console.log("Replay");
                return;
            }
        }
        let sound = new Audio(this._listener);
        sound.setBuffer(this._addBuffer);
        sound.playbackRate = 3;
        sound.play();
        this._addSounds.push(sound);
        console.log("play");
    }
    public SubPointSound()
    {
        for (let i: number = 0; i < this._subSounds.length; i++)
        {
            if (!this._subSounds[i]?.isPlaying)
            {
                this._subSounds[i].play();
                console.log("Replay");
                return;
            }
        }
        let sound = new Audio(this._listener);
        sound.setBuffer(this._subBuffer);
        sound.play();
        this._subSounds.push(sound);
        console.log("play");
    }
    public PlayStepSound(index: number,callback: ICallbacks<void>)
    {
        this._stepAudio[index].onEnded = () =>
        {
            callback();
        }
        this._stepAudio[index].play();
        console.log("Playing:",index);
    }
}
