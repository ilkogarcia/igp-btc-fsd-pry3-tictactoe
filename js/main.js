const showElement = (elementId) => {
    document.getElementById(elementId).style.visibility = 'visible';
}

const hideElement = (elementId) => {
    document.getElementById(elementId).style.visibility = 'hidden';
}

const validateInputText = (elementId) => {
    let a = document.getElementById(elementId).value;
    if ( a == null || a == "") {
        alert("Please fill all required fields!!!");
    }
}
