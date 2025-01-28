
import * as THREE from 'three';
import * as constant from './utils/constant.js';


export function createCamera() {
    const camera = new THREE.PerspectiveCamera(
        75,
        constant.gameWindow.offsetWidth / constant.gameWindow.offsetHeight,
        0.1,
        1000
    );
    let cameraOrigin = new THREE.Vector3(0, 0, 0);
    let cameraAzimuth = 0;
    let cameraRadius = 4;
    let cameraElevation = 0;
    let isLeftMouseDown = false;
    let isRightMouseDown = false;
    let isMiddleMouseDown = false;
    let lastMousePosition = { x: 0, y: 0 };

    updateCameraPostion();

    camera.position.z = 5;


    function mouseDown(event) {
        console.log("mouse down");
        if(event.button === constant.LEFT_MOUSE_BUTTON) {
            isLeftMouseDown = true;
        }
        if(event.button === constant.MIDDLE_MOUSE_BUTTON) {
            isMiddleMouseDown = true;
        }
        if(event.button === constant.RIGHT_MOUSE_BUTTON) {            
            isRightMouseDown = true;            
        }
    }

    function mouseUp(event) {
        console.log("mouse up");
        if(event.button === constant.LEFT_MOUSE_BUTTON) {
            isLeftMouseDown = false;
        }
        if(event.button === constant.MIDDLE_MOUSE_BUTTON) {
            isMiddleMouseDown = false;
        }
        if(event.button === constant.RIGHT_MOUSE_BUTTON) {            
            isRightMouseDown = false;            
        }
    }

function mouseMove(event) {
    const deltaX = event.clientX - lastMousePosition.x;
    const deltaY = event.clientY - lastMousePosition.y;
    // handles the rotation of the camera
    if (isLeftMouseDown) {   
        cameraAzimuth += -(deltaX) * constant.ROTATION_SENSITIVITY;
        cameraElevation += (deltaY) * constant.ROTATION_SENSITIVITY;
        cameraElevation = Math.max(constant.MAX_CAMERA_ELEVATION, Math.min(constant.MIN_CAMERA_ELEVATION, cameraElevation));
        updateCameraPostion();
    }
    if (isMiddleMouseDown) {
        const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(constant.Y_AXIS, cameraAzimuth * constant.DEG2RAD);
        const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(constant.Y_AXIS, cameraAzimuth * constant.DEG2RAD);
        cameraOrigin.addVectors(forward.multiplyScalar(constant.PAN_SENSITIVITY * deltaY));
        cameraOrigin.addVectors(left.multiplyScalar(constant.PAN_SENSITIVITY * deltaX));
        updateCameraPostion();

    }

    // handles the zooming in and out of the camera
    if (isRightMouseDown) {
        cameraRadius += (deltaY) * 0.2;
        cameraRadius = Math.max(constant.MIN_CAMERA_RADIUS, Math.min(constant.MAX_CAMERA_RADIUS, cameraRadius));
        updateCameraPostion();
    }

    lastMousePosition = { x: event.clientX, y: event.clientY };
}

    function updateCameraPostion() {
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * constant.DEG2RAD) * Math.cos(cameraElevation * constant.DEG2RAD);
        camera.position.y = cameraRadius * Math.sin(cameraElevation * constant.DEG2RAD);
        camera.position.z = cameraRadius * Math.cos(cameraAzimuth * constant.DEG2RAD) * Math.cos(cameraElevation * constant.DEG2RAD);
        camera.position.add(cameraOrigin);
        camera.lookAt(cameraOrigin);
        camera.updateMatrixWorld();
    }

    return { camera, mouseDown, mouseUp, mouseMove };
}