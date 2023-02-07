/*
 * Contains methods for handling user events and game states on game page.
 */

// Setting initial parameters for player 1
let player1Score = 0;       // Player 1. Initial score
let player1Tokens = 3;      // Player 1. Max tokens

// Setting initial parameters for player 2
let player2Score = 0;       // Player 2. Initial score
let player2Tokens = 3;      // Player 2. Max tokens


// Initializing game markers
document.getElementById("player1-name").innerHTML = sessionStorage.getItem("player1-name");
document.getElementById("player1-score").innerHTML = player1Score;
document.getElementById("player2-name").innerHTML = sessionStorage.getItem("player2-name");
document.getElementById("player2-score").innerHTML = player2Score;

// Setting general parameters
let gameTurn = true;        // When gameTurn is true means is "X" turn otherwise is "O" turn.
let currentBoard = ["", "", "", "", "", "", "", "", ""];
let winningBoard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

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

// Pop Up div to show winner 
const showWinner = (winnerName) => {
    document.getElementById("winner-name").innerHTML = winnerName;
    showElement('winner-popup');
}

// Adding click event listener for each cell on the game board
let gameBoard = Array.from(document.getElementsByClassName("Gameboard-cell"));
gameBoard.map (
    (gameCell) => {
        gameCell.addEventListener('click', () => {
            if ((gameCell.innerHTML === "") && (player1Tokens > 0 || player2Tokens > 0)) {

                // Draw X or O according players turn
                gameCell.innerHTML = (gameTurn) ? "X" : "O";

                // Decrease a turn to the corresponding player
                (gameTurn) ? player1Tokens-- : player2Tokens--;
                
                // Update on memory gameboard status
                currentBoard[gameCell.id] = (gameTurn) ? "X" : "O";
                console.log(currentBoard);

                // Check if we have a winner
                let winner = checkBoardStatus();
                if (winner != false) {
                    showWinner(winner.token);
                    (winner.token === "X") ? increaseScore("player1") : increaseScore("player2");
                }

                // Change in game turn
                gameTurn = !gameTurn;
            }
        })
    }
)


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

// Increases score of player received by parameter and updates the scoreboard
const increaseScore = (player) => {
    switch (player) {
    case "player1":
        player1Score++
        document.getElementById("player1-score").innerHTML = player1Score;
        break;
    case "player2":
        player2Score++
        document.getElementById("player2-score").innerHTML = player2Score;
        break;
    }
}

// Reset the game board for a new game
const resetGame = () => {

    gameBoard.map ((gameCell) => gameCell.innerHTML = "");

    player1Tokens = 3;      // Player 1. Max tokens
    player2Tokens = 3;      // Player 2. Max tokens

    gameTurn = true;        // When gameTurn is true means is "X" turn otherwise is "O" turn.
    currentBoard = ["", "", "", "", "", "", "", "", ""];
    
}