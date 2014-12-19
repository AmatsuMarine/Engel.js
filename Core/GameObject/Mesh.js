function Mesh(){
	// primary mesh variables
	var vertices = [0.5,0.5,0,
				-0.5,0.5,0,
				-0.5,-0.5,0,
				0.25,-0.5,0];
	var normals = null;
	var uv;
	var indices = [0,1,2,
				0,3,2];

	// buffers
	var vertexBuffer;
	var normalBuffer;
	var uvBuffer;
	var indexBuffer;
	
	// create shader
	var shader = new Shader(this);

	this.getShader = function(){
		return shader;
	}

	this.setShader = function(newShader){
		shader = newShader;
	}

	// check collision between line segment and triangles
	this.checkCollision = function(start, end, location, out){
		var direction = arraySubtract(end, start);
		var position = location.getPosition();

		for(var i = 0; i * 3 < indices.length; i++){
			var triangle = [indices[i*3], indices[i*3+1], indices[i*3+2]];

			var vert0 = [vertices[triangle[0]] + position[0], + vertices[triangle[0]+1] + position[1], vertices[triangle[0]+2] + position[2]];
			var vert1 = [vertices[triangle[1]] + position[0], + vertices[triangle[1]+1] + position[1], vertices[triangle[1]+2] + position[2]];
			var vert2 = [vertices[triangle[2]] + position[0], + vertices[triangle[2]+1] + position[1], vertices[triangle[2]+2] + position[2]];

			// edges
			var v1 = arraySubtract(vert1, vert0);
			var v2 = arraySubtract(vert2, vert0);

			var cross = crossProduct(direction, v2);
			var dot = dotProduct(v1, cross);

			// do not continue if triangle is perpendicular to segment
			if(dot == 0){
				//debug.log("parallel");
			}else{
				var inverseDot = 1 / dot;
				var differenceStartVert0 = arraySubtract(start, vert0);

				var temp = inverseDot * dotProduct(differenceStartVert0, cross);

				// only proceed if valid
				if(temp > 1 || temp < 0){
					//debug.log("invalid collision " + temp);
				}else{
					var cross2 = crossProduct(differenceStartVert0, v1);
					var temp2 = inverseDot * dotProduct(direction, cross2);

					// only proceed if valid
					if(temp2 < 0 || temp + temp2 > 1){
						//debug.log("invalid collision values");
					}else{
						var distance = inverseDot * dotProduct(v2, cross2);

						if(distance > 0){
							if(out){
								out.distance = distance;
								//var difference = scaleVec(direction, distance);
								//out.position = arrayAdd(start, difference);
							}

							return true;
						}
					}
				}
			}
		}

		if(out)
			out.distance = -1;

		return false;
	};

	this.draw = function(location){
		this.createBuffers();

		if(!shader){
			debug.log("null shader - mesh");
			this.shader = new Shader(this);
		}

		if(!location)
			debug.log("location not found - mesh.draw");

		shader.draw(location);
	}

	this.createBuffers = function(){
		//vertex buffer
		vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		vertexBuffer.itemSize = 3; // 3 for XYZ
		vertexBuffer.numItems = 4; // number of vertices

		//normals buffer

		//indices buffer
		indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		indexBuffer.itemSize = 1;
		indexBuffer.numItems = indices.length;

		//uv buffer

		
		// shader
		if(!shader){
			debug.log("Mesh does not have shader");
			shader = new Shader(this);
		}
	}

	// get vertex buffer
	this.getVertexBuffer = function(){
		if(!vertexBuffer){
			debug.log("vertex buffer is null");
			this.createBuffers();
		}

		return vertexBuffer;
	}
	
	// get index buffer
	this.getIndexBuffer = function(){
		if(!indexBuffer){
			debug.log("index buffer is null");
			this.createBuffers();
		}

		return indexBuffer;
	}
}
