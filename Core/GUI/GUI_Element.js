function GUI_Element(rectPos, tex){
	this.position = rectPos;
	this.texture = assets.getTexture(tex);
	this.shader = new GUI_Shader(this);

	// buffers
	this.vertexBuffer = null;
	this.texCoordBuffer = null;
	this.indexBuffer = null;

	//this.init(rectPos, tex);

}

GUI_Element.prototype.init = function(rect, tex){
	if(!rect)
		this.position = [0,0,1,1];
	else
		this.position = rect;

	if(!tex)
		this.texture = assets.getTexture("texture0");
	else
		this.texture = assets.getTexture(tex);

	this.shader = new GUI_Shader(this);

	//this.createBuffers();
};


// Mouse Functions
GUI_Element.prototype.onMouseOver = function() { };
GUI_Element.prototype.onMouseClick = function() { };
GUI_Element.prototype.onMouseDown = function() { };
GUI_Element.prototype.onMouseUp = function() { };

// Allow custom mouse over check
GUI_Element.prototype.checkMouseOver = function(){
	return mouseInRect(this.position);
};


// get shader
GUI_Element.prototype.getShader = function(){
	return this.shader;
};

// get texture
GUI_Element.prototype.getTexture = function(){
	if(!this.texture){
		debug.log("null texture");
		this.texture = assets.getTexture("texture0");
	}
	return this.texture;
};

GUI_Element.prototype.createBuffers = function(){
	var vertices = [
		this.position[0], this.position[1],
		this.position[0] + this.position[2], this.position[1],
		this.position[0] + this.position[2], this.position[1] - this.position[3],
		this.position[0], this.position[1] - this.position[3]
		];

	var uvs = [
		0, 0,
		1, 0,
		1, 1,
		0, 1
	];


	var indices = [
		0,1,2,
		0,3,2
	];

	//vertex buffer
	this.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	this.vertexBuffer.itemSize = 2; // 2 for XY
	this.vertexBuffer.numItems = vertices.length; // number of vertices

	this.texCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
	this.texCoordBuffer.itemSize = 2;
	this.texCoordBuffer.numItems = uvs.length;

	//indices buffer
	this.indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	this.indexBuffer.itemSize = 1;
	this.indexBuffer.numItems = indices.length;
	
	// check shader
	if(!this.shader){
		debug.log("Mesh does not have shader");
		this.shader = new GUI_Shader(this);
	}
};

// draw GUI Element to screen
GUI_Element.prototype.draw = function(){
	this.createBuffers();
	
	if(!this.shader){
		this.shader = new GUI_Shader(this);
		debug.log("GUI_Texture shader missing");
	}

	this.shader.draw();

};

// get buffers
// return vertex buffer
GUI_Element.prototype.getVertexBuffer = function(){
	if(!this.vertexBuffer){
		debug.log("GUI: null vertex buffer");
		this.createBuffers();
	}

	return this.vertexBuffer;
};

GUI_Element.prototype.getTexCoordBuffer = function(){
	if(!this.texCoordBuffer){
		debug.log("GUI: null Texture Coordinate buffer");
		this.createBuffers();
	}

	return this.texCoordBuffer;
};

GUI_Element.prototype.getIndexBuffer = function(){
	if(!this.indexBuffer){
		debug.log("GUI: null index buffer");
		this.createBuffers();
	}
		
	return this.indexBuffer;
};


