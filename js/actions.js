export const RESET_GAME = 'RESET_GAME';
export const SET_TITLE = 'SET_TITLE';
export const SET_GRID = 'SET_GRID';
export const MAKE_MOVE = 'MAKE_MOVE';
export const END_GAME = 'END_GAME';
export const SET_PLAYER = 'SET_PLAYER';

export const resetGame = () => {
    return {
        type: RESET_GAME 
    };
};

export const setName = (newName) => {
    return {
        type: SET_PLAYER,
        newName: newName
    };
};

export const setTitle = (newTitle) => {
    return {
        type: SET_TITLE,
        title: newTitle
    };
};

export const setGrid = (newGrid) => {
    return {
        type: SET_GRID,
        title: newGrid
    };
};

export const move = (row, col, player) => {
    return {
        type: MAKE_MOVE,
        row,
        col,
        player
    };
};

export const endGame = (winner) => {
    return {
        type: END_GAME,
        winner
    };
};

