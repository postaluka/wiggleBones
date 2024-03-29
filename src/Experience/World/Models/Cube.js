import * as THREE from "three"

import Experience from "../../Experience"
import Loaders from "../../Utils/Loaders"


export default class Cube
{
    constructor()
    {

        this.experience = new Experience()

        this.materials = this.experience.materials
        this.loaders = new Loaders()

        // Parameters
        this.side = 3

        this.instance = new THREE.Group()

        this.setCube()

        // this.debug()

    }

    setCube()
    {
        this.loaders.gltf.load(
            '/3D/cube_01.gltf',
            (gltf) =>
            {
                console.log(gltf);
                this.instance.add(gltf.scene)
            }
        )
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
