function EngelComponent(){
	this.gameObject;

	this.getLocation = function(){
		return this.gameObject.getLocation();
	}

	this.onMouseOver = function(){
		// do something
	}

	this.onMouseDown = function(){
		// do something
	}

	this.addMethods = function(methods){
		var object = this;
		for(var name in methods){
			object[name] = methods[name];
		}
	}
}
