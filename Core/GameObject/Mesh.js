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

	// shader variable
	//this.shader;
	
	// create shader
	var shader = new Shader(this);

	this.draw = function(location){
		this.createBuffers();
		//shader.setBuffers();

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
