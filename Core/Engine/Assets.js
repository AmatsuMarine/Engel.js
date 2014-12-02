function Assets(){
	var textures = [];
	var levels = []; // levels saved as function;

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

		// associative array
		if(!name)
			textures["Texture" + (textures.length-1)] = texture;
		else
			textures["" + name] = texture; // allow name to be a number as well as a string
	}

	// add texture by Float Array
	this.addTexturef = function(colors, width, height, type, name){
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

		// associative array
		if(!name)
			textures["Texture" + (textures.length-1)] = texture;
		else
			textures["" + name] = texture; // allow name to be a number as well as a string
	}

	this.saveLevel = function(name, fn){
		levels.push(fn);
		
		// associative array
		if(!name)
			levels["Level" + (levels.length-1)] = fn;
		else
			levels["" + name] = fn; // allow name to be a number as well as a string
	}

	// get texture by either array index and name
	this.getTexture = function(id){
		return textures[id];
	}

	// build level from function
	this.getLevel = function(id){
		levels[id](); // call level build function
	}
}
