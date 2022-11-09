/*Powered by EmmySoft Game Studios
Game Built For Fun, Filled With Comedy Effects
A 2d Niger Flappy Bird Game
PRODUCED BY EMMYSOFT GAMES EG GAMES, DEVELOPED BY ADEDOYIN EMMANUEL
COPYRIGHT RESERVED
A PRODUCT OF EMMYSOFT STUDIOS
*/
/*

            

        #######         ##
        #              #  #
        #             #    #
        #            #      #
        #######     #  ####  #
        #          #          #
        #         #            #
        #        #              #
        ####### #                #

*/

const ctx = canvas.getContext("2d");
const cancelSound = new Audio();
cancelSound.src = "cancelSound.m4a";

//game area coords
let gameAreaX = canvas.width / 2;
let gameAreaY = canvas.height / 2;


const btnClick = new Audio();
btnClick.src = "click.wav";

//game pad connection
let gamePad;

let playingNeutralGame = false;

//utlis
function playBtnSound() {
    btnClick.play();
}

function playCancelSound() {
    cancelSound.play();
}

function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hideElem(prams) {
    prams.style.display = "none";
}

//reset the game mode depending on the type of mode the user wants
function resetToggle(mode) {
    //check the mode the user wants
    switch (mode) {
        case "day":
           
            modeToggleBtn.src = modes[frame];
            dayMode();
            break;

        case "night":
            
            modeToggleBtn.src = modes[frame + 1];
            nightMode();
            break;


          
        default:
            return;

    }
}

function showElem(prams, style) {
    prams.style.display = style;
}




function flexAll(prams) {
    prams.style.display = "flex";
    prams.style.alignItems = "center";
    prams.style.justifyContent = "center";
}

//create a function that plays random sounds


function randomSound(soundArray) {
    return soundArray[Math.floor(Math.random() * soundArray.length)];
}

//create a function that returns a random image

function randomImage(imageArray) {
    return imageArray[Math.floor(Math.random() * imageArray.length)];
}

//game setUP function
function gameSetup() {
    //remove the level UI
    hideElem(container);
    //display the game UI
    showElem(canvas, "block");
    showElem(scoreBox, "flex");
    showElem(score, "flex");
    
    //reset the game Theme
    resetToggle("night");
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    //invert the playing game variable
    playingGame = true;
    endGame = false;
    playingNeutralGame = true;




}

//collision detection function
function gameObjectColliding(object1, object2) {
    return !(
        object1.x > object2.x + object2.width ||
        object1.x + object1.width < object2.x ||
        object1.y > object2.y + object2.height ||
        object1.y + object1.height < object2.y
    );
}



//create a function to play the replay button sound
function playRestartSound() {
    let replaySound = new Audio();

    replaySound.src = "restartBtnSound.mp3",

    //play the sound
    replaySound.play();

}

//custom function to give messsages
function THROW_CUSTOM_MESSAGE(title, body, timer, icon, resolve, reject) {
    this.title = title;
    this.body = body;
    this.icon = "";
    this.timer = timer;
    this.resolve = resolve;
    this.reject = reject;


    //check if the arguments are correct and complete else returns error
    try {
        if (typeof this.title == undefined || typeof this.body == undefined || typeof this.timer == undefined || typeof this.icon == undefined) {
            throw new Error("Arguments Must Be Complete");
        }
    } catch (error) {
        (error.stack);

    }

    swal.fire({
        title: this.title,
        text: this.body,
        icon: this.icon,
        timer: this.timer,
        showCancelButton: true,
        showCloseButton: true,
        cancelButtonColor: "tomato",
        allowOutsideClick: false

    }).then((willProceed) => {
        if (willProceed.isConfirmed) {
            this.resolve();
            playBtnSound();
        } else {
            this.reject();
            playCancelSound();
        }
    })


}

//create the highScore function 
function changeHighScore() {
    if (scoreValue > localStorage.getItem("NigerFlappyBirdHighScore2")) {
        brokenHighScore = true;
        localStorage.setItem("NigerFlappyBirdHighScore2", scoreValue);
        highScore = scoreValue;
        highScoreMsg = "Your Current HighScore Is " + highScore;
    }
}

//a function to setup the game
function quickPlay() {
    gameSetup();
}



//event listeners
addEventListener("load", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});


addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

