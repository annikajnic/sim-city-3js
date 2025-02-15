
export function createCity(size) {
    const data = [];

    initialize();

    function initialize() {
        for (let i = 0; i < size; i++) {
            const column = [];
            for (let j = 0; j < size; j++) {
               const tile = {
                   i,j
               }
               column.push(tile);
            }
            data.push(column);
        }
    }
    return {
        data,
        size
    }
}