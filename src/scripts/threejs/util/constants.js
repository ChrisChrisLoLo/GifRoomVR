//Constants used throughout three js
//As per the "official" convention, each distance unit is assumed to be 1 meter (Suck it Americans)

import * as THREE from "three";

//Height that is determined to be the ground
export const GROUND_HEIGHT = 0;

//Height of the camera/player. Set at 1.7m (avg Canadian height) - 0.1m as the distance from eyes to the top of the head
export const PLAYER_HEIGHT = 1.6 + GROUND_HEIGHT;

export const SCENE_COLOR = new THREE.Color(0x9bbcf2);