//variables initialization
var playingGame = false,
    playingLevelOne = false,
    playingLevelTwo = false,
    playingLevelThree = false,
    playingLevelFour = false,
    playingLevelFive = false,
    playingLevelSix = false,
    playingLevelSeven = false,
    playingLevelEight = false,
    playingLevelNine = false,
    playingLevelTen = false,
    playingLevelEleven = false,
    playingLevelTwelve = false;
let gameSpeed = 3;
let levelIncrementor = 0;
let scoreTimer = 1000;
let scoreValue = 0;
let gamePaused = false;
let obstacleSpeedMod = 1.2;



//create a function to setup the daily challenge game


//create the highscore variable
let highScore = localStorage.getItem("NigerFlappyBirdHighScore2") || 0;

//create the variable to modify the gameDiffficulty
let GAME_DIFFICULTY = randomNumber(1500, 1000);

//set the variable to check if the player is colliding with any game object
let playerCollideWithPlane = false;
let playerCollideWithObstacle = false;
let playerCrashCollision = false;
let playerFlyTooHigh=false;


//for now that's the only game object in the scene

let spawnPlaneFrame = randomNumber(800, 500);

//the first background picture is 1
let bgFrame = randomNumber(11, 0);
let endGame = false;
let templateMsg = "Play Level ";

//create several variables to store the different audio files directories in

let FAILURE_SOUND_ARRAY = [
    "eShockYouSound.mp3",
    "youAreAFailureSound.mp3",
    "coffinDance.mp3",
    "mumuManSound.mp3",
    "failureLaugh.mp3",
    "laugh.mp3",
    "funke.mp3",
    "chai.mp3",
    "crazyLaugh.mp3"


];


//store the bg sounds in an array
let BG_GUI_SONG = [
    "bgSong (1).mp3",
    "bgSong (2).mp3"
];

//sudden suspense sound
let SUDDEN_SUSPENSE_ARRAY = [
    "suspense1.mp3",
    "suspense2.mp3",
    "suspense3.mp3",
    "suddenSuspense.mp3",
    "scratch.mp3"
];

//warning game meme sound

let WARNING_SOUNDS_ARRAY = [
    "suddenSuspense.mp3"
];


//create the bg array

let BACKGROUND_PIC_ARRAY = [
    "bg 1.png",
    "bg 2.png",
    "bg 3.png",
    "bg 4.png",
    "bg 5.png",
    "bg 6.png",
    "bg 7.png",
    "bg 8.png",
    "bg 9.png",
    "bg 10.png",
    "bg 11.png",
    "bg 12.png",
];


//create an array that stores the night mode images
let NIGHT_MODE_BACKGROUND_ARRAY = [
    "bg 2.png",
    "bg 6.png",
    "bg 7.png",
    "bg 8.png",
    "bg 9.png",
    "bg 10.png",
    "bg 11.png"

];


//create an array that stores the daymode images

const DAY_MODE_BACKGROUND_ARRAY = [
    "bg 1.png",
    "bg 3.png",
    "bg 4.png",
    "bg 5.png",
    "bg 12.png",

];








//create the audio variable to play in the background

var gameGUI_BG = new Audio();
gameGUI_BG.src = randomSound(BG_GUI_SONG);




//create the quick play game function
function quickGame() {
    //the quick game is played without signing into the game account
    gameSetup();
}
//check for the level clicks


levelOne.addEventListener("click", () => {

    THROW_CUSTOM_MESSAGE(1, templateMsg + "One?", 0, "question", () => {

        playingLevelOne = true;

        //if playing levelOne
        if (playingLevelOne) {
            /*start level one*/
            //init the game speed
            gameSpeed = 3;
            gameSetup();
            //call the init and animate function
            init();
            animate(0);
        }

    }, () => {
        return;
    });

});


//level two

levelTwo.addEventListener("click", () => {

    THROW_CUSTOM_MESSAGE(2, templateMsg + "Two?", 0, "question", () => {

        /*start level two*/
        //init the gameSpeed
        gameSpeed = 8;
        gameSetup();
        //call the init and animate function
        init();
        animate(0);

    }, () => {
        return;
    });

});


levelThree.addEventListener("click", () => {

    THROW_CUSTOM_MESSAGE(3, templateMsg + "Three?", 0, "question", () => {

        /*start level three*/

        gameSetup();
        //init the game speed
        gameSpeed = 9;
        //call the init and animate function
        init();
        animate(0);

    }, () => {
        return;
    });

});

