function RTS_AbilityCard(){
	//GUI_Element.call(this, this.position, "RTS.AbilityCardTex");

	this.position = [0.5,-0.35,0.5,0.65];
	this.abilityOffset = 0.01;
	this.abilityIconSize = 0.1;
	this.cardRowSize = 4;
	this.numRows = 4;

	this.abilities = new Array(this.cardRowSize * this.numRows);

	GUI_Element.call(this, this.position, "Texture0");
}

RTS_AbilityCard.prototype = Object.create(GUI_Element.prototype);
RTS_AbilityCard.prototype.constructor = RTS_AbilityCard;

RTS_AbilityCard.prototype.update = function(){
	for(var i = 0; i < this.abilities.length; i++){
		if(this.abilities[i])
			this.abilities[i].update();
	}
}


RTS_AbilityCard.prototype.draw = function(){
	GUI_Element.prototype.draw.call(this);

	for(var i = 0; i < this.abilities.length; i++){
		if(this.abilities[i]){
			var row = Math.floor(i / this.cardRowSize);
			var num = i - row * this.cardRowSize;

			var abilityPos = [this.position[0] + (this.abilityOffset+this.abilityIconSize) * num + this.abilityOffset, this.position[1] - row * (this.abilityIconSize + this.abilityOffset) - this.abilityOffset, this.abilityIconSize, this.abilityIconSize];

			this.abilities[i].position = abilityPos;
			this.abilities[i].draw(abilityPos);
		}
	}

};

