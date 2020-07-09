const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// keep track of flipped over cards with array
let flippedCards = [];
// keep track of how many pairs are found
let matchCounter = 0;
// track the number of clicks
let clickCounter = 0;

let winningBody = document.querySelector('body');
let matches = document.querySelector("#matches");

// TODO: Implement this function!
function handleCardClick(event) {
  clickCounter++;
  // you can use event.target to see which element was clicked
  event.target.style.backgroundColor = event.target.classList;
  event.target.style.pointerEvents = "none";
  flippedCards.push(event.target);
  console.log(flippedCards)

  if (flippedCards.length == 2){
    // add a remove of event here or handle a pause of clicking
    gameContainer.style.pointerEvents = "none";
    // check flipped cards to see if they are the same
    if(flippedCards[1].className == flippedCards[0].className){
      matchCounter++;
      if (matchCounter == 5) {
        setTimeout(function(){
          alert("You Win!");
          winningBody.style.backgroundColor = "black";
          winningBody.style.color = "white";
          matches.innerText = "5";
        }, 200)
        return;
      }
      setTimeout(function(){
        matches.innerText = matchCounter;
      }, 200);
      //reset the flipped cards array
      flippedCards = [];
      gameContainer.style.pointerEvents = "auto";
    } else {
      setTimeout(function(){
        console.log(flippedCards);
        flippedCards[0].style.backgroundColor = "";
        flippedCards[1].style.backgroundColor = "";
        flippedCards[0].style.pointerEvents = "auto";
        flippedCards[1].style.pointerEvents = "auto";
        gameContainer.style.pointerEvents = "auto";
        //reset the flipped cards array
        flippedCards = [];
      }, 1000);
      
    }
    
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
