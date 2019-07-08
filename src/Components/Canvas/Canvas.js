import React, { Component } from "react";
// import ReactDOM from "react-dom";
import * as THREE from "three";
import DeviceOrientationControls from "../../scripts/threejs/DeviceOrientationControlsNew";
import BasicMesh from "../../scripts/entities/BasicMesh";

import "./styles/Canvas.scss";

export default class ThreeScene extends Component{
    componentDidMount(){
        const width = window.innerWidth;
        const height = window.innerHeight;
        //ADD SCENE
        this.scene = new THREE.Scene();
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );
        this.camera.position.z = 4;
        //Add Controls
        this.controls = new DeviceOrientationControls(this.camera);


        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor('#000000');
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        //Add resize event listener
        window.addEventListener("resize", this.handleResize);

        //ADD CUBE
        const geometry = new THREE.BoxGeometry(1, 2, 1);
        const geometrySmall = new THREE.BoxGeometry(1, 1, 1);
        const geometryRoom = new THREE.BoxGeometry(100,1,100);
        const cubeMaterials = [
            new THREE.MeshBasicMaterial({color:0xff0000, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0x00ff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0x0000ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0xffff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0xff00ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
        ];
        const cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
        this.cube = new THREE.Mesh(geometry, cubeMaterial);
        this.smallCube = new THREE.Mesh(geometrySmall, cubeMaterial);
        this.smallRoom = new THREE.Mesh(geometryRoom,cubeMaterial);
        this.scene.add(this.cube);
        this.scene.add(this.smallCube);
        this.scene.add(this.smallRoom);
        this.smallCube.position.set(0,2,0);
        this.smallRoom.position.set(-5,-5,-5);

        this.object = new BasicMesh(geometry,[0,1,0],this.scene);

        this.start();
    }
    componentWillUnmount(){
        this.stop();
        if(this.renderer){
            this.mount.removeChild(this.renderer.domElement);
        }
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    };

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };
    stop = () => {
        cancelAnimationFrame(this.frameId);
    };
    animate = () => {
        // this.cube.rotation.x += 0.01;
        // this.cube.rotation.y += 0.01;
        this.frameId = window.requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderScene();
    };
    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    };


    render(){
        return(
            <div
                className={"canvasWrapper"}
                // style={{ width: '400px', height: '400px' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}
