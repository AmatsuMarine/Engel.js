function RTS_Movement(gameObj){
	this.gameObject = gameObj;

	this.speed = 0;
	this._maxSpeed = 1;
	this._acceleration = 5;
	
	this._targetLocation;
}

RTS_Movement.prototype.moveAbility = function(){
	var ability = new RTS_Ability();
	ability.abilityName = "Move";
	ability.description = "Move Command";
	ability.effect = function(){
		var location = new Location();
		location.translate([this.caster.location.getPosition()[0],0,-9]);

		this.caster.movement.move(location);
	};

	return ability;
}

RTS_Movement.prototype.move = function(location){
debug.log("RTS Command: Move");
	this._targetLocation = location;
	this.gameObject.lookAt(location);
}


RTS_Movement.prototype.update = function(){
	if(!this._targetLocation){
		this.speed -= this._acceleration * engelEngine.deltaTime;

		if(this.speed < 0)
			this.speed = 0;
	}
	else{
		this.speed += this._acceleration * engelEngine.deltaTime;

		if(this.speed > this._maxSpeed)
			this.speed = this._maxSpeed;

		if(this._targetLocation.getDistance(this.gameObject.location) < this.speed){
			debug.log("stop movement");
			this._targetLocation = null;
		}
	}

//	debug.log(this.gameObject.location.forward);
	this.gameObject.location.translate(scaleVec(this.gameObject.location.forward, this.speed * engelEngine.deltaTime / 50));
};
