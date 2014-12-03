function RTS_Unit(){
	this.size = 1;
	this.health = 100;

	this.location = new Location();
//	this.location.rotate([5,0,0]);

	this.movement = new RTS_Movement(this);
	this.weapon = new RTS_Weapon();
	this.armor = null;
	this.abilityCard = new RTS_AbilityCard();

	this.abilityCard.abilities[12] = new RTS_Ability();

	this.mesh = new Mesh();
//	this.cost = new RTS_Resource(0);
}

RTS_Unit.prototype.onMouseOver = function(){ debug.log("over");}
RTS_Unit.prototype.onMouseDown = function(){
	player.selectedUnit = this;
	player.money += engelEngine.deltaTime * 5;
}

RTS_Unit.prototype.lookAt = function(location){
	var pos1 = this.location.getPosition();
	var pos2 = location.getPosition();

	var angle = Math.atan2(pos2[2] - pos1[2], pos2[0] - pos1[0]) * 180.0 / Math.PI;

	this.location.rotate([0,0,-angle]);
}

RTS_Unit.prototype.getLocation = function(){
	return this.location;
}

RTS_Unit.prototype.damage = function(damage){
	this.health -= damage;

	if(this.health <= 0){
//		this.kill();
	}
};

RTS_Unit.prototype.update = function(){
//	debug.log(this.location.getPosition());

	this.movement.update();
	this.weapon.update();
	this.abilityCard.update();

//	this.location.update();

//	this.mesh.update();
};

RTS_Unit.prototype.draw = function(){
	this.mesh.draw(this.location);
};

RTS_Unit.prototype.checkCollisionRay = function(start, end, out){
	if(this.mesh)
		return this.mesh.checkCollision(start, end, this.location, out);

	return false;
}
