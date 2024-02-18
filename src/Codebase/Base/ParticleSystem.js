import ParticleSystem, {
    Body,
    BoxZone,
    Emitter,
    Gravity,
    Life,
    Mass,
    MeshRenderer,
    Position,
    RadialVelocity,
    Radius,
    Rate,
    Rotate,
    Scale,
    Span,
    Vector3D,
} from 'three-nebula';
import Mathf from './Mathf/Mathf';
let THREE;
const createMesh = ({ geometry, material }) =>
    new THREE.Mesh(geometry, material);
const createEmitter = ({ position, body }) =>
{
    const emitter = new Emitter();
    return emitter
        .setRate(new Rate(new Span(5, 10), new Span(0.1, 0.25)))
        .addInitializers([
            new Mass(1),
            new Radius(10),
            new Life(2, 4),
            new Body(body),
            new Position(new BoxZone(300)),
            new RadialVelocity(200, new Vector3D(0, 0, 1), 30),
        ])
        .addBehaviours([
            new Rotate('random', 'random'),
            new Scale(1, 0.1),
            new Gravity(3),
        ])
        .setPosition(position)
        .emit();

};
export default async (three, { scene, camera }) =>
{
    THREE = three;
    const system = new ParticleSystem();

    let position = Mathf.ScreenToWorld(camera, 0, 1.2)
    const cubeEmitter = createEmitter({
        position: {
            x: position.x,
            y: position.y,
        },
        body: createMesh({
            geometry: new THREE.BoxGeometry(20, 20, 20),
            material: new THREE.MeshLambertMaterial({ color: '#00ffcc' }),
        }),
    });

    return system
        .addEmitter(cubeEmitter)
        .addRenderer(new MeshRenderer(scene, THREE));
};
