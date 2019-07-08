import * as THREE from "three";

export default class BasicMesh extends THREE.Mesh{
    constructor(geometry,coords,scene){
        super(geometry,new THREE.MeshBasicMaterial( { color: 0xffff00 } ));
        scene.add(this);
        this.position.set(coords[0],coords[1],coords[2]);
    }
}