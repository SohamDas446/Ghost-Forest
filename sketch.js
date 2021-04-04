var bg ,bgi;
var bg1 ,bg1i;
var bg2 ,bg2i;
var g,gi;
var obs1,obs1i,obs1G;
var score;
var boy,boyi;
var obstaclesGroup;


var start= 0;
var play = 1;
var end = 3;

var gameState = 0;
function preload()
{
  bgi = loadImage("fb.png");
  bg1i = loadImage("fb1.png");
  bg2i = loadImage("fb2.png");
  gi = loadImage("Ghost.png");
  obs1i = loadImage("obs1.png");
  boyi = loadImage("mchar.png");
} 

function setup()
{
  createCanvas(500,400);

  

  bg = createSprite(300,200);
  bg.addImage("bgg",bgi );
  bg.scale = 0.6;
  bg.velocityX = -2;

  // bg1 = createSprite(1000,282);
  // bg1.addImage("bgg1",bg1i );
  // bg1.scale = 0.9;
  // bg1.velocityX = -2;

  // bg2 = createSprite(1600,282);
  // bg2.addImage("bgg2",bg2i );
  // bg2.scale = 0.9;
  // bg2.velocityX = -2;

  g = createSprite(80,280);
  g.addImage("gg",gi );
  g.scale = 0.4;

  boy = createSprite(250,360);
  boy.addImage("boy1",boyi );
  boy.scale = 0.1;
  invisibleGround = createSprite(200,400,400,10);
  invisibleGround.visible = 0;
  

  obstaclesGroup = new Group();
  score = 0;

}

function draw()
{
  background("");
 
  
  if(gameState === start)
  {
    bg.velocityX = 0;
    // bg1.velocityX = 0;
    // bg2.velocityX = 0;
    invisibleGround.x= boy.x;
    
    if(keyDown("Space"))
    {
      gameState = play;
    }
  }

  if(gameState===play)
  {
    spawnObstacles();
    bg.velocityX = -4;
    // bg1.velocityX = -4;
    // bg2.velocityX = -4;

    score = score + Math.round(getFrameRate()/3);
  if(bg.x < 200)

  {
    bg.x = 320;
  }

  boy.velocityY= +4;
  

  // if(bg1.x < 2)
  // {
  //   bg1.x = 1100;
  // }

  // if(bg2.x < 5)
 
  // {
  //   bg2.x = 2000;
  // }


  boy.setCollider("circle",0,0,250);
  boy.debug = 0;
  if(keyDown("space")&& boy.y >= 220) {
    boy.velocityY = -12;
   }
   boy.collide(invisibleGround);
   if(obstaclesGroup.isTouching(boy)){
  
    gameState = end;
    obstaclesGroup.setLifetimeEach(-1);
}
  }

  if(gameState === end)
  {
    bg.velocityX = 0;
    obs1.velocityX = 0;
    boy.velocityY = 0;
    if(keyDown("Space"))
    { 
      obstaclesGroup.destroyEach();
      gameState = start;
    }

  }
  drawSprites();
  // textSize(20)
 fill("white");
 stroke("White");
 strokeWeight(1);
  text("Score: "+ score, 600,50);
}

function spawnObstacles()
{
  if(frameCount%150 === 0)
  {
  obs1 = createSprite(700,380,50,50);
  obs1.addImage("o",obs1i );
  obs1.scale = 0.13 ;
  obs1.velocityX = -5;
  obs1.setCollider("rectangle",0,0,250,250);
  obs1.debug = 0;
  obs1.lifetime = 300;
  obstaclesGroup.add(obs1);
  }
}