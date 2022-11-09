//this is the js file for the project
//create the sounds for the cancel button sound and the confirm button sounds
let cancelSound2 = new Audio();
cancelSound2.src = "cancelSound.m4a";

let databaseToggle = localStorage.getItem("dailyChallengeToggler");
let counter;

//create another variable for the gamePad and get the first game pad connected



//store the value in the database


//daily challenge variables
//declare a variable to check if the daily challenge has been played or not
let playingDailyChallenge = false;
let TRUELY_PLAYING_DAILY_CHALLENGE = false;
//create a variable that keeps track of the current day
var today = new Date();
//create another variable that keeps trakc of the current day
var nextDay = new Date();


localStorage.setItem("dailyChallengeToggler", databaseToggle);
//create a variable that changes value after the daily challenge and convert the string to a number
counter = parseInt(localStorage.getItem("dailyChallengeToggler"));

//set the nextDay variable to the current day and the increment variable (counter)
nextDay.setDate(today.getDate() + counter);
//parse the current day and the next day variable to a format for comparism
var parsedToday = Date.parse(today);
var parsedNextDay = Date.parse(nextDay);


//for you to take the daily challenge then today have to be truely today
//check of today is truely equals to today, if so, the player can take the daily challenge, when the game is over, the counter variable changes
function CHECK_DAILY_CHALLENGE_REQUIREMENT() {
/*    if (parsedToday === parsedNextDay && playingDailyChallenge === true) {
        //user can take the daily challenge
        //console.log("true");
        TRUELY_PLAYING_DAILY_CHALLENGE = true;
    } else {
        //throw an error that the daily challenge is taken already... and return the player to the main menu
        //console.log("false");
        TRUELY_PLAYING_DAILY_CHALLENGE = false;
    }
*/
}

let btnClick2 = new Audio();
btnClick2.src = "click.wav";


//init the sound variable
let mumuManSound = new Audio();
mumuManSound.src = "mumuManSound.mp3";

//init the sudden suspense sound
let suddenSuspense = new Audio();
suddenSuspense.src = "suddenSuspense.mp3";
//ok button sound function
function playBtnSound2() {
    btnClick2.play();
}

//cancel button sound function
function playCancelSound2() {
    cancelSound2.play();
}

//mumu man button sound function

function playMumuSound2() {
    mumuManSound.play();
}

//sudden suspense sound function 

function suddenSuspenseSound2() {
    suddenSuspense.play();
}





//utility function
function removeElement(prams) {
    prams.style.display = "none";
}

function showElement(prams, display) {
    prams.style.display = display;
}



//the mode changes by itself pending on the time the user is playing the game


//when the hour is less than 18 (3 o'clock)

/*condition*/
let clock = new Date();
let hour = clock.getHours();

let modes = ["dayMode.png", "nightMode.png"];

//the default mode is daymode
let frame = 0;
let logoFrame = 0;
//it is daymode by default
let toggleMode = true;
let timeCheck = 18;
//get the game logo
let gameLogo = document.getElementById("gameLogo");

let gameContainer = document.getElementsByClassName("container")[0];
let refreshDailyChallenge = false;
let container = document.getElementById("container");

//create an array for the two game logos
let gameLogoArray = [
    "logoDayMode.png",
    "logoNightMode.png"
];
//modeToggle is the id for the div in html

if (hour > timeCheck) {
    toggleMode = false;


} else {
    toggleMode = true;
    refreshDailyChallenge = true;
}
function changeMode() {
    //remove the id property from the elements
    container.id = " ";
    document.body.id = " ";
    if (toggleMode == true) {
        modeToggleBtn.src = modes[frame];

        //daymode function
        toggleMode = false;
        dayMode();
        //since the mode is day mode then we use the black game logo
        gameLogo.src= gameLogoArray[logoFrame];
    } else {
        modeToggleBtn.src = modes[frame + 1];

        //nightmode function
        nightMode();
        //since the mode is night mode, then the game logo should be white

        gameLogo.src = gameLogoArray[logoFrame + 1];
        toggleMode = true;
    }
}


modeToggle.addEventListener("click", () => {
    changeMode();

});

//changeMode();
function dayMode() {
    //set the background to a light color and the text to a dark color
    document.body.style.color = "black";
    document.body.style.background = "white";
    gameContainer.style.background = "lightblue";
    gameContainer.style.color = "black";
    score.style.color = "black";

    //change the image indicating the current game mode
    modeToggleBtn.src = modes[frame];

    //change the border radius
    gameContainer.style.borderRadius = "10px";
}


function nightMode() {

    //set the background to a dark color and the text to a white color
    document.body.style.color = "white";
    document.body.style.background = "black";
    gameContainer.style.color = "white";
    gameContainer.style.background = "black";
    score.style.color = "white";
    gameContainer.style.border = "2px solid  white";


    //change the image indicating the current game mode
    modeToggleBtn.src = modes[frame + 1];

    //change the border radius
    gameContainer.style.borderRadius = "10px";
}

const highScoreFromDatabase = localStorage.getItem("NigerFlappyBirdHighScore2") || "0";
highScore.addEventListener("click", () => {
    swal.fire({
        title: highScoreFromDatabase,
        text: `Your Highscore Is ${highScoreFromDatabase}`,
        allowOutsideClick: false,
        showCancelButton: true,
        showCloseButton: false,
        cancelButtonColor: "tomato",
        cancelButtonText: "Reset Highscore",
        allowEnterKey: false

    }).then((willProceed) => {
        if (willProceed.isConfirmed) {
            playBtnSound2();
        } else {
            playCancelSound2();
        }
	
	
     if (willProceed.isDismissed) {
            swal.fire({
                title: "Reset Highscore ?",
                icon: "warning",
                allowOutsideClick: false,
                showCancelButton: true,
                showCloseButton: true,
                cancelButtonColor: "tomato",
                confirmButtonText: "Reset",
               
                allowEnterKey: false
            }).then((willProceed) => {
                if (willProceed.isConfirmed) {
                    localStorage.removeItem("NigerFlappyBirdHighScore2");
                    swal.fire({
                        title: "Highscore Reset",
                        icon: "success",
                        allowOutsideClick: false,
                        showCancelButton: true,
                        cancelButtonColor: "tomato",
                        confirmButtonText: "Ok",
                        allowEnterKey: false
                    });
		          // location.reload();
                }
            })
        }


    })
});



let dailyChallengeMsg="coming soon...";
//check if the dailyChallenge button was clicked
dailyChallenge.addEventListener("click", () => {
    
    playBtnSound2();
    swal.fire({
        title:"Coming Soon",
        icon:"info",
        allowOutsideClick: false,
        confirmButtonColor:"dodgerblue",
        allowEnterKey: false
    })
});



aboutUs.addEventListener("click", () => {
    //navigate the user to the about use page
    location.href = "about.html";
});



//loop through all the classes with the value of clickable

const buttonsClickable = document.getElementsByClassName("clickable");
const buttonSound = new Audio();
buttonSound.src = "click.wav";

//loop through the buttons

for (let i = 0; i < buttonsClickable.length; i++) {
    //check if any of the buttons with clickable classname was clicked
    buttonsClickable[i].addEventListener("click", () => {
        //play the clickable buttons sound if the player clicks on any of the clickable button object
        buttonSound.play();
    });
}