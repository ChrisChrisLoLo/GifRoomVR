import BasicMesh from "BasicMesh";

export default class Cursor {
    constructor(){
        this.instance = null;
    }

    createInstance(){
        this.instance = new BasicMesh();
    }

}