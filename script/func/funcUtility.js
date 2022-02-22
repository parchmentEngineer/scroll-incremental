function recalculateValues() {
	translationSpeed = (transSpeedBase
		+ find("Scribing Tools",buyables).amount * 0.5)
		* transSpeedResearchMult
		* transSpeedBuffMult;
		
	manaMax = (manaMaxBase
		+ find("Glass Orb", buyables).amount * 2)
		* (find("Twin Stars", research).complete ? 2 : 1);
	
	manaRegen = (manaRegenBase
		+ find("Runic Trinket", buyables).amount * 0.1)
		* (find("Overflowing", buffs).active ? 1.5 : 1);
	
	goldPerSec = goldPerSecBase;

}

function displayValues() {
	document.getElementById("manaMax").innerHTML = "Maximum Mana: " + formatNumber(manaMax);
	document.getElementById("manaRegen").innerHTML = "Mana Regen: " + formatNumber(manaRegen);
	document.getElementById("manaTot").innerHTML = "Mana: " + formatNumber(mana);
	if(manaMax > 0) {document.getElementById("manaBar").style = "width: "+ (mana/manaMax)*100+"%;"}
	if(manaMax > 0) {document.getElementById("miniManaBar").style = "width: "+ (mana/manaMax)*100+"%;"}
	
	if(translationSpeed == 1) { document.getElementById("statsTranslation").innerHTML = "Translation Speed: 1 Word/second" }
	else {document.getElementById("statsTranslation").innerHTML = "Translation Speed: "+formatNumber(translationSpeed)+" Words/second" }
	
	document.getElementById("statsGold").innerHTML = formatNumber(gold);
	document.getElementById("statsMana").innerHTML = formatNumber(mana);
	document.getElementById("statsRenown").innerHTML = formatNumber(renown);
	
	
	document.getElementById("activeTransName").innerHTML = "None";
	document.getElementById("activeTransBar").style = "width: " +0+"%";
	document.getElementById("activeTransBar").innerHTML = "";
	research.forEach(displayResearch);
	spells.forEach(displaySpells);
	displaySpellGold();
	displaySpellRenown();
	
	document.getElementById("buffs").innerHTML = "";
	buffs.forEach(displayBuffs);
	
	buyables.forEach(displayBuyables);
	
	document.getElementById("activePerformanceName").innerHTML = "None";
	document.getElementById("activePerformanceBar").style = "width: " + 0+"%";
	document.getElementById("activePerformanceBar").innerHTML = "";
	performances.forEach(displayPerformance);
}

function gainRenown(amt) {
	renown += amt;
}

function tickGold() {
	gold += goldPerSec
		+ ((find("Metalic Flow", research).complete ? 4 : 0)
			* (find("Live Demonstration", research).complete ? getPerformanceMult() : 1));
}

function find(name, array) {
	for(var i=0; i<array.length; i++) {
		if(array[i].name == name) {
			return array[i];
		}
	}
	return null;
}

function getClassMult(el) {
	classList = el.className.split(' ');
	mult = 1;
	classList.forEach(function (str) {if(str.substring(0,4)=="mult") {mult = parseInt(str.substring(4));}});
	return mult;
}

function formatNumber(number) {
	if(number < 1000) {
		return Math.floor(number*10)/10;
	} else if(number < 1000000) {
		return (Math.floor(number/10)/100)+"k";
	} else {
		return number.toPrecision(3).replace("+","");
	}
	/*i=0;
	while(Math.pow(10, i)-1 < number) {i=i+1}
	if(i<4) {return Math.floor(number*10)/10;}
	return Math.floor(number*100)/(Math.pow(10, i)*10) + "e" + (i-1);*/
}

function formatTime(number) {
	if(number >= 60) {
		return Math.floor(number/60)+":"+str_pad_left(number%60,'0',2);
	} else {
		return 0+':'+str_pad_left(number%60,'0',2);
	}
}

function createAlert(message, type) {
	document.getElementById("alertsZone").innerHTML += `
	<div class="alert alert-`+type+` alert-dismissible fade show" role="alert">
	  `+message+`
	  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
	</div>`;
}

function beginGame() {
	fadeOut(document.getElementById("scrolls-showAtStart"));
	setTimeout(function() {document.getElementById("scrolls-showAtStart").style.display = "none"}, 1000);
	appear("scrolls-hideAtStart", 1000);
}

