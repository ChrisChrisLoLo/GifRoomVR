import * as THREE from "three";

export default class Room extends THREE.Group{
    constructor(geometry,hallwayWidth){
        super();
        this.geo = geometry;
        const roomMaterials = new THREE.MeshFaceMaterial([
            new THREE.MeshBasicMaterial({color:0xff0000, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0x00ff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0x0000ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0xffff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0xff00ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
        ]);
        const outerRoomGeo = new THREE.Mesh(new THREE.BoxGeometry(this.geo.x,this.geo.y,this.geo.z),roomMaterials);
        const innerRoomGeo = new THREE.Mesh(new THREE.BoxGeometry(this.geo.x-(2*hallwayWidth),this.geo.y,this.geo.z-(2*hallwayWidth)),roomMaterials);
        outerRoomGeo.name = "outerRoom";
        innerRoomGeo.name = "innerRoom";
        this.add(outerRoomGeo);
        this.add(innerRoomGeo);
    }
}

class roomDimensions {
    constructor(height,innerWidth,innerLength,outerWidth,outerLength) {
        this.height = height;
        this.innerWidth = innerWidth;
        this.innerLength = innerLength;
        this.outerWidth = outerWidth;
        this.outerLength = outerLength;
    }
}