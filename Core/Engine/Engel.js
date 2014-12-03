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

	///////////////////////
	// Raycast functions //
	///////////////////////

	// vec[3], vec[3], float
	// returns collider array
	this.raycast = function(start, direction, distance, out){
		if(!distance)
			distance = this.camera.farDistance;

		var end = [];
		end[0] = direction[0] * distance + start[0];
		end[1] = direction[1] * distance + start[1];
		end[2] = direction[2] * distance + start[2];

		var _out = {};
		var _obj;
		var _distance = -1;

		for(var i = 0; i < gameObjects.length; i++){
			if(gameObjects[i].checkCollisionRay(start, end, _out)){
				//debug.log("raycast: " + i);
				if(_out.distance > _distance){
					_obj = gameObjects[i];
					out = _out;
					_distance = _out.distance;
				}
			}
		}

		return _obj;
	}

	this.raycastScreen = function(pos, distance, out){
		return this.raycast(this.camera.getLocation().getPosition(), this.camera.getWorldRay(pos), distance, out);
	}


	this.load = function(){
		loadEngelAssets();
		this.loadLevel(0);
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
			//debug.log(gameObjects[i].getLocation().getPosition());
		}

		input.update();

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

		var mouseOverObject = engelEngine.raycastScreen(input.mousePosZoned);
		if(mouseOverObject){
			mouseOverObject.onMouseOver();
			if(Input.mouseButton[0])
				mouseOverObject.onMouseDown();
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
		Engel.canvas.onmousedown = Input.handleMouseDown;
		Engel.canvas.onmousemove = Input.handleMouseMove;
		Engel.canvas.onmouseup = Input.handleMouseRelease;

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
