import * as THREE from "three";
import * as THREE_CSS from "./CSS3D";
import mp4 from "./test.mp4";

//http://learningthreejs.com/blog/2013/04/30/closing-the-gap-between-html-and-webgl/
export default class CSSPainting extends THREE.Group{
  constructor(src){
    super();


    let gifEl = document.createElement( 'video' );
    gifEl.setAttribute("autoplay", true);
    gifEl.setAttribute("loop", true);
    gifEl.onerror = function(e) {
        "Error occured loading source"
    };
    gifEl.src = mp4;

    // gifEl.width = 100;
    // gifEl.height = 100;
    let vidTexture = new THREE.VideoTexture(gifEl);
    let material = new THREE.MeshBasicMaterial({map:vidTexture});



    let geometry = new THREE.BoxGeometry(5,5,0);
    let planeMesh= new THREE.Mesh( geometry, material );
    planeMesh.name = "webgl";

    this.add(planeMesh);
  }
}