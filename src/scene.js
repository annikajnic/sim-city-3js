import * as THREE from 'three';
import { createCamera } from './camera';
import { gameWindow } from './utils/constant';


export function createScene() {
    // Intial setup

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    const camera = createCamera()
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);

    gameWindow.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1); 
    const material = new THREE.MeshBasicMaterial({ color: 0xffE00 });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh)

    function draw() {
        renderer.render(scene, camera.camera);
    }

    function start() {
       renderer.setAnimationLoop(draw);
    }

    function stop() {
    renderer.setAnimationLoop(null);
    }

    function mouseDown(event) {
       camera.mouseDown(event);
    }

    function mouseUp(event) {
        camera.mouseUp(event);
    }

    function mouseMove(event) {
        camera.mouseMove(event);
    }

    return { start, stop, mouseDown, mouseUp, mouseMove };
}