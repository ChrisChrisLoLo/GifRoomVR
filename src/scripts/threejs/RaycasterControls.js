import {Raycaster, Vector2} from "three";

export default class RaycasterControls{
  constructor(camera){
    this.camera = camera;
    this.enabled = false;
    this.raycaster = new Raycaster();
    this.mouse = new Vector2();


    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  connect(){
    window.addEventListener( 'mousedown', this.onMouseDown, false );
    window.addEventListener( 'mousedown', this.onMouseUp, false );
    this.enabled = true;
  };

  disconnect(){
    window.removeEventListener( 'mousedown', this.onMouseDown, false );
    window.removeEventListener( 'mousedown', this.onMouseUp, false );
    this.enabled = false;
  };

  onMouseDown(e){
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
  };



  onMouseUp(e){
    this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
  };
}