import * as THREE from "three";
import * as THREE_CSS from "./CSS3D";

//http://learningthreejs.com/blog/2013/04/30/closing-the-gap-between-html-and-webgl/
export default class CSSPainting extends THREE.Group{
  constructor(src){
    super();

    let material = new THREE.MeshBasicMaterial({ wireframe: true });
    let geometry = new THREE.PlaneGeometry();
    let planeMesh= new THREE.Mesh( geometry, material );

    this.add(planeMesh);
    let gifEl = document.createElement( 'video' );
    gifEl.setAttribute("autoplay", true);
    gifEl.setAttribute("loop", true);
    gifEl.src = src;
    gifEl.width = 100;
    gifEl.height = 100;
    let gifObject = new THREE_CSS.CSS3DObject(gifEl);
    gifObject.position = planeMesh.position;
    gifObject.rotation = planeMesh.rotation;
  }
}