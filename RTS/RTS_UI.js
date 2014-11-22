function RTS_UI(){

	this.minimapFrame;
	this.commandCardFrame;
	this.resourceFrame;

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
		minimapFrame = new GUI_Texture([-1.0,-0.25,0.65,0.75]);
		commandCardFrame = new GUI_Texture([0.5,-0.35,1.5,0.65]);
		resourceFrame = new GUI_Texture([0.65,1.0,0.35,0.15]);

		debug.log("create RTS_UI");
	}

	init();
	
}
