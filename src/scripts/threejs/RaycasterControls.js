import {Raycaster, BoxGeometry, Vector2,} from "three";
import BasicMesh from "./entities/BasicMesh";

export default class RaycasterControls{
  constructor(camera,scene) {
    this.camera = camera;
    this.enabled = false;
    this.raycaster = new Raycaster();
    this.scene = scene;


    this.mouse = new Vector2((( 1/2 ) * 2 - 1),(- ( 1/2 ) * 2 + 1));
    this.isMouseDown = false;


    this.cursor = new BasicMesh(new BoxGeometry(0.2, 0.2, 0.1), [0, 0, 0], this.scene);

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.onClick = this.onClick.bind(this);


    //add event listeners
    this.connect();
  }

  connect(){
    //Mouse Controls
    window.addEventListener( 'click', this.onClick, false );
    //Touch Controls
    window.addEventListener( 'touchend', this.onClick, false );

    this.enabled = true;
  };

  disconnect(){
    //Mouse Controls
    window.removeEventListener( 'click', this.onClick, false );
    //Touch Controls
    window.removeEventListener( 'touchend', this.onClick, false );

    this.enabled = false;
  };

  update(){
    if(this.enabled) {
      // update the picking ray with the camera and mouse position

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const innerRoom = this.scene.getObjectByName("innerRoom");
      const outerRoom = this.scene.getObjectByName("outerRoom");

      let intersects = this.raycaster.intersectObjects([innerRoom,outerRoom]);

      //only take the first object that intersects with the ray, may need to change this
      if (intersects.length > 0) {
        //take the first point of intersection between the ray and the given objects
        let intersection = intersects[0];
        //If ray is hitting the outerRoom floor (index 7)
        if(intersection.object.name === "outerRoom"){
          //if ray is hitting floor
          if(intersection.faceIndex === 6 || intersection.faceIndex === 7){
            const point = intersection.point;
            this.cursor.position.set(point.x, point.y, point.z);
            console.log(intersection.faceIndex);
          }
        }
      }
    }
  };

  onClick(){
    let pos = this.cursor.position;
    this.camera.position.set(pos.x,pos.y+this.camera.playerHeight,pos.z);
  }

  onMouseMove(e){
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
  }
}