//level four
levelFour.addEventListener("click", () => {

    THROW_CUSTOM_MESSAGE(4, templateMsg + "Four?", 0, "question", () => {

        /*start level four*/
        gameSetup();
        //init the game speed
        gameSpeed = 10;
        //call the init and animate function
        init();
        animate(0);

    }, () => {
        return;
    });

});



//level five
levelFive.addEventListener("click", () => {

    THROW_CUSTOM_MESSAGE(5, templateMsg + "Five?", 0, "question", () => {

        /*start level five*/
        gameSetup();
        gameSpeed = 11;

        //call the init and animate function
        init();
        animate(0);

    }, () => {
        return;
    });

});

//level six
levelSix.addEventListener("click", () => {

    THROW_CUSTOM_MESSAGE(6, templateMsg + "Six?", 0, "question", () => {

        /*start level six*/
        gameSetup();
        //init the game speed
        gameSpeed = 12;
        //call the init and animate function
        init();
        animate(0);
    }, () => {
        return;
    });

});

//level seven
levelSeven.addEventListener("click", () => {

    THROW_CUSTOM_MESSAGE(7, templateMsg + "Seven?", 0, "question", () => {

        /*start level seven*/
        gameSetup();
        //init the game speed
        gameSpeed = 13;
        //call the init and animate function
        init();
        animate(0);
    }, () => {
        return;
    });

});


//level eight

levelEight.addEventListener("click", () => {

    THROW_CUSTOM_MESSAGE(8, templateMsg + "Eight?", 0, "question", () => {

        /*start level eight*/
        gameSetup();
        //init the game speed
        gameSpeed = 14;
        //call the init and animate function
        init();
        animate(0);
    }, () => {
        return;
    });

});


//level nine

levelNine.addEventListener("click", () => {

    THROW_CUSTOM_MESSAGE(9, templateMsg + "Nine?", 0, "question", () => {

        /*start level nine*/
        gameSetup();
        //init the game speed
        gameSpeed = 15;
        //call the init and animate function
        init();
        animate(0);
    }, () => {
        return;
    });

});

//level ten
levelTen.addEventListener("click", () => {

    THROW_CUSTOM_MESSAGE(10, templateMsg + "Ten?", 0, "question", () => {

        /*start level ten*/
        gameSetup();
        //init the game speed
        gameSpeed = 16;
        //call the init and animate function
        init();
        animate(0);
    }, () => {
        return;
    });

});



//level eleven
levelEleven.addEventListener("click", () => {

    THROW_CUSTOM_MESSAGE(11, templateMsg + "Eleven?", 0, "question", () => {

        /*start level eleven*/
        gameSetup();
        //init the game speed
        gameSpeed = 17;
        //call the init and animate function
        init();
        animate(0);
    }, () => {
        return;
    });

});

//level twelve
levelTwelve.addEventListener("click", () => {

    THROW_CUSTOM_MESSAGE(12, templateMsg + "Twelve?", 0, "question", () => {

        /*start level twelve*/
        gameSetup();
        //init the game speed
        gameSpeed = 18;
        //call the init and animate function
        init();
        animate(0);
    }, () => {
        return;
    });

});

//game variables
let animateId;
let background;
let obstacles;

let harderLevelMultipler = 0;
let worldFrame = 0;
let randomFrame = randomNumber(400, 100);
let player;
let amp;

let planes;
let playingDayMode = false;
let playingNightMode = false;
let quickPlayBtn = document.getElementById("quickPlay");

//create the game background sound
let bgSound = new Audio();

//create the bg random sounds array
let BG_SOUND_ARRAY = [
    "song (3).mp3",
    "song (5).mp3",
    "song (6).mp3",
    "song (7).mp3",
    "song (8).mp3",
    "song (9).mp3",
    "bgSound2.mp3"
   
];



quickPlayBtn.addEventListener("click", () => {
    swal.fire({
        title: "Quick Game",
        text: "Night Mode, Or Day Mode?",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Day Mode",

        cancelButtonText: "Night Mode",
        cancelButtonColor: "gray",
        confirmButtonColor: "dodgerblue"
    }).then((willProceed) => {
        if (willProceed.isConfirmed) {
            playBtnSound();
            //call the daymode quick play function
            //we reset the toggle mode to dayMode
            resetToggle("day");
            //set the boolean value to true
            playingDayMode = true;
            playingNeutralGame = false;
            //call the daymode levels
            dayModeLevels();


        } else if (willProceed.isDismissed) {
            playBtnSound();
            playingNightMode = true;
            playingNeutralGame = false;
            //toggle the nightmode 
            resetToggle("night");
            //call the nightmode levels
            nightModeLevels();

        } else {
            //the user clicked the cancel button
            playCancelSound();

        }

    })
})



