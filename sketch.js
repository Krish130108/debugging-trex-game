var trex ,trex_running, ground, ground_img, invisible_ground, cloud, cloud_img, still_trex, ob1;
var ob2, ob3, ob4, ob5, ob6, obstacle, score = 0;
var play = 1, end = 0;
var gameState = play;
var obstaclesGroup, cloudsGroup;

var trex_collided

var gameOver, gameOver_img, restart, restart_img;

var dragon, dragon_img

var die, checkpoint, jump

var dragon_group

var trex_duck


function preload(){

  //trex
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  still_trex = loadImage("trex1.png");
  trex_collided = loadAnimation("trex_collided.png");
  trex_duck = loadAnimation("trex_ducking.png");
  
  //cloud
  cloud_img = loadImage("cloud.png");

  //obstacles
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");

  //obstacle 2
  dragon_img = loadImage("dragon.png");


  //gameStates
  gameOver_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");

  //sounds
  die = loadSound("die.mp3")
  checkpoint = loadSound("checkpoint.mp3")
  jump = loadSound("jump.mp3")

  //ground
  ground_img = loadImage("ground2.png");
  
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //create a trex sprite
 trex = createSprite(50,150,40,40)
 trex.addAnimation("running", trex_running);
 trex.addAnimation("still", still_trex);
 trex.scale = 0.5;
 trex.addAnimation("ducking", trex_duck);
 

 //create a ground sprite
 ground = createSprite(300,180,600,20);
 ground.addImage(ground_img);

 //invisible ground
 invisible_ground = createSprite(300,190,600,10);
 invisible_ground.visible = false;

 //creating the groups
 obstaclesGroup = new Group();
 cloudsGroup = new Group();
 dragonGroup = new Group();

 //trex collided
 trex.addAnimation("trex.collided", trex_collided)

 //collider size
 trex.setCollider("circle", -1,-5,37)
 
 //game over
 gameOver = createSprite(300,80,20,20);
 gameOver.addImage("gameOver", gameOver_img);
 gameOver.scale = 0.7;

 //game restart
 restart = createSprite(300,100,5,5);
 restart.addImage("restart", restart_img);
 restart.scale = 0.3;

}

function draw(){
  background("white")

if (gameState === play)
{
  gameOver.visible = false;
  restart.visible = false;

  //Movement of ground
  ground.velocityX = -5;

  //ducking the trex
  if (keyWentDown("DOWN_ARROW"))
  {
    trex.changeAnimation("ducking");
  }

  //ground.velocityX = -(4 + 3 * score / 100)

  //Infinite ground
  if (ground.x < 0)
  { 
    ground.x = ground.width / 2;
  }

  //Jumping the trex
  if (keyDown("space") && trex.y >= 145) 
  {   
   trex.velocityY = -11.5   
   trex.changeAnimation("still");
   jump.play()
  } 


  //Moving the trex and changing it's animation
  trex.velocityY = trex.velocityY + 0.9;
  if (trex.y > 161.5)
  {
    trex.changeAnimation("running");
  }

  //Scoring
  score = score + Math.round(getFrameRate() / 60);

  if (score > 0 && score % 100 === 0)
  {
    checkpoint.play()
    ground.velocityX = ground.velocityX - 1;
  }

  //Calling the function spawnCloud to display
  spawnClouds();

  //Calling function for obstacle 1
  spawnObstacles();

  //spwan dragon
  if (score >= 420)
  {
    spawnDragon()
  }

  //Condition if the obstacles or the dragon are touching the trex or not
  if (obstaclesGroup.isTouching(trex) || dragonGroup.isTouching(trex))
 {
  gameState = end;
  die.play()
 }

}


else if (gameState === end)
{
  //stopping the movement of the ground
  ground.velocityX = 0;
 
  //stop the clouds
  cloudsGroup.setVelocityXEach(0);

  //stop the obstacles
  obstaclesGroup.setVelocityXEach(0);

  //stop trex
  trex.velocityY = 0;

  //stop the dragon
  dragonGroup.setVelocityXEach(0);

  //changing trex animation to collided
  trex.changeAnimation("trex.collided");

  //changing lifetime for clouds
  cloudsGroup.setLifetimeEach(-1)

  //changing lifetime for obstacles
  obstaclesGroup.setLifetimeEach(-1);

  //changing lifetime for dragon
  dragonGroup.setLifetimeEach(-1);

  //showing game over and restart button
  gameOver.visible = true;
  restart.visible = true;

  //calling functiion restart
  if (mousePressedOver(restart))
  {
    restart1();
  }
}
  

  //displaying score as a text
  text("Score " +score, 540, 10);
 
  //colliding trex with the invisible ground
  trex.collide(invisible_ground);


  //displaying trex y position on the console
  //console.log(trex.y);

  //displaying any error
  //console.error("This is how an error appears");

  //displaying warning
  //console.warn("This is how a warning appears");

  //more info
  //console.info("Press space to start and see if you can make it to the end");


  drawSprites()
}


//declaring cloud variable
function spawnClouds()
{
  if (frameCount % 60 === 0)
  {
    cloud = createSprite(590, 50, 50, 50);
    cloud.velocityX = -(3 + score / 200);
    cloud.addImage(cloud_img);
    cloud.scale = 0.55;
    cloud.y = Math.round(random(10, 100));
    console.log(trex.depth);
    console.log(cloud.depth);
    cloud.depth = trex.depth - 1;
    cloud.lifetime = 205
    cloudsGroup.add(cloud)
  }
}

// function spawn obstacles
function spawnObstacles()
{
  if (frameCount % 80 === 0)
  {
    obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -(6 + score / 200);

  var num1 = Math.round(random(1,6));
  switch(num1){
     case 1 : obstacle.addImage(ob1);
              break;
     
     case 2 : obstacle.addImage(ob2);
              break;

     case 3 : obstacle.addImage(ob3);
              break;

     case 4 : obstacle.addImage(ob4);
              break;

     case 5 : obstacle.addImage(ob5);
              break;

     case 6 : obstacle.addImage(ob6);
              break;
     
     default: break;
       
  }
  obstacle.scale = 0.4;
  obstacle.lifetime = 107;
  obstaclesGroup.add(obstacle);

  }

}

//calling function dragon
function spawnDragon()
{    
  if (frameCount % 120 === 0)
  {
    dragon = createSprite (590, 140, 10, 40)
    dragon.velocityX = -(6 + score / 200);
    dragon.addImage(dragon_img);
    dragon.scale = 0.13;
    var pos = Math.round(random(1, 3))
    switch(pos)
    {
      case 1 : dragon.y = 70;
               break;

      case 2 : dragon.y = 140;
               break;

      case 3 : dragon.y = 165;
               break;

      default: break;
    }
    dragon.lifetime = 150;
    dragonGroup.add(dragon);
  }
}

function restart1()
{
  gameState = play;
  restart.visible = false;
  gameOver.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  dragonGroup.destroyEach();
  score = 0;
}
