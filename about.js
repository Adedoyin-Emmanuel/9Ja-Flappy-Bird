const ctx = canvas.getContext("2d");
let worldFrame =0;
let animateId;
//event listeners
canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize" || "load", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});



let mouse = {
    x: 0,
    y: 0
};

function getDist(x1, y1, x2, y2) {
    let x = x2 - x1;
    let y = y2 - y1;

    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}


function randomSong(song) {
    return song[Math.floor(Math.random() * song.length)];
}

//create a function to navigate home
function navigatePage(url) {
    location.href = url.toString();
}
//init the bg song array

const bgSoundArray = [
    "bgSound2.mp3",
    "bgSound3.mp3"
];

//initialize the sound files

const bgSound = new Audio();
bgSound.src = randomSong(bgSoundArray);
bgSound.volume = 0.1;



//checked if the user clicked and then set the page to fullscreen

var explosionSoundArray = [

    "explosion01.wav",
    "ChunkyExplosion.mp3"

]






class Parent {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.gravity = 5;
        this.friction = 0.99;
        this.alpha = 1;
        this.leftScreen = false;
        this.faded = false;

        this.update = () => {
            this.draw();
            this.y += this.velocity.y;
            this.x += this.velocity.x;
            this.y += this.gravity;
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            this.alpha -= randomNumber(0.009, 0.005);

            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) this.leftScreen = true;
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.leftScreen = true;
            if (this.alpha < 0) this.faded = true;



        }


    }
}

class Particle extends Parent {
    constructor(x, y, color, radius, velocity) {
        super();

        this.radius = radius;
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.draw = () => {
            ctx.save();
            ctx.beginPath();
            ctx.globalAlpha = this.alpha;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.shadowBlur = 20;
            ctx.shadowColor = this.color;
            ctx.strokeStyle = this.color;
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }


    }
}



//create the stars at the background

class Star {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.alpha = 0.1;
        this.angle = 1;

        this.velocity = {
            dx: 5,
            dy: 5
        };


        //create the draw draw method
        this.draw = () => {
            ctx.save();
            ctx.beginPath();
            ctx.globalAlpha = this.alpha;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.strokeStyle = this.color;
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }

        //create the update method
        this.update = () => {
            this.draw();
        }
    }
}

let particles;
let stars;

function init() {
    particles = [];
    stars = [];

    spawnStar();
}
var colorsArray = [
    "red",
    "blue",
    "palevioletred",
    "indogo",
    "white",
    "dodgerblue",
    "#ffb400",
    "#00ff2d",
    "#2cff00",
    "#cc68f8",
    "#ff6868",
    "#cf068f8",
    "#fab68f8",
    "#ccfa7f8",
    "#5968fda",
    "#ff0607",
    "#ff3207",
    "#ff6107",
    "#ff740a",
    "#ff8b07",
    "#ffbf07",
    "#0667ec",
    "#06db5b",
    "#fadb5b",
    "#f01c63",
    "#0000ff",
    "#fefefe",
    "#fafafa",
    "#f0aabc",
    "#f0cc64",
    "teal",
    "purple",
    "gold",
    "lightblue",
    "ghostwhite",
    "whitesmoke",
    "#3e3fdf"

];

//create the timerframe variable
var blastTimeFrame = 0;
var randomTimeFrame = randomNumber(200, 100);
//write a function to spawn random colors
function randomColor(color) {
    return color[Math.floor(Math.random() * color.length)];
}

function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function clearScreen(context) {
    context.save();
    context.fillStyle = "rgba(0,0,0,0.1)";
    context.fillRect(0, 0, innerWidth, innerHeight);
    context.restore();
}




function playExpSound(array) {

    for (let i = 0; i < array.length; i++) {
        let exp = new Audio();
        exp.src = array[i];
        exp.volume = randomNumber(1, 0.1);
        exp.play();
    }
}

//create the function that spawn the stars
let numberOfStar = 50;


function spawnStar() {


    for (let j = 0; j < 500; j++) {
        let radius = randomNumber(1, 1);
        let x = randomNumber(canvas.width - radius, radius);
        let y = randomNumber(canvas.height - radius, radius);
        let color = "white";
        stars.push(new Star(x, y, radius, color));
    }
}


let deltaTime=0;
let lastTime = 0;
let parsedTime=0;
const frame = 15;

let timeToNextExplosion=randomNumber(4000,3000);
function animate(timeStamp) {
    animateId = requestAnimationFrame(animate);
    deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    parsedTime = Math.floor(deltaTime);
    
    //console.clear();
    //console.log(parsedTime);
    worldFrame+=parsedTime;


    clearScreen(ctx);
    bgSound.play();
    blastTimeFrame += parsedTime;

    particles = particles.filter((particle, particleIndex, array) => {
        return !particle.leftScreen;
    });
    particles = particles.filter((particle, particleIndex, array) => {
        return !particle.faded;
    });
    particles.forEach((particle, particleIndex, array) => {
        particle.update();
    });

    //check if the blastTimeFrame is divisible by a randomNumber
    if (worldFrame>timeToNextExplosion) {
        //call the blast firework function
        blastFireWork();
        worldFrame=0;
        //timeToNextExplosion=randomNumber(4000,3000);
    }






}



function blastFireWork() {
    const radius = randomNumber(2, 0.1);
    const x = randomNumber(canvas.width - radius, radius);
    const y = randomNumber(canvas.height - radius, radius);
    const particlecount = randomNumber(500, 1);
    const particleincrement = (Math.PI * 2) / particlecount;
    const power = randomNumber(70, 20);
    for (let i = 0; i < particlecount; i++) {
        particles.push(new Particle(x, y, randomColor(colorsArray), radius, {
            x: Math.cos(particleincrement * i) * (Math.random()) * power,
            y: Math.sin(particleincrement * i) * (Math.random()) * power
        }));
    }
    playExpSound(explosionSoundArray);
}


init();
animate(0);