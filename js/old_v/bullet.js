function bullet(image_source, xValue, yValue, spd)
{
	var bulletImage = new Image();
	bulletImage.src = image_source;
	var x = xValue;
	var y = yValue;
	var speed = spd;
	this.visible = true;
	
	
	this.update = function()
	{
		y += speed;
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
	
	this.setY = function(newY)
	{
		y = newY;
	};
	
	this.setVisibility = function(isVisible)
	{
		//visible = isVisible; 
	};
	
	this.getVisibility = function()
	{
		//return visible;
	};
	
	return true;
}