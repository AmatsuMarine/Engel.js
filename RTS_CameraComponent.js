function RTS_CameraComponent(){
	this.gameObject = null;

	var edgeDistance = 20;
	var speed = 5;

	this.update = function(){
		// don't run if there is no object to run on
		if(this.gameObject){
			var mousePos = input.mousePos;
			var screenWidth = Engel.canvas.width;
			var screenHeight = Engel.canvas.height;

			var translation = [0,0,0];

			//debug.log(mousePos);

			if(mousePos[0] <= edgeDistance)
				translation[0] = -1;
			
			if(mousePos[0] >= screenWidth - edgeDistance)
				translation[0] = 1;

			if(mousePos[1] <= edgeDistance)
				translation[1] = 1;
			
			if(mousePos[1] >= screenHeight - edgeDistance)
				translation[1] = -1;

			for(var i = 0; i < 3; i++){
				translation[i] = translation[i] * speed * engelEngine.deltaTime;
			}

			this.gameObject.getLocation().translate(translation);
		}
	}
}
