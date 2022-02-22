research = [];

//--Scroll of the Ancient Tongue --
research.push({ //Basic Lexicon
	name: "Basic Lexicon",
	inScroll: "ancientTongue",
	descr: "Gain a 2x multiplier to Translation speed.",
	words: 0,
	maxWords: 10,
	active: false,
	complete: false,
	onComplete: function() {
		transSpeedResearchMult *= 2;
	}
});
research.push({ //Burst of Insight
	name: "Burst of Insight",
	inScroll: "ancientTongue",
	descr: "Unlocks the buff spell Burst of Insight, which multiplies your translation speed by x3 for 10 seconds.",
	words: 0,
	maxWords: 150,
	active: false,
	complete: false,
	onComplete: function() {
		findUnlockSpell("Burst of Insight");
	}
});
research.push({ //Gramatical Structures
	name: "Gramatical Structures",
	inScroll: "ancientTongue",
	descr: "Gain a 3x multiplier to Translation speed.",
	words: 0,
	maxWords: 400,
	active: false,
	complete: false,
	onComplete: function() {
		transSpeedResearchMult *= 3;
	}
});
research.push({ //Verbal Introductions
	name: "Verbal Introductions",
	inScroll: "ancientTongue",
	descr: "When you begin a performance, gain 3 renown",
	words: 0,
	maxWords: 1000,
	active: false,
	complete: false,
	onComplete: function() {}
});
research.push({ //Insightful Study
	name: "Insightful Study",
	inScroll: "ancientTongue",
	descr: "The Burst of Insight spell now lasts for 3x as long.",
	words: 0,
	maxWords: 4000,
	active: false,
	complete: false,
	onComplete: function() {
		burstOfInsight = find("Burst of Insight", spells)
		burstOfInsight.onCast = function() {findActivateBuff("Burst of Insight", 30);}
		fadePulse(document.getElementById("spellDescr-"+burstOfInsight.name));
		updateSpellDescr("Burst of Insight", "Gain a x3 multiplier to Translation Speed for 30 seconds.");
	}
});

//-- Scroll of the First Light --
research.push({ //Fundamentals Of Magic
	name: "Fundamentals of Magic",
	inScroll: "firstLight",
	descr: "Increases your Maximum Mana by 10 and your Mana Regen by 1 Mana/sec.",
	words: 0,
	maxWords: 10,
	active: false,
	complete: false,
	onComplete: function() {
		manaMaxBase += 10;
		manaRegenBase += 1;
		appear("nav-magic-tab");
	}
});
research.push({ //Minor Illusion
	name: "Minor Illusion",
	inScroll: "firstLight",
	descr: "Unlocks the performance spell Minor Illusion, which generates Gold and Renown.",
	words: 0,
	maxWords: 25,
	active: false,
	complete: false,
	onComplete: function() {
		findUnlockSpell("Minor Illusion");
	}
});
research.push({ //Light Show
	name: "Light Show",
	inScroll: "firstLight",
	descr: "Unlocks the performance spell Light Show, which generates passive Gold while the performance lasts.",
	words: 0,
	maxWords: 500,
	active: false,
	complete: false,
	onComplete: function() {
		findUnlockSpell("Light Show");
	}
});
research.push({ //Illuminary Focus
	name: "Illuminary Focus",
	inScroll: "firstLight",
	descr: "Reduces the mana cost of all spells from this scroll by 2.",
	words: 0,
	maxWords: 2000,
	active: false,
	complete: false,
	onComplete: function() {
		find("Minor Illusion", spells).mana -= 2;
		find("Light Show", spells).mana -= 2;
		find("Grand Finale", spells).mana -= 2;
		spells.forEach(function(value) {if(value.unlocked) {document.getElementById("spellTitle-"+value.name).innerHTML = value.name + " (Mana: " + value.mana + ")";
		elems = document.getElementsByClassName('perfSpellTitle-'+value.name.replace(/ /g, "-"));
		for (var i = 0, len = elems.length; i < len; i++) {
			elems[i].innerHTML = value.name + " (Mana: " + value.mana + ")";
			fadeIn(elems[i]);
		}}});
		fadePulse(document.getElementById("spellTitle-"+"Minor Illusion"));
		fadePulse(document.getElementById("spellTitle-"+"Light Show"));
		fadePulse(document.getElementById("spellTitle-"+"Grand Finale"));
	}
});
research.push({ //Grand Finale
	name: "Grand Finale",
	inScroll: "firstLight",
	descr: "Unlocks the performance spell Grand Finale, which generates Gold and Renown based on the times you've cast Light Show this performance.",
	words: 0,
	maxWords: 5000,
	active: false,
	complete: false,
	onComplete: function() {
		findUnlockSpell("Grand Finale");
	}
});

//-- Scroll of the Flowing Metal --
research.push({ //Gold Synthesis
	name: "Gold Synthesis",
	inScroll: "flowingMetal",
	descr: "Unlocks the transmutation spell Gold Synthesis, which creates Gold.",
	words: 0,
	maxWords: 3000,
	active: false,
	complete: false,
	onComplete: function() {
		findUnlockSpell("Gold Synthesis");
	}
});
research.push({ //Sculpturecraft
	name: "Sculpturecraft",
	inScroll: "flowingMetal",
	descr: "Unlocks the transmutation spell Sculpturecraft, which converts your Gold into Renown.",
	words: 0,
	maxWords: 6000,
	active: false,
	complete: false,
	onComplete: function() {
		findUnlockSpell("Sculpturecraft");
	}
});
research.push({ //Particle Accumulation
	name: "Metalic Flow",
	inScroll: "flowingMetal",
	descr: "Gain 4 Gold per second.",
	words: 0,
	maxWords: 6000,
	active: false,
	complete: false,
	onComplete: function() {}
});
research.push({ //Live Demonstration
	name: "Live Demonstration",
	inScroll: "flowingMetal",
	descr: "Gold Synthesis and Metalic Flow now scale off your base performance Gold multiplier.",
	words: 0,
	maxWords: 8000,
	active: false,
	complete: false,
	onComplete: function() {
		goldSynthesis = find("Gold Synthesis", spells)
		goldSynthesis.onCast = function() {gold += 5*getPerformanceMult();}
		updateSpellDescr("Gold Synthesis", "Gain <span class=\"spellGoldNoPerf mult5\"></span> Gold. (Scales off base performance multiplier)");
		document.getElementById("researchDescr-Metalic Flow").innerHTML = "Gain <span class=\"spellGoldNoPerf mult4\"></span> Gold per second (Scales off base performance multiplier)."
	}
});
research.push({ //Immortalize in Gold
	name: "Immortalize in Gold",
	inScroll: "flowingMetal",
	descr: "Unlocks the performance spell Immortalize in Gold, which doubles your performance Gold gained for the next 5 seconds.",
	words: 0,
	maxWords: 10000,
	active: false,
	complete: false,
	onComplete: function() {
		findUnlockSpell("Immortalize in Gold");
	}
});

// -- Scroll of the Ponderous Orb --
research.push({ //Display of Power
	name: "Display of Power",
	inScroll: "ponderousOrb",
	descr: "Unlocks the performance spell Display of Power, which costs a great deal of mana put produces even greater Gold and Renown.",
	words: 0,
	maxWords: 10000,
	active: false,
	complete: false,
	onComplete: function() {
		findUnlockSpell("Display of Power");
	}
});
research.push({ //Unseen Depths
	name: "Unseen Depths",
	inScroll: "ponderousOrb",
	descr: "Increases your base maximum mana by 25.",
	words: 0,
	maxWords: 12000,
	active: false,
	complete: false,
	onComplete: function() {
		manaMaxBase += 25;
	}
});
research.push({ //Mana Well
	name: "Mana Well",
	inScroll: "ponderousOrb",
	descr: "Unlocks the performance spell Mana Well, which generates mana after casting two more performance spells after it. (Does not stack if used multiple times in a row).",
	words: 0,
	maxWords: 15000,
	active: false,
	complete: false,
	onComplete: function() {
		findUnlockSpell("Mana Well");
	}
});
research.push({ //Overflowing
	name: "Overflowing",
	inScroll: "ponderousOrb",
	descr: "While your mana is full, accumulate a buff that increases your mana regen by 1.5x while active, up to a maximum of 45 seconds.",
	words: 0,
	maxWords: 20000,
	active: false,
	complete: false,
	onComplete: function() {}
});
research.push({ //Twin Stars 
	name: "Twin Stars",
	inScroll: "ponderousOrb",
	descr: "Gain a 2x multiplier to your maximum mana.",
	words: 0,
	maxWords: 30000,
	active: false,
	complete: false,
	onComplete: function() {}
});