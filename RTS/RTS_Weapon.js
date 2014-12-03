function RTS_Weapon(gameObject){
	this.gameObject = gameObject;

	this.cooldown = 0;
	this.damage = 15;
	this.range = 1;

	this._reloadTime = 1;
}

RTS_Weapon.prototype.attackAbility = function(){
	var ability = new RTS_Ability();
	ability.abilityName = "Attack";
	ability.description = "Attack Command";
	ability.effect = function(){
		this.caster.weapon.attack(this.caster);
	};

	return ability;
}

RTS_Weapon.prototype.attack = function(target){
	// only attack if weapon is off cooldown
	// TODO: check if target is in range
	if(this._reloadTime <= 0){
		this._reloadTime = this.cooldown;

		target.damage(this.damage);
	}
};

RTS_Weapon.prototype.update = function(){
	// reload
	if(this._reloadTime > 0)
		this._reloadTime -= engelEngine.deltaTime;
	if(this._reloadTime < 0)
		this._reloadTime = 0;
};
