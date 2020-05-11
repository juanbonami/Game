const canvas = document.getElementById('gameCanvas');
const canvContext = canvas.getContext('2d');

// 2 variables to update frame and game score
let frame = 0;
let score = 0;

// variables for the square the user will be interacting with
let playerX = 20;
let playerY = 120;
let playerWidth = 40;
let playerHeight = 40;
let playerSpeed = 0;
let gravity = 0.05;

// an array that stores line objects to create the grid of the game 
let linesArr = [];
// runs the run function every 20 milliseconds, saved to variable
let intrvl = setInterval(run, 20);

// created a class called Lines and it'll created objects to build lines
class Lines {

    constructor(x, y, width, height) {

        // this. refrences the current object it's in
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

    }
}

const run = () => {

    for (let i=0; i < linesArr.length; i+=1) {

        // loops through array checks if player touches line
        if ((playerY + playerHeight >= linesArr[i].y) &&
            (playerY <= linesArr[i].y + linesArr[i].height) &&
            (playerX + playerWidth >= linesArr[i].x) && 
            (playerX <= linesArr[i].x + linesArr[i].width)) {  

                clearInterval(intrvl);       
        }
    }

    // clear a rectangle within a the given rectangle(canvas)
    canvContext.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    


}