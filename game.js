var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var started=false;
var level=0;

$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

// Detection of keyPress
$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    newSequence();
    started=true;
  }
});

function newSequence(){
  userClickedPattern=[];
  level++;

  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);

  var randomChosenColour=buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
 function animatePress(currentColor){
   $("#"+currentColor).addClass("pressed");
   setTimeout(function(){
     $("#"+currentColor).removeClass("pressed");
   },100);

 }

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        newSequence()
      },1000);
    }
  }

  else{
  playSound("wrong");
  $("#level-title").text("Game over, Press Any key to Restart");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over")
  },200);
  startOver();
  }
}

function startOver()
{
  level=0;
  gamePattern=[];
  started=false;

}
