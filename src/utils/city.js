
export function createCity(size) {
    const data = [];

    initialize();

    function initialize() {
        for (let i = 0; i < size; i++) {
            const column = [];
            for (let j = 0; j < size; j++) {
               const tile = createTile(i,j);
               column.push(tile);
            }
            data.push(column);
        }
    }


    function update() {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                data[i][j].update();
            }
        }
    }

    function createTile(x,y) {
        const tile = {
            i:x,
            j:y,
            terrainId:'grass',
            buildingId:undefined,
            update() {
                const x = Math.random();
                if(x < 0.01) {
                   if(this.buildingId === undefined) {
                       this.buildingId = "building-1";
                   }
                   else if(this.buildingId === 'building-1') {
                       this.buildingId = 'building-2';
                   }
                   else if(this.buildingId === 'building-2') {
                       this.buildingId = 'building-3';
                       
                   }
                   else if(this.buildingId === 'building-3') {
                       this.buildingId = 'building-4';
                   }
                   else if(this.buildingId === 'building-4') {
                       this.buildingId = 'building-5';
                   }
               }
            }
        }
        return tile
    }

    return {
        data,
        size,
        update
    }
}