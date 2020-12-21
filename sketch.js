var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running,land,invisibleland,gover;
var banana ,bananaImage,obstacle,obstacleImage;//,restart;
var FoodGroup, obstacleGroup;
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  landImage = loadImage("ground2.png");
  gameover= loadImage("gameOver.png");
 
}



function setup() {
  
  gover=createSprite(320,200,80,15);
  gover.addImage(gameover);
  gover.visible=false
  

  land=createSprite(300,418,680,15);
  land.addImage(landImage);
  land.velocityX=-3;
  land.x=land.width/2;
  
  monkey=createSprite(100,370);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
  
  invisibleland=createSprite(300,440,680,15);
  invisibleland.visible=false
  
  FoodGroup= new Group();
  obstacleGroup= new Group();
}


function draw() {
createCanvas(590,470);
 background("lightgreen");
 
  
  if(gameState===PLAY){
  
  stroke("darkblue");
  fill("red");
  textSize(30);
  score=Math.round(frameCount/frameRate());
  text("Survival Time "+ score,200,50)
    
    monkey.velocityY = monkey.velocityY + 0.8 
    monkey.collide(invisibleland);
  
  if (land.x < 0){
     land.x = land.width/2;
    }
   if(keyDown("space")&&monkey.y>=280 ){
     monkey.velocityY=-12;}
 
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach(); 
  }
 if(monkey.isTouching(obstacleGroup)){
    gameState =END
  }
   }
  
  else if(gameState===END){
     land .velocityX = 0;
     monkey.velocityY = 0;
     obstacleGroup.destroyEach();
     FoodGroup.destroyEach(); 
     gover.visible=true;
  
  } 
  
  drawSprites();
  bananas();
  obstacles();
}

function bananas(){
 if(frameCount%80===0)
  {banana=createSprite(600,200);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-7;
  banana.y=Math.round(random(120,250)); 
  banana.lifetime=90;
  FoodGroup.add(banana); 
  }
  }

function obstacles(){
if(frameCount%300===0){
 obstacle=createSprite(600,380);
 obstacle.addImage(obstacleImage);
 obstacle.scale=0.3;
 obstacle.velocityX=-9;
 obstacle.lifetime=70; 
 obstacleGroup.add(obstacle);
}

}