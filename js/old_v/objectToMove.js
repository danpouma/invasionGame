function objectToMove(imageSrc, startX, startY, spd)
{
	var bImage = new Image();
	bImage.src = imageSrc;
	var startXValue = startX;
	var startYValue = startY;
	var x = startXValue;
	var y = (startYValue-(bImage.height));
	var vis = false;
	var SPEED = spd;
	
	this.update = function()
	{
		x -= SPEED;
		if(x < -(bImage.width)){
			x = startXValue;
			vis = false;
		}
	};
	
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
	
	return true;
}

