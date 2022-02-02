userClickedPattern=[];
gamePattern=[];
buttonColours=["red","blue","green","yellow"];
var level=0;
var started=false;

$(".btn").click(function(){
  var userChosenColour =this.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  var lastIndex=userClickedPattern.length-1;
  checkAnswer(lastIndex);

})

function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if((currentLevel+1)==level){
      setTimeout(nextSequence, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over Press Any Key to Restart ");
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

$(document).keypress(function(){

  if (!started) {

  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
  console.log("started>>",started);
}
});

function nextSequence(){
  userClickedPattern=[];
  var randomNumber= Math.random()*4;
  randomNumber=Math.floor(randomNumber);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("level "+level);
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  }, 100);

}

function playSound(colour){
  var sound =new Audio("sounds/"+colour+".mp3");
  sound.play();
}
