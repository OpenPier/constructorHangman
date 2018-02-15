var wordCons = require("./Word.js");
var letterCons = require("./Letter.js");
var inquirer = require("inquirer");
var letterGuessed;
exports.letter;
var array = ["Wave", "Rip", "Current", "Epic", "Hang"];
var random = Math.round(Math.random()*4);
var guessWord = array[random];


var myWord = new wordCons.wordCons(guessWord);
var maxGuesses = 15;

function takeAGuess(){
	console.log(myWord.toString());
	if (myWord.guessesMade.length >= maxGuesses){
		console.log('You have no more guesses. WOMP WOMP.');
	return; //Game over
	}
	inquirer.prompt([{
		name: 'letter',
		type: 'text',
		message: 'Enter a letter:',
		validate: function(str){
//			if (str.length != 1) return false;
			var regEx = new RegExp("^[a-zA-Z\s]{1,1}$");
			return regEx.test(str);
				}
		}]).then(function(letterInput){ //Game control
				var letter = letterInput.letter; 
				myWord.findLetter(letter); //Check
					if(myWord.isComplete()){ 
					console.log('Yes! It was ' + myWord.toString() + '!');
					return; //Winner
					}
				console.log('-------------------\n'); //If we are here the game did not end. Next guess.
				console.log('You have ' + (maxGuesses - myWord.guessesMade.length) + ' guesses left.')
				takeAGuess(); //Recursive call
				}
  );
}


takeAGuess(); //Start Game