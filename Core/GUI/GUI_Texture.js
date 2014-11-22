function GUI_Texture(rect) {
	var position;
//	this.texture = image;
	this.shader = null;

	// buffers
	var vertexBuffer;
	var indexBuffer;

	this.onMouseOver = function(){
		// do something
		guis.add(new GUI_Texture([-0.1,0.1,0.2,0.2]));
	}

	this.checkMouseOver = function(){
		var mousePos = input.getMousePosZoned();

		return mousePos[0] >= position[0] && mousePos[0] <= position[0] + position[2] && mousePos[1] <= position[1] && mousePos[1] >= position[1] - position[3];
	}

	var createBuffers = function(){
		var vertices = [
			position[0], position[1],
			position[0] + position[2], position[1],
			position[0] + position[2], position[1] - position[3],
			position[0], position[1] - position[3]
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
		vertexBuffer.numItems = vertices.length; // number of vertices

		//indices buffer
		indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		indexBuffer.itemSize = 1;
		indexBuffer.numItems = indices.length;
		
		// shader
		if(this.shader == null){
			debug.log("Mesh does not have shader");
			this.shader = new GUI_Shader(this);
		}
	}

	// get shader
	this.getShader = function(){
		return this.shader;
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

	this.getIndexBuffer = function(){
		if(!indexBuffer){
			debug.log("GUI: null index buffer");
			createBuffers();
		}
		
		return indexBuffer;
	}

	var init = function(pos){
		this.shader = new GUI_Shader(this);
		
		if(!pos)
			position = [0,0,1,1];
		else
			position = pos;

		createBuffers();
	}

	init(rect);


	this.draw = function(){
		createBuffers();		
		if(this.shader == null){
			this.shader = new GUI_Shader(this);
			debug.log("GUI_Texture shader missing");
		}

		this.shader.draw();
	}



	

	
}
