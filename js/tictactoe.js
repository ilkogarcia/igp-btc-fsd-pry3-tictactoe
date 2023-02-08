/*
 * Contains methods for handling user events and game states on game page.
 */

// Setting initial parameters for player 1
let player1Name = sessionStorage.getItem("player1-name");   // Player 1. Get name from sessionStorage
let player1Score = 0;                                       // Player 1. Initial score
let player1Tokens = 3;                                      // Player 1. Max tokens

// Setting initial parameters for player 2
let player2Name = sessionStorage.getItem("player2-name");   // Player 2. Get name from sessionStorage
let player2Score = 0;                                       // Player 2. Initial score
let player2Tokens = 3;                                      // Player 2. Max tokens

// Initializing game scoreboard
document.getElementById("player1-name").innerHTML = player1Name;
document.getElementById("player1-score").innerHTML = player1Score;
document.getElementById("player2-name").innerHTML = player2Name;
document.getElementById("player2-score").innerHTML = player2Score;

// Setting general parameters
let gameTurn = true;        // When gameTurn is true means is "X" turn otherwise is "O" turn.
let currentBoard = ["", "", "", "", "", "", "", "", ""];
let winner;

const checkBoardStatus = () => {
    // Checking Horizontal Wins
    if (gameBoard[0].innerHTML === gameBoard[1].innerHTML && gameBoard[0].innerHTML === gameBoard[2].innerHTML && gameBoard[0].innerHTML) {
        return {'token': gameBoard[0].innerHTML, 'direction': 'H', 'row': 1};
    }
    if (gameBoard[3].innerHTML === gameBoard[4].innerHTML && gameBoard[3].innerHTML === gameBoard[5].innerHTML && gameBoard[3].innerHTML) {
        return {'token': gameBoard[3].innerHTML, 'direction': 'H', 'row': 2};
    }
    if (gameBoard[6].innerHTML === gameBoard[7].innerHTML && gameBoard[6].innerHTML === gameBoard[8].innerHTML && gameBoard[6].innerHTML) {
        return {'token': gameBoard[6].innerHTML, 'direction': 'H', 'row': 3};
    }

    // Checking Vertical Wins
    if (gameBoard[0].innerHTML === gameBoard[3].innerHTML && gameBoard[0].innerHTML === gameBoard[6].innerHTML && gameBoard[0].innerHTML) {
        return {'token': gameBoard[0].innerHTML, 'direction': 'V', 'column': 1};
    }
    if (gameBoard[1].innerHTML === gameBoard[4].innerHTML && gameBoard[1].innerHTML === gameBoard[7].innerHTML && gameBoard[1].innerHTML) {
        return {'token': gameBoard[1].innerHTML, 'direction': 'V', 'column': 2};
    }
    if (gameBoard[2].innerHTML === gameBoard[5].innerHTML && gameBoard[2].innerHTML === gameBoard[8].innerHTML && gameBoard[2].innerHTML) {
        return {'token': gameBoard[2].innerHTML, 'direction': 'V', 'column': 3};
    }

    // Checking Diagonal Wins
    if (gameBoard[0].innerHTML === gameBoard[4].innerHTML && gameBoard[0].innerHTML === gameBoard[8].innerHTML && gameBoard[0].innerHTML) {
        return {'token': gameBoard[0].innerHTML, 'direction': 'D', 'diagonal': 'main'};
    }
    if (gameBoard[2].innerHTML === gameBoard[4].innerHTML && gameBoard[2].innerHTML === gameBoard[6].innerHTML && gameBoard[2].innerHTML) {
        return {'token': gameBoard[2].innerHTML, 'direction': 'D', 'diagonal': 'counter'};
    }
    // Return false otherwise
    return false;
}

// Paint wich row, colum or diagonal is the winning combination
const paintWinningCombo = (winner) => {
    if (winner.direction == 'H') {
        switch (winner.row) {
            case 1: 
                gameBoard[0].classList.add("Gameboard-cell-winner");
                gameBoard[1].classList.add("Gameboard-cell-winner");
                gameBoard[2].classList.add("Gameboard-cell-winner");
                break;
            case 2:
                gameBoard[3].classList.add("Gameboard-cell-winner");
                gameBoard[4].classList.add("Gameboard-cell-winner");
                gameBoard[5].classList.add("Gameboard-cell-winner");
                break;
            case 3:
                gameBoard[6].classList.add("Gameboard-cell-winner");
                gameBoard[7].classList.add("Gameboard-cell-winner");
                gameBoard[8].classList.add("Gameboard-cell-winner");
                break;
        } 
    } else if (winner.direction == 'V') {
        switch (winner.column) {
            case 1: 
                gameBoard[0].classList.add("Gameboard-cell-winner");
                gameBoard[3].classList.add("Gameboard-cell-winner");
                gameBoard[6].classList.add("Gameboard-cell-winner");
                break;
            case 2:
                gameBoard[1].classList.add("Gameboard-cell-winner");
                gameBoard[4].classList.add("Gameboard-cell-winner");
                gameBoard[7].classList.add("Gameboard-cell-winner");
                break;
            case 3:
                gameBoard[2].classList.add("Gameboard-cell-winner");
                gameBoard[5].classList.add("Gameboard-cell-winner");
                gameBoard[8].classList.add("Gameboard-cell-winner");
                break;
        } 
    } else {
        switch (winner.diagonal) {
            case 'main': 
                gameBoard[0].classList.add("Gameboard-cell-winner");
                gameBoard[4].classList.add("Gameboard-cell-winner");
                gameBoard[8].classList.add("Gameboard-cell-winner");
                break;
            case 'counter':
                gameBoard[2].classList.add("Gameboard-cell-winner");
                gameBoard[4].classList.add("Gameboard-cell-winner");
                gameBoard[6].classList.add("Gameboard-cell-winner");
                break;
        }
    }
}

