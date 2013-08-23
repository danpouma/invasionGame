function enemy(imageSrc)
{
	var eImage = new Image();
	eImage.src = imageSrc;
	var x = width + 100;
	var y = 310;
	var ammo = [];
	var bulletTick = 0;
	
	this.update = function()
	{
		if(x > thisPlayer.getX() + 40)
			x -= .5;
		else if(x < thisPlayer.getX() - 40)
			x += .5;
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
		ctx.drawImage(eImage,x,y);
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
					bl.visible = false;
					ammo.splice(bi,1);
					console.log("hit");
					minusHealth();
				}
		}
	}
	
	var fire = function()
	{
		ammo.push(new bullet("assets/tankAmmo.png", x + eImage.width/2, y + eImage.height/2, -1.5));
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