import * as THREE from "three"
import { WiggleBone } from "../../Utils/wiggle"
// import { WiggleBone } from "../../Utils/wiggle/WiggleSpring"

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

        this.wigglePARAMS = {}
        this.wigglePARAMS.velocity = 0.1
        this.wigglePARAMS.stiffness = 400
        this.wigglePARAMS.damping = 15

        this.wiggleBones = []

        this.debug()

    }

    setCube()
    {
        this.loaders.gltf.load(
            '/3D/cube_03.gltf',
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

                this.wiggleBones.push(new WiggleBone(this.boneJoint, { velocity: this.wigglePARAMS.velocity })) //stiffness: більш пружиніста, damping: на скільки швидко затухає рух
                this.wiggleBones.push(new WiggleBone(this.boneJoint1, { velocity: this.wigglePARAMS.velocity }))
                this.wiggleBones.push(new WiggleBone(this.boneJoint2, { velocity: this.wigglePARAMS.velocity }))
                this.wiggleBones.push(new WiggleBone(this.boneJoint3, { velocity: this.wigglePARAMS.velocity }))


                // console.log(this.boneRoot);
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
            this.debug.ui.add(this.wigglePARAMS, 'velocity', 0, 1, 0.01).name('velocity').onChange((value) =>
            {
                this.wiggleBones.forEach((wb) =>
                {
                    wb.options.velocity = value
                })
            })

            // this.debug.ui.add(this.wigglePARAMS, 'stiffness', 10, 600, 1).name('stiffness').onChange((value) =>
            // {
            //     this.wiggleBones.forEach((wb) =>
            //     {
            //         this.wigglePARAMS.stiffness = value
            //         wb.reset()
            //         wb.options.stiffness = this.wigglePARAMS.stiffness
            //         wb.update()

            //     })
            // })

            // this.debug.ui.add(this.wigglePARAMS, 'damping', 5, 200, 1).name('damping').onChange((value) =>
            // {
            //     this.wiggleBones.forEach((wb) =>
            //     {
            //         this.wigglePARAMS.damping = value
            //         wb.reset()
            //         wb.options.damping = this.wigglePARAMS.damping
            //         wb.update()
            //     })
            // })
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
