$(function(){

// Variables
var $start = $('#start')
var $score = $('#score')
var $restart = $('#restart')
var $p1 = $('#p1')
var $p2 = $('#p2')
var player1 = {score: null}
var player2 = {score: null}
var currentPlayer = player1.score

var $container = $('#container')
var $car = $('#car')
var $oppCar  = $('.oppCar')
var $orange = $('#orange')
var $white = $('#white')
var $purple = $('#purple')
var $line1 = $('#line1')
var $line2 = $('#line2')
var $line3 = $('#line3')
var $line4 = $('#line4')
var $line5 = $('#line5')
var $line6 = $('#line6')
var $line7 = $('#line7')
var $line8 = $('#line8')
var $line9 = $('#line9')
var car = {
    bottom: parseInt($car.css('bottom')),
    left: parseInt($car.css('left'))
}
var orange = {
    top: parseInt($orange.css('top')),
    left: parseInt($orange.css('left'))
}
var white = {
    top: parseInt($white.css('top')),
    left: parseInt($white.css('left'))
}
var purple = {
    top: parseInt($purple.css('top')),
    left: parseInt($purple.css('left'))
}

var gameOver = false
var goLeft = false
var goRight = false
var goUp = false
var goDown = false
var speed = 5
var carSpeed = 2
var score = 1
// KeyDown Event

$(document).on('keydown', function(e){
    if (gameOver === false) {
        var key = e.keyCode
        if (key === 37 && goLeft === false) {
            goLeft = requestAnimationFrame(left)
        } else if (key === 39 && goRight === false) {
            goRight = requestAnimationFrame(right)
        } else if (key === 38 && goUp === false) {
            goUp = requestAnimationFrame(up)
        } else if (key === 40 && goDown === false) {
            goDown = requestAnimationFrame(down)
        }
    }
})

// KeyUp Event

$(document).on('keyup', function(e){
    var key = e.keyCode
    if (key === 37){
        cancelAnimationFrame(goLeft)
        goLeft = false
    } else if (key === 39){
        cancelAnimationFrame(goRight)
        goRight = false
    } else if (key === 38){
        cancelAnimationFrame(goUp)
        goUp = false 
    } else if (key === 40){
        cancelAnimationFrame(goDown)
        goDown = false
    }
})

// Functions 

// To move left
function left() {
    if (gameOver === false && parseInt($car.css('left'))>5) {
        $car.css('left', parseInt($car.css('left')) - 5);
        goLeft = requestAnimationFrame(left);
    }
}
// To move right
function right() {
    if ((gameOver === false) && (parseInt($car.css('left')) < $container.width() - $car.width() - 5)){
    $car.css('left', parseInt($car.css('left')) + 5);
    goRight = requestAnimationFrame(right);
    }
}
// To move up
function up() {
    if (gameOver === false && parseInt($car.css('top')) > 0) {
    $car.css('top', parseInt($car.css('top')) - 5);
    goUp = requestAnimationFrame(up);
    }
}
// To move down
function down() {
    if (gameOver === false && parseInt($car.css('top')) < $container.height() - $car.height() - 10) {
    $car.css('top', parseInt($car.css('top')) + 5);
    goDown = requestAnimationFrame(down);
    }
}

// Start the race using start button

var play = function(){
    if (gameOver === false) {
        
        animation = requestAnimationFrame(gameOn)
        gameOn()
    }
}

if (player1.score === null && player2.score === null){
    $start.on('click', play)
}
$restart.on('click', function (){
    $('#gameover').css("display", "none") 
    gameOver = false
    score = 1
    speed = 5
    carSpeed = 2
    $car.css("bottom", ""+car.bottom+"px")
    $car.css("left", ""+car.left+"px")
    // $car.css('display', 'visible')
    $orange.css("top", ""+orange.top+"px")
    console.log($orange.css('top'))
    $orange.css("left", ""+orange.left+"px")
    $white.css("top", ""+white.bottom+"px")
    $white.css("left", ""+white.left+"px")
    $purple.css("top", ""+purple.top+"px")
    $purple.css("left", ""+purple.left+"px")
    animation = requestAnimationFrame(gameOn)
    gameOn()
})

// Animation function
var gameOn = function(){
    if (gameOver === false){
        
        score++
        $score.text('Score: '+score)
        if (score % 500 === 0) {
            speed++
            carSpeed++
        }
    // Car Objects for collision detection
        var carObj = {
            x: parseInt($car.css('left')),
            y: parseInt($car.css('top')),
            width: 60,
            height: 90
            }
        var orangeObj = {
            x: parseInt($orange.css('left')),
            y: parseInt($orange.css('top')),
            width: 60,
            height: 90
            }
        var whiteObj = {
            x: parseInt($white.css('left')),
            y: parseInt($white.css('top')),
            width: 60,
            height: 90
        }
        var purpleObj = {
            x: parseInt($purple.css('left')),
            y: parseInt($purple.css('top')),
            width: 60,
            height: 90
        }
    // Check for collision
        if (collision(carObj,whiteObj) ||
            collision(carObj,orangeObj) || 
            collision(carObj,purpleObj)) {
            console.log('collision')
            gameOver = true
        }

        rollDownLine($line1)
        rollDownLine($line2)
        rollDownLine($line3)
        rollDownLine($line4)
        rollDownLine($line5)
        rollDownLine($line6)
        rollDownLine($line7)
        rollDownLine($line8)
        rollDownLine($line9)
        
        moveOpCar($white)
        moveOpCar($orange)
        moveOpCar($purple)

        animation = requestAnimationFrame(gameOn)
    }
}

// Line keeps rolling down continously
function rollDownLine(line) {
    var lineCurrentTop = parseInt(line.css('top'))
    if (lineCurrentTop > parseInt($container.height())){
        lineCurrentTop = -100
    }
    line.css('top', lineCurrentTop + speed)
}
//  Opponent cars roll down randomnly
function moveOpCar(car){
    var carCurrentTop = parseInt(car.css('top'))
    if (carCurrentTop > $container.height()) {
    carCurrentTop = -30
    var carLeft = parseInt(getRandomInt(($car.width() - 30), ($container.width()-$car.width())))
    car.css('left', carLeft)
    }
    car.css('top', carCurrentTop + carSpeed)
}
// Function to create ranndom number for opponent car's 'Left' position
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Collision detection function
var collision = function (car, othercar) {
    if (car.x < othercar.x + othercar.width &&
    car.x + othercar.width > othercar.x &&
    car.y < othercar.y + othercar.height &&
    car.height + othercar.y > othercar.y) {                 
    // collision detected!
    // $car.toggle('explode')
    console.log('collision')
    endGame()
    }
}
   
var endGame = function(){
    gameOver = true
    cancelAnimationFrame(animation)
    cancelAnimationFrame(goLeft)
    cancelAnimationFrame(goRight)
    cancelAnimationFrame(goUp)
    cancelAnimationFrame(goDown)
    
    if (player1.score === null) {
        $p1.text('Player 1: '+score)
        player1.score = score
    } else {
        $p2.text('Player 2: '+score)
        player2.score = score
        if (player1.score > player2.score){
            alert("Player 1 is a winner")
        } else {
            alert("Player 2 is a winner")
        }
    }
    console.log('Your score is: ' + score)
    console.log('speed: ' + speed)
    console.log('carSpeed: ' + carSpeed)
    $score.fadeOut(500)
    $restart.fadeIn(500)
    $('#gameover').toggle(1200)
   
}


// setInterval(opCar, 3000)
// function opCar() {
//     this.html = $('<div>').addClass('cars')
//     $container.append(this.html)
//     (this.html).css({'left': '150px', 'background': 'yellow'})
// }
// someCar = new opCar()
// console.log(someCar)

// End
});
