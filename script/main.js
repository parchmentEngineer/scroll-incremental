translationSpeed = 1;
transSpeedBase = 1;
transSpeedResearchMult = 1;
transSpeedBuffMult = 1;

manaMax = 0;
manaMaxBase = 0;
manaRegen = 0;
manaRegenBase = 0;
mana = 0;

researchTarget = "";
spellTarget = "";
buffTarget = "";
buffTargetDur = 0;
buyableTarget = "";

gold = 0;
goldPerSec = 0;
goldPerSecBase = 0;

renown = 0;

inPerformance = false;
performanceMult = 1;
performancePointer = -1;
prevProfit = 0;
prevRenown = 0;
prevSpells = 0;


window.setInterval(function(){
	
	tickGold();
	research.forEach(tickResearch);
	renownLevels.forEach(tickRenown);
	tickMana();
	buffs.forEach(tickBuffs);
	performances.forEach(tickPerformance);
	recalculateValues();
	displayValues();
	
}, 1000);

research.forEach(createResearch);
buyables.forEach(createBuyable);
performances.forEach(createPerformance);
spells.forEach(createSpell);
spells.forEach(hideSpellButton);
renownLevels.forEach(createRenown);
recalculateValues();
displayValues();

setTimeout(function() {loadGame()}, 100);
