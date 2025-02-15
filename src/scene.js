import * as THREE from 'three';
import { createCamera } from './camera';
import { gameWindow } from './utils/constant';


export function createScene() {
    // Intial setup

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    const camera = createCamera(gameWindow)
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);

    gameWindow.appendChild(renderer.domElement);



    let meshes = []
    function initiatize(city) {
        scene.clear();
        meshes = [];
        for(let i = 0; i < city.size; i++) {
            const column = [];
            for(let j = 0; j < city.size; j++) {
                // 1. load the mesh/3d object to corresponding to the tikle at (x,y)
                // 2. add the mesh to the scene 
                // 3. add the mesh to the meshes array
                const geometry = new THREE.BoxGeometry(1, 1, 1); 
                const material = new THREE.MeshBasicMaterial({ color: 0xffE00 });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(i,0,j)
            
                scene.add(mesh)
            }
            meshes.push(column);
        }
    }

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
       camera.onMouseDown(event);
    }

    function mouseUp(event) {
        camera.onMouseUp(event);
    }

    function mouseMove(event) {
        camera.onMouseMove(event);
    }

    return { initiatize, start, stop, mouseDown, mouseUp, mouseMove };
}