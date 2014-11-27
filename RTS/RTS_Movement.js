function RTS_Movement(gameObj){
	this.gameObject = gameObj;

	this.speed = 0;
	this._maxSpeed = 1;
	this._acceleration = 5;
	
	this._targetLocation = null;
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
	}

//	this.gameObject.location.velocity = speed;
};