class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.gameSpeed = gameSpeed;
        this.flying = false;
        this.dead = false;
        this.width = 50;
        this.height = 50;
        this.move = {
            up: false,
            down: true
        };


        this.velocity = {
            dx: 0,
            dy: 0
        };


        this.state = ["flying", "static", "dead"];
        this.flyingState = [
            "f1.png",
            "f2.png",
            "f3.png",
            "f4.png",
            "f5.png",
            "f6.png"
        ];

        this.decendingState = [
            "f7.png",
            "f8.png",
            "f9.png"
        ];

        this.idle = ["f1.png"];
        this.deadFrame = ["f10.png"];
        this.image = new Image();
        this.idleDefault = true;
        this.defaultImage = this.idle[0];
        this.px = "px";

        //create the properties for the ascending frame
        this.MIN_ASCENDING_FRAME = 2;
        this.MAX_ASCENDING_FRAME = 5;
        this.MAX_FRAME_ASCENDING = 6;

        //create the properties for the descending frame
        this.MIN_DESCENDING_FRAME = 7;
        this.MAX_DESCENDING_FRAME = 2;
        this.MAX_FRAME_DESCENDING = 3;
        this.png = ".png";
        this.gravity = 1;
        this.friction = 0.99;
        this.ascendingFrame = 2;
        this.descendingFrame = 7;
        this.defaultFrame = 0;

        //if the player moves down then it is game over



        this.moveY = () => {
            this.y = this.y += this.velocity.dy;
        }
        this.draw = () => {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        //create the destroy method
        this.destroy = () => {
            //the player is dead
            this.image.src = this.idle[this.defaultFrame];

        }


        //add event listener to the bird

        addEventListener("keydown", (e) => {

            switch (e.keyCode) {


                //the bird moves up when the user presses the up arrow button
                case 38:
                    this.move.up = true;
                    this.velocity.dy = -(this.gameSpeed / 2)*1.2;
                    break;
                default:
                    return;

            }


        });


        addEventListener("keyup", (e) => {

            switch (e.keyCode) {



               //the bird moves up when the user presses the up button

                case 38:
                    this.move.up = false;
                    break;

                default:
                    return;

            }

        })

        //check for gamePad connection

        this.update = () => {

            //check if the player then call the destroy method
            if (this.dead == true) {
                this.destroy();
            }

            //get the first gamePad in the gamePad Array

            gamePad = navigator.getGamepads()[0];



            //return would cause the player not to draw on the game area
            //if(!gamePad) return;

            //if the game pad is connected then init the gamePad properties
            if (gamePad) {

                this.leftStickYawHor = gamePad.axes[0];
                this.leftStickYawVer = gamePad.axes[1];

                this.rightStickYawVer = gamePad.axes[2];
                this.rightStickYawHor = gamePad.axes[5];


                this.resolvedLeftHorYaw = (this.leftStickYawHor + 1) / 2;
                this.resolvedLeftVerYaw = (this.leftStickYawVer + 1) / 2;

                this.resolvedRightHorYaw = (this.rightStickYawHor + 1) / 2;
                this.resolvedRightVerYaw = (this.rightStickYawVer + 1) / 2;




                //axes index 0 is left analogue rightward and leftward yaw
                //axes index 1 is left analogue upward and downward yaw
                //axes index 2 is right analogue upward and downward yaw
                //axes index 3 is 0  
                //axes index 4 is 0
                //axes index 5 id right analogue upward and downward yaw



                //player moves up on the left pad axis, change the player's current positon
                if (this.resolvedLeftVerYaw == 0) {

                    this.move.up = true;
                    this.velocity.dy = -this.gameSpeed / 2;

                }

                if (this.resolvedLeftVerYaw == 1) {
                    this.move.up = false;
                }

                //player moves up on the right pad axis change the player's current position
                if (this.resolvedRightVerYaw == 0) {

                    this.move.up = true;
                    this.velocity.dy = -this.gameSpeed / 2;
                }

                if (this.resolvedRightVerYaw == 1) {
                    this.move.up = false;
                }

            }

            if (this.move.up) {
                // this.image.src=this.defaultImage; 
                for (let i = this.defaultFrame; i < this.MAX_FRAME_ASCENDING; i++) {
                    this.ascendingFrame = i;
                    this.templateImageAsc = this.flyingState[i]
                    this.image.src = this.templateImageAsc;

                    //check if the bird flying frame is more than the max frame

                    if (i >= this.MAX_FRAME_ASCENDING) {
                        //reset the frame count back to its initial value
                        i = this.defaultFrame;
                    }

                }
            }
            if (this.move.up == false) {
                //if the bird isn't moving up, then add gravity and pull it down

                this.velocity.dy += this.gravity;
                for (let k = this.defaultFrame; k < this.MAX_FRAME_DESCENDING; k++) {
                    this.descendingFrame = k;
                    this.templateFrameDes = this.decendingState[k];
                    this.image.src = this.templateFrameDes;

                    if (this.descendingFrame >= this.MAX_FRAME_DESCENDING) {
                        //reset the frame count to its initial value
                        this.descendingFrame = this.defaultFrame;
                    }
                }

            }
            this.moveY();
            this.draw();
        }
    }
}



