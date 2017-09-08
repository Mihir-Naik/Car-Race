$(function(){

// Variables
var $start = $('#start')
var $score = $('#score')
var $restart = $('#restart')
var $reload = $('#reload')
var $p1 = $('#p1')
var $p2 = $('#p2')
var player1 = {score: null}
var player2 = {score: null}
var carExplosion = new Audio('src/explosion.wav')

var $container = $('#container')
var $car = $('#car')
var $oppCar  = $('.oppCar')
var $orange = $('#orange')
var $white = $('#white')
var $purple = $('#purple')
var $lines = $('.lane')
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
var gameStarted = false
var gameOver = false
var goLeft = false
var goRight = false
var goUp = false
var goDown = false
var speed = 4
var carSpeed = 1
var score = 1
// KeyDown Event
$reload.hide()
$restart.hide()

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
    $("#three, #two, #one").css("background", "none");
    if (gameOver === false) {
        setTimeout(function (){
            $('#three').css("background", "red")
        }, 1000)
        setTimeout(function(){
            $('#two').css("background", "orange")
        }, 2000)
        setTimeout(function(){
            $('#one').css("background", "green")
            animation = requestAnimationFrame(gameOn)
            gameOn()
        }, 3000)
        
        
       
    }
}

if (player1.score === null && player2.score === null){
    if (gameStarted === false){
        $start.on('click', play)
    }
}
if (player1.score !== "" && player2.score === null){
    $restart.on('click', function (){
        $car.toggle('explode')
        gameOver = false
        score = 1
        speed = 4
        carSpeed = 1
        $car.css("bottom", ""+car.bottom+"px")
        $car.css("left", ""+car.left+"px")
        $orange.css("top", ""+orange.top+"px")
        console.log($orange.css('top'))
        $orange.css("left", ""+orange.left+"px")
        $white.css("top", ""+white.bottom+"px")
        $white.css("left", ""+white.left+"px")
        $purple.css("top", ""+purple.top+"px")
        $purple.css("left", ""+purple.left+"px")
        play()
        // animation = requestAnimationFrame(gameOn)
        // gameOn()
    })
}

// Animation function
var gameOn = function(){

    if (gameOver === false){
        score++
        $score.text('Time lapsed: '+score)
        if (score % 500 === 0) {
            speed++
            carSpeed++
        }
    // Car Objects for collision detection
            function makeCollisionObj(obj){
                return {
                    x: parseInt(obj.css('left')),
                    y: parseInt(obj.css('top')),
                    width: 60,
                    height: 90
                }
            }
    // Collisoin objects
        var carObj = makeCollisionObj($car)
        var orangeObj = makeCollisionObj($orange)
        var whiteObj = makeCollisionObj($white)
        var purpleObj = makeCollisionObj($purple)
    // Check for collision
        if (collision(carObj,whiteObj) ||
            collision(carObj,orangeObj) || 
            collision(carObj,purpleObj)) {
            console.log('collision')
            gameOver = true
        }
        for (var i = 0; i < $lines.length; i++) {
            rollDownLine($($lines[i]))
        }
        
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
    carCurrentTop = -50
    var carLeft = parseInt(getRandomInt(($car.width() - 30), ($container.width()-$car.width())))
        if ((carLeft > 15 && carLeft < 55) ||(carLeft > 140 && carLeft < 180) || (carLeft > 270 && carLeft < 310) || (carLeft > 400 && carLeft < 445)) {
            car.css('left', carLeft)
        }
    }
    car.css('top', carCurrentTop + carSpeed)
}
// Function to create ranndom number for opponent car's 'Left' position
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
        
}

// Collision detection function
var collision = function (car, othercar) {
    if (car.x < othercar.x + othercar.width &&
    car.x + othercar.width > othercar.x &&
    car.y < othercar.y + othercar.height &&
    car.height + othercar.y > othercar.y) {                 
    // collision detected!
    carExplosion.play()
    $car.toggle('explode')
    $restart.fadeIn(500)
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
        $p1.text('Player 1: '+score/1000)
        player1.score = score/1000
    } else {
        $p2.text('Player 2: '+score/1000)
        player2.score = score/1000
        if (player1.score > player2.score){
            $('#winner').text('Player 1 Score: '+player1.score+', Player 2 Score: '+player2.score+', Player 1 wins!!')
            displayWinner()
        } else {
            $('#winner').text('Player 1 Score: '+player1.score+', Player 2 Score: '+player2.score+', Player 2 wins!!')
            displayWinner()
        }
    }
}
    function displayWinner() {
        $p1.fadeOut(500)
        $p2.fadeOut(500)
        $restart.fadeOut(500)
        $score.fadeOut(500)
        $reload.fadeIn(500)
        $('#countdown').hide()
    }
    $reload.on('click', function (){
        location.reload()
    })
});
