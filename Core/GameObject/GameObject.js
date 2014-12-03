function GameObject(objName){
	var name = "Game Object";
	
	// allow changing the GameObject's name
	this.setName = function(newName){
		if(typeof newName === 'undefined' || newName == null || newName == void 0)
			name = "Game Object";
		else{
			name = newName;
		}
	}

	// set name
	this.setName(objName);
	this.getName = function(){
		return name;
	}
	
	// sub-parts of GameObject
	var location = new Location();
	//this.mesh;
	var components = [];	

	this.mesh = new Mesh();

	this.getLocation = function(){
		return location;
	}


	this.checkMouseOver = function(){
		// check mouseOver, if true, call onMouseOver()
	}

	this.onMouseOver = function(){
		for(var i = 0; i < components.length; i++){
			components[i].onMouseOver();

			// also check mouseDown
			if(Input.mouseButton[0])
				components[i].onMouseDown();
		}
	}

	this.onMouseDown = function(){
		debug.log("gameObject mouseDown");

		for(var i = 0; i < components.length; i++){
			components[i].onMouseDown();
		}
	}

	this.addComponent = function(component){
		component.gameObject = this;
		components.push(component);
	}
	
	this.removeComponent = function(component){
		for(var i = 0; i < components.length; i++){
			if(components[i] == component){
				components.splice(i,1);
				break;
			}
		}
	}

	this.checkCollisionRay = function(start, end, out){
		if(this.mesh)
			return this.mesh.checkCollision(start, end, location, out);

		return false;
	}

	var awake = function(){
		debug.log(name + ": object.awake");

		this.mesh = new Mesh();	

		start();
	}

	var start = function(){
		debug.log(name + ": object.start");
	}

	this.update = function(){
		// update components
		for(var i = 0; i < components.length; i++){
			try{
				components[i].update();
			}
			catch(e) {}
		}
	}

	this.draw = function(){
		if(this.mesh)
			this.mesh.draw(location);
		else
			debug.log("mesh not found - GameObject");

		// draw components
		for(var i = 0; i < components.length; i++){
			try{
				components[i].onGUI();
			}
			catch(e) {}
		}
	}

	this.setName(objName);
	awake();
}
