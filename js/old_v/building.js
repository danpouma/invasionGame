function building(imageSrc)
{
	this.bImage = new Image();
	this.bImage.src = imageSrc;
	this.x = 570;
	//y value wrongly assigned when page is first loaded
	//does not subtract image height
	this.y = (295-this.bImage.height);
	this.vis = false;
	
	this.update = function()
	{
		this.x -= .75;
		if(this.x < -100){
			this.x = 570;
			this.vis = false;
		}
	};
	
	this.visible = function(isVisible){
		this.vis = isVisible;
	};
	
	this.visibility = function(){
		return this.vis;
	};
	
	this.getImage = function(){
		return this.bImage;
	}
	
	this.getX = function(){
		return this.x;
	}
	
	this.getY = function(){
		return this.y;
	}
	
	return true;
}

