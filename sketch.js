var PLAY = 1;
var END = 0;
var gameState = PLAY;
var hScore;
var restart,restartImage,gameover,gameoverImage;
var score;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var fruitsGroup, obstaclesGroup
var score;
var ground;
var invisibleGround;
var bg,bgImage;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");
  
    restartImage = loadImage("restart.png");
  gameoverImage = loadImage("gameover.png");
  
  bgImage = loadImage("bg.jpg");
 
}



function setup() {
createCanvas(600,200);
  bg = createSprite(300,100,20,20);
  bg.addImage(bgImage);
  bg.scale = 0.7;
  
monkey = createSprite(50,175,20,50);
monkey.addAnimation("running", monkey_running);
monkey.scale = 0.07;
monkey.setCollider("circle",0,0,300);
//monkey.debug = true;

ground = createSprite(600,180,1200,20);
ground.x = ground.width /2;
ground.velocityX = -4;
  
gameover = createSprite(300,100,20,20);
gameover.addImage(gameoverImage);
  
  score = 0;
  
  obstaclesGroup = new Group();
  fruitsGroup = new Group();
}


function draw() {
background(225);
drawSprites(); 
  text("Survival Time:"+score,500,20);
  console.log(monkey.y)
   if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    score = score + Math.round(getFrameRate()/30);
     gameover.visible = false;
    if(keyDown("space")&&monkey.y>=149) {
    monkey.velocityY = -16;
  }
     monkey.velocityY = monkey.velocityY+0.8;
    
    monkey.collide(ground);
  
    if (ground.x < 0){
    ground.x = ground.width/2;
  
    }
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;    
      }
     //spawn the clouds
  Fruits();
  
  //spawn obstacles on the ground
  Obstacles();
   }
  else if(gameState==END){
  obstaclesGroup.setLifetimeEach(-1);
  fruitsGroup.setLifetimeEach(-1);
  obstaclesGroup.setVelocityXEach(0);
  fruitsGroup.setVelocityXEach(0);
  ground.velocityX = 0; 
  gameover.visible = true;
  text("Press on Gameover to restart",250,150);
  
  if(mousePressedOver(gameover)){
  monkey.x =50;
  monkey.y = 100;
  gameState=PLAY;
 obstaclesGroup.destroyEach();
 fruitsGroup.destroyEach();
 score = 0;
  }
  }
}
function Obstacles(){
  
if (frameCount % 120 === 0) {
obstacles = createSprite(600,140,40,10);
obstacles.addImage(obstaclesImage);
obstacles.scale = 0.2;
obstacles.velocityX = -6;
    
     //assign lifetime to the variable
obstacles.lifetime = 200;
obstacles.depth = monkey.depth;
monkey.depth = monkey.depth + 1;
obstacles.setCollider("circle",0,0,180);
    
    //adding cloud to the group
 obstaclesGroup.add(obstacles);
//obstacles.debug = true;
  }
}

function Fruits(){
if (frameCount % 240 === 0) {
     fruit = createSprite(600,100,40,10);
    fruit.y = Math.round(random(10,60));
    fruit.addImage(bananaImage);
    fruit.scale = 0.1;
    fruit.velocityX = -3;
    
     //assign lifetime to the variable
   fruit.lifetime = 200;
    
    //adjust the depth
    fruit.depth = monkey.depth;
    fruit.depth = monkey.depth + 1;
    //adding cloud to thmonkeye group
   fruitsGroup.add(fruit);
}}



