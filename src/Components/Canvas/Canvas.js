import React, { Component } from "react";
// import ReactDOM from "react-dom";
import * as THREE from "three";
import * as CONST from "../../scripts/threejs/util/constants";
import * as CSS3D from "../../scripts/threejs/entities/CSS3D";
import DeviceOrientationControls from "../../scripts/threejs/DeviceOrientationControlsNew";
import BasicMesh from "../../scripts/threejs/entities/BasicMesh";
import Room from "../../scripts/threejs/entities/Room";

import "./styles/Canvas.scss";
import RaycasterControls from "../../scripts/threejs/RaycasterControls";
import TankControls from "../../scripts/threejs/TankControls";
import CSSPainting from "../../scripts/threejs/entities/CSSPainting";
import mp4 from "../../scripts/threejs/entities/test.mp4";

export default class ThreeScene extends Component{
    componentDidMount(){
        const width = window.innerWidth;
        const height = window.innerHeight;

        //ADD SCENE
        this.scene = new THREE.Scene();
        this.scene.background = CONST.SCENE_COLOR;
        this.sceneCSS = new THREE.Scene();

        //Add Room
        const WALL_HEIGHT = 5;
        const FLOOR_OFFSET = WALL_HEIGHT/2;
        const room = new Room(new THREE.Vector3(20,WALL_HEIGHT,20),5.5);
        room.position.set(0,FLOOR_OFFSET,0);
        this.scene.add(room);

        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );
        this.camera.playerHeight = CONST.PLAYER_HEIGHT;
        this.camera.position.set(7,this.camera.playerHeight,0);
        // this.camera.rotation.x = Math.PI;
        //Array of entities that have the method update(). Called in every animation frame
        this.updatableEntities = [];

        //Add Controls
        //this.updatableEntities.push(new DeviceOrientationControls(this.camera));
        this.updatableEntities.push(new TankControls(this.camera));
        this.updatableEntities.push(new RaycasterControls(this.camera,this.scene));


        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor('#000000');
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);

        //Add resize event listener
        window.addEventListener("resize", this.handleResize);

        let painting = new CSSPainting("../../scripts/threejs/resource/demo.webp");
        painting.position.set(0,5,0);
        painting.getObjectByName("webgl").position.set(0,2,0);
        this.scene.add(painting.getObjectByName("webgl"));


        //TEST
        // let gifEl = document.createElement( 'video' );
        // gifEl.setAttribute("autoplay", true);
        // gifEl.setAttribute("loop", true);
        // gifEl.onerror = function(e) {
        //     "Error occured loading source"
        // };
        // gifEl.src = mp4;
        //
        // // gifEl.width = 100;
        // // gifEl.height = 100;
        // let vidTexture1 = new THREE.VideoTexture(gifEl);
        // let material1 = new THREE.MeshBasicMaterial({map:vidTexture1});
        //
        //
        //
        // let geometry1 = new THREE.BoxGeometry(10,10,10);
        // let planeMesh1= new THREE.Mesh( geometry1, material1 );
        //
        // this.scene.add(planeMesh1);
        //ENDTEST


        //Start
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

        this.updatableEntities.forEach((entity)=>{
           entity.update();
        });

        // this.controls.update();
        this.renderScene();
    };
    renderScene = () => {
        this.renderer.render(this.scene, this.camera);
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
