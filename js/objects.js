//////////////
//***************
//ORIGINAL FILES
//***************
//////////////

//////////////
//***************
//PLAYER
//***************
//////////////

var explosions = [];
var shootRay = false;
var rayHeight = 0;
function Player(imageSrc)
{
	var playerImage = new Image();
	playerImage.src = imageSrc;
	var x = 100;
	var y = 100;
	var MAX_AMMO_AMOUNT = 1000000;
	var bulletTick = 0;
	var ammo = [];
	var rayWidth = 30;
	var rayX = 0;
	var rayY = 0;
	var shipAngle = 0;
	
	this.update = function()
	{
		checkKeys();
		updateAmmo();
	}
	
	this.draw = function()
	{

		ctx.fillStyle = "rgba(255,255,255,0.4)";
		//ctx.globalAlpha = .4;
		ctx.fillRect(rayX,rayY,rayWidth,rayHeight);

		ctx.fillSyle="#000000";
		ctx.globalAlpha = 1;
		//ctx.drawImage(playerImage,x,y);
		ctx.save();
		ctx.translate(x+playerImage.width * 0.5, y+playerImage.height * 0.5);
		// Perform the rotation
		ctx.rotate((Math.PI / 180.0) * shipAngle);
		// Translate back to the top left of our image
		ctx.translate(-playerImage.width * 0.5, -playerImage.height * 0.5);
		// Finally we draw the image
		ctx.drawImage(playerImage, 0, 0);
		ctx.restore();
	
		drawAmmo();
	}
	
	this.getX = function()
	{
		return x;
	}
	
	this.incX = function(NEW_X)
	{
		x += NEW_X;
		rayX = x+playerImage.width/4;
	}
	
	this.getY = function()
	{
		return y;
	}
	
	this.incY = function(NEW_Y)
	{
		y += NEW_Y;
		rayY = y+playerImage.height/2;
	}
	
	this.getImage = function()
	{
		return playerImage;
	}
	
	this.getBulletsFired = function()
	{
		return ammo;
	}
	
	this.manageAmmo = function()
	{
		if(bulletTick % 10 == 0)
		{
			if(ammo.length > MAX_AMMO_AMOUNT)
			{
				for(a = 0; a < ammo.length; a++)
				{
					var aBullet = ammo[a];
					if(aBullet.visible == false)
					{
						aBullet.visible = true
						aBullet.setX(x + playerImage.width/2);
						aBullet.setY(y + playerImage.height/2);
					}
				}
			}
			else
			{
				ammo.push(new bullet("assets/shipAmmo.png",x + playerImage.width/2,y + playerImage.height/2,1.5, 0));
			}
		}
		bulletTick++;
	}
	
	this.hitCheck = function()
	{
		//console.log("checkhit");
		for(bi = 0; bi<ammo.length; bi++)
		{
			var bl = ammo[bi]
			if(bl.getX() > tank.getX() &&
				bl.getX() < (tank.getX() + tank.getImage().width) &&
				bl.getY() > tank.getY() &&
				bl.getY() < (tank.getY() + tank.getImage().height/2))
				{
					explosions.push(new explode(bl.getX(), bl.getY()));
					bl.visible = false;
					ammo.splice(bi,1);
					//console.log("hit");
					//playerScore+= 50;
					//setScore(playerScore);
					tank.decHealth();
				}
		}
	}
	
	this.incRay = function()
	{
		if(shootRay == true)
		{
			if(rayY + rayHeight < 298)
				rayHeight += 5;
			else if(rayY + rayHeight > 304)
				rayHeight -= 1.5;
		}
		else
		{
			if(rayHeight > 0)
				rayHeight *= .75;
		}
	}
	
	this.setAngle = function(a)
	{
		shipAngle = a;
	}
	
	this.reset = function()
	{
		x = 100;
		y = 100;
		ammo.length = 0;
	}
	
	var updateAmmo = function()
	{
		for(a = 0; a< ammo.length; a++)
		{
			var aBullet = ammo[a];
			if(aBullet.visible == true)
			{
				aBullet.update();
				if(aBullet.getY() > height)
				{
					ammo.splice(a,1);
				}
			}
		}
	}
	
	var drawAmmo = function()
	{
		for(a = 0; a < ammo.length; a++)
		{
			var oneA = ammo[a];
			if(oneA.visible == true)
			{
				ctx.drawImage(oneA.getImage(),oneA.getX(),oneA.getY());
			}
		}
	}
	
	return true;
}

