function RTS_UI(){

	var minimapFrame;
	var commandCardFrame;
	var resourceFrame;

	this.draw = function(){
		if(!minimapFrame){
			init();
			debug.log("RTS_UI null");
		}

		minimapFrame.draw();
		commandCardFrame.draw();
		resourceFrame.draw();

	}

	this.update = function(){

		gui.add(minimapFrame);
		gui.add(commandCardFrame);
		gui.add(resourceFrame);

	}

	var init = function(){

		minimapFrame = new GUI_Texture([-1.0,-0.25,0.65,0.75], "Texture0");
		commandCardFrame = new RTS_AbilityCard();
		resourceFrame = new GUI_Texture([0.65,1.0,0.35,0.15], "Texture0");

		// test mouseover
		commandCardFrame.mouseOverTex = new GUI_Texture([-0.1,0.1,0.2,0.2], "Texture0");
		commandCardFrame.onMouseOver = function(){
			if(!this.mouseOverTex)
				this.mouseOverTex = new GUI_Texture([-0.1,0.1,0.2,0.2], "Texture0");

				gui.add(this.mouseOverTex);
		}

		debug.log("create RTS_UI");
	}

	init();
	
}
