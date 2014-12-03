function Camera(){
	var location = new Location();
	this.farDistance = 100;

	this.getLocation = function(){
		return location;
	}

	var behavior = null;

	this.setBehavior = function(component){
		component.gameObject = this;
		behavior = component;

		component.start();
	}

	var viewAngle = 45;
	var perspectiveMatrix = null;

	var setPerspectiveMatrix = function(){
		if(!perspectiveMatrix)
			perspectiveMatrix = mat4.create();

		if(!this.farDistance)
			this.farDistance = 100;

		mat4.perspective(viewAngle, gl.viewportWidth / gl.viewportHeight, 0.1, this.farDistance, perspectiveMatrix);
	}

	this.getPerspectiveMatrix = function(){
		if(!perspectiveMatrix)
			setPerspectiveMatrix();

		if(!location){
			debug.log("Camera location not found");
			location = new Location();
		}

		var matrix = mat4.create();
		mat4.multiply(perspectiveMatrix, location.getCameraMatrix(), matrix);

		return matrix;
	}

	// input [x,y]
	// TODO: this is acting finicky - iron it out
	this.getWorldRay = function(array){
		var inverseCamera = mat4.inverse(this.getPerspectiveMatrix());
		var inversePerspective = mat4.inverse(perspectiveMatrix);
		var screen = [-1*array[0], -1*array[1], -1, 1];

		var eye = multMatVec4(inverseCamera, screen);
		eye[2] = 1;
		eye[3] = 0;

		var ray = multMatVec4(inverseCamera, eye);
		
		return eye;
	}

	this.update = function(){
		if(behavior != null){
			try{
				behavior.update();
			}
			catch(e){

			}
		}

		//location.rotate([-1,-1,-1]);
		
		setPerspectiveMatrix();
	}

	var awake = function(){
		if(!location){
			debug.log("Camera: null Location");
			location = new Location();
		}

		location.setPosition([0,0,5]);
		location.setRotation([0,0,0]);
		location.setScale([1,1,1]);
	}

	awake();
}
