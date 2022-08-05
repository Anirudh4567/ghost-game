var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.3
  invisibleBlockGroup = new Group();
  doorsGroup = new Group();
  climbersGroup = new Group();
  
  

}

function draw() {
  background(0);
  
  if (gameState == "play") {
    if(tower.y > 400){
      tower.y = 300
  }
  
      if (keyDown("space")) {
      ghost.velocityY = -10
      
      }

      if (keyDown("left")) {
      ghost.x -= 5
      }
      
      if (keyDown("right")) {
      ghost.x += 5
      }

      ghost.velocityY = ghost.velocityY + 0.8

      if (climbersGroup.isTouching(ghost)) {
        ghost.velocityY = 0;
      } 
      
      if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600 ) {
        ghost.destroy();
        gameState = "end"
      }
    
    
      spawnDoors();
      drawSprites();
    
  }

  if (gameState == "end") {
    stroke("yellow");
    fill("yellow")
    textSize(30);
    text("Game Over",230,250)
  }

  
 

  
  
}
function spawnDoors(){

if (frameCount % 200 === 0) {
  door = createSprite(100,-10);
  door.addImage("door",doorImg);
  door.x = Math.round(random(100,500));
  door.velocityY = 2;
  climber = createSprite(door.x,door.y+50);
  climber.addImage("climber",climberImg);
  //climber.scale = 0.6;
  climber.velocityY = 2;
  ghost.depth = door.depth+1
  var invisibleBlock = createSprite(climber.x,climber.y+10,60,1)
  invisibleBlock.velocityY = 2
  invisibleBlock.visible = false
  doorsGroup.add(door);
  invisibleBlockGroup.add(invisibleBlock);
  climbersGroup.add(climber);
  
}

}
