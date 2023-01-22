var buttonColors= ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern=[];

var started= false;

var level = 0;

var userAnswerIndex=0;

$(document).keypress(function(){

    if (!started){

        $("#level-title").text("Level "+ level);
        nextSequence();
        started= true;

    }
})

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   // userAnswerIndex = userClickedPattern[userClickedPattern.length];

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});



function nextSequence(){

    userClickedPattern= [];
    level++;

    $("#level-title").text("Level "+ level);

var randomNumber = Math.floor(Math.random()*4);
var randomChosenColor = buttonColors[randomNumber];


gamePattern.push(randomChosenColor);

$('#'+ randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);

playSound(randomChosenColor);



}


function checkAnswer(currentLevel){
 if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
     
     if (userClickedPattern.length === gamePattern.length){
        console.log("success");
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
 
}else if (userClickedPattern.length === gamePattern.length){
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout (function (){
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
}
}

function playSound(name){
    var audio = new Audio("sounds/" + name+ ".mp3");
    audio.play();
}

function animatePress(currentColor){


    $("#" + currentColor).addClass("pressed");
    setTimeout (function (){
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

function startOver(){
    level = 0;
    gamePattern= [];
    started = false;

}


