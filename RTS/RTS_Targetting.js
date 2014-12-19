function RTS_Targetting(gameObject){
	this.gameObject = gameObject;

	this.targetType = [];

	// allowed = neutral
	// required = is a ___
	for(var i = 0; i < this.typeLength; i++){
		this.targetType[i] = this.allowed;
	}
}

RTS_Targetting.prototype.canTarget = function(target){
	var targetting;
	if(typeof target === 'RTS_Unit'){
		targetting = target.targettable;
		debug.log("target RTS_Unit");
	}

	if(!targetting)
		targetting = target;

	if(targetting instanceof RTS_Targetting || !targetting){
		debug.log("Incorrect targetting Object");
		return false;
	}


	for(var i = 0; i < this.typeLength; i++){
		if((this.targetType[i] == this.denied && target.targetType[i] == target.required) || (this.targetType[i] == this.required && target.targetType[i] != target.required))
			return false;
	}

	return true;
};

RTS_Targetting.prototype.unit = 0;
RTS_Targetting.prototype.self = 1;
RTS_Targetting.prototype.ally = 2;
RTS_Targetting.prototype.foe = 3;
RTS_Targetting.prototype.harvester = 4;
RTS_Targetting.prototype.resource = 5;
RTS_Targetting.prototype.ground = 6;


RTS_Targetting.prototype.typeLength = 7;

RTS_Targetting.prototype.allowed = 0; // neutral
RTS_Targetting.prototype.required = 1; // required target / is a ___
RTS_Targetting.prototype.denied = -1; // target type not allowed
