var mario,ground
var movingmario
var groundimg,turtleimg
var ig
var play=1
var end=0
var gamestate=play
var tg,mariostop
var goldcoin
var silvercoin
var bronzecoin
var cg
var score
var jumpsound
var outsound
var gameoverimg
var resetimg



function preload()
{
  movingmario=loadAnimation("images/1.png","images/3.png","images/4.png","images/8.png","images/9.png","images/10.png",)
  groundimg=loadImage("images/ground.png")
  turtleimg=loadImage("images/turtle1.png")
  mariostop=loadAnimation("images/stop2.png")
  bronzecoin=loadAnimation("images/coins/b1.png","images/coins/b2.png","images/coins/b3.png","images/coins/b4.png","images/coins/b5.png","images/coins/b6.png","images/coins/b7.png")
  silvercoin=loadAnimation("images/coins/s1.png","images/coins/s2.png","images/coins/s3.png","images/coins/s4.png","images/coins/s5.png")
  goldcoin=loadAnimation("images/coins/g1.png","images/coins/g2.png","images/coins/g3.png","images/coins/g4.png","images/coins/g5.png","images/coins/g6.png")                                               
  jumpsound=loadSound("images/jump.mp3")
  outsound=loadSound("images/mario_lose.mp3")
  gameoverimg=loadImage("images/GO.png")
  resetimg=loadImage("images/R.png")
}
 

function setup()
{
  createCanvas(1300,720)
  
  //CREATING MARIO
  mario = createSprite(200,620,30,30)
  mario.addAnimation("moving",movingmario)
  mario.addAnimation("stop",mariostop)
 
  //CHANGING MARIO'S COLLIDER
    mario.setCollider("rectangle",0,0,50,mario.height)

  //CREATING ORIGINAL GROUND
  ground=createSprite(760,700,1500,40)
  ground.addImage(groundimg)
  
  //CREATING INVISIBLE GROUND
  ig=createSprite(760,680,1500,40)
  ig.visible=false

  reset=createSprite(650,500,50,50)
  reset.addImage(resetimg)
  reset.scale=0.2
  
  gameover=createSprite(650,300,50,50)
  gameover.addImage(gameoverimg)
  gameover.scale=3

  //BRINGING MARIO IN FRONT OF GROUND
  mario.depth=ground.depth
  mario.depth+=1
   
  //CREATING GROUPS
  tg=new Group() 
  cg=new Group()

  score=0 
  textSize(40)
  fill("black")
}

function draw()
{
  background("skyblue")
  drawSprites()

  
  text("Score:"+score,1000,50)
 
  if(gamestate===play)
  {
    //MOVING GROUND BACKWARD
      ground.velocityX=-(4+score/10)

    gameover.visible=false
    reset.visible=false  


    //MAKING MARIO JUMP
      if(keyDown("space")&&mario.y>=560)
      {
        mario.velocityY=-17
        mario.velocityX=0.6
        jumpsound.play()
      }      

    //GRAVITATIONAL PULL
       mario.velocityY=mario.velocityY+0.5

    //RESETING THE GROUND
      if(ground.x<0)
      {
        ground.x=ground.width/2
      }
 
    //SPAWNING TURTLES
      spawnturtle()
      spawncoin()
  
    //MAKING MARIO OUT 
      if(mario.isTouching(tg)) 
      {
        gamestate=end
        outsound.play()
      } 
   
      if(mario.isTouching(cg))
      {
        if(ran===1)
       {
         score+=6 
        //DESTROYING CG GROUP 
         cg.destroyEach()
       }
        else if(ran===2)
       {
        score+=4
        //DESTROYING CG GROUP
          cg.destroyEach()
       }
       else
       {
        score+=2
        //DESTROYING CG GROUP
         cg.destroyEach()
       }
      }
     
      if(mario.x>500)
      {
        mario.velocityX=0
      }
    }
  else if(gamestate===end)
  {
    gameover.visible=true
    reset.visible=true 
    
   
    //STOPING GROUND 
       ground.velocityX=0
       mario.velocityX=0
       mario.velocityY=0
       mario.changeAnimation("stop") 
      
      tg.setVelocityXEach(0)
      tg.setLifetimeEach(-1) 
      
      cg.setVelocityXEach(0)
      cg.setLifetimeEach(-1)
  
  
      if(mousePressedOver(reset))
      {
        restart()
      }
  
  } 
 
  
  
   //MAKING MARIO STAND ON GROUND
  mario.collide(ig)
  }

function restart()
{
 mario.x=200 
gamestate=play
score=0
tg.destroyEach()
cg.destroyEach()
mario.changeAnimation("moving")

}
function spawnturtle()
{
 // var fc=Math.round(random(150,400))
  if(frameCount%400===0) 
  {
    turtle=createSprite(1510,620,30,30)
    turtle.velocityX=-(3+score/10)
    turtle.addImage(turtleimg)
    turtle.scale=0.07
    turtle.lifetime=500
    tg.add(turtle)

  }

}


function spawncoin()
{
  if (frameCount%100===0)
   {
     coin=createSprite(1300,Math.round(random(200,400)),50,50)
     coin.velocityX=-3
     coin.lifetime=450
     
      ran = Math.round(random(1,3))
     switch(ran)
     {
       case 1: coin.addAnimation("gold",goldcoin) 
               break;
       case 2: coin.addAnimation("silver",silvercoin)
               break;
       case 3: coin.addAnimation("bronze",bronzecoin)
               break;
       default:break;
     }
     cg.add(coin)


   }   














}



































