//one method to use.
//const { sum, subtract } = require("./math.js");

//another method use.
// const sum = require("./math").sum
// console.log(sum(20, 20)); //40

// const subtract = require("./math").subtract
// console.log(subtract(30, 10)) //20

//we can also do this as follows:
//  console.log( require("./math").subtract(40, 20)) //20
//  console.log( require("./math").sum(20, 20)) //40

const sum = require("./math.js");
const { multiply, setFactor } = require('./math2.js');
const User =  require("./user.js");


console.log(multiply(10)) //20

setFactor(10) //assigns 10 as the factor.

console.log(multiply(10)) //100

console.log(new User('steve', 25))
