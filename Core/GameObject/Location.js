function Location(){
	// position variables
	var position = [0,0,0];
	var rotation = [0,0,0];
	var scale = [1,1,1];

	this.forward = [0,0,1];

	// initialize variables
	var awake = function(){
		if(!position){
			debug.log("no location position");

			position = [0,0,0];
			rotation = [0,0,0];
			scale = [1,1,1];
		}
	}

	this.getPosition = function(){
		return position;
	}

	this.getRotation = function(){
		return rotation;
	}

	this.getScale = function(){
		return scale;
	}

	this.translate = function(d){
		position[0] += d[0];
		position[1] += d[1];
		position[2] += d[2];
	}
	this.rotate = function(r){
		rotation[0] += r[0];
		rotation[1] += r[1];
		rotation[2] += r[2];

		this.forward = [rotation[0], rotation[1], -rotation[2]];
	}
	this.scale = function(s){
		if(typeof s === 'number'){
			scale[0] *= s;
			scale[1] *= s;
			scale[2] *= s;
		}
		else{
			scale[0] *= s[0];
			scale[1] *= s[1];
			scale[2] *= s[2];
		}
	}
	
	this.setPosition = function(p){
		position[0] = p[0];
		position[1] = p[1];
		position[2] = p[2];
	}
	
	this.setRotation = function(r){
		rotation[0] = r[0];
		rotation[1] = r[1];
		rotation[2] = r[2];
	}

	this.setScale = function(s){
		scale[0] = s[0];
		scale[1] = s[1];
		scale[2] = s[2];
	}

	this.getDistance = function(loc){
		var distance = 0;

		for(var i = 0; i < 3; i++){
			if(position[i] > loc.getPosition()[i])
				distance += position[i] - loc.getPosition()[i];
			else
				distance += loc.getPosition()[i] - position[i];
		}

			return distance;
	}


	var getLengthv3 = function(v){
		return v[0] + v[1] + v[2];
	}

	var getNormalizedv3 = function(v){
		var length = getLengthv3(v);
		return [v[0]/length, v[1]/length, v[2]/length];
	}

	var getNegativev3 = function(v){
		return [-1*v[0], -1*v[1], -1*v[2]];
	}

	// get view matrix of a location
	this.getViewMatrix = function(){
		var matrix = mat4.create();
		mat4.identity(matrix);

		mat4.translate(matrix, position);
		// rotate by 
		mat4.rotate(matrix, Math.PI/180 * getLengthv3(rotation), getNormalizedv3(rotation));
		// scaling
		mat4.scale(matrix, scale);

		return matrix;
	}

	this.getCameraMatrix = function(){
		var matrix = mat4.create();
		//mat4.identity(matrix);
//		mat4.inverse(this.getViewMatrix(), matrix);
		mat4.identity(matrix);

// rotate by 
		mat4.rotate(matrix, Math.PI/180 * getLengthv3(rotation), getNegativev3(getNormalizedv3(rotation)));
		mat4.translate(matrix, getNegativev3(position));
		
		// scaling
		mat4.scale(matrix, scale);
		return matrix;
	}

	this.getCameraRotationMatrix = function(){
		var matrix = mat4.create();
		mat4.identity(matrix);

		mat4.rotate(matrix, Math.PI/180 * getLengthv3(rotation), getNegativev3(getNormalizedv3(rotation)));

		return matrix;
	}
	
	awake();
}
