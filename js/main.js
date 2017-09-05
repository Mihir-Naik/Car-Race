$(function(){

// Variables

var $container = $('#container')
var $car = $('#car')
var $line1 = $('#line1')
var $line2 = $('#line2')
var $line3 = $('#line3')
var $line4 = $('#line4')
var $line5 = $('#line5')
var $line6 = $('#line6')
var $line7 = $('#line7')
var $line8 = $('#line8')
var $line9 = $('#line9')
var goLeft = false
var goRight = false

// KeyDown Event

$(document).on('keydown', function(e){
    var key = e.keyCode;
    if (key === 37 && goLeft === false) {
        goLeft = requestAnimationFrame(left);
    } else if (key === 39 && goRight === false) {
        goRight = requestAnimationFrame(right);
    }
})

// KeyUp Event

$(document).on('keyup', function(e){
    var key = e.keyCode;
    if (key === 37){
        cancelAnimationFrame(goLeft);
        goLeft = false;
    } else if (key === 39){
        cancelAnimationFrame(goRight);
        goRight = false;
    }
})

// Functions 

// To move left
function left() {
    $car.css('left', parseInt($car.css('left')) - 3);
    goLeft = requestAnimationFrame(left);
}
// To move right
function right() {
    $car.css('left', parseInt($car.css('left')) + 3);
    goRight = requestAnimationFrame(right);
}

// animation = requestAnimationFrame(gameOn)
function gameOn(){
    rollDown($line1)
    rollDown($line2)
    rollDown($line3)
    rollDown($line4)
    rollDown($line5)
    rollDown($line6)
    rollDown($line7)
    rollDown($line8)
    rollDown($line9)
    animation = requestAnimationFrame(gameOn)
}
// Line keeps rolling down continously
function rollDown(line) {
    var currentTop = parseInt(line.css('top'))
    if (currentTop > parseInt($container.height())){
        currentTop = -10
    }
    line.css('top', currentTop + 5)
}

// End
});