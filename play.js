// console.log(board)

function setChipInHTML(rowPosition, colPosition){
    // adds div with colored background of current player to table cell
    let idOfTarget = `${rowPosition}${colPosition}`;
    // console.log(idOfTarget)
    const targetCell = document.getElementById(idOfTarget)
    // console.log(targetCell)
    const cellChip = document.createElement('div');
    cellChip.classList.add('chip');
    cellChip.style.backgroundColor = player[currentPlayer];
    targetCell.append(cellChip);
}

function handleMove(colPosition){
    // checks if chip position is inside gameboard
    if (gameOver) return;
    const rowPosition = (findRow(colPosition));
    // console.log('gefundene Position: ', rowPosition, colPosition );
    if (rowPosition < 0){
        return;
    }
    // updates array board
    board[rowPosition][colPosition] = currentPlayer;
    // updates table in HTML
    setChipInHTML(rowPosition, colPosition);
    // checks if game is over
    let winner = checkForWin();
    // console.log (winner);
    if (winner !== -1){
        gameOver = true;
        document.getElementById('h2').innerText = 'GAME OVER!! Winner is:';
        // setTimeout will prevent that the popup comes before chip is added to the DOM
        // setTimeout(() => { alert(`Player ${player[currentPlayer]} won! Halleluja!`); }, 200);
        return;
    }
    if (checkForTie()) {
        gameOver = true;
        setTimeout(() => { alert(`Tie, unentschieden! Schade.`); }, 200);
        return;
    }
    // player changes
    currentPlayer === 1 ? currentPlayer = 0 : currentPlayer = 1;
    // sets background color to display current player 
    document.getElementById('current').style.backgroundColor = player[currentPlayer];
}
document.querySelector('#topRow').addEventListener('click', function(e){
    // eventlistener on toprow, catches target and gives it to handleMove
   /*  console.log(e.target.id)
    console.log(typeof(+e.target.id)) */
    const colPosition = +e.target.id;
    handleMove(colPosition);
})

function findRow(col){
    // chip moves downward in array board to lowest -1 position, 
    // then one up again to next free cell
    // console.log(board, col)
    let i = 0;
    // console.log(i, board[i][col])
    // console.log(typeof(board[i][col]))
     while( i < rows && board[i][col] === -1){
        i++;
        // console.log(i)
    }
       return i - 1;
}

function updateBoard(x , y){
    // array board updates, gets player (0 or 1) instead of -1 
    arrBoard[x][y] = currentPlayer;
}

function checkForFour(arr){
    // checks an array of four items to be equal
    console.log('arr inside checkforfour: ', arr)
    let newBool = arr.every(function(val){
        return val === arr[0];
    })
    if (newBool === true){
        return arr[0];
    } else {
        return -1;
    }
}

function checkForTie(){
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            if ( board[i][j] === -1){
                return false;
            }
        } 
    }
    return true;
}

function checkForWin(){
    // console.log('inside checkForWin')
    // initiales winner, will later be changed to 0 or 1
    let winner = -1;
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            // console.log(i,j)
            // is current position in the loop from where it checkes
            if (board[i][j] !== -1){
            // check horizontal
                if(j + 3 < cols){
                    const testArray = [];
                    for (let k = 0; k < 4; k++){
                        testArray.push(board[i][j + k])
                    }
                    winner = checkForFour(testArray)
                    if (winner !== -1) return winner;
                }
            // check vertical
                if(i + 3 < rows){
                    const testArray = [];
                    for (let k = 0; k < 4; k++){
                        testArray.push(board[i + k][j])
                    }
                    winner = checkForFour(testArray)
                    if (winner !== -1) return winner;
                }
            // check diagonal down
                if (i + 3 < rows && j + 3 < cols){
                    const testArray = [];
                    for (let k = 0; k < 4; k++){
                        testArray.push(board[i + k][j + k])
                    }
                    winner = checkForFour(testArray);
                    if (winner !== -1) return winner;
                }
            // check diagonal up
                if (i - 3 >= 0 && j + 3 < cols){
                    const testArray = [];
                    for (let k = 0; k < 4; k++){
                        testArray.push(board[i - k][j + k])
                    }
                    winner = checkForFour(testArray);
                    if (winner !== -1) return winner;
                }
            };
        }
    }
    return -1;
}