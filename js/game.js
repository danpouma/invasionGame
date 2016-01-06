//width="560" height="346"
var gameLevel = 0;
var levelTick = 1;

var width = 560;
var height = 346;

var brImage;
var thisPlayer;
var tank;

var c;
var ctx;

var buildings = [];
var trees = [];
var clouds = [];
var roadPaint = [];
var rImage;

var images = [];

var XVALUE = 570;
var YVALUE = 265;
var tick = 1;
var playerScore = 0;
var brImage_X;	

var brOffset = 0;
function init() {
	//images, and objects
	brImage = new Image();
	brImage.src = "assets/background1v2.png";
	rImage = new Image();
	rImage.src = "assets/roadPaint.png";
	thisPlayer = new Player("assets/ship.png");
	tank = new enemy("assets/tank.png");
	
	//create all buildings, list
	createBuildings();
	createTrees();
	createClouds();
	createRoadPaint();
	
	//get canvas stuff
	c = document.getElementById("myCanvas");
	ctx = c.getContext('2d');
	
	width = c.width;
	height = c.height;
	
	gameLoop();//return setInterval(gameLoop, 10);
}

window.requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame;
	//function(/* function */ callback, /* DOMElement */ element){
	//	window.setTimeout(callback, 1000/60);
	//};
})();


function gameLoop(){
	if(levelTick%4000 == 0){
		increment_Level();
		levelTick = 1;
		console.log("LEVEL UP: " + gameLevel);
	}
	else
		levelTick++;
		
	setTimeout(function(){
		requestAnimFrame(gameLoop, c); 
		clear();
		update();
		ctx.save()
		draw();
		ctx.restore();
		setScore(playerScore);
	}, 16);

}

function draw() {
	drawBackground();
	drawRoad();
	drawMovingThings();	
	tank.draw();
	thisPlayer.draw();
	drawExplosions();
}

function update() {
	tick++;
	updateExplosions();
	updateBuildings();
	updateRoad();
	updateClouds();
	updateTrees();
	
	tank.update();
	thisPlayer.update();
	checkCollisions();
}

function clear(){
	ctx.clearRect(0,0,width,height);
}

function drawBackground()
{
	ctx.drawImage(brImage,brOffset,0);   
	ctx.drawImage(brImage,width+brOffset-1,0);
	brOffset -= .2;
	if(-(brOffset) >= width)
		brOffset = 0;
}

function drawMovingThings(){
	for(cloud = 0; cloud < clouds.length; cloud++)
	{
		var aCloud = clouds[cloud];
		if(aCloud.visibility() == true){
			ctx.drawImage(aCloud.getImage(),aCloud.getX(),aCloud.getY());
		}
	}
	
	for(tree = 0; tree < trees.length; tree++)
	{
		var aTree = trees[tree];
		if(aTree.visibility() == true){
			ctx.drawImage(aTree.getImage(),aTree.getX(),aTree.getY(), aTree.getImage().width,aTree.getImage().height);
		}
	}
	for(build = 0; build < buildings.length; build++)
	{
		var aBuilding = buildings[build];
		if(aBuilding.visibility() == true){
			//ctx.drawImage(aBuilding.getImage(),aBuilding.getX(),aBuilding.getY(), aBuilding.getImage().width, aBuilding.getImage().height);
			aBuilding.draw();
		}
	}
}
function updateBuildings(){
	var ranNum;
	if((tick % 100) == 0)
	{
		ranNum = Math.floor(Math.random() * buildings.length);
		var b = buildings[ranNum];
		if(b.visibility() == false)
		{
			b.visible(true)
		}
		tick = 0;
	}
	
	for(build = 0; build < buildings.length; build++)
	{
		var aBuilding = buildings[build];
		if(aBuilding.visibility() == true)
		{
			aBuilding.update();
		}
	}
}
function updateTrees(){
	var ranNum;
	if((tick % 100) == 0)
	{
		ranNum = Math.floor(Math.random() * trees.length);
		var t = trees[ranNum];
		if(t.visibility() == false)
		{
			t.visible(true)
		}
		
		//tick = 0;
	}
	//else{ tick++;}
	
	for(tree = 0; tree < trees.length; tree++)
	{
		var aTree = trees[tree];
		if(aTree.visibility() == true)
		{
			aTree.update();
		}
	}
}
function updateClouds(){
	var ranNum;
	if((tick % 100) == 0)
	{
		ranNum = Math.floor(Math.random() * clouds.length);
		var c = clouds[ranNum];
		if(c.visibility() == false)
		{
			c.visible(true)
		}
		
		//tick = 0;
	}
	//else{ tick++;}
	
	for(cloud = 0; cloud < clouds.length; cloud++)
	{
		var aCloud = clouds[cloud];
		if(aCloud.visibility() == true)
		{
			aCloud.update();
		}
	}
}

function updateRoad(){
	for(paint = 0; paint < roadPaint.length; paint++)
	{
		var sp = roadPaint[paint];
		sp.x -= 1;
		if(sp.x < 0)
			sp.x = 595;
	}
}

