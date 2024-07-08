//one method to accompish:
function sum(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

//another method to accomplish.
// module.exports.sum = function (a, b) {
//     return a + b;
// }

// module.exports.subtract = function (a, b) {
//     return a - b;
// }


/*
//one method of basically calling functions.
module.exports = { sum: sum,
    subtract: subtract 
};*/

//using es6 method.
module.exports = { sum, subtract };
