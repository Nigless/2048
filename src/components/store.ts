import { createEvent, createStore } from "effector";

const slidedUpEvent = createEvent()
const slidedLeftEvent = createEvent()
const slidedRightEvent = createEvent()
const slidedBottomEvent = createEvent()

interface Cell {
    id: number,
    value: number,
}



const FIELD_COLS = 4;
const FIELD_ROWS = 4;
const SPAWN_TILES = 2;

const fieldStore = createStore<(Cell | null)[][]>([...new Array(FIELD_COLS)].map(() => new Array(FIELD_ROWS).fill(null)))

let id = 0

fieldStore.on(slidedUpEvent, (state) => {
    const HORISONTAL = true
    const FLIP = true

    const emptyCells: [number, number][] = []
    for (
        let i = 0;
        i < FIELD_COLS;
        i++
    ) {

        const x = i;
        let markerPos = 0;
        let marker: Cell | null = state[x][0];

        for (
            let j = 1;
            j < FIELD_ROWS;
            j++
        ) {
            const y = j;
            const cell = state[x][y];

            // skip
            if (!cell) {
                continue;
            }

            // move
            if (!marker) {
                state[x][y] = null;
                state[x][markerPos] = cell
                state[x] = [...state[x]]
                marker = cell;
                continue;
            }

            // move
            if (cell.value !== marker.value) {
                markerPos++
                state[x][y] = null;
                state[x][markerPos] = cell
                state[x] = [...state[x]]
                marker = cell;
                continue;
            }

            // merge
            state[x][y] = null;
            state[x][markerPos] = { ...cell, value: cell.value * 2 }
            state[x] = [...state[x]]
            markerPos++;
            marker = state[x][markerPos];

        }

        if (state[x][markerPos]) {
            markerPos++
        }

        for (
            let j = markerPos;
            j < FIELD_ROWS;
            j++
        ) {
            const m = j;

            if (state[x][m]) {
                debugger
            }
            emptyCells.push([x, m]);

            const pos = Math.floor(Math.random() * (emptyCells.length - 1));
            const current = emptyCells.length - 1;
            [emptyCells[current], emptyCells[pos]] = [emptyCells[pos], emptyCells[current]];
        }
    }

    for (let i = 0; i < SPAWN_TILES && i < emptyCells.length; i++) {
        const [x, y] = emptyCells[i]
        state[x][y] = {
            id: id++,
            value: Math.random() > 0.7 ? 4 : 2
        }
    }

    return [...state]
})

export { fieldStore, slidedUpEvent };