function drawRoad()
{
	for(paint = 0; paint < roadPaint.length; paint++)
	{
		var sp = roadPaint[paint];
		ctx.drawImage(rImage, sp.x, sp.y);
	}
}

function updateExplosions()
{
	for(e = 0; e < explosions.length; e++)
	{
		var exp = explosions[e];
		exp.update();
		if(exp.isDone() == true)
			explosions.splice(e,1);
	}
}

function drawExplosions()
{
	for(e = 0; e < explosions.length; e++)
	{
		var exp = explosions[e];
		exp.draw();
	}
}
//create list of buildings
function createBuildings(){
	
	buildings.push(new objectToMove("assets/buildings/bakery.png", 595, 298, 1));
	buildings.push(new objectToMove("assets/buildings/buffet.png", 595, 298, 1));
	buildings.push(new objectToMove("assets/buildings/candyshop.png", 595, 298, 1));
	buildings.push(new objectToMove("assets/buildings/cigarcenter.png", 595, 298, 1));
	buildings.push(new objectToMove("assets/buildings/javahut.png", 595, 298, 1));
	buildings.push(new objectToMove("assets/buildings/pizza.png", 595, 298, 1));
	buildings.push(new objectToMove("assets/buildings/toxicmill.png", 595, 298, 1));
}

//create trees array, this is not efficient
function createTrees(){
	trees.push(new objectToMove("assets/trees/tree01.png", 595, 296, .45));
	trees.push(new objectToMove("assets/trees/tree02.png", 595, 296, .45));
	trees.push(new objectToMove("assets/trees/tree01.png", 595, 296, .45));
	trees.push(new objectToMove("assets/trees/tree02.png", 595, 296, .45));
	trees.push(new objectToMove("assets/trees/tree01.png", 595, 296, .45));
	trees.push(new objectToMove("assets/trees/tree02.png", 595, 296, .45));
	trees.push(new objectToMove("assets/trees/tree01.png", 595, 296, .45));
	trees.push(new objectToMove("assets/trees/tree02.png", 595, 296, .45));
	trees.push(new objectToMove("assets/trees/tree01.png", 595, 296, .45));
	trees.push(new objectToMove("assets/trees/tree02.png", 595, 296, .45));
}

//create clouds, this is not efficient
function createClouds(){
	clouds.push(new objectToMove("assets/clouds/cloud01.png", 595, 80, .35));
	clouds.push(new objectToMove("assets/clouds/cloud02.png", 595, 110, .35));
	clouds.push(new objectToMove("assets/clouds/cloud03.png", 595, 140, .35));
	clouds.push(new objectToMove("assets/clouds/cloud01.png", 595, 100, .35));
	clouds.push(new objectToMove("assets/clouds/cloud02.png", 595, 130, .35));
	clouds.push(new objectToMove("assets/clouds/cloud03.png", 595, 160, .35));
	clouds.push(new objectToMove("assets/clouds/cloud02.png", 595, 190, .35));
	clouds.push(new objectToMove("assets/clouds/cloud03.png", 595, 220, .35));
}

function createRoadPaint(){

	for(amount = width + 30; amount > 0; amount-=rImage.width)
	{
		roadPaint.push({ x:	amount,
						 y: 319});
	}
}
//see iff enemy has hit player
//player has hit enemy?
//player hit buildings?
function checkCollisions(){
	//enemyHit?
	tank.hitCheck();
	//playerHit?
	thisPlayer.hitCheck();
	//buildings?
	grabBuildings();
}

function grabBuildings()
{
	var locDif = thisPlayer.getY() + rayHeight;

	//setScore(locDif);
	for(ab = 0; ab < buildings.length; ab++)
	{
		b = buildings[ab];
		if((thisPlayer.getX()+ thisPlayer.getImage().width/2) > b.getX() && 
		(thisPlayer.getX()+ thisPlayer.getImage().width/2) < b.getX() + b.getImage().width &&
		(locDif >= 280 && locDif <= 300))
		{
			b.pullBuilding(true);
			if(b.getImage().src.indexOf("toxicmill.png") != -1 || b.getImage().src.indexOf("cigarcenter.png") != -1)
				minusHealth(1);
		}
		else
			b.pullBuilding(false);
			
	}
	
}

function resetGame()
{
	gameLevel = 0;
	tank.reset();
	tank.delAmmo();
	thisPlayer.reset();
	for(b = 0; b < buildings.length; b++)
	{
		var bl = buildings[b];
		bl.reset();
	}
	$("#health").width(100);
	playerScore = 0
}

function increment_Level()
{
	gameLevel++;
	tank.nextLevel();
	for(cloud = 0; cloud < clouds.length; cloud++)
	{
		var aCloud = clouds[cloud];
		aCloud.nextLevel();
	}
	
	for(tree = 0; tree < trees.length; tree++)
	{
		var aTree = trees[tree];
		aTree.nextLevel();
	}
	for(build = 0; build < buildings.length; build++)
	{
		var aBuilding = buildings[build];
		aBuilding.nextLevel();
	}
}

function minusHealth(amt){
	var cW = $("#health").width();
	cW -= amt;
	$("#health").width(cW);
	
	if(cW <= 0)
		resetGame();
}

function setScore(display){
	$("#score").text(display);
}
