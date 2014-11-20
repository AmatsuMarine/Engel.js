function Camera(){
	var location = new Location();
	this.getLocation = function(){
		return location;
	}

	var behavior = null;

	this.setBehavior = function(component){
		component.gameObject = this;
		behavior = component;
	}

	var viewAngle = 45;
	var perspectiveMatrix = null;

	var setPerspectiveMatrix = function(){
		if(!perspectiveMatrix)
			perspectiveMatrix = mat4.create();
		
		mat4.perspective(viewAngle, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, perspectiveMatrix);
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
