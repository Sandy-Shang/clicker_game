/* Author: Sandy Shang 
      Date: July 10, 2021

      Filename: assignment5.js
*/


/* Create the canvas*/
var canvas = document.createElement("canvas");

canvas.width = 900;
canvas.height = 600;
canvas.style.border = "2px solid white";
var context = canvas.getContext("2d");
document.body.appendChild(canvas);

/* Background image*/
var showBackground = false;
var backgroundImage = new Image();
backgroundImage.onload = function () {
    showBackground = true;
};
backgroundImage.src = "images/water.jpg";

/* Lady Bug image*/
var showBug = false;
var bugImage = new Image();
bugImage.onload = function () {
    showBug = true;
};
bugImage.src = "images/bug.png";

var score = 0;

/* Game objects*/
var bug = {
    x: 0,
    y: 0,
    delay:2500 // movement in pixels per second
}



/* Handle mouse controls/ Are they touching?*/

canvas.onmousedown = function (e) {
    if (e.pageX >= bug.x
        && e.pageX <= bug.x + 120 + 220
        && e.pageY>= bug.y
        && e.pageY <= bug.y + 120 + 35)

    {
        reset();
        bug.delay -= 50;
        if (bug.delay > 1600) {
            ++score;
        }
        if (bug.delay == 1600)
        {
            ++score;
        }
        if (bug.delay < 1600 && bug.delay > 800)
        {
            ++score;
        }
        if (bug.delay == 800)
        {
            ++score;
        }
        if (bug.delay < 800 && bug.delay > 0) {
    
            ++score;
        }
        else if (bug.delay == 0) {
            ++score;
            score = 0;
            bug.delay = 2600;
        }
               
        then = Date.now()
    }
}


/* Reset the game when the player catches the bug*/
var reset = function () {

    bug.x = 70 + Math.random() * ((canvas.width - 125) - 70);
    bug.y = 70 + Math.random() * ((canvas.height - 125) - 70);

}

/* Draw everything on canvas*/
var render = function () {
    if (showBackground) {
        context.drawImage(backgroundImage,0,0);
    }
    if (showBug) {
        context.drawImage(bugImage, bug.x, bug.y);
    }
    
    var scoreResult = document.getElementById('scoreResult');
    var result = "Points:" + score;
    scoreResult.innerHTML = result;
}
function resetScore() {
    score = 0;
    bug.delay = 3000;
}
function resetSpeed() {
    bug.delay = 3000;
}
scoreResult = score.value;

/* The main game loop*/
var main = function () {
    var now = Date.now();
    var delta = now - then;
    if (delta > bug.delay) {
        reset();
        then = now;
    }
    render();

    requestAnimationFrame(main);
}
/* Cross-browser support for requestAnimationFrame*/
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

/* Let's play this game!*/
reset();
var then = Date.now();
main();