class Obstacle {
    constructor(x, y, height,frame){
        this.y = y;
        this.x = x;
        this.gameSpeed = gameSpeed * obstacleSpeedMod;


        this.width = 64;
        this.height = height;
        this.leftScreen = false;

        this.image = new Image();
       
        this.velocity = {
            dx: this.gameSpeed,
            dy: this.gameSpeed
        };

        this.frame = frame;

       

        this.imageArray = ["pipeObstacle.png", "rotatedObstacle.png"];

        this.state = {
            up: this.imageArray[this.frame],
            down: this.imageArray[this.frame]
        };



        this.destroy = () => {
            
            this.leftScreen = true;
        }

       

        this.draw = () => {
            this.image.src = this.imageArray[this.frame];

            ctx.save();

            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.restore();
        }

        this.update = () => {
            
            this.draw();
            
            this.x += -this.velocity.dx;

            if (this.x + this.width + this.velocity.dx < 0) {
               
                this.destroy();
            }
        }



    }
}

class Background {
    constructor(imgArray) {
        this.x = 0;
        this.y = 0;
        this.width = innerWidth;
        this.height = innerHeight;
        this.imgArray = imgArray;

        this.image = new Image();

        this.draw = () => {
            this.image.src = this.imgArray;
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        this.update = () => {
            this.draw();
        }
    }

}




function init() {
    player = new Player(canvas.width / 3, canvas.height / 2);
    obstacles = [];

    if (playingNeutralGame) {
        background = new Background(BACKGROUND_PIC_ARRAY[bgFrame]);
    }

    if (playingNightMode) {
        background = new Background(randomImage(NIGHT_MODE_BACKGROUND_ARRAY));
    }



    if (playingDayMode) {
        background = new Background(randomImage(DAY_MODE_BACKGROUND_ARRAY));
    }



  
}

let tinestGap;


//obstacles spawning

const MIN_HEIGHT = 270;
const MAX_HEIGHT = 350;

const MAX_GAP = 100;
const MIN_GAP = 50;



function spawnObstacles() {
   
        let obstacleHeight = randomNumber(MAX_HEIGHT,MIN_HEIGHT);
        let gap = randomNumber(MAX_GAP,MIN_GAP);

        let obstacleXCoord = canvas.width;
        let obstacleYCoord = 0;
        
        obstacles.push(new Obstacle(obstacleXCoord, obstacleYCoord, obstacleHeight,1));
        obstacles.push(new Obstacle(obstacleXCoord, 200, 600));


}




function SET_UP_DAY_MODE_QUICK_GAME() {
    //remove the level UI
    hideElem(container);
    //display the game UI
    showElem(canvas, "block");
   
    showElem(scoreBox, "flex");
    showElem(score, "flex");
   
    //init the game width and height
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    //invert the playing game variable
    playingGame = true;


    init();
    animate(0);

   
}


function SET_UP_NIGHT_MODE_QUICK_GAME() {
    //remove the level UI
    hideElem(container);
    //display the game UI
    showElem(canvas, "block");
   
   
    showElem(scoreBox, "flex");
    showElem(score, "flex");
    showElem(playPauseBtn,"flex");
    //init the game width and height
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    //invert the playing game variable
    playingGame = true;


    init();
    //since the mode is a night mode then we change all the pictures to a dark mode picture
    //so the bgFrame would be a random number from the highest nightmode picture array index to the lowest, that would pick a random night mode image for use to play the quick game

    //bgFrame=randomNumber
    animate(0);

}
//nightmode level for the quickGame

function nightModeLevels() {
    //init all the pictures for the nightmode
    //call the game setup function
    SET_UP_NIGHT_MODE_QUICK_GAME();
}

//daymode levelfor the quickgame

function dayModeLevels() {
    //init all the pictures for the daymode
    //call the gameSetup function
    SET_UP_DAY_MODE_QUICK_GAME();
}


//create a function to pause and resume the game
let imgFrameChecker=true;
const Toast=Swal.mixin({
        toast:false,
        position:"center",
        iconColor:"white",
        customClass:{popup:"colored-toast"},
        showConfirmButton:false,
        timerProgressBar:true,
});

//the game isn't paused by default..
let GAME_PAUSED=false;
function checkPausePlay(){

let imgArrayToggler=0;

    if(imgFrameChecker==true){
        //pause the game here

       
        imgFrameChecker=false;
        pauseGame();

    }else{
      
        imgFrameChecker=true;
        resumeGame();
    }

}

//check if the space bar is pressed the pause the game

addEventListener("keydown",(e)=>{
    if(e.keyCode == 32 && playingGame && endGame == false){
         checkPausePlay();
    }
});




function pauseGame(){
     //stop the score from incrementing
     clearInterval(incrementId);    
     playingGame = false;   
    //give the user a message
     Toast.fire({
        
        title:"Game Paused",
        text:"Click The Play Button To Resume!",
        showConfirmButton:true,
        confirmButtonText:"Resume Game!",
        confirmButtonColor:"dodgerblue"
    }).then((willProceed)=>{
        if(willProceed.isConfirmed){
            resumeGame();
        }
    })
     //pause the game music
     GAME_BG_SOUND.pause();
     //set the gamePaused variable to true
     //the background sound would play

     GAME_PAUSED=true;

     //reduce the volume of the gui music
     gameGUI_BG.volume=0.1;

     
     //stop the obstacles from getting spawned
     //clearInterval(obstacleSpawnnerId);
     //cancel the current screen animation
     cancelAnimationFrame(animateId);

}

function resumeGame(){
    //cancel the toast
    Toast.close();
    //resume the score increment function
    incrementId=setInterval(scoreIncrement,1000);
    //set the game paused variable back to false, this would stop the background music
    GAME_PAUSED=false;
    playingGame = true;
    //reset the guiMusic back to the original volume
    gameGUI_BG.volume=0.5;
    //this would continue the background music
    GAME_BG_SOUND.play();
    //obstacleSpawnnerId=setInterval(spawnAllObstacles,randomFrameChecker);
    animateId=requestAnimationFrame(animate);
}


//init the other game variables 
let deltaTime = 0;
let lastTime = 0;
let harmonizedTimeFrame=0;
let TIME_COUNT = 0
let HarderLevel = 0;
let maxAmpliValue = 300;
let gameEndSound;
let boundarySound = new Audio();

let randomFrameChecker = randomNumber(5000, 4000);
let suspenseSound = new Audio();

//create the constant to store the game msg template
const OBSTACLE_COLLIDE_MSG = "You got yourself killed, Haha, Didn't You See The Obstacles, Your Score Is ";

const PLANE_COLLIDE_MSG = "You got yourself killed, Haha, Didn't You See The Plane Coming, Your Score Is ";

const NEUTRAL_COLLIDE_MSG = "You got yourself killed, Haha , You Couldn't Even Prevent Your Own Bird From Crashing, Your Score Is ";

const FLYING_HIGH_COLLIDE_MSG="You got yourself killed, Haha, What Are You Looking For Above The Sky, Your Score Is ";
//create a function that combines the game init and the animation function
function BOOTSTRAP_GAME() {
    //pause the current failure sound
    gameEndSound.pause();
    //call the game setUp
    gameSetup();
}
//create a global restart function

function GLOBAL_GAME_RESTART() {
    BOOTSTRAP_GAME();
    TIME_COUNT = 0;
    worldFrame=0;
    //reset all game values to their default number
    scoreValue = 0;
    //display the score to the world
    score.innerHTML = `SCORE  ${scoreValue}`;
    //reset the game speed value back to its defaut.

    playingGame = true;
    endGame = false;
    GAME_PAUSED=false;
    GAME_BG_SOUND.src = randomSound(BG_SOUND_ARRAY);
    //set the gameSpeed modifiers back to the default values
    planeSpeedMod = 1.5;
    obstacleSpeedMod = 1.3;
    //reset the gameSpeed back to the previous value
    gameSpeed = 7;
    //call the init and animate function
    init();
    animate(0);
}
//end game function 
function END_GAME_FUNCTION() {
    //check if the user beat the previous highscore    
    changeHighScore();
    cancelAnimationFrame(animateId);
    endGame = true;
    //pause the bg song
    GAME_BG_SOUND.pause();
    //remove the canvas
    removeElement(canvas);
    showElem(container);

    gameEndSound = new Audio();color = "black";
    score.style.color = "black";

    //change the image indicating the current game mode
    modeToggleBtn.src = modes[frame];

    //change the border radius
    gameContainer.style.borderRadius = "10px";




    gameEndSound.src = randomSound(FAILURE_SOUND_ARRAY);
    //play the endGame function
    gameEndSound.play();

    //first check if the player collided with an obstacle or the aeroplane or any other game object in the game scene
    //check if the collision was with the aeroplane in the game

    if (playerCollideWithPlane === true) {
        swal.fire({
            title: scoreValue,
            text: PLANE_COLLIDE_MSG + scoreValue,
            showCancelButton: true,
            showCloseButton: false,
            cancelButtonColor: "tomato",
            allowOutsideClick: false,
            cancelButtonText: "Restart Game",
            confirmButtonText: "Main Menu",
            allowOutsideClick: false,
            allowEnterKey: false



        }).then((willProceed) => {
            if (willProceed.isConfirmed) {
                //reload the page
                location.reload(true);
            }

            if (willProceed.isDismissed) {
                //the player wants to restart
                playRestartSound();
                GLOBAL_GAME_RESTART();
            }

        })
    }




    if (playerFlyTooHigh==true) {
        swal.fire({
            title: scoreValue,
            text:FLYING_HIGH_COLLIDE_MSG  + scoreValue,
            showCancelButton: true,
            showCloseButton: false,
            cancelButtonColor: "tomato",
            allowOutsideClick: false,
            cancelButtonText: "Restart Game",
            confirmButtonText: "Main Menu",
            allowOutsideClick: false,
            allowEnterKey: false



        }).then((willProceed) => {
            if (willProceed.isConfirmed) {
                //reload the page
                location.reload(true);
            }

            if (willProceed.isDismissed) {
                //the player wants to restart
                playRestartSound();
                GLOBAL_GAME_RESTART();
            }

        })
    }




    if (playerCollideWithObstacle === true) {
        swal.fire({
            title: scoreValue,
            text: OBSTACLE_COLLIDE_MSG + scoreValue,
            showCancelButton: true,
            showCloseButton: false,
            cancelButtonColor: "tomato",
            allowOutsideClick: false,
            cancelButtonText: "Restart Game",
            confirmButtonText: "Main Menu",
            allowOutsideClick: false,
            allowEnterKey: false



        }).then((willProceed) => {
            if (willProceed.isConfirmed) {
                //reload the page
                location.reload(true);
            }

            if (willProceed.isDismissed) {
                //the player wants to restart
                playRestartSound();
                GLOBAL_GAME_RESTART();
            }



        })
    }


    if (playerCrashCollision === true) {
        swal.fire({
            title: scoreValue,
            text: NEUTRAL_COLLIDE_MSG + scoreValue,
            showCancelButton: true,
            showCloseButton: false,
            cancelButtonColor: "tomato",
            allowOutsideClick: false,
            cancelButtonText: "Restart Game",
            confirmButtonText: "Main Menu",
            allowOutsideClick: false,
            allowEnterKey: false



        }).then((willProceed) => {
            if (willProceed.isConfirmed) {
                //reload the page
                location.reload(true);
            }

            if (willProceed.isDismissed) {
                //the player wants to restart
                playRestartSound();
                GLOBAL_GAME_RESTART();
            }



        })
    }



}



function aboveScreenHeight(object) {
    if (typeof object == null || typeof object == undefined) {
        return;
    } else {
        //if the object is gone above or beyond the canvas or the screen of the user
        if (object.y + object.height >= canvas.height || object.y + object.height <= 0) {
            return true;
        }
    }
}

function CHECK_PLAYER_STATE() {
    requestAnimationFrame(CHECK_PLAYER_STATE);
    //clear the console
    //console.clear();

    //(TRUELY_PLAYING_DAILY_CHALLENGE);
    //check if the user isn't playing the game then play the GUI bg song
    if (!playingGame||GAME_PAUSED==true) {
        //play the background song
        gameGUI_BG.play();
        gameGUI_BG.volume = 0.5;
    } else {
        //pause the bg song
        gameGUI_BG.pause();
    }
}

//create a function to check the state of the day

function checkDayState() {
    //if the mode is already day, reactivate the daily challenge 
    (toggleMode);
    (refreshDailyChallenge);
    if (toggleMode == true) {
        //reset the global daily challenge variable
        databaseToggle = 0;
        //save the value of the dailyChallenge toggler
        localStorage.setItem("dailyChallengeToggler", databaseToggle);
        counter = parseInt(localStorage.getItem("dailyChallengeToggler"));
    }
}



let GAME_BG_SOUND = new Audio();
//play the random bg sounds
let timeToNextObstacle=randomNumber(4000,2000);
let timeToNextPlane=700;
GAME_BG_SOUND.src = randomSound(BG_SOUND_ARRAY);

function animate(timeStamp) {

    animateId = requestAnimationFrame(animate);
    background.update();

    //checkDayState();
    if (playingGame) {
        GAME_BG_SOUND.play();
        GAME_BG_SOUND.volume = 0.7;
        if (GAME_BG_SOUND.ended) {
            GAME_BG_SOUND.src = randomSound(BG_SOUND_ARRAY);
        }
    }



    deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    TIME_COUNT++;

    harmonizedTimeFrame = Math.floor(deltaTime);

    worldFrame += harmonizedTimeFrame;
    
    if(worldFrame > timeToNextObstacle && endGame==false && GAME_PAUSED==false){
        spawnAllObstacles();
        worldFrame=0;
        timeToNextObstacle=randomNumber(6000,4000);
    }

    // //update the background
    // background.update();


    // for (let i =0; i < obstacles.length; i++) {
    //     obstacles[i].update();
    // }


    //check if the player collide with the player
    obstacles.forEach((obstacle, obstacleIndex) => {
        if (gameObjectColliding(player, obstacle)) {
            //this will call the player's destroy method
            playerCollideWithObstacle = true;
            playerCollideWithPlane = false;
            playerCrashCollision = false;
            playerFlyTooHigh=false;
            END_GAME_FUNCTION();
        }

        if (obstacle.leftScreen) {
            obstacles.splice(obstacleIndex, 1);
        }

          obstacle.update();
    });

    //check if the player moves up above the game screen
    if (aboveScreenHeight(player)) {
        boundarySound.src = randomSound(WARNING_SOUNDS_ARRAY);
        boundarySound.play();
        setTimeout(()=>{
        playerCrashCollision =false;
        playerCollideWithObstacle = false;
        playerCollideWithPlane = false;
        playerFlyTooHigh=true;
            END_GAME_FUNCTION();
        })
        
    }

    //end the game when the player is out of the screen
    if (player.y + player.height + player.velocity.dy > canvas.height) {
        //the player failed by crashing
        playerCrashCollision = true;
        playerCollideWithObstacle = false;
        playerCollideWithPlane = false;
        playerFlyTooHigh=false;
        setTimeout(()=>{
            END_GAME_FUNCTION();
        },0);
        
    }









    //increase the gameDifficulty as the player progresses
    if (TIME_COUNT % 2000 == 0) {
        //levelIncrementor+=10;
      
        suspenseSound.src = randomSound(SUDDEN_SUSPENSE_ARRAY);
        planeSpeedMod += randomNumber(1.5, 0.25);
        obstacleSpeedMod += randomNumber(1.3, 0.23);
        //increment the gameSpeed
        gameSpeed += randomNumber(1, 0.5);

        
        suspenseSound.play();
       
        bgFrame = 11;
    }

  

    //update the player
    player.update();






}


function spawnAllObstacles(){
    spawnObstacles();
}

function scoreIncrement(){
    if (playingGame && endGame == false ) {
        scoreValue++;
        score.innerHTML = `SCORE: ${scoreValue}`;
    }
}



let incrementId=setInterval(scoreIncrement,1000);

CHECK_PLAYER_STATE();