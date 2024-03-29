import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default class Loaders
{
    constructor()
    {
        this.textures = new THREE.TextureLoader()
        this.cube = new THREE.CubeTextureLoader()
        this.gltf = new GLTFLoader()
    }
}