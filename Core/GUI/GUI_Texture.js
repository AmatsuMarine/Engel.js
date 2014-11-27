function GUI_Texture(rect, tex) {
	GUI_Element.call(this, rect, tex);
}

GUI_Texture.prototype = Object.create(GUI_Element.prototype);
GUI_Texture.prototype.constructor = GUI_Texture;
