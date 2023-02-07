// Capture "NEW GAME" "button element from Document
let button = document.getElementById("button-newgame");
button.addEventListener('click', () => {window.location.assign("./pages/newgame.html")});


// Shows hidden elements in the html @param {string} element Id
const showElement = (elementId) => {
    document.getElementById(elementId).style.visibility = 'visible';
}

// Hide elements visible in the html @param {string} element Id
const hideElement = (elementId) => {
    document.getElementById(elementId).style.visibility = 'hidden';
}

