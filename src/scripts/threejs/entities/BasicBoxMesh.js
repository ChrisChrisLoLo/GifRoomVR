import * as THREE from "three";

export default class BasicBoxMesh extends THREE.Mesh{
    constructor(dimensions,coords){
        super(new THREE.BoxGeometry(dimensions[0],dimensions[1],dimensions[2]),new THREE.MeshBasicMaterial( { color: 0xffff00 } ));
        this.position.set(coords[0],coords[1],coords[2]);
    }
}