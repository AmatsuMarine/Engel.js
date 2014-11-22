function Input(){
	this.mousePos = [
		50,
		50
	];

	this.mousePosZoned = [0,0];

	this.nextMouseButton = [
		false,
		false,
		false
	];

	// resets the mouse button inputs
	var resetMouseButtons = function(){
		Input.mouseButton[0] = input.nextMouseButton[0];
		Input.mouseButton[1] = input.nextMouseButton[1];
		Input.mouseButton[2] = input.nextMouseButton[2];

		input.nextMouseButton[0] = false;
		input.nextMouseButton[1] = false;
		input.nextMouseButton[2] = false;
	}


	this.getMousePos = function(){
		return this.mousePos;
	}
	
	this.getMousePosZoned = function(){
		return this.mousePosZoned;
	}

	this.update = function(){
		resetMouseButtons();

// display mouse X/Y pos, left mouse button, and deltaTime
		debug.primary("<b>X:</b> " + this.mousePosZoned[0] + " <b>Y:</b> " + this.mousePosZoned[1] + " <b>Click:</b> " + Input.mouseButton[0] + " " + this.nextMouseButton[0] + " <b>Delta time:</b> " + engelEngine.deltaTime);


	}

	var init = function(){
		var canvas = document.getElementById('Engel-Canvas');
		
		this.mousePos = [
			canvas.width / 2,
			canvas.height / 2
		];
		
		this.nextMouseButton = [
			false,
			false,
			false
		];

		Input.mouseButton = [
			false,
			false,
			false
		];
	}
	// setup Input
	init();

	//var down = new Array(keys);
}

// store mouse position
Input.handleMouseMove = function(event){
	var offsetX = 0, offsetY = 0;
	var maxX = -1, maxY = -1;

	if(Engel.canvas){
		offsetX = Engel.canvas.getBoundingClientRect().left;
		offsetY = Engel.canvas.getBoundingClientRect().top;

		maxX = Engel.canvas.width;
		maxY = Engel.canvas.height;
	}
	else
		debug.log("no canvas");

	if(input){
		input.mousePos[0] = event.pageX - offsetX;
		input.mousePos[1] = event.pageY - offsetY;

		input.mousePosZoned[0] = (event.pageX - offsetX) / Engel.canvas.width * 2.0 - 1.0;
		input.mousePosZoned[1] = ((event.pageY - offsetY) / Engel.canvas.height - 0.5) * -2.0;
	}

	// max values
	if(maxX >= 0 && input.mousePos[0] > maxX)
		input.mousePos[0] = maxX;
	if(maxY >= 0 && input.mousePos[1] > maxY)
		input.mousePos[1] = maxY;

	// min values
	if(input.mousePos[0] < 0)
		input.mousePos[0] = 0;
	if(input.mousePos[1] < 0)
		input.mousePos[1] = 0;
}

// store mouse click
Input.handleMouseClick = function(event){
	input.nextMouseButton[0] = true;
}
