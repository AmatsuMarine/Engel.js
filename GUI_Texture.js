function GUI_Texture(rect, image) {
	this.position = rect;
	this.texture = image;
	

	this.onMouseOver(){
		// do something
		debug.log("mouse hovering");
	}
}
