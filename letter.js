function Letter (letter){
  this.display = '_ ';
  this.letterGuessedCorrectly = false;
  this.letter = letter;
  this.letterAlreadyChecked = false;


// in the event that a space is passed into the letter, then specify that this letter is correctly guessed
if (letter === " ") {
  this.letterGuessedCorrectly = true;
  this.display = letter;
  this.space = true;
} else {
  this.space = false;
}

 // check the letter and if it's correct, then set the letter to be displayed
 this.checkLetter = function(letterGuessed){
  //check if the letter has already run through this function and if it has, return
  if (this.letterGuessedCorrectly === true && !this.space) {
    this.letterAlreadyChecked = true;
    return;
  }
  if (letterGuessed === this.letter && !this.space){
    this.letterGuessedCorrectly = true;
    this.display = this.letter;
  }
}
}

//export our Letter constructor
module.exports = Letter;