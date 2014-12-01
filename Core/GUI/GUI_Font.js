function GUI_Font(tex){
	this.texture = tex;
	this._columns = 8;
	this._rows = Math.ceil(94.0 / this._columns);
}

function GUI_Font_Render(tex, columns, rows, text){
	GUI_Element.call(this, [0,0,1,1], tex);

	this._columns = columns;
	this._rows = rows;

	this.text = text;
	this.pt = 20; // points not converted to pixels yet

	this.createBuffers();
}

GUI_Font_Render.prototype = Object.create(GUI_Element.prototype);
GUI_Font_Render.prototype.constructor = GUI_Font_Render;


GUI_Font_Render.prototype.createBuffers = function(){
	var px = this.pt*96/72; // point to pixel conversion
	px /= Engel.canvas.width /2; // scale to size

	var uvLetterWidth = 1 / this._columns;
	var uvLetterHeight = 1 / this._rows;

	var vertices = [];
	var uvs = [];
	var indices = [];

	for(var i = 0; i < this.text.length; i++){
		var letter = this.text.charCodeAt(i) - 33;

		var row = Math.floor(letter / this._columns);
		var col = letter - row * this._columns;

//debug.log(row + " " + col);

		row *= uvLetterHeight;
		col *= uvLetterWidth;

		// OpenGL uses bottom-left coordinates
		row = 1 - row; // flip the y coordinates

//debug.log(row + " " + col);

		vertices.push(i*px);
		vertices.push(0);
		vertices.push((i+1)*px);
		vertices.push(0);
		vertices.push((i+1)*px);
		vertices.push(px);
		vertices.push(i*px);
		vertices.push(px);

		uvs.push(col); // x
		uvs.push(row - uvLetterHeight); // y
		uvs.push(col + uvLetterWidth); // x
		uvs.push(row - uvLetterHeight); // y
		uvs.push(col + uvLetterWidth); // x
		uvs.push(row); // y
		uvs.push(col); // x
		uvs.push(row); // y

		indices.push(i*4);
		indices.push(i*4+1);
		indices.push(i*4+2);

		indices.push(i*4);
		indices.push(i*4+3);
		indices.push(i*4+2);
	}


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
		debug.log("Font does not have shader");
		this.shader = new GUI_Shader(this);
	}
};


GUI_Font.prototype.drawText = function(text, pt){
	var render = new GUI_Font_Render(this.texture, this._columns, this._rows, text);
	render.pt = pt;
	gui.add(render);
};