var keys = [];
function checkKeys() {
	shootRay = false;
	var lastX = thisPlayer.getX();
	var lastY = thisPlayer.getY();
	
	var newX = 0;
	var newY = 0;
	thisPlayer.setAngle(1);
	for(i in keys)
	{
		var aKey = keys[i];
		if((aKey == 37) || (aKey == 65)){
			newX -= 1.5; //left
			thisPlayer.setAngle(-5);
		}
		if((aKey == 38) || (aKey == 87))
			newY -= 1.5;
		if((aKey == 39) || (aKey == 68)){
			newX += 1.5;
			thisPlayer.setAngle(5);
		}
		if((aKey == 40) || (aKey == 83))
			newY += 1.5;
		if(aKey == 32)//spacebar
		{
			shootRay = true;
			//console.log("space");
		}
			
	}
	
	thisPlayer.incRay();
	if(mouseDown == true)
		thisPlayer.manageAmmo();
	
	thisPlayer.incX(newX);
	thisPlayer.incY(newY);
	//thisPlayer.Update(newX,newY);
	
	if (thisPlayer.getX() + thisPlayer.getImage().width > width || thisPlayer.getX() < 0)
		thisPlayer.incX(-(newX));
	if (thisPlayer.getY() + thisPlayer.getImage().height > height || thisPlayer.getY() < 0)
		thisPlayer.incY(-(newY));
	
	//scrollWrapper(x,y);
		
}

document.onkeydown = function(ev) {
	if(keys.indexOf(ev.keyCode) == -1)
	{
		keys.push(ev.keyCode);
	}
}

document.onkeyup = function(ev) {
	var i = keys.indexOf(ev.keyCode);
    if (i != -1) {
        keys.splice(i, 1);
    }
}

var mouseDown = false;
document.onmousedown = function(ev) {
	mouseDown = true;
}

document.onmouseup = function(ev) {
	mouseDown = false;
	var i = keys.indexOf(ev.keyCode);
}
//////////////
//***************
//END PLAYER
//***************
//////////////

