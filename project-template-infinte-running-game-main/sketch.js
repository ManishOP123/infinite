var PLAY = 1;
var END = 0;
var gameState = PLAY;

var police , police_running , police_collided
var theif , theif_running

var invisibleground

var obstaclesGroup , obstacles1 , obstacles2 , obstacles3

var score
var gameOverImg , restartImg
var background1

function preload(){
police_running = loadAnimation("p1.png" , "p2.png" , "p3.png" , "p4.png" , "p5.png" , "p6.png" , "p7.png" , "p8.png" , "p9.png" ,);
police_collided = loadAnimation("p1.png")

theif_running = loadAnimation("theif_1.png" , "theif_2.png" , "theif_3.png" , "theif_4.png" , "theif_5.png" , "theif_6.png" ,);

obstacles1 = loadImage("obstacles_1.png");
obstacles2 = loadImage("obstacles_2.png");
obstacles3 = loadImage("obstacles_3.png");

gameOverImg = loadImage("game_over.png");
restartImg = loadImage("restart.png")

background1Img = loadImage("background.jpg")
}

function setup() {
 createCanvas(500,400);

 //background1 = createSprite(200,200)
 //background1.addImage(background1Img)
 //background1.scale = 1.5
 background1 = createSprite(300,100)
 background1.addImage("bg" , background1Img) 
 background1.x = background1.width /2

 police = createSprite(50,180,20,50);
 police.addAnimation("running", police_running);
 police.addAnimation("collided", police_collided);
 police.scale = 0.6;

 theif = createSprite(190,180,20,50);
 theif.addAnimation("run", theif_running)
 theif.scale = 0.02

 gameOver = createSprite(250,100)
 gameOver.addImage(gameOverImg)

 restart = createSprite(250,160)
 restart.addImage(restartImg)
 
 gameOver.scale = 0.5;
  restart.scale = 0.09;

  invisibleGround = createSprite(240,210,550,10);
  invisibleGround.visible = false

  obstaclesGroup = createGroup()

  police.setCollider("circle",0,0,40,);
  police.debug = false

  theif.setCollider("circle",0,0,40,);
  theif.debug = false

  score = 0
}

function draw() {
    background(255)


    gameOver.visible = false
    restart.visible = false
    
   
    
console.log("this is ",gameState)
    
if(gameState === PLAY){

    background1.velocityX = -(2+2*score/100);
    score = score + Math.round(getFrameRate()/70);

     

    if (background1.x < 170){
        background1.x = background1.width/2;
      }
      
      if(keyDown("space")&& police.y >= 100) {
        
          police.velocityY = -8;
      }

      police.velocityY = police.velocityY + 0.8

      
      spawnObstacles();
    
    if(obstaclesGroup.isTouching(police)){
        gameState = END
        
    }
}
    
else if (gameState === END) {
    console.log("hey")
     gameOver.visible = true;
     restart.visible = true;
    
     background1.velocityX = 0;
     police.velocityY = 0
    
     //change the trex animation
     police.changeAnimation("collided", police_collided);
    
     //set lifetime of the game objects so that they are never destroyed
   obstaclesGroup.setLifetimeEach(-1);
   
    
    obstaclesGroup.setVelocityXEach(0);
    
  }
 
  police.collide(invisibleGround);
      theif.collide(invisibleGround);

      if(mousePressedOver(restart)){
        reset()
      }
 drawSprites()
}

function reset(){
    gameState = PLAY
    score = 0
    obstaclesGroup.destroyEach()
    
    police.changeAnimation("running", police_running);
  }
  
  var rand = Math.round(random(1,6));
  switch (rand) {
    case 1: obstacle.addImage(obstacle1);
            break;
    case 2: obstacle.addImage(obstacle2);
            break;
    case 3: obstacle.addImage(obstacle3);
            break;
            default: break;
  }

  obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);

police.depth = theif.depth;
    police.depth =1;