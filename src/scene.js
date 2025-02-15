import * as THREE from 'three';
import { createCamera } from './camera';
import { gameWindow } from './utils/constant';
import { createAssetInstance } from './utils/assets';


export function createScene() {
    // Intial setup

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87cefa);

    const camera = createCamera(gameWindow)
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);

    gameWindow.appendChild(renderer.domElement);


    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let selectedObject = undefined;

    let terrain = []
    let buildings =[]

    let onObjectSelected = undefined;

    function initiatize(city) {
        scene.clear();
        terrain = [];
        buildings = [];
        for(let i = 0; i < city.size; i++) {
            const column = [];
            for(let j = 0; j < city.size; j++) {
                const terrainId = city.data[i][j].terrainId
                const mesh= createAssetInstance(terrainId, i,j);
                scene.add(mesh)
                column.push(mesh);
               
            }
            terrain.push(column);
            buildings.push([...Array(city.size)]);

            setupLights();
        }
    }

    function update(city) {
        for (let i = 0; i < city.size; i++) {
            for (let j = 0; j < city.size; j++) {
                const currentBuildingId = buildings[i][j]?.userData.id;
                const newBuildingId = city.data[i][j].buildingId;

                if(!newBuildingId && currentBuildingId) {
                    scene.remove(buildings[i][j]);
                    buildings[i][j] = undefined;
                }

                if(currentBuildingId !== newBuildingId) {

                    scene.remove(buildings[i][j]);
                    buildings[i][j] = createAssetInstance(newBuildingId, i,j);
                    scene.add(buildings[i][j]);
                }
            }
            
        }
    }

    function setupLights() {
        const lights =[new THREE.AmbientLight(0xffffff, 0.2),
        new THREE.DirectionalLight(0xffffff, 0.3),
        new THREE.DirectionalLight(0xffffff, 0.3),
        new THREE.DirectionalLight(0xffffff, 0.3),];

  
        lights[1].position.set(0, 1, 0);
        lights[2].position.set(1, 1, 0);
        lights[3].position.set(0, 1, 1);

        scene.add(...lights)

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

       mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
       mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

       raycaster.setFromCamera(mouse, camera.camera);
       const intersects = raycaster.intersectObjects(scene.children, true);
       if (intersects.length > 0) {
        if(selectedObject) {
            selectedObject.material.emissive.setHex(0);
        }
           selectedObject = intersects[0].object;
           selectedObject.material.emissive.setHex(0x555555);
           console.log(selectedObject.userData);

           if(this.onObjectSelected){
               this.onObjectSelected(selectedObject);
           }
       }    
    }

    function mouseUp(event) {
        camera.onMouseUp(event);
    }

    function mouseMove(event) {
        camera.onMouseMove(event);
    }

    return { onObjectSelected,initiatize, update, start, stop, mouseDown, mouseUp, mouseMove };
}