function Assets(){
	var textures = [];
	var texNames = [];

	// add texture by Integer Array
	this.addTexturei = function(colors, width, height, type, name){
		var pixelIntArray = new Uint8Array(colors);

		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);

		gl.texImage2D(gl.TEXTURE_2D, 0, type, width, height, 0, type, gl.UNSIGNED_BYTE, pixelIntArray);

		// Set the parameters so we can render any size image.
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

		textures.push(texture);

		if(!name)
			texNames.push("Texture" + texNames.length);
		else
			texNames.push(name);
	}

	// add texture by Float Array
	this.addTexturef = function(colors, width, height, type){
		var pixelFloatArray = new Float32Array(colors);

		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);

		gl.texImage2D(gl.TEXTURE_2D, 0, type, width, height, 0, type, gl.FLOAT, pixelFloatArray);

		// Set the parameters so we can render any size image.
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

		textures.push(texture);
		texNames.push("Texture" + texNames.length);
	}

	// get texture by either array index and name
	this.getTexture = function(id){
		if(typeof id === 'number')
			return textures[id];
		
		return textures[texNames.indexOf(id)];
	}
}
