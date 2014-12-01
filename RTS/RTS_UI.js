function RTS_UI(){

	var minimapFrame;
	var commandCardFrame;
	var resourceFrame;

	var guiText;

	this.draw = function(){
		gui.add(minimapFrame);
		gui.add(commandCardFrame);
		gui.add(resourceFrame);

		// attempt to draw text
		guiText.drawText('RustY Test', 25);
	}

	this.update = function(){
		//gui.add(minimapFrame);
		//gui.add(commandCardFrame);
		//gui.add(resourceFrame);

		//guiText.drawText("Font_Sans", 12, [-1,0,1,-1]);
	}

	var init = function(){

		minimapFrame = new GUI_Texture([-1.0,-0.25,0.65,0.75], "Font_Sans");
		commandCardFrame = new RTS_AbilityCard();
		resourceFrame = new GUI_Texture([0.65,1.0,0.35,0.15], "Texture0");

		// test mouseover
		commandCardFrame.mouseOverTex = new GUI_Texture([-0.1,0.1,0.2,0.2], "Texture0");
		commandCardFrame.onMouseOver = function(){
			if(!this.mouseOverTex)
				this.mouseOverTex = new GUI_Texture([-0.1,0.1,0.2,0.2], "Texture0");

			gui.add(this.mouseOverTex);
		}

		guiText = new GUI_Font("Font_Sans");

		debug.log("create RTS_UI");
	}

	init();
	
}
