var engelEngine;
var input;
var debug;
var gl;
var gui;
var assets;

// engine definition
function Engel(){
	// public variable declarations
	this.canvas; // canvas to draw on
	debug = new Debug();
	input = new Input();
	gui = new GUI();
	assets = new Assets();

	// User Interface
	var UI = null;

	// time between frames
	this.deltaTime = 0;
	
	// Cameras
	this.camera;
	
	// test GameObjects
	var gameObjects = [];
	

	//////////////////////
	// Engine functions //
	//////////////////////
	this.loadLevel = function(id){
		gameObjects = [];
		assets.getLevel(id);
	}

	this.setUI = function(newUI){
		UI = newUI;
	}

	this.addGameObject = function(gameObject){
		gameObjects.push(gameObject);
	}

	this.load = function(){
		loadEngelAssets();
		this.loadLevel("Demo");
	}

	// updates objects on screen
	var update = function(){
		if(this.camera == null){
			this.camera = new Camera();
			this.camera.setBehavior(new RTS_CameraComponent());

			engelEngine.camera = this.camera;
			debug.log("created new camera in update");
		}

		this.camera.update();
		
		for(var i = 0; i < gameObjects.length; i++){
			gameObjects[i].update();
		}

		input.update();

//		if(typeof this.UI === 'undefined' || this.UI == null)
//			this.UI = new RTS_UI();

//		if(UI)
//			UI.update();

		
	}

	// draw objects to screen
	var draw = function(){
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.viewport(0, 0, canvas.width, canvas.height);

		// draw objects
		for(var i = 0; i < gameObjects.length; i++){
			gameObjects[i].draw();
		}

		// draw UI
		if(UI){
			UI.draw();
			gui.checkMouseOver();
			UI.update();
		}


		// draw objects addded to GUI
		gui.draw();
		gui.clear();
	}


	this._runStartTime;
	this._lastStartTime;
	// run loop
	this.run = function(){
		//var _runStartTime, _runEndTime;

		this._runStartTime = new Date();

		if(this._lastStartTime)
			this.deltaTime = (this._runStartTime.getTime() - this._lastStartTime.getTime()) / 1000;
		else
			this.deltaTime = 0;

		this._lastStartTime = new Date();

		// run loop
		update();
		draw();

//		debug.primary("deltaTime = " + this.deltaTime);
	}

	// initialize Engel.js engine
	var init = function(){
		// get the canvas from the page
		this.canvas = document.getElementById('Engel-Canvas');
		Engel.canvas = this.canvas;

		// add listeners to the canvas
		Engel.canvas.addEventListener("click", Input.handleMouseClick);
		Engel.canvas.addEventListener("mousemove", Input.handleMouseMove);

		// initialize WebGL
		try{
			//gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext("webkit-3d") || canvas.getContext("moz-webgl");
			gl = WebGLUtils.setupWebGL(this.canvas);
			gl.viewportWidth = this.canvas.width;
			gl.viewportHeight = this.canvas.height;

			// enable floating point textures
			gl.getExtension("OES_texture_float");
		}
		catch(e){
			debug.log("Failed to create WebGL context");
		}

		// only proceed if there is a WebGL context
		if(!gl){
			gl = null;
			debug.log("No WebGL context");
		}
		else{
			gl.clearColor(0.0, 0.0, 0.5, 1.0);	// Clear to black, fully opaque
			gl.clearDepth(1.0);	// Clear everything
			gl.enable(gl.DEPTH_TEST);	// Enable depth testing
			gl.depthFunc(gl.LEQUAL);		// Near things obscure far things

			// save instance as global variable
			engelEngine = this;
		}
	}
	
	// setup
	init();
}

var engelInterval;

// start the engine
function startEngel(){
	engelEngine = new Engel();

	if(!engelEngine)
		debug.log("Problem loading EngelEngine");
	else{
		engelEngine.load();
	}

	if(!engelInterval)
		setEngelFPS(60);
}

function setEngelFPS(fps){
	if(engelInterval)
		clearInterval(engelInterval);
	engelInterval = setInterval(runEngel, 1000 / fps);
}

function runEngel(){
	if(!engelEngine){
		startEngel();
	}
	else{
		engelEngine.run();
	}
}

// start Engel when page is ready
$(window).ready(startEngel);

// run Engel outside of object control for optimal updates
//engelInterval = setInterval(runEngel, 1000 / 60);

// don't open menu on right clicking on the canvas
$('body').on('contextmenu', '#Engel-Canvas', function(e){ return false; });
