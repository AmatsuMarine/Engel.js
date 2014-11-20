function Shader(meshUsed){
	var update = true;

	// set mesh
	this.mesh;
	mesh = meshUsed;

	this.vertexShaderString;	
	this.fragmentShaderString;

	// create matrices
	var mvMatrix = mat4.create();
	var pMatrix = mat4.create();

	
	///////////////////////////
	// shader source strings //
	///////////////////////////
	vertexShaderString = 
		"attribute vec3 pos;" +	
		"uniform mat4 uMVMatrix;" +
		"uniform mat4 uPMatrix;" +  
		"void main() {" +  
		"   gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);" +
		//"   gl_Position = uMVMatrix * vec4(pos, 1.0);" +
		//"   gl_Position = vec4(pos, 1.0);" +
		"}";

	fragmentShaderString = 
		"precision mediump float;" +
		"void main(void){" +
		"	gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);" +
		"}";

	////////////////////////////
	// store compiled shaders //
	////////////////////////////
	var vertexShader;
	var fragmentShader;

	var program;
	
	var pMatrix, mvMatrix;
	
	/////////////////////
	// program methods //
	/////////////////////
	var createProgram = function(){
		if(program)
			gl.deleteProgram(program);

		program = gl.createProgram();
	}

	this.getProgram = function(){
		if(update == true){
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
		
		//if(!program.pMatrixUniform)
			program.pMatrixUniform = gl.getUniformLocation(program, "uPMatrix");
		//if(!program.cMatrixUniform)
		//	program.cMatrixUniform = gl.getUniformLocation(program, "uCMatrix");
		//if(!program.mvMatrixUniform)
			program.mvMatrixUniform = gl.getUniformLocation(program, "uMVMatrix");

		// shader position variable
		program.vertexPositionAttribute = gl.getAttribLocation(program, "pos");
		gl.enableVertexAttribArray(program.vertexPositionAttribute);
		
		// vertex buffer
		gl.vertexAttribPointer(program.vertexPositionAttribute, mesh.getVertexBuffer().itemSize, gl.FLOAT, false, 0, 0);
	}

	/*var getMatrixUniforms = function(){
		pMatrix = gl.getUniformLocation(program, "uPMatrix");
		mvMatrix = gl.getUniformLocation(program, "uMVMatrix");
	}*/

	// view matrix
	var setMatrixUniforms = function(location){
		// get the perspective matrix for the camera
		pMatrix = engelEngine.camera.getPerspectiveMatrix();
		gl.uniformMatrix4fv(program.pMatrixUniform, false, pMatrix);

		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, [-0.25, 0.0, 0.0]);

		if(!location){
			debug.log("Shader location null");
			gl.uniformMatrix4fv(program.mvMatrixUniform, false, mvMatrix);
		}
		else
			gl.uniformMatrix4fv(program.mvMatrixUniform, false, location.getViewMatrix());
	}
	
	// set arbitrary mat4 uniform
	this.setMatrix4fvUniform = function(uniform, value){
		var matrixUniform = gl.getUniformLocation(program, uniform);
		gl.uniformMatrix4fv(matrixUniform, false, new Float32Array(value));
	}

	// draw - called by Mesh
	this.draw = function(location){
		//mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.getVertexBuffer());
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.getIndexBuffer());

		setMatrixUniforms(location);

		gl.useProgram(program);

		gl.drawElements(gl.TRIANGLES, mesh.getIndexBuffer().numItems, gl.UNSIGNED_SHORT,0);

	}
	
	/////////////////////
	// compiles shader //
	/////////////////////
	this.compileVertexShader = function(){
		vertexShader = gl.createShader(gl.VERTEX_SHADER);

		gl.shaderSource(vertexShader, vertexShaderString);
		gl.compileShader(vertexShader);

		gl.attachShader(program, vertexShader);

		update = true;
	}
	
	this.compileFragmentShader = function(){
		fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

		gl.shaderSource(fragmentShader, fragmentShaderString);
		gl.compileShader(fragmentShader);

		gl.attachShader(program, fragmentShader);

		update = true;
	}
}
