/*
 * Contains methods specific for home page.
 */

// Capture "NEW GAME" button element
let newGameButton = document.getElementById("newgame-button");
newGameButton.addEventListener('click', () => {
    sessionStorage.clear;
    window.location.assign("./pages/newgame.html");
})

// Capture "HELP" button element
let helpButton = document.getElementById("help-button");
helpButton.addEventListener('click', () => {
    showElement("RulesPopUp");
})

// Capture "OK" button element
let okButton = document.getElementById("ok-button");
okButton.addEventListener('click', () => {
    hideElement("RulesPopUp");
})
