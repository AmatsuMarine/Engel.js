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
		var inverseCamera = mat4.inverse(location.getCameraRotationMatrix()); // view
		var inversePerspective = mat4.inverse(perspectiveMatrix); // projection
		var screen = [array[0], array[1], -1, 1];

		var eye = [];
		mat4.multiplyVec4(inversePerspective, screen, eye);
//		var eye = multMatVec4(inversePerspective, screen);
		eye[2] = -1;
		eye[3] = 0;

//		eye[1] *= -1;

		var ray = [];
		mat4.multiplyVec4(inverseCamera, eye, ray);
//		ray = [ray[0], ray[1], ray[2]];
//		vec3.normal(ray);
//		var ray = multMatVec4(inverseCamera, eye);
		
		return ray;
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
