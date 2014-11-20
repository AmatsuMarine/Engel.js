function GUI_Texture(rect) {
	var position = rect;
//	this.texture = image;
	this.shader = new GUI_Shader(this);

	// buffers
	var vertexBuffer;
	var uvBuffer;
	var indexBuffer;

	this.onMouseOver = function(){
		// do something
		debug.log("mouse hovering");
	}

	this.draw = function(){
		if(!this.shader)
			this.shader = new GUI_Shader(this);

		this.shader.draw();
	}

	var createBuffers = function(){
		var vertices = [
			position[0], position[1],
			position[0] + position[2], position[1],
			position[0] + position[2], position[1] + position[3],
			position[0], position[1] + position[3]
			];

		var indices = [
			0,1,2,
			0,3,2
		];

		//vertex buffer
		vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		vertexBuffer.itemSize = 2; // 2 for XY
		vertexBuffer.numItems = 4; // number of vertices

		//indices buffer
		indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		indexBuffer.itemSize = 1;
		indexBuffer.numItems = indices.length;
		
		// shader
		if(!shader){
			debug.log("Mesh does not have shader");
			shader = new GUI_Shader(this);
		}
	}


	// return buffers

	// return vertex buffer
	this.getVertexBuffer = function(){
		if(!vertexBuffer){
			debug.log("GUI: null vertex buffer");
			createBuffers();
		}
		
		return vertexBuffer;
	}

	this.getUVBuffer = function(){
		if(!uvBuffer){
			debug.log("GUI: null UV buffer");
			createBuffers();
		}
		
		return uvBuffer;
	}

	this.getIndexBuffer = function(){
		if(!indexBuffer){
			debug.log("GUI: null index buffer");
			createBuffers();
		}
		
		return indexBuffer;
	}

	var init = function(){
		if(!this.shader)
			this.shader = new GUI_Shader(this);
		
		if(!position)
			position = [0,0,1,1];

		createBuffers();
	}

	init();
}
