// import {Raycaster, Vector2} from "three";

export default class TankControls{
    constructor(camera){
        //Constants
        this._FORWARD_SPEED = 0.05;
        this._BACKWARD_SPEED = 0.025;
        this._ROTATION_SPEED = 0.05;

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
        this.update = this.update.bind(this);

        //add event listeners
        this.connect();
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
            let angle = this.camera.rotation.y;
            let dir = this.direction;
            if(dir.forward){
                this.camera.position.z -= Math.cos(angle)*this._FORWARD_SPEED;
                this.camera.position.x -= Math.sin(angle)*this._FORWARD_SPEED;
            }
            if(dir.backward){
                this.camera.position.z += Math.cos(angle)*this._BACKWARD_SPEED;
                this.camera.position.x += Math.sin(angle)*this._BACKWARD_SPEED;
            }
            if(dir.left){
                this.camera.rotation.y = angle + this._ROTATION_SPEED;
            }
            if(dir.right){
                this.camera.rotation.y = angle - this._ROTATION_SPEED;
            }
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