
var shootRay = false;
function Player(imageSrc)
{
	var playerImage = new Image();
	playerImage.src = imageSrc;
	var x = 100;
	var y = 100;
	var MAX_AMMO_AMOUNT = 1000000;
	var bulletTick = 0;
	//this.ammo = [];
	var ammo = [];
	var rayWidth = playerImage.width/2;
	var rayHeight = 0;
	var rayX = 0;
	var rayY = 0;

	this.update = function()
	{
		checkKeys();
		updateAmmo();
	}
	
	this.draw = function()
	{

		ctx.fillStyle = "rgba(0,100,205,0.4)";
		//ctx.globalAlpha = .4;
		ctx.fillRect(rayX,rayY,rayWidth,rayHeight);

		ctx.fillSyle="#000000";
		ctx.globalAlpha = 1;
		ctx.drawImage(playerImage,x,y);
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
				ammo.push(new bullet("assets/shipAmmo.png",x + playerImage.width/2,y + playerImage.height/2,1.5));
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
					bl.visible = false;
					ammo.splice(bi,1);
					console.log("hit");
					playerScore+= 50;
					setScore();
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
	
	for(i in keys)
	{
		var aKey = keys[i];
		if((aKey == 37) || (aKey == 65))
			newX -= 1.5;
		if((aKey == 38) || (aKey == 87))
			newY -= 1.5;
		if((aKey == 39) || (aKey == 68))
			newX += 1.5;
		if((aKey == 40) || (aKey == 83))
			newY += 1.5;
		if(aKey == 32)//spacebar
			shootRay = true;
			
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
