function RTS_Ability(){
	this.icon = "Font_Sans";
	this.abilityName = "Name";
	this.description = "Description";

	this.effect;

	this.range = 1;

	this.cooldown = 0;
	this.startDelay = 0;
	this.timeRemaining = this.startDelay;

//	this.targetting = new RTS_Target();

	this.descPos = [0.5,-0.25,0.5,0.5];
	this.position = [-1,1,0.5,0.5];

	this.font = new GUI_Font("Font_Sans");

	this.caster;
}

// manual cast ability
RTS_Ability.prototype.cast = function(target){
	if(this.timeRemaining <= 0){
		this.timeRemaining = this.cooldown;

		// cast
		try{
			this.effect();
		} catch(e) {}
	}
}

// channel ability
RTS_Ability.prototype.channel = function(target){}

// passive on attack
RTS_Ability.prototype.onAttack = function(weapon, target){}

// passive on defend
RTS_Ability.prototype.onDefend = function(weapon, target){}

// details
RTS_Ability.prototype.onMouseOver = function(){
	this.font.drawText(this.abilityName, 16, arrayAdd(this.descPos, [0,0.05,0,0]));
	this.font.drawText(this.description, 13, this.descPos);
}

// draw
RTS_Ability.prototype.draw = function(pos){
	gui.add(new GUI_Texture(this.position, this.icon));

	if(mouseInRect(this.position)){
		this.onMouseOver();

		if(Input.mouseButton[0])
			this.cast();
	}
}

RTS_Ability.prototype.update = function(){
	this.timeRemaining -= engelEngine.deltaTime;
}
