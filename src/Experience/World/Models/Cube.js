import * as THREE from "three"

import Experience from "../../Experience"
import Materials from "../../Resources/Materials"


export default class Cube
{
    constructor()
    {

        this.experience = new Experience()

        this.materials = new Materials()

        // Parameters
        this.side = 3

        // Set cube
        this.instance = new THREE.Mesh(
            new THREE.BoxGeometry(this.side, this.side, this.side),
            this.materials.basic
        )
        this.instance.receiveShadow = true
        this.instance.castShadow = true

        // Coordinates
        this.instance.position.y += this.side / 2

        // this.debug()

    }

    debug()
    {

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.ui.add(this.instance.position, 'x', -10, 10, 0.01).name('position.x')
        }
    }
}
