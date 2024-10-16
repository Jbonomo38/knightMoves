// script to provide all possible moves given a knight's location
// x = column, y = row
function knightOptions([x, y]) {
    if (x < 0 || x > 7 || y < 0 || y > 7) {
        throw new Error('Position out of bounds');
    }

    const moves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    const mappedMoves = moves.map(([dx, dy]) => [x + dx, y+ dy]);
    const toReturn = mappedMoves.filter(([newX, newY]) => 
        newX >= 0 && newX < 8 && newY >= 0 && newY < 8
    );

    return toReturn;
}

function gridOptions(array) {
    const chessGrid = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    array.forEach(([x, y]) => {
        chessGrid[x].push(y);
    });

    return chessGrid;
}


function knightMoves(start, end) {
    const queue = [[start]];
    const visited = new Set();
    visited.add(start.toString());

    while(queue.length) {
        const path = queue.shift();
        const current = path[path.length-1];
        if(current[0] === end[0] && current[1] === end[1]) {
            return logKnightMoves(path);
        }

        const nextMoves = knightOptions(current);
        nextMoves.forEach((move) => {
            if(!visited.has(move.toString())) {
                queue.push([...path, move]);
                visited.add(move.toString());
            }
        })
    }

    return null;
}

function logKnightMoves(path) {
    console.log(`You made it in ${path.length + 1} moves!  Here's your path:`);
    path.forEach((move) => console.log(move));
}


const loc = [1,1];
console.log(knightOptions(loc));
const grid = knightOptions([0,0]);
// console.log(gridOptions(grid));
knightMoves([0,0],[3,2]);