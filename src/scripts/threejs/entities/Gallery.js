import * as THREE from "three";
import BasicBoxMesh from "./BasicBoxMesh";

export default class Gallery extends THREE.Group{
    constructor(geometry,coords,scene){
        super();
        this.scene = scene;
        this.geo = geometry;
        this.coords = coords;
        this.floor = new BasicBoxMesh([this.geo.x,0,this.geo.z],[...this.coords]);
        this.floor.name = "floor";

        this.add(this.floor);

        scene.add(this);
        this.position.set(coords[0],coords[1],coords[2]);
    }
}