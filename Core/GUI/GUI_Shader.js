function GUI_Shader(guiTexture){
	var update = true;

	// set GUI_Texture
	var guiTex = guiTexture;

	this.setGuiTex = function(gui){
		guiTex = gui;
	}
	
	// shader source strings
	this.vertexShaderString = 
		"attribute vec2 a_pos;" + 
		"attribute vec2 a_texCoord;" + 
		"varying vec2 v_texCoord;" +
		"void main() {" + 
		"	gl_Position = vec4(a_pos, 0.0, 1.0);" + 
		"	v_texCoord = a_texCoord;" +
		"}";

	this.fragmentShaderString = 
		"precision mediump float;" +
		"varying vec2 v_texCoord;" +
		"uniform sampler2D u_texture;" +
		"void main(void){" +
		"	gl_FragColor = texture2D(u_texture, vec2(v_texCoord.s,v_texCoord.t));" +
//		"	gl_FragColor = vec4(1.0, 0.5, 0.2, 1.0);" +
		"}";


	// store compiled shaders
	var vertexShader;
	var fragmentShader;

	// shader program
	var program;
	
	// shader program methods
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


		// shader position attribute
		if(!program.vertexPositionAttribute)
			program.vertexPositionAttribute = gl.getAttribLocation(program, "a_pos");
		gl.enableVertexAttribArray(program.vertexPositionAttribute);

		// vertex buffer
gl.bindBuffer(gl.ARRAY_BUFFER, guiTex.getVertexBuffer());
		gl.vertexAttribPointer(program.vertexPositionAttribute, guiTex.getVertexBuffer().itemSize, gl.FLOAT, false, 0, 0);


		// shader texture coordinate attribute
		if(!program.texCoordAttribute)
			program.texCoordAttribute = gl.getAttribLocation(program, "a_texCoord");
		gl.enableVertexAttribArray(program.texCoordAttribute);

		// texture coordinate buffer
gl.bindBuffer(gl.ARRAY_BUFFER, guiTex.getTexCoordBuffer());
		gl.vertexAttribPointer(program.texCoordAttribute, guiTex.getTexCoordBuffer().itemSize, gl.FLOAT, false, 0, 0);


		// shader texture uniform
		program.textureUniform = gl.getUniformLocation(program, "u_texture");
	}

	// override this for multiple textures
	this.setTextures = function(){
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, guiTex.getTexture());
		gl.uniform1i(program.textureUniform, 0);
	}
	
	// set arbitrary mat4 uniform
	this.setMatrix4fvUniform = function(uniform, value){
		var matrixUniform = gl.getUniformLocation(program, uniform);
		gl.uniformMatrix4fv(matrixUniform, false, new Float32Array(value));
	}

	// draw - called by GUI element
	this.draw = function(){
		gl.useProgram(this.getProgram());

		// set vertex and texture coordinate buffers
		this.setBuffers();

		// set the texture(s)
		this.setTextures();
		
		// bind indices
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, guiTex.getIndexBuffer());

		gl.drawElements(gl.TRIANGLES, guiTex.getIndexBuffer().numItems, gl.UNSIGNED_SHORT,0);
	}
	

	// compiles shaders
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
