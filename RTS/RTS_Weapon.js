function RTS_Weapon(){
	this.cooldown = 0;
	this.damage = 1;
	this.range = 1;

	this._reloadTime = 1;
}

RTS_Weapon.prototype.attack = function(target){
	// only attack if weapon is off cooldown
	// TODO: check if target is in range
	if(this._reloadTime <= 0){
		this._reloadTime = this.cooldown;

		var weaponDamage = this.damage;

		target.damage(weaponDamage);
	}
};

RTS_Weapon.prototype.update = function(){
	// reload
	if(this._reloadTime > 0)
		this._reloadTime -= engelEngine.deltaTime;
	if(this._reloadTime < 0)
		this._reloadTime = 0;
};
