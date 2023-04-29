// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {
    // Create Span
    let span = document.createElement("span");

    // Create Letter Text Node
    let theLetter = document.createTextNode(letter);

    // Append The Letter To Span
    span.appendChild(theLetter);

    // Add Class On Span
    span.className = "letter-box";

    // Append Span To The Letters Container
    lettersContainer.appendChild(span);

});

// Object Of Words + Categories
const Words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestinge", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    pepole: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma", "Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

// Get Random Property

let allKeys = Object.keys(Words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// Category
let randomPropName = allKeys[randomPropNumber];
// Category Words
let randomPropValue = Words[randomPropName];
// Random /number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Creat Spans Depend On Word
lettersAndSpace.forEach(letter => {
    // Create Empty Span
    let emptySpan = document.createElement("span");

    // If letter Is Space
    if (letter === ' ') {
        // Add Class To The Span
        emptySpan.className = "with-space";
    }

    // Append Span To The letters Guess Container
    lettersGuessContainer.appendChild(emptySpan);
});


// select Guess Span
let guessSpan = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");


// Handel Clicking On Letters
document.addEventListener("click", (e) => {
    
        // set The Choose Status
        let theStatus = false;
        
    if (e.target.className === "letter-box"){
        e.target.classList.add("clicked");

        // Get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        // The Chosen Word
        let theChosenWord = Array.from(randomValueValue.toLowerCase()); 

        // console.log(lettersAndSpace);

        theChosenWord.forEach((wordLetter, wordIndex) => {

            //If The Clicked Letter Equal To One Of The Chosen Word Letter
            if(theClickedLetter == wordLetter) {
                
                // set Status To Correct
                theStatus = true;

                // Loop On All Guess Spans
                guessSpan.forEach((span, spanIndex) =>{

                    if(wordIndex === spanIndex){
                        span.innerHTML = theClickedLetter;
                    }
                });
            }
        });
        // Outside Loop
        
        // If Letter Is Wrong
        if (theStatus !== true) {
            
            // Tncrease The Wrong Attempts
            wrongAttempts++;

            // Add Class Wrong On The Draw Element
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            // Play Fail Sound
            document.getElementById("fail").play();

            if (wrongAttempts === 8) {

                endGame();

                lettersContainer.classList.add("finished");

            }

        } else {

            // Play Success Sound
            document.getElementById("success").play();

        }
    }
});

// End Game Function
function endGame () {

    // creat Popup Div
    let div = document.createElement("div");

    // Create Text
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);

    // Append Text To Div
    div.appendChild(divText);

    // Add Class On Div
    div.className = "popup";

    // Append To The Body
    document.body.appendChild(div);

}