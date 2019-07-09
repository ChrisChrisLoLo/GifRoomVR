import BasicMesh from "src/scripts/threejs/entities/BasicMesh";

export default class Cursor {
    constructor(){
        this.instance = null;
    }

    createInstance(){
        this.instance = new BasicMesh();

    }

    getInstance(){

    }
}