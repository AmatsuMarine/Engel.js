function RTS_Unit(){
	this.size = 1;
	this.health = 100;

	this.location = new Location();

	this.icon = "Texture0";

	this.movement = new RTS_Movement(this);
	this.weapon = new RTS_Weapon(this);
	this.armor = new RTS_Armor(this);
	this.abilityCard = new RTS_AbilityCard();
	this.abilityCard.gameObject = this;

	this.abilityCard.addAbility(new RTS_Ability(), 12);

	if(this.movement)
		this.abilityCard.addAbility(this.movement.moveAbility(), 0);
	if(this.weapon)
		this.abilityCard.addAbility(this.weapon.attackAbility(), 3);

	this.mesh = new Mesh();
	this.cost = 10;

	this.trainUnits = [];

//	this.abilityQueue = [];
}

RTS_Unit.prototype.onMouseOver = function(){}
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
	if(this.armor)
		damage = this.armor.takeDamage(damage);

	this.health -= damage;

	debug.log("Unit damaged for " + damage + " damage. " + this.health + " health remaining");

	if(this.health <= 0){
		debug.log("Unit Killed");
		this.kill();
	}
};

RTS_Unit.prototype.kill = function(){
	if(player.selectedUnit == this)
		player.selectedUnit = null;

	engelEngine.removeGameObject(this);
}

RTS_Unit.prototype.getIconTex = function(){
	var icon = new GUI_Texture([0,0,0.1,0.1], this.icon);
	return icon;
}

RTS_Unit.prototype.addTrainableUnit = function(unit){
	this.trainUnits.push(unit);
}

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