function beginPerformance() {
	fadeOut(document.getElementById("performanceIntro"));
	setTimeout(function() {document.getElementById("performanceIntro").style.display = "none"}, 750);
	appear("performance-Street Corner", 750);
}

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

function fadeIn(el) {
	if(el.classList.contains("fadeIn")) {
		el.classList.remove("fadeIn");
		el.classList.add("fadeOut");
		setTimeout(function() {el.classList.add('fadeIn'); el.classList.remove("fadeOut");}, 100);
	} else {
		el.classList.add('fadeIn');
	}
}

function fadePulse(el) {
	if(el.classList.contains("fadeIn")) {
		el.classList.remove("fadeIn");
		el.classList.add("fadeOut");
		setTimeout(function() {el.classList.add('fadeIn'); el.classList.remove("fadeOut");}, 100);
	}
}

function fadeOut(el) {
	if(el.classList.contains("fadeOut")) {
		el.classList.remove("fadeOut");
		el.classList.add("fadeIn");
		setTimeout(function() {el.classList.add('fadeOut'); el.classList.remove("fadeIn");}, 100);
	} else {
		el.classList.add('fadeOut');
	}
}

function appear(elementName, delay) {
	setTimeout(function() {document.getElementById(elementName).style.display = "block"}, delay);
	setTimeout(function() {document.getElementById(elementName).classList.add('fadeIn');}, delay);
}

function saveGame() {
	var save = {
		theBody: document.getElementById("theBody").innerHTML,
		
		translationSpeed: translationSpeed,
		transSpeedBase: transSpeedBase,
		transSpeedResearchMult: transSpeedResearchMult,
		transSpeedBuffMult: transSpeedBuffMult,

		manaMax: manaMax,
		manaMaxBase: manaMaxBase,
		manaRegen: manaRegen,
		manaRegenBase: manaRegenBase,
		mana: mana,

		researchTarget: researchTarget,
		spellTarget: spellTarget,
		buffTarget: buffTarget,
		buffTargetDur: buffTargetDur,
		buyableTarget: buyableTarget,

		gold: gold,
		goldPerSec: goldPerSec,
		goldPerSecBase: goldPerSecBase,

		renown: renown,

		inPerformance: inPerformance,
		performanceMult: performanceMult,
		performancePointer: performancePointer,
		prevProfit: prevProfit,
		prevRenown: prevRenown,
		prevSpells: prevSpells,
		
		research: research,
		spells: spells,
		buyables: buyables,
		buffs: buffs,
		performances: performances,
		renownLevels: renownLevels
	}
	localStorage.setItem("save",JSON.stringify(save));
}

