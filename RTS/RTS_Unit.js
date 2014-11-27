function RTS_Unit(){
	this.size = 1;
	this.health = 100;

	this.movement = new RTS_Movement(this);
	this.weapon = new RTS_Weapon();
	this.armor = null;
	this.abilityCard = new RTS_AbilityCard();
	
	this.location = new Location();

	this.mesh = new Mesh();
//	this.cost = new RTS_Resource(0);
}

RTS_Unit.prototype.damage = function(damage){
	this.health -= damage;

	if(this.health <= 0){
//		this.kill();
	}
};

RTS_Unit.prototype.update = function(){
	this.movement.update();
	this.weapon.update();
//	this.abilityCard.update();

//	this.location.update();

//	this.mesh.update();
};

RTS_Unit.prototype.draw = function(){
	this.mesh.draw(this.location);
};
