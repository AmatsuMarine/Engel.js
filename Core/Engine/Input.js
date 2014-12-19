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

	this.nextClick = [
		false,
		false,
		false
	];

	// resets the mouse button inputs
	var resetMouseButtons = function(){
		Input.mouseButton[0] = input.nextMouseButton[0];
		Input.mouseButton[1] = input.nextMouseButton[1];
		Input.mouseButton[2] = input.nextMouseButton[2];

		Input.mouseClick[0] = input.nextClick[0];
		Input.mouseClick[1] = input.nextClick[1];
		Input.mouseClick[2] = input.nextClick[2];

		input.nextClick[0] = false;
		input.nextClick[1] = false;
		input.nextClick[2] = false;
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
		debug.primary("<b>X:</b> " + this.mousePosZoned[0] + " <b>Y:</b> " + this.mousePosZoned[1] + " <b>Click:</b> " + Input.mouseButton[0] + " " + Input.mouseClick[0] + " <b>Delta time:</b> " + engelEngine.deltaTime);
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

		this.nextClick = [
			false,
			false,
			false
		];

		Input.mouseClick = [
			false,
			false,
			false
		];
	}
	// setup Input
	init();

	//var down = new Array(keys);
}

Input.mouseClick = [];
Input.mouseButton = [];

// store mouse position
Input.handleMouseMove = function(event){
	var offsetX = 0, offsetY = 0;
	var maxX = -1, maxY = -1;

	if(Engel.canvas){
//		offsetX = Engel.canvas.getBoundingClientRect().left;
//		offsetY = Engel.canvas.getBoundingClientRect().top;
		offsetX = $('#Engel-Canvas').offset().left;
		offsetY = $('#Engel-Canvas').offset().top;

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

	document.selection.empty();
}

// store mouse click
Input.handleMouseDown = function(event){
	var key = event.which;

	if(key == 1){
		input.nextMouseButton[0] = true;
		input.nextClick[0] = true;
	}
	else if(key == 2){
		input.nextMouseButton[1] = true;
		input.nextClick[1] = true;
//		debug.log("middle click");
	}
	else if(key == 3){
		input.nextMouseButton[2] = true;
		input.nextClick[2] = true;
//		debug.log("right click");
	}
}

Input.handleMouseRelease = function(event){
	var key = event.which;
	if(key == 1)
		input.nextMouseButton[0] = false;
	else if(key == 2){
		input.nextMouseButton[1] = false;
//		debug.log("middle up");
	}
	else if(key == 3){
		input.nextMouseButton[2] = false;
//		debug.log("right up");
	}
}

Input.handleRightClick = function(event){
//	input.nextMouseButton[1] = true;
//	debug.log("Right click");
	return false;
}
