var readline = require('readline-sync');
var input = readline.question('What phrase would you like to encrypt? ').toLowerCase();
var shift = parseInt(readline.question('How many letters would you like to shift? '));

//calls the function caesarCipher and has two parameters.
function caesarCipher(str, shift) {
  //adjusts the shift from 0 to 25 or 26 characters.
  shift = shift % 26;
  //assigns the split characters to inputArr.
  var inputArr = str.split('');
  // initializes an empty array variable called outputArr.
  var outputArr = [];
  //loops through or iterates through each character of the input string.
  for (var i = 0; i < inputArr.length; i++) {
    //assigns charCode as a variable and assigns each character beginning at 0.
    var charCode = inputArr[i].charCodeAt(0);
    //encrypts lowercase characters.
    if (charCode >= 97 && charCode <= 122) {
      var newCharCode = charCode + shift;
      if (newCharCode > 122) {
        newCharCode = newCharCode - 26;
      }
      //encrypted character is converted back to a string value.
      var newChar = String.fromCharCode(newCharCode);
      outputArr.push(newChar);
    } else {
      outputArr.push(inputArr[i]);
    }
  }
  //joins the encrypted characters.
  var outputStr = outputArr.join('');
  //returns the encrypted string.
  return outputStr;
}

//stores the value of CaesarCipher in encrypted variable.
var encrypted = caesarCipher(input, shift);
//displays the encrypted string.
console.log(encrypted); 