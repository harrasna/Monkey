
var PLAY =0
var END=1
var gameState = PLAY

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup

var score
var survivaltime

function preload(){
  
   monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,600)
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velovityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  FoodGroup= createGroup();
  obstacleGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true;
  
  score = 0;
  
}

function draw() {
  background("white");
  
  stroke("red");
  textSize(20);
  fill("red");
  text("score:"+score ,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivaltime,100,50);
  
  monkey.collide(ground);
  
 
    
    if(keyDown("space") && monkey.y>=300){
    monkey.velocityY=-12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
    
    spawnfood();
  spawnobstacle();
  
    if(FoodGroup.isTouching(monkey)){
      score = score+1;
      FoodGroup.destroyEach();
      
    }
    
  
    
    if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    
    }
  
  drawSprites();
  
  
}
 
function spawnfood(){
 if(frameCount % 80 === 0){
    
   var food = createSprite(800,Math.round(random(320,200)),10,10);
   food.scale = 0.1;
  food.addImage(bananaImage);
  food.velocityX=-4;
  food.lifetime =188;
  FoodGroup.add(food);
  
 }
}

function spawnobstacle(){
  if (frameCount % 300 === 0){
  var obstacle = createSprite(800,320,10,40);
    obstacle.scale = 0.15;
  obstacle.velocityX=-5;
  obstacle.addImage(obstacleImage);
  obstacle.lifetime = 150;
  obstacleGroup.add(obstacle);
}

}



