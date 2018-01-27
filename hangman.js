var inquirer = require("inquirer");
var Letter = require('./letter');
var Word = require('./word');


var paintings = new Word(['MONA LISA', 'THE IDLE DANCER', 'GREEN SCENARY']);
var paintings = new Word(['MONA LISA']);
var count = 0;

function guessLetter(){
  if (paintings.gameOver){
    console.log('\nGAME OVER\n');
    return;
  }
    inquirer.prompt([
      {
        type: "input",
        name: "letter",
        message: "Guess a Letter"
      }
    ]).then(function(user){
      var guess = user.letter.toUpperCase();
      paintings.checkWord(guess);
      console.log("\n" + paintings.displayedWord + "\n");
        guessLetter();
    });   
  }
  
 
 function playHangman(){
  inquirer.prompt([
    {
      type: "confirm",
      name: "start",
      message: "Start Playing Hang Man?"
    }
  ]).then(function(userstart) {
      if (userstart.start === true){
        console.log(paintings.displayedWord);
        guessLetter();
      } 
    });
 }

 playHangman();
 





