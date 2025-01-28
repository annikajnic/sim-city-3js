import * as THREE from 'three';

export const gameWindow = document.getElementById('render-target');
export const gameContainer = document.getElementById('root-window');
export const LEFT_MOUSE_BUTTON = 0;
export const MIDDLE_MOUSE_BUTTON = 1;
export const RIGHT_MOUSE_BUTTON = 2;

export const Y_AXIS = new THREE.Vector3(0, 1, 0);
export const DEG2RAD = Math.PI / 180;

export const ROTATION_SENSITIVITY = 0.5;
export const ZOOM_SENSITIVITY = 0.2;
export const PAN_SENSITIVITY = -0.01;

export const MAX_CAMERA_ELEVATION = 90;
export const MIN_CAMERA_ELEVATION = 30;
export const MIN_CAMERA_RADIUS = 2;
export const MAX_CAMERA_RADIUS = 10;