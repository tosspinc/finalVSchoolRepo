//this is the revealing module pattern.
//this reveals specific modules and keeps other private.

//variable factor can not be changed.
//const factor = 2;

//variable factor can be changed.
let factor = 2;

function multiply(num) {
    return num * factor
}

function setFactor(newFactor) {
    factor = newFactor;
}

module.exports = { multiply, setFactor }; 