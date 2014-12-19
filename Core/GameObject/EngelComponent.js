function EngelComponent(){
	this.gameObject;
}

EngelComponent.prototype.getLocation = function(){
	return this.gameObject.getLocation();
}

EngelComponent.prototype.onMouseOver = function(){
	// do something
}

EngelComponent.prototype.onMouseDown = function(){
	// do something
}

EngelComponent.prototype.addMethods = function(methods){
	var object = this;
	for(var name in methods){
		object[name] = methods[name];
	}
}
