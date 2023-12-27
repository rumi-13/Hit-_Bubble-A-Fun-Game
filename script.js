// Selecting the bubble container 
let bubbleContainer = document.querySelector("#bubble-container");


// Function to create bubbles with random numbers
function createBubble() {
    // Get the container dimensions
    let containerWidth = bubbleContainer.clientWidth;
    let containerHeight = bubbleContainer.clientHeight;

    // Define the size of each bubble
    let bubbleSize = 35;

    // Calculate the number of rows and columns based on container size and bubble size
    let numColumns = Math.floor(containerWidth / bubbleSize);
    let numRows = Math.floor(containerHeight / bubbleSize);

    let bubbleHTML = "";

    // Generate HTML for bubbles with random numbers
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numColumns; col++) {
            let random = Math.floor(Math.random() * 10);
            let leftPosition = col * bubbleSize;
            let topPosition = row * bubbleSize;

            bubbleHTML += `<div class="bubble" style="left:${leftPosition}px; top:${topPosition}px;">${random}</div>`;
        }
    }

    // Set the generated HTML to the bubble container
    bubbleContainer.innerHTML = bubbleHTML;
}

// Initializing the bubble creation
createBubble();

// Function to handle the game timer
function timerClock() {
    let timer = 60;

    let timerInterval = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timer").innerHTML = timer;
        } else {
            clearInterval(timerInterval);

            // Styling for the Game Over message and score display
            bubbleContainer.innerHTML = `
                <div id="resultWrapper" style="display: flex; flex-direction: column; align-items: center;">
                    <img src="https://pngfre.com/wp-content/uploads/cat-95-1024x985.png" alt="Game Over Image" style="width: 300px; height: 300px; margin-bottom: 5px;">
                    <h1 style="font-family: 'Dancing Script', cursive; color: linear-gradient(45deg, #2196F3, #64B5F6); text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); margin-bottom: 20px;">Game Over</h1>
                    <h1 style="font-family: 'Dancing Script', cursive; color: linear-gradient(45deg, #2196F3, #64B5F6); text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8); margin-bottom: 20px;">Your Score = ${score}</h1>
                </div>`;
        }
    }, 1000);
}

// Initializing the game timer

// Variable to store a random number for the hit box
let randomHit = 0;

// Function to update the hit box with a random number
function updateHitBox() {
    randomHit = Math.floor(Math.random() * 10);
    document.querySelector("#hitBox").textContent = randomHit;
}

// Initializing the hit box update
updateHitBox();

// Variable to store Score
let score = 0;
// Function to update and display the player's score
function playerScore() {
    score = score + 10;
    document.querySelector("#scoreBox").textContent = score;
}

// Initializing the player's score
playerScore();

// Event listener for bubble clicks
bubbleContainer.addEventListener('click', function (details) {
    var clickedBubble = Number(details.target.textContent);
    if (clickedBubble === randomHit) {
        playerScore();
        createBubble();
        updateHitBox();
    }
});

// GSAP animation timeline
var tl = gsap.timeline();

// Animation for the launcher heading
gsap.to("#launcher h1", {
    y: "-20vh",
    duration: 1.5,
    scale: 0.9,
});

// Animation for launcher elements
tl.to(".launcher-elem", {
    y: "0",
    duration: 1.5,
    delay: 0.2,
    stagger: 0.3,
    scrub: 2,
});

tl.to("#launcher-btn", {
    y: "0",
    duration: 0.5,
    scrub: 2,
});

// Selecting the start button and adding an event listener
const startButton = document.querySelector("#launcher button");
startButton.addEventListener('click', function () {
    // Animation to hide the launcher
    tl.to("#launcher", {
        top: "-100vh",
        delay: 0.3,
        duration: 1,
        onComplete: function(){
            timerClock();
        }
    });
});
