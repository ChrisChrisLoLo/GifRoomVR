/**
 * @author richt / http://richt.me
 * @author WestLangley / http://github.com/WestLangley
 *
 * W3C Device Orientation control (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
 */

import {
  Euler,
  Math as _Math,
  Quaternion,
  Vector3
} from "three";

let DeviceOrientationControls = function ( object ) {

  let scope = this;

  this.object = object;
  this.object.rotation.reorder( 'YXZ' );

  this.enabled = true;

  this.deviceOrientation = {};
  this.screenOrientation = 0;

  this.alphaOffset = 0; // radians

  let onDeviceOrientationChangeEvent = function ( event ) {

    scope.deviceOrientation = event;

  };

  let onScreenOrientationChangeEvent = function () {

    scope.screenOrientation = window.orientation || 0;

  };

  // The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

  let setObjectQuaternion = function () {

    let zee = new Vector3( 0, 0, 1 );

    let euler = new Euler();

    let q0 = new Quaternion();

    let q1 = new Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

    return function ( quaternion, alpha, beta, gamma, orient ) {

      euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

      quaternion.setFromEuler( euler ); // orient the device

      quaternion.multiply( q1 ); // camera looks out the back of the device, not the top

      quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation

    };

  }();

  this.connect = function () {

    onScreenOrientationChangeEvent(); // run once on load

    window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
    window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

    scope.enabled = true;

  };

  this.disconnect = function () {

    window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
    window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

    scope.enabled = false;

  };

  this.update = function () {

    if ( scope.enabled === false ) return;

    let device = scope.deviceOrientation;

    let isNonEmptyObject = !(Object.keys(device).length === 0 && device.constructor === Object);

    if ( device && isNonEmptyObject) {

      let alpha = device.alpha ? _Math.degToRad( device.alpha ) + scope.alphaOffset : 0; // Z

      let beta = device.beta ? _Math.degToRad( device.beta ) : 0; // X'

      let gamma = device.gamma ? _Math.degToRad( device.gamma ) : 0; // Y''

      let orient = scope.screenOrientation ? _Math.degToRad( scope.screenOrientation ) : 0; // O

      setObjectQuaternion( scope.object.quaternion, alpha, beta, gamma, orient );

    }

  };

  this.dispose = function () {

    scope.disconnect();

  };

  this.connect();

};

export default DeviceOrientationControls;
