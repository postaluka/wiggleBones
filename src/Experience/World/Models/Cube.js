import * as THREE from "three"
import { WiggleBone } from "../../Utils/wiggle"

import Experience from "../../Experience"
import Loaders from "../../Utils/Loaders"


export default class Cube
{
    constructor()
    {

        this.experience = new Experience()
        this.controls = this.experience.camera.controls

        this.materials = this.experience.materials
        this.loaders = new Loaders()

        this.instance = new THREE.Group()

        // Add rig cube
        this.setCube()

        this.wiggleBones = []

        // this.debug()

    }

    setCube()
    {
        this.loaders.gltf.load(
            '/3D/cube_02.gltf',
            (gltf) =>
            {
                console.log(gltf.scene);
                gltf.scene.scale.set(0.8, 0.8, 0.8)
                this.instance.add(gltf.scene)

                gltf.scene.traverse((mesh) =>
                {
                    if (mesh.isMesh)
                    {
                        mesh.castShadow = true
                        mesh.receiveShadow = true
                    }
                })

                this.boneRoot = gltf.scene.getObjectByName("Root")
                this.boneJoint = gltf.scene.getObjectByName('Joint')
                this.boneJoint1 = gltf.scene.getObjectByName('Joint1')
                this.boneJoint2 = gltf.scene.getObjectByName('Joint2')
                this.boneJoint3 = gltf.scene.getObjectByName('Joint3')

                this.wiggleBones.push(new WiggleBone(this.boneJoint, {}))
                this.wiggleBones.push(new WiggleBone(this.boneJoint1, {}))
                this.wiggleBones.push(new WiggleBone(this.boneJoint2, {}))
                this.wiggleBones.push(new WiggleBone(this.boneJoint3, {}))


                console.log(this.boneRoot);
                this.controls.attach(this.boneRoot)

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

    update()
    {
        this.wiggleBones.forEach((wb) =>
        {
            wb.update()
        })
    }
}