//////////////
//***************
//ENEMY
//***************
//////////////
function enemy(imageSrc)
{
	var eImage = new Image();
	eImage.src = imageSrc;
	var startXValue = width + 100;
	var startYValue = 310;
	var x = startXValue;
	var y = startYValue;
	var ammo = [];
	var bulletTick = 0;
	var health = 100;
	var destruct = false;
	var SPEED = .5;
	
	this.update = function()
	{
		if(x > thisPlayer.getX() + 40)
			x -= SPEED;
		else if(x < thisPlayer.getX() - 40)
			x += SPEED;
		else
		{
			if((x+eImage.width/2) > thisPlayer.getX() && x < thisPlayer.getX()+thisPlayer.getImage().width)
			{
				if(bulletTick % 10 == 0)
				{
					fire();
				}
				bulletTick++;
			}
		}
		updateAmmo();
	}
	
	this.draw = function()
	{
		if(destruct == true)
			ctx.globalAlpha = 0.5
		ctx.drawImage(eImage,x,y);
		if(destruct == true)
		{
			explosions.push(new explode(x + eImage.width/2, y+2));
			ctx.globalAlpha = 1;
			this.reset();
		}
		drawAmmo();
	}
	   
	this.getBulletsFired = function()
	{
		return ammo;
	}
	
	this.getY = function()
	{
		return y;
	}
	
	this.getX = function()
	{
		return x;
	}
	
	this.getImage = function()
	{
		return eImage;
	}
	
	this.hitCheck = function()
	{
		//console.log("checkhit");
		for(bi = 0; bi<ammo.length; bi++)
		{
			var bl = ammo[bi]
			if(bl.getX() > thisPlayer.getX() &&
				bl.getX() < (thisPlayer.getX() + thisPlayer.getImage().width) &&
				bl.getY() > thisPlayer.getY() &&
				bl.getY() < (thisPlayer.getY() + thisPlayer.getImage().height/2))
				{
					explosions.push(new explode(bl.getX(), bl.getY()));
					bl.visible = false;
					ammo.splice(bi,1);
					//console.log("hit");
					minusHealth(2);
				}
		}
	}
	
	this.reset = function()
	{
		x = startXValue;
		y = startYValue;
		health = 100;
		destruct = false;
	}
	
	this.delAmmo = function()
	{
		ammo.length = 0;
		SPEED = .5;
	}
	
	this.nextLevel = function()
	{
		SPEED *= 1.5;
	}
	
	this.decHealth = function()
	{
		health -= 10;
		if(health == 0)
		{
			destruct = true;
			selfDestruct();
		}
	}
	
	var selfDestruct = function()
	{
		//some shrapnel, r=2
		ammo.push(new bullet("assets/tankAmmo.png", x + eImage.width/2, y + eImage.height/2, -1, 0));
		ammo.push(new bullet("assets/tankAmmo.png", x + eImage.width/2, y + eImage.height/2, -.73, -1));
		ammo.push(new bullet("assets/tankAmmo.png", x + eImage.width/2, y + eImage.height/2, -.83, -.8));
		ammo.push(new bullet("assets/tankAmmo.png", x + eImage.width/2, y + eImage.height/2, -.91, -.6));
		ammo.push(new bullet("assets/tankAmmo.png", x + eImage.width/2, y + eImage.height/2, -.96, -.4));
		ammo.push(new bullet("assets/tankAmmo.png", x + eImage.width/2, y + eImage.height/2, -.99, -.2));
		ammo.push(new bullet("assets/tankAmmo.png", x + eImage.width/2, y + eImage.height/2, -.99, .2));
		ammo.push(new bullet("assets/tankAmmo.png", x + eImage.width/2, y + eImage.height/2, -.96, .4));
		ammo.push(new bullet("assets/tankAmmo.png", x + eImage.width/2, y + eImage.height/2, -.91, .6));
		ammo.push(new bullet("assets/tankAmmo.png", x + eImage.width/2, y + eImage.height/2, -.83, .8));
		ammo.push(new bullet("assets/tankAmmo.png", x + eImage.width/2, y + eImage.height/2, -.73, -1));
	}
	
	var fire = function()
	{
		ammo.push(new bullet("assets/tankAmmo.png", x + eImage.width/2, y + eImage.height/2, -1.5, 0));
	}
	
	var updateAmmo = function()
	{
		for(a = 0; a< ammo.length; a++)
		{
			var aBullet = ammo[a];
			if(aBullet.visible == true)
			{
				aBullet.update();
				if(aBullet.getY() < 0)
					ammo.splice(a,1);
			}
		}
	}
	
	var drawAmmo = function()
	{
		for(a = 0; a < ammo.length; a++)
		{
			var oneA = ammo[a];
			if(oneA.visible == true)
			{
				ctx.drawImage(oneA.getImage(),oneA.getX(),oneA.getY());
			}
		}
	}
	
	return true;
}
//////////////
//***************
//END ENEMY
//***************
//////////////

