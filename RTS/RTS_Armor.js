function RTS_Armor(gameObject){
	this.gameObject = gameObject;

	this.armorAmt = 10;
}

RTS_Armor.reduction = 0.05;

RTS_Armor.prototype.takeDamage = function(damage){
	damage -= damage * this.armorAmt * RTS_Armor.reduction / (1+RTS_Armor.reduction * this.armorAmt);

	return damage;
};
