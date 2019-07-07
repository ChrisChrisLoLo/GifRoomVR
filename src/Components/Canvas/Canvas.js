import React, { Component } from "react";
// import ReactDOM from "react-dom";
import * as THREE from "three";

import "./styles/Canvas.scss";

//https://medium.com/@colesayershapiro/using-three-js-in-react-6cb71e87bdf4

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
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor('#000000');
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        //Add resize event listener
        window.addEventListener('resize', this.handleResize);

        //ADD CUBE
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: '#433F81'     });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
        this.start();
    }
    componentWillUnmount(){
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
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
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate)
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
