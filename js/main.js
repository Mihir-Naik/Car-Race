$(function(){
var $container = $('#container')
var $car = $('#car')
var goLeft = false
var goRight = false

$(document).on('keydown', function(e){
    var key = e.keyCode;
    if (key === 37 && goLeft === false) {
        goLeft = requestAnimationFrame(left);
    } else if (key === 39 && goRight === false) {
        goRight = requestAnimationFrame(right);
    }
})
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

function left() {
    $car.css('left', parseInt($car.css('left')) - 5);
    goLeft = requestAnimationFrame(left);
}

function right() {
    $car.css('left', parseInt($car.css('left')) + 5);
    goRight = requestAnimationFrame(right);
}

});