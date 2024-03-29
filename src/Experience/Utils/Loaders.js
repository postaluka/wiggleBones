import * as THREE from 'three'

export default class Loaders
{
    constructor()
    {
        this.textures = new THREE.TextureLoader()
        this.cube = new THREE.CubeTextureLoader()
    }
}