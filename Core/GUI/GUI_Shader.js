function GUI_Shader(guiTexture){
	var update = true;

	// set mesh
	this.guiTex;
	guiTex = guiTexture;

	//this.vertexShaderString;
	//this.fragmentShaderString;
	
	///////////////////////////
	// shader source strings //
	///////////////////////////
	this.vertexShaderString = 
		"attribute vec2 a_pos;" + 
		"void main() {" + 
		"   gl_Position = vec4(a_pos, 0.0, 1.0);" + 
		"}";

	this.fragmentShaderString = 
		"precision mediump float;" +
		"void main(void){" +
		"	gl_FragColor = vec4(1.0, 0.5, 0.2, 1.0);" +
		"}";

	////////////////////////////
	// store compiled shaders //
	////////////////////////////
	var vertexShader;
	var fragmentShader;

	var program;
	
	/////////////////////
	// program methods //
	/////////////////////
	var createProgram = function(){
		if(program)
			gl.deleteProgram(program);

		program = gl.createProgram();
	}

	this.getProgram = function(){
		if(update == true || !program){
			createProgram();

			this.compileVertexShader();
			this.compileFragmentShader();

			gl.linkProgram(program);

			update = false;
		}

		return program;
	}

	// vertex buffer
	this.setBuffers = function(){
		// check that the program exists first
		if(!program)
			program = this.getProgram();

		// shader position variable
		program.vertexPositionAttribute = gl.getAttribLocation(program, "a_pos");
		gl.enableVertexAttribArray(program.vertexPositionAttribute);
		
		// vertex buffer
		gl.vertexAttribPointer(program.vertexPositionAttribute, guiTex.getVertexBuffer().itemSize, gl.FLOAT, false, 0, 0);
	}
	
	// set arbitrary mat4 uniform
	this.setMatrix4fvUniform = function(uniform, value){
		var matrixUniform = gl.getUniformLocation(program, uniform);
		gl.uniformMatrix4fv(matrixUniform, false, new Float32Array(value));
	}

	// draw - called by GUI element
	this.draw = function(){
		//createProgram();

		gl.useProgram(this.getProgram());

		//gl.attachShader(program, vertexShader);
		//gl.attachShader(program, fragmentShader);

		this.setBuffers();

		gl.bindBuffer(gl.ARRAY_BUFFER, guiTex.getVertexBuffer());
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, guiTex.getIndexBuffer());

		gl.drawElements(gl.TRIANGLES, guiTex.getIndexBuffer().numItems, gl.UNSIGNED_SHORT,0);
	}
	
	/////////////////////
	// compiles shader //
	/////////////////////
	this.compileVertexShader = function(){
		vertexShader = gl.createShader(gl.VERTEX_SHADER);

		gl.shaderSource(vertexShader, this.vertexShaderString);
		gl.compileShader(vertexShader);

		gl.attachShader(program, vertexShader);

		update = true;
	}
	
	this.compileFragmentShader = function(){
		fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

		gl.shaderSource(fragmentShader, this.fragmentShaderString);
		gl.compileShader(fragmentShader);

		gl.attachShader(program, fragmentShader);

		update = true;
	}

}