// Increases score of player received by parameter and updates the scoreboard
const updateScore = (token) => {
    switch (token) {
    case "X":
        player1Score++
        document.getElementById("player1-score").innerHTML = player1Score;
        break;
    case "O":
        player2Score++
        document.getElementById("player2-score").innerHTML = player2Score;
        break;
    }
}

// Pop Up div that show message passed in parameters 
const showMessage = (message) => {
    document.getElementById("messagepopup-text").innerHTML = message;
    showElement('message-popup');
}

// Pop Up div to show winner 
const showWinner = (token) => {
    switch (token) {
        case "X":
            document.getElementById("winner-name").innerHTML = player1Name.replace(/^"(.+)"$/,'$1');
        break;
        case "O":
            document.getElementById("winner-name").innerHTML = player2Name.replace(/^"(.+)"$/,'$1');
        break;
        }
    showElement('winner-popup');
}

// Adding click event listener for each cell on the game board
let gameBoard = Array.from(document.getElementsByClassName("Gameboard-cell"));
gameBoard.map (
    (gameCell) => {
        gameCell.addEventListener('click', () => {

                if ((gameCell.innerHTML == "") && (player1Tokens > 0 || player2Tokens > 0)) {
                    gameCell.innerHTML = (gameTurn) ? "X" : "O";        // Draw X or O according players turn
                    (gameTurn) ? player1Tokens-- : player2Tokens--;     // Decrease a turn to the corresponding player
                    currentBoard[gameCell.id] = (gameTurn) ? "X" : "O"; // Update on memory gameboard status
                    winner = checkBoardStatus();
                    if (winner) {                                       // Check if we have a winner
                        paintWinningCombo(winner);
                        // Executes only once after the delay whereas setInterval keeps on.
                        let delayInMilliseconds = 2000;     // 2 second
                        setTimeout(function() {
                            //your code to be executed after 1 second
                            showWinner(currentBoard[gameCell.id]);
                        }, delayInMilliseconds);
                        updateScore(currentBoard[gameCell.id]);
                    }
                    gameTurn = !gameTurn;                               // Change player turn
                } else if ((gameCell.innerHTML != "") && (player1Tokens > 0 || player1Tokens > 0)) {
                    showMessage("In this phase of the game clicking on a filled cell is not allowed");
                } else if ((gameCell.innerHTML == "" || gameCell.innerHTML == null) && (player1Score == 0 || player2Score == 0)) {
                    showMessage("You have no tokens available. You must move some of the pieces that you have on the board.");
                } else if ((gameCell.innerHTML == "X") && gameTurn && (player1Tokens == 0)) {
                    gameCell.innerHTML = "";                            // Erase cell content
                    currentBoard[gameCell.id] = "";                     // Update on memory gameboard status
                    player1Tokens++                                     // Add a turn to player 1
                } else if ((gameCell.innerHTML == "X") && !gameTurn && (player1Tokens == 0)) {
                    showMessage("You cannot move your opponent's pieces.");
                } else if ((gameCell.innerHTML == "O") && !gameTurn && (player2Tokens == 0)) {
                    gameCell.innerHTML = "";                            // Erase cell content
                    currentBoard[gameCell.id] = "";                     // Update on memory gameboard status
                    player2Tokens++                                     // Add a turn to player 2
                } else if ((gameCell.innerHTML == "O") && gameTurn && (player2Tokens == 0)) {
                    showMessage("You cannot move your opponent's pieces.");
                }
            })
    }
);

// Capture "PLAY AGAIN" button element
let playAgainButton = document.getElementById("play-button");
playAgainButton.addEventListener('click', () => {
    hideElement("winner-popup");
    resetGame();
    })

// Capture "NEW GAME" button element
let newGameButton = document.getElementById("new-button");
newGameButton.addEventListener('click', () => {
    hideElement("winner-popup");
    sessionStorage.clear;
    window.location.assign("./newgame.html");
    })

// Reset the game board for a new game
const resetGame = () => {
    gameBoard.map ((gameCell) => (gameCell.innerHTML = "", gameCell.classList.remove("Gameboard-cell-winner")));
    player1Tokens = 3;      // Player 1. Max tokens
    player2Tokens = 3;      // Player 2. Max tokens
    gameTurn = true;        // When gameTurn is true means is "X" turn otherwise is "O" turn.
    currentBoard = ["", "", "", "", "", "", "", "", ""];
}
