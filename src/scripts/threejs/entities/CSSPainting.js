import * as THREE from "three";

//http://learningthreejs.com/blog/2013/04/30/closing-the-gap-between-html-and-webgl/
export default class CSSPainting extends THREE.Group{
  constructor(src){
    super();

    let scope = this;

    const MAX_GROUP_HEIGHT = 3;
    const MAX_GROUP_WIDTH = 3;
    const FRAME_WIDTH = 0.1;

    const MAX_VIDEO_HEIGHT = MAX_GROUP_HEIGHT-(2*FRAME_WIDTH);
    const MAX_VIDEO_WIDTH = MAX_GROUP_WIDTH-(2*FRAME_WIDTH);

    //Load element from source
    const vidEl = document.createElement( 'video' );
    vidEl.setAttribute("autoplay", true);
    vidEl.setAttribute("loop", true);
    vidEl.setAttribute("muted", true);
    vidEl.setAttribute("crossorigin", "anonymous");
    vidEl.onerror = function(evt) {
        "Error occured loading source"
    };



    //Wait for metadata to load, then create geometry
    vidEl.addEventListener("loadeddata",function(evt){
      if(this.videoHeight === 0 && this.videoWidth === 0){
        console.error("Video did not correctly load");
      }
      //Create material
      const vidTexture = new THREE.VideoTexture(this);
      const material = new THREE.MeshBasicMaterial({map:vidTexture});

      //Create video geometry. Need to scale it properly to prevent stretching
      let videoWidth;
      let videoHeight;
      console.log([this.videoWidth,this.videoHeight]);

      if(this.videoWidth >= this.videoHeight){
        videoWidth = MAX_VIDEO_WIDTH;
        videoHeight = MAX_VIDEO_HEIGHT * (this.videoHeight/this.videoWidth);
      }
      else if (this.videoHeight > this.videoWidth){
        videoWidth = MAX_VIDEO_WIDTH * (this.videoWidth/this.videoHeight);
        videoHeight = MAX_VIDEO_HEIGHT;
      }
      let vidGeo = new THREE.BoxGeometry(videoWidth,videoHeight,0.1);
      let vidMesh= new THREE.Mesh( vidGeo, material );

      scope.add(vidMesh);
    });

    vidEl.src = src;

    //Create material
    const vidTexture = new THREE.VideoTexture(this);
    const material = new THREE.MeshBasicMaterial({map:vidTexture});

    //Create video geometry. Need to scale it properly to prevent stretching
    let videoWidth;
    let videoHeight;
    console.log([this.videoWidth,this.videoHeight]);

    if(this.videoWidth >= this.videoHeight){
      videoWidth = MAX_VIDEO_WIDTH;
      videoHeight = MAX_VIDEO_HEIGHT * (this.videoHeight/this.videoWidth);
    }
    else if (this.videoHeight > this.videoWidth){
      videoWidth = MAX_VIDEO_WIDTH * (this.videoWidth/this.videoHeight);
      videoHeight = MAX_VIDEO_HEIGHT;
    }
    let vidGeo = new THREE.BoxGeometry(videoWidth,videoHeight,0.1);
    let vidMesh= new THREE.Mesh( vidGeo, material );

    scope.add(vidMesh);

  }
}