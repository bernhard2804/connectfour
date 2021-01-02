const board = [];
const rows = 6;
const cols = 7;
let gameOver = false;
let currentPlayer = Math.floor(Math.random() * 2);
let player = ['purple', 'teal'];

function showPlayer(){
    document.getElementById('current').style.backgroundColor = player[currentPlayer];
}

function arrBoard(){
    for (let i = 0; i < rows; i++){
        const newRow = [];
        for (let j = 0; j < cols; j++){
            newRow.push(-1);
        }
        board.push(newRow)
        // console.log(newRow)
    }
}

function topRow(){
    const tableIdBoard = document.getElementById('board');
    // console.log(tableIdBoard)
    const tableTopRow = document.createElement('tr');
    tableTopRow.id = 'topRow';
    for (let i = 0; i < cols; i++){
        const tableTopCell = document.createElement('th');
        // tableTopCell.innerText = i;
        tableTopCell.id = i;
        tableTopRow.append(tableTopCell);
    }
    tableIdBoard.append(tableTopRow);
}

function arrBoardToHTML(){
    const tableIdBoard = document.getElementById('board');
    for (let i = 0; i < rows; i++){
        const tableRow = document.createElement('tr');
        for (let j = 0; j < cols; j++){
            const tableCell = document.createElement('td');
            // tableCell.innerText = (`${i}${j}`);
            tableCell.id = (`${i}${j}`);
            tableRow.append(tableCell);
        }
        tableIdBoard.append(tableRow); 
    }
}

function createBoard(){
    showPlayer();
    arrBoard();
    topRow();
    arrBoardToHTML();
}

createBoard();

console.log(board);