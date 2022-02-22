//Set up the various buffs
buffs = [];
buffs.push ({ //Poet's Brew
	name: "Poet's Brew",
	active: false,
	stacking: "time-set",
	amount: 0,
	onApply: function() {
		transSpeedBuffMult *= 0.5;
	},
	onTick: function() {},
	onRemove: function() {
		transSpeedBuffMult *= 2;
	}
});
buffs.push ({ //Light Show
	name: "Light Show",
	active: false,
	stacking: "amount",
	amount: 0,
	onApply: function() {},
	onTick: function() { gainPerformanceGold(3*this.amount); },
	onRemove: function() {}
});
buffs.push ({ //Immortalize in Gold
	name: "Immortalize in Gold",
	active: false,
	stacking: "time-set",
	amount: 0,
	onApply: function() {},
	onTick: function() {},
	onRemove: function() {}
});
buffs.push ({ //Mana Well
	name: "Mana Well",
	active: false,
	stacking: "amount",
	amount: 0,
	onApply: function() {},
	onTick: function() {},
	onRemove: function() {}
});

buffs.push ({ //Burst of Insight
	name: "Burst of Insight",
	active: false,
	stacking: "time-set",
	amount: 0,
	onApply: function() {
		transSpeedBuffMult *= 3;
	},
	onTick: function() {},
	onRemove: function() {
		transSpeedBuffMult /= 3;
	}
});
buffs.push ({ //Overflowing
	name: "Overflowing",
	active: false,
	stacking: "time-set",
	amount: 0,
	onApply: function() {},
	onTick: function() {},
	onRemove: function() {}
});