function RTS_CameraComponent(){
	this.gameObject = null;

	var edgeDistance = 20;
	var speed = 5;

	this.mapSize = [5,5];

	this.update = function(){
		// don't run if there is no object to run on
		if(this.gameObject){
			var mousePos = input.mousePos;
			var screenWidth = Engel.canvas.width;
			var screenHeight = Engel.canvas.height;

			var translation = [0,0,0];

			if(mousePos[0] <= edgeDistance)
				translation[0] = -1;
			else if(mousePos[0] >= screenWidth - edgeDistance)
				translation[0] = 1;

			if(mousePos[1] <= edgeDistance)
				translation[1] = 1;
			else if(mousePos[1] >= screenHeight - edgeDistance)
				translation[1] = -1;

			if(translation[0] == -1){ // left
				if(translation[1] == 1) // top
					$('body').css('cursor','url(./Cursors/Upper-Left-Arrow.png),auto');
				else if(translation[1] == -1) // bottom
					$('body').css('cursor','url(./Cursors/Lower-Left-Arrow.png),auto');
				else // center
					$('body').css('cursor','url(./Cursors/Left-Arrow.png),auto');
			} else if(translation[0] == 1){ // right
				if(translation[1] == 1) // top
					$('body').css('cursor','url(./Cursors/Upper-Right-Arrow.png),auto');
				else if(translation[1] == -1) // bottom
					$('body').css('cursor','url(./Cursors/Lower-Right-Arrow.png),auto');
				else // center
					$('body').css('cursor','url(./Cursors/Right-Arrow.png),auto');
			}
			else{// center
				if(translation[1] == 1) // top
					$('body').css('cursor','url(./Cursors/Upper-Arrow.png),auto');
				else if(translation[1] == -1) // bottom
					$('body').css('cursor','url(./Cursors/Lower-Arrow.png),auto');
				else // center
					$('body').css('cursor','url(./Cursors/Neutral-Arrow.png),auto');

			}

			for(var i = 0; i < 3; i++){
				translation[i] = translation[i] * speed * engelEngine.deltaTime;
			}

			var location = this.gameObject.getLocation();
			location.translate(translation);

			var position = location.getPosition();

			if(position[0] < -0.5 * this.mapSize[0])
				position[0] = -0.5 * this.mapSize[0];
			else if(position[0] > 0.5 * this.mapSize[0])
				position[0] = 0.5 * this.mapSize[0];

			if(position[1] < -0.5 * this.mapSize[1])
				position[1] = -0.5 * this.mapSize[1];
			else if(position[1] > 0.5 * this.mapSize[1])
				position[1] = 0.5 * this.mapSize[1];

			location.setPosition(position);
		}
	}
}
