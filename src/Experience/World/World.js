import * as THREE from 'three'

import Experience from "../Experience";

import Lights from './Lights';

import Cube from './Models/Cube';
import Floor from './Models/Floor';

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        console.log(this.experience.camera.controls);

        this.lights = new Lights()

        this.cube = new Cube()
        this.floor = new Floor()

        // Add lights
        this.scene.add(
            this.lights.directional,
            // this.lights.directionalHelper,
            // this.lights.directionalCameraHelper,
        )

        this.experience.camera.controls.attach(this.cube.instance)

        // Add models
        this.scene.add(
            this.cube.instance,
            this.floor.instance,
            this.experience.camera.orbit,
            this.experience.camera.controls,
        )


    }
}