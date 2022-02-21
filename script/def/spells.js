//Set up the various spells
spells = [];
spells.push({ //Minor Illusion
	name: "Minor Illusion",
	category: "performance",
	num: 1,
	descr: "Gain <span class=\"spellGold mult15\"></span> Gold and <span class=\"spellRenown mult2\"></span> Renown.",
	mana: 7,
	performance: true,
	unlocked: false,
	onCast: function() {
		gainPerformanceGold(15);
		gainPerformanceRenown(2);
	}
});
spells.push({ //Light Show
	name: "Light Show",
	descr: "Gain <span class=\"spellGold mult3\"></span> Gold/sec for the rest of the performance.",
	category: "performance",
	num: 2,
	mana: 9,
	performance: true,
	unlocked: false,
	onCast: function() {
		findActivateBuff("Light Show", 1);
	}
});
spells.push({ //Grand Finale
	name: "Grand Finale",
	descr: "Gain <span class=\"spellGold mult15\"></span> Gold and <span class=\"spellRenown mult5\"></span> Renown for each Light Show cast this performance.",
	category: "performance",
	num: 3,
	mana: 15,
	performance: true,
	unlocked: false,
	onCast: function() {
		gainPerformanceGold(find("Light Show",buffs).amount * 15);
		gainPerformanceRenown(find("Light Show",buffs).amount * 5);
	}
});

spells.push({ //Burst of Insight
	name: "Burst of Insight",
	descr: "Gain a x3 multiplier to Translation Speed for 10 seconds.",
	category: "buff",
	num: 1,
	mana: 8,
	performance: false,
	unlocked: false,
	onCast: function() {
		findActivateBuff("Burst of Insight", 10);
	}
});

spells.push({ //Gold Synthesis
	name: "Gold Synthesis",
	descr: "Gain 8 Gold.",
	category: "transmutation",
	num: 1,
	mana: 5,
	performance: false,
	unlocked: false,
	onCast: function() {
		gold += 8;
	}
});
spells.push({ //Sculpturecraft
	name: "Sculpturecraft",
	descr: "Spend 30 Gold in order to gain 10 Renown.",
	category: "transmutation",
	num: 2,
	mana: 18,
	performance: false,
	unlocked: false,
	onCast: function() {
		if(gold >= 30) {
			gold -= 30;
			gainRenown(10);
		}
	}
});