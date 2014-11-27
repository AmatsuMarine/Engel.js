function GUI_Font(tex){
	this.texture = assets.getTexture(tex);
	this._columns = 8;
	this._rows = Math.ceil(85/this.columns);

	//this.shader = new GUI_Shader(this);
}

GUI_Fontprototype._getRender = function(text, pt){
	var px = pt/0.75;

	var uvLetterWidth = 1 / this._columns;
	var uvLetterHeight = 1 / this._rows;

	var vertices = [];
	var uvs = [];
	var indices = [];
	
	for(var i = 0; i < text.length; i++){
		var letter = text.charCodeAt(i) - 32;
		var row = Math.floor(letter / this._columns);
		var col = letter - row * this._columns;

		vertices.concat([i*px, 0,
			(i+1)*px, 0,
			(i+1)*px, px,
			i*px, px]);

		uvs.concat([row, col,
			row + uvLetterWidth, col,
			row + uvLetterWidth, col + uvLetterHeight,
			row, col + uvLetterHeight]);
		
		indices.concat([i*4, i*4+1, i*4+2,
			i*4, i*4+3, i*4+2]);
	}

	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	vertexBuffer.itemSize = 2; // 2 for XY
	vertexBuffer.numItems = vertices.length; // number of vertices

	var texCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
	texCoordBuffer.itemSize = 2;
	texCoordBuffer.numItems = uvs.length;

	//indices buffer
	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	indexBuffer.itemSize = 1;
	indexBuffer.numItems = indices.length;


	// create render object to draw text
	var render = new Object();
	render.vertexBuffer = vertexBuffer;
	render.texCoordBuffer = texCoordBuffer;
	render.indexBuffer = indexBuffer;
	render.texture = this.texture;

	render.getVertexBuffer = function() { return this.vertexBuffer; };
	render.getTexCoordBuffer = function() { return this.texCoordBuffer; };
	render.getIndexBuffer = function() { return this.texCoordBuffer; };
	render.getTexture = function() { return this.texture; };

	render.shader = new GUI_Shader(render);

	return render;
};
