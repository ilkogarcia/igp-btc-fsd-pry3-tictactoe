/*
* Shows hidden elements in the html
* @param {string} element Id
*/
const showElement = (elementId) => {
    document.getElementById(elementId).style.visibility = 'visible';
}

/*
* Hide elements visible in the html
* @param {string} element Id
*/
const hideElement = (elementId) => {
    document.getElementById(elementId).style.visibility = 'hidden';
}

/*
* Check if input text is empty
* @param {string} element Id
*/
const validateInputText = (elementId) => {
    let a = document.getElementById(elementId).value;
    if ( a == null || a == "") {
        alert("Please fill all required fields!!!");
    }
}
