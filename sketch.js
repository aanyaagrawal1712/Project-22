var starImg, fairyImg, bgImg;
var fairy , fairyVoice;
var star, starBody;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;


function preload(){
 //loading images
	starImg = loadImage("star.png");
	fairyImg = loadAnimation("fairyImage1.png","fairyImage2.png");
	bgImg = loadImage("starNight.png");
	fairyVoice = loadSound("JoyMusic.mp3");
}


function setup() {
	createCanvas(800, 750);

	fairyVoice.play();

 //creating fairy and star sprites
	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying",fairyImg);  
	fairy.scale =0.25;

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

 //creating our own engine and world
	engine = Engine.create();
	world = engine.world;

 //creating the starBody and adding it to our world
	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);

}


function draw() {
  background(bgImg);

  Engine.update(engine);

 //giving starBody positions
  star.x=starBody.position.x;
  star.y=starBody.position.y;

 //giving keyDown condition for the star to fall
  if(keyDown("space")){
	Matter.Body.setStatic(starBody, false);
}

 //giving condition for the star to land on the fairy's hand
  if(starBody.position.y > 470){
	  Matter.Body.setStatic(starBody, true);
  }

  drawSprites();

}

function keyPressed() {

 //giving key controls for the fairy
	if(keyCode===RIGHT_ARROW){
		fairy.x=fairy.x+30;
	}

	if(keyCode===LEFT_ARROW){
		fairy.x=fairy.x-30;
	}
}
