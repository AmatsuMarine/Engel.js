var player;

function RTS_UI(){

	var minimapFrame;
	var commandCardFrame;
	var resourceFrame;

	var clicked;

	var guiText;

	this.draw = function(){
		gui.add(minimapFrame);
		gui.add(resourceFrame);

		// attempt to draw text
		guiText.drawText('Engel RTS', 25, [-1,1,0,0]);

		guiText.drawText("" + Math.floor(player.money), 20, [0.75,1.0,0.3,0.15]);

		if(player.selectedUnit)
			gui.add(player.selectedUnit.abilityCard);
		else
			gui.add(commandCardFrame);
	}

	this.update = function(){
		var out = {};
		if(engelEngine.raycastScreen(input.mousePosZoned, 20, out)){
			clicked.position[0] = input.mousePosZoned[0];
			clicked.position[1] = input.mousePosZoned[1];
			gui.add(clicked);
		}
	}

	var init = function(){

		minimapFrame = new GUI_Texture([-1.0,-0.25,0.65,0.75], "Font_Sans");
		commandCardFrame = new RTS_AbilityCard();
		resourceFrame = new GUI_Texture([0.65,1.0,0.35,0.085], "Texture0");

		clicked = new GUI_Texture([0,0, 0.1, 0.1], "Texture0");
		guiText = new GUI_Font("Font_Sans");

		player = new RTS_Player();
	}

	init();
	
}