function loadGame() {
	var savegame = JSON.parse(localStorage.getItem("save")); 
	try {
		if (typeof savegame.theBody !== "undefined") {document.getElementById("theBody").innerHTML = savegame.theBody;}
		if (typeof savegame.translationSpeed !== "undefined") translationSpeed = savegame.translationSpeed;
		if (typeof savegame.transSpeedBase !== "undefined") transSpeedBase = savegame.transSpeedBase;
		if (typeof savegame.transSpeedResearchMult !== "undefined") transSpeedResearchMult = savegame.transSpeedResearchMult;
		if (typeof savegame.transSpeedBuffMult !== "undefined") transSpeedBuffMult = savegame.transSpeedBuffMult;
		
		if (typeof savegame.manaMax !== "undefined") manaMax = savegame.manaMax;
		if (typeof savegame.manaMaxBase !== "undefined") manaMaxBase = savegame.manaMaxBase;
		if (typeof savegame.manaRegen !== "undefined") manaRegen = savegame.manaRegen;
		if (typeof savegame.manaRegenBase !== "undefined") manaRegenBase = savegame.manaRegenBase;
		if (typeof savegame.mana !== "undefined") mana = savegame.mana;
		
		if (typeof savegame.researchTarget !== "undefined") researchTarget = savegame.researchTarget;
		if (typeof savegame.spellTarget !== "undefined") spellTarget = savegame.spellTarget;
		if (typeof savegame.buffTarget !== "undefined") buffTarget = savegame.buffTarget;
		if (typeof savegame.buffTargetDur !== "undefined") buffTargetDur = savegame.buffTargetDur;
		if (typeof savegame.buyableTarget !== "undefined") buyableTarget = savegame.buyableTarget;

		if (typeof savegame.gold !== "undefined") gold = savegame.gold;
		if (typeof savegame.goldPerSec !== "undefined") goldPerSec = savegame.goldPerSec;
		if (typeof savegame.transSpeedResearchMult !== "undefined") transSpeedResearchMult = savegame.transSpeedResearchMult;		
		
		if (typeof savegame.renown !== "undefined") renown = savegame.renown;
		
		if (typeof savegame.inPerformance !== "undefined") inPerformance = savegame.inPerformance;
		if (typeof savegame.performanceMult !== "undefined") performanceMult = savegame.performanceMult;
		if (typeof savegame.performancePointer !== "undefined") performancePointer = savegame.performancePointer;
		if (typeof savegame.prevProfit !== "undefined") prevProfit = savegame.prevProfit;
		if (typeof savegame.prevRenown !== "undefined") prevRenown = savegame.prevRenown;
		if (typeof savegame.prevSpells !== "undefined") prevSpells = savegame.prevSpells;
		
		if (typeof savegame.research !== "undefined") {
			savegame.research.forEach(function(value) {
				thisValue = find(value.name, research)
				if (typeof value.name !== "undefined") thisValue.name = value.name;
				if (typeof value.inScroll !== "undefined") thisValue.inScroll = value.inScroll;
				if (typeof value.descr !== "undefined") thisValue.descr = value.descr;
				if (typeof value.words !== "undefined") thisValue.words = value.words;
				if (typeof value.maxWords !== "undefined") thisValue.maxWords = value.maxWords;
				if (typeof value.active !== "undefined") thisValue.active = value.active;
				if (typeof value.complete !== "undefined") thisValue.complete = value.complete;
			});
		}
		
		if (typeof savegame.spells !== "undefined") {
			savegame.spells.forEach(function(value) {
				thisValue = find(value.name, spells)
				if (typeof value.name !== "undefined") thisValue.name = value.name;
				if (typeof value.category !== "undefined") thisValue.category = value.category;
				if (typeof value.num !== "undefined") thisValue.num = value.num;
				if (typeof value.descr !== "undefined") thisValue.descr = value.descr;
				if (typeof value.mana !== "undefined") thisValue.mana = value.mana;
				if (typeof value.performance !== "undefined") thisValue.performance = value.performance;
				if (typeof value.unlocked !== "undefined") thisValue.unlocked = value.unlocked;
			});
		}
		
		if (typeof savegame.buyables !== "undefined") {
			savegame.buyables.forEach(function(value) {
				thisValue = find(value.name, buyables)
				if (typeof value.name !== "undefined") thisValue.name = value.name;
				if (typeof value.shop !== "undefined") thisValue.shop = value.shop;
				if (typeof value.descr !== "undefined") thisValue.descr = value.descr;
				if (typeof value.cost !== "undefined") thisValue.cost = value.cost;
				if (typeof value.amount !== "undefined") thisValue.amount = value.amount;
			});
		}
		
		if (typeof savegame.buffs !== "undefined") {
			savegame.buffs.forEach(function(value) {
				thisValue = find(value.name, buffs)
				if (typeof value.name !== "undefined") thisValue.name = value.name;
				if (typeof value.active !== "undefined") thisValue.active = value.active;
				if (typeof value.stacking !== "undefined") thisValue.stacking = value.stacking;
				if (typeof value.amount !== "undefined") thisValue.amount = value.amount;
			});
		}
		
		if (typeof savegame.renownLevels !== "undefined") {
			savegame.renownLevels.forEach(function(value) {
				renownLevels.forEach(function(thisValue) {if(thisValue.amount == value.amount) {
				if (typeof value.amount !== "undefined") thisValue.amount = value.amount;
				if (typeof value.descr !== "undefined") thisValue.descr = value.descr;
				if (typeof value.active !== "undefined") thisValue.active = value.active;
			}})});
		}
		
		
		//if (typeof savegame.spells.name !== "undefined") spells.name = savegame.spells.name;
		//i//f (typeof savegame.buyables !== "undefined") buyables = savegame.buyables;
		//if (typeof savegame.buffs !== "undefined") buffs = savegame.buffs;
		if (typeof savegame.performances !== "undefined") performances = savegame.performances;
		//if (typeof savegame.renownLevels !== "undefined") renownLevels = savegame.renownLevels;
	} catch {}
	displayValues();
}

function deleteGame() {
	localStorage.removeItem("save");
}