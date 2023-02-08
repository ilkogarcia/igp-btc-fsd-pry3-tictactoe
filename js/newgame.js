/*
 * Contains methods for handling user data inputs on game setup.
 */

// Variables for players name (at beginning usernames are empty)
let player1Name = "";
let player2Name = "";

// Pop Up div that show message passed in parameters 
const showErrMessage = (message) => {
    document.getElementById("messagepopup-text").innerHTML = message;
    showElement('message-popup');
}

// Read user inputs
const getDataInputs = () => {
    player1Name = document.getElementById("player1-name").value;
    player2Name = document.getElementById("player2-name").value;
}

// Set players name on sessionStorage
const storePlayersName = () => {
    sessionStorage.setItem("player1-name", player1Name.trimStart());
    sessionStorage.setItem("player2-name", player2Name.trimStart());
}

// Validate user inputs, cannot be empty
const validateDataInputs = () => {
    if (player1Name == null || player1Name == "" || player2Name == null || player2Name == "") {
        showErrMessage("All players name are required. Please fill all field.");
        return false;
    } else return true;
}

// Capture buttons elements from DOM
let buttons = Array.from(document.getElementsByTagName("button"));
buttons.map (
    (button) => {
        button.addEventListener('click', () => {
            switch (button.name) {
                case 'playButton' : 
                    getDataInputs();
                    if (validateDataInputs()) {
                        storePlayersName();
                        window.location.assign("./tictactoe.html");
                    } 
                    break;
                case 'cancelButton' :
                    window.location.assign("../index.html");
                    break;
            }
        })
    }
)