//////////////
//***************
//OBJECTS TO MOVE
//***************
//////////////
function objectToMove(imageSrc, startX, startY, spd)
{
	var bImage = new Image();
	bImage.src = imageSrc;
	var startXValue = startX;
	var startYValue = startY;
	var x = startXValue;
	var y = (startYValue-(bImage.height));
	startYValue = y;
	var vis = false;
	var SPEED = spd;
	var pullBuild = false;
	var angle = 0
	
	this.update = function()
	{
		x -= SPEED;
		x = Math.round(x*10)/10;
		if(pullBuild == true)
		{
			y -= SPEED;
			
			angle += .5;
			if(y <= thisPlayer.getY()-thisPlayer.getImage().height/2)
			{
				vis = false;
				x = startXValue;
				y = startYValue;
				playerScore += 100;
			}
		}
		else
		{
			if(y<startYValue)
			{
				y += 5;
				angle -= 2;
			}
			else
			{
				y = startYValue;
				angle = 0;
			}
		}		
			
		if(x < -(bImage.width)){
			this.reset();
			//x = startXValue;
			//y = startYValue;
			//vis = false;
		}
	};
	
	this.draw = function()
	{
		
		ctx.save();

		ctx.translate(x+bImage.width * 0.5, y+bImage.height * 0.5);
		// Perform the rotation
		ctx.rotate((Math.PI / 180.0) * angle);
		// Translate back to the top left of our image
		ctx.translate(-bImage.width * 0.5, -bImage.height * 0.5);
		// Finally we draw the image
		ctx.drawImage(bImage, 0, 0);
		ctx.restore();
	}
	
	this.pullBuilding = function(pullit){
		pullBuild = pullit;
	}
	
	this.visible = function(isVisible){
		vis = isVisible;
	};
	
	this.visibility = function(){
		return vis;
	};
	
	this.getImage = function(){
		return bImage;
	}
	
	this.getX = function(){
		return x;
	}
	
	this.getY = function(){
		return y;
	}
	
	this.setSpeed = function(new_speed){
		SPEED = new_speed;
	}
	
	this.reset = function(){
		x = startXValue;
		y = startYValue;
		vis = false;
		if(gameLevel == 0)
			SPEED = spd;
	}
	
	this.nextLevel = function()
	{
		SPEED *= 1.2;
	}
	
	return true;
}

//////////////
//***************
//END OBJECTS TO MOVE
//***************
//////////////

//////////////
//***************
//EXPLOSION
//***************
//////////////
function explode(xValue, yValue)
{
	var explosion = new Image();
	explosion.src = "assets/explosionCycle.png";
	var expFrames = 4;
	var frameWidth = explosion.width/expFrames;
	var currentFrame = 0;
	var frameChangeCount = 1;
	var done = false;
	var bulletX = xValue-(frameWidth/2);
	var bulletY = yValue;
	var frameX;a
	
	this.update = function()
	{

		if((frameChangeCount % 3) == 0 )
		{
			currentFrame++;
			if(currentFrame == 4){
				currentFrame = 0;
				done = true;
			}
			frameChangeCount = 1;
		}
		else
		{
			frameChangeCount++;
		}
		frameX = currentFrame * frameWidth;
		
	};
	
	this.draw = function()
	{
		ctx.drawImage(explosion, frameX, 0, frameWidth, explosion.height, bulletX, bulletY, frameWidth, explosion.height);
	};
	
	this.isDone = function()
	{
		return done;
	};
	
	return true;
}

//////////////
//***************
//BULLET
//***************
//////////////
function bullet(image_source, xValue, yValue, spdy, spdx)
{
	var bulletImage = new Image();
	bulletImage.src = image_source;
	var x = xValue;
	var y = yValue;
	var speedY = spdy;
	var speedX = spdx;
	this.visible = true;
	
	
	this.update = function()
	{
		y += speedY;
		x += speedX;
		//if(y > height-20)
		//{
		//	this.visible = false;
		//}
	};
	
	this.getImage = function()
	{
		return bulletImage;
	};
	
	this.getX = function()
	{
		return x;
	};
	
	this.setX = function(newX)
	{
		x = newX;
	};
	
	this.getY = function()
	{
		return y;
	};
}
//////////////
//***************
//END BULLET
//***************
//////////////