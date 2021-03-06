import * as actions from './actions'

const winConditions = [
    [
        [
            [0, 0],
            [0, 1],
            [0, 2]
        ],
        [
            [0, 0],
            [1, 1],
            [2, 2]
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0]
        ]
    ],
    [
        [
            [0, 0],
            [0, 1],
            [0, 2]
        ],
        [
            [0, 0],
            [1, 1],
            [2, 2]
        ]
    ],
    [
        [
            [0, 0],
            [0, 1],
            [0, 2]
        ],
        [
            [2, 0],
            [1, 1],
            [0, 2]
        ],
        [
            [2, 2],
            [1, 2],
            [0, 2]
        ]
    ],
    [
        [
            [0, 0],
            [1, 0],
            [2, 0]
        ],
        [
            [1, 0],
            [1, 1],
            [1, 2]
        ]
    ],
    [
        [
            [0, 0],
            [1, 1],
            [2, 2]
        ],
        [
            [1, 0],
            [1, 1],
            [1, 2]
        ],
        [
            [0, 1],
            [1, 1],
            [2, 1]
        ],
        [
            [2, 0],
            [1, 1],
            [0, 2]
        ]
    ],
    [
        [
            [0, 2],
            [1, 2],
            [2, 2]
        ],
        [
            [1, 0],
            [1, 1],
            [1, 2]
        ]
    ],
    [
        [
            [2, 2],
            [2, 1],
            [2, 0]
        ],
        [
            [0, 2],
            [1, 1],
            [2, 0]
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0]
        ]
    ],
    [
        [
            [0, 1],
            [1, 1],
            [2, 1]
        ],
        [
            [2, 0],
            [2, 1],
            [2, 2]
        ]
    ],
    [
        [
            [2, 0],
            [2, 1],
            [2, 2]
        ],
        [
            [0, 0],
            [1, 1],
            [2, 2]
        ],
        [
            [0, 2],
            [1, 2],
            [2, 2]
        ]
    ]
];

class Game {
    constructor(options) {
        this.ui = options.ui;
        this.store = options.store;
        this.store.subscribe(this.update.bind(this));
        this.ui 
            .querySelector('#reset')
            .addEventListener('click',
                this.resetGame.bind(this)
            );
        const boxes = this.ui.querySelectorAll('td button');
        boxes.forEach((box, index) => {
            const row = Math.floor(index/3);
            const col = index % 3;
            box.addEventListener('click',
                this.makeMove.bind(this, row, col)
                
            );
        });
        const inputName = this.ui.querySelector('.inputName');
        var keyCode;
        var newPlayerName = '';
        //add event listener to inputName, logging keypress
        inputName.addEventListener('input', (event) => {
            //dispatch the action to the store..
            //actions.js contains "actions.setName"
            //we pass in the keypress, which is a concatenated string
            //denoted by newPlayerName
                var inputText = inputName.value;
                this.store.dispatch(actions.setName(inputText));
            }
        );
    }

    updateName(state){
        //after dispatching the action to the store
        //we now pull the updated state from reducer.js
        //it is under the "state.newName" key of state
        //denoted in initialState
        this.ui 
            .querySelector('.playerName')
            .innerHTML = state.newName;
            console.log(state.newName);
    }

    renderTitle(state) {
        this.ui
            .querySelector('.title')
            .innerHTML = state.title;
    }

    renderGrid(state) {
        const {grid} = state;
        const boxes = this.ui.querySelectorAll('td button');
        boxes.forEach((box, index) => {
            const value = grid[Math.floor(index/3)][index%3];
            box.innerHTML = value;
        });
    }

    isWinner(row, col, player) {
        const state = this.store.getState();
        let gameOver = false;
        const boxIndex = row * 3 + col;
        winConditions[boxIndex].map((wc) => {

            if(state.grid[wc[0][0]][wc[0][1]] === player && 
                state.grid[wc[1][0]][wc[1][1]] === player && 
                state.grid[wc[2][0]][wc[2][1]] === player) {
                    gameOver = true;
                }
        });
        return gameOver;
    }
    isTie(){
        const state = this.store.getState();
        let result = true;
        state.grid.forEach((row) => {
            row.forEach((column) => {
                if(column === '') {
                    result = false;
                }
            });
        });
        return result;
    }
    makeMove(row, col) {
        const player = this.store.getState().xTurn ? 'X' : 'O';
        if(this.store.getState().gameOver) {return;}
            this.store.dispatch(actions.move(row, col,player));
        if(this.isWinner(row, col, player)){
            this.store.dispatch(actions.endGame(player));
        } else if(this.isTie()) {
            this.store.dispatch(actions.endGame('tie'));
        }
    }

    resetGame() {
        this.store.dispatch(actions.resetGame());
    }

    update() {
        const state = this.store.getState();
        this.updateName(state);
        this.renderTitle(state);
        this.renderGrid(state);
    }

    render() {
        this.update();
    }
}

export default Game;