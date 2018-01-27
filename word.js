//import Letter constructor
var Letter = require('./letter');


function Word(arrOfWords) {
  // The word to display to the user
  this.displayedWord = '';
  // The letters from the random word that contain the logic for whether they have been guessed or not
  this.letters = [];
  // the array of all the words that we are playing the game with
  this.arrOfWords = arrOfWords;
  // the list of letters that have been incorrectly guessed, later displayed to the user
  this.lettersGuessedIncorrectly = [];
  this.gameOver = false;



  // the function to pick a random word out of our word array
  this.pickWord = function () {
    var index = Math.floor(Math.random() * this.arrOfWords.length);
    var randomWord = this.arrOfWords[index];
    // remove the random word from the array so it's not chosen again
    this.arrOfWords.splice(index, 1);
    this.randomWord = randomWord;
    this.remainingGuesses = 6;
    this.letters = [];
  }

  // Sets the Letters into the Letter array
  this.initializeWord = function () {
    for (var i = 0; i < this.randomWord.length; i++) {
      // get each letter for the current word to be guessed
      var currentLetter = new Letter(this.randomWord[i]);
      this.letters.push(currentLetter);
      // 
    }
    this.setDisplay();
  }

  // Sets the letters to display
  this.setDisplay = function () {
    this.displayedWord = '';
    for (var i = 0; i < this.letters.length; i++) {
      var letterToDisplay = this.letters[i].display;
      this.displayedWord += letterToDisplay;
    }
  }

  this.guessWord = function (){
    if (this.displayedWord === this.randomWord || this.remainingGuesses <= 0){
        if (typeof this.arrOfWords !== 'undefined' && this.arrOfWords.length > 0){
          if (this.remainingGuesses > 0){
            console.log("You Have Guessed The Word, Next Word");
          }else{
            console.log("No More Remaining Guesses, Next Word!")
          }
          this.pickWord();
          this.initializeWord();
        }else{
          if (this.displayedWord === this.randomWord){
            console.log("\nCorrect Guess! Game Over\n");
          }else{
            console.log("\nDid Not Guess The Word!  Game Over\n");
          }
          this.gameOver = true;
        }
    }
  }


  // function to check the word against the letter being guessed

  this.checkWord = function (letterGuessed) {
    var letterMatched = false;
    for (var i = 0; i < this.letters.length; i++) {
      var currentLetter = this.letters[i];
      // run checkletter function against each letter, if match, Letter.letterGuessedCorrectly is set to true
      currentLetter.checkLetter(letterGuessed);

      //check if the letter has been guessed correctly, and letter is not a space, and the letter was not previous run through the checkLetter function before.
      if (currentLetter.letterGuessedCorrectly && !currentLetter.space && !currentLetter.letterAlreadyChecked) {
        letterMatched = true;
      }
    }
    // If the letterMatched is false, that means the letter guessed which has been tested on every letter of the word is incorrect. Decrement the remaining guesses, and push the letter into the array of letters that were guessed incorrectly
    
    if (!letterMatched) {
      this.remainingGuesses--;
      this.lettersGuessedIncorrectly.push(letterGuessed);
      console.log("Incorrect Guessed " + this.remainingGuesses + " Gueses Before Your Hanged!!\n");
    } else {
      // if the letter has matched at any point, that means that the displayed word has also changed, so we run setDisplay() to recreate that string from our letter constructors
        this.setDisplay();
      }
    this.guessWord();
  }
  


  this.pickWord();
  this.initializeWord();
}

module.exports = Word;