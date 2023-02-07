// At the beginning the usernames are empty
let player1Name = "";
let player2Name = "";

// Capture inputs lines elements from DOM and save on session storage
let inputs = Array.from(document.getElementsByTagName("input"));
inputs.map (
    (input) => {
        input.addEventListener('input', () => {
            (input.name == "player1-name") ? 
            (player1Name = JSON.stringify(input.value),
            sessionStorage.setItem("player1-name", player1Name))
            : 
            (player2Name = JSON.stringify(input.value),
            sessionStorage.setItem("player2-name", player2Name))
        })
    }
)

// Pop Up div that show message passed in parameters 
const showErrMessage = (message) => {
    document.getElementById("messagepopup-text").innerHTML = message;
    showElement('message-popup');
}

// Validate user input, cannot be empty
const validateDataInputs = () => {
    if (player1Name == null || player1Name == "") {
        showErrMessage("You are missing the name of player 1");
        return false;
    } else if (player2Name == null || player2Name == "") {
        showErrMessage("You are missing the name of player 2");
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
                    (validateDataInputs()) ? window.location.assign("./tictactoe.html") : null;
                    break;
                case 'cancelButton' :
                    console.log("Volvemos a la pantalla anterior");
                    break;
            }
        })
    }
)



