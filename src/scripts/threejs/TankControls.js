// import {Raycaster, Vector2} from "three";

export default class TankControls{
    constructor(camera){
        this.camera = camera;
        this.enabled = false;
        //Current direction being given
        this.direction = {forward:false,backward:false,left:false,right:false};
        // this.raycaster = new Raycaster();
        // this.mouse = new Vector2();


        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    connect(){
        window.addEventListener( 'keydown', this.onKeyDown, false );
        window.addEventListener( 'keyup', this.onKeyUp, false );
        this.enabled = true;
    };

    disconnect(){
        window.removeEventListener( 'keydown', this.onKeyDown, false );
        window.removeEventListener( 'keyup', this.onKeyUp, false );
        this.enabled = false;
    };

    update(){
        if(this.enabled){
            
        }
    }

    onKeyDown(e){
        let dir = this.direction;
        switch(e.keyCode){
            case 38:
                dir.forward = true;
                break;
            case 40:
                dir.backward = true;
                break;
            case 37:
                dir.left = true;
                break;
            case 39:
                dir.right = true;
                break;
            default:
                break;
                //spin toggle
            // case 32:
            //     dir.forward = true;
            //     break;
        }
    }

    onKeyUp(e){
        let dir = this.direction;
        switch(e.keyCode) {
            case 38:
                dir.forward = false;
                break;
            case 40:
                dir.backward = false;
                break;
            case 37:
                dir.left = false;
                break;
            case 39:
                dir.right = false;
                break;
            default:
                break;
        }
    }
}