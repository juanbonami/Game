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
let intrvl = setInterval(run, 11);
// an array that stores line objects to create the grid of the game 
let linesArr = [];
// runs the run function every 20 milliseconds, saved to variable


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


function run() {

    for (let i=0; i < linesArr.length; i+=1) {

        // loops through array checks if player touches line
        if ((playerY + playerHeight >= linesArr[i].y) &&
            (playerY <= linesArr[i].y + linesArr[i].height) &&
            (playerX + playerWidth >= linesArr[i].x) && 
            (playerX <= linesArr[i].x + linesArr[i].width)) {  

               return clearInterval(intrvl);          
        }
    }

    // clear a rectangle within a the given rectangle(canvas)
    canvContext.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    // checks if frame has value of 1 OR if frame is an even number 
    if (frame == 1 || (frame / 150) % 1 == 0) {

        let minHeight = 20;
        let maxHeight = 200;
        let height = Math.floor(Math.random() * (maxHeight-minHeight+1) + minHeight);
        let minGap = 50;
        let maxGap = 200;
        let gap = Math.floor(Math.random() * (maxGap-minGap+1) + minGap);
        
        // builds 2 Lines objects and pushes them into array
        linesArr.push(new Lines(canvas.width, 0, 5, height));
        linesArr.push(new Lines(canvas.width, height + gap, 5, canvas.height - height - gap));
        // this will go on every 150 frames are completed

    }

    // draws lines purple
    canvContext.fillStyle = 'purple';

    // loops through lines
    for (let i=0; i < linesArr.length; i+=1) { 

        // lines will move from right to left
        linesArr[i].x -= 1;
        // drawing lines by accessing them through array
        canvContext.fillRect(linesArr[i].x, linesArr[i].y, linesArr[i].width, linesArr[i].height);

    }

    // increases score by 50  every 150 frames
    if ((playerX + playerWidth >= linesArr[0].x) && (frame / 150) % 1 == 0) score += 50;
    // draws the score
    canvContext.font = '16px tahoma';
    canvContext.fillStyle = 'lime';
    canvContext.fillText('Score: ' + score, 20, 30);

    // this will create acceleration based on the combining value of gravity
    playerSpeed += gravity;
    // assigning the above speed to our playerY which moves along the Y axis
    playerY += playerSpeed;
    // changes drawing color to green
    canvContext.fillStyle = 'green';
    // draws player on canvas
    canvContext.fillRect(playerX, playerY, playerWidth, playerHeight);

    if (playerY + playerHeight >= canvas.height) {

        playerY = canvas.height - playerHeight;
        canvContext.fillRect(playerX, playerY, playerWidth, playerHeight);
        clearInterval(intrvl);
    }

    if (playerY < 0) {

        playerY = 0;
        canvContext.fillRect(playerX, playerY, playerWidth, playerHeight);
        clearInterval(intrvl);
    }
    
}

// if the up arrow key is pressed, it will change the gravity value to -0.3
document.addEventListener('keydown', (e) => {if(e.which === 38) gravity = -0.3; });
// if the up arrow key is NOT pressed, then it will change the value to 0.05
document.addEventListener('keyup', (e) => {if(e.which === 38) gravity = 0.05; });


