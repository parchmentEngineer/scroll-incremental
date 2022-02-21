function recalculateValues() {
	translationSpeed = (transSpeedBase
		+ find("Scribing Tools",buyables).amount * 0.5)
		* transSpeedResearchMult
		* transSpeedBuffMult;
		
	manaMax = manaMaxBase
		+ find("Glass Orb", buyables).amount * 2;
	
	manaRegen = manaRegenBase
		+ find("Runic Trinket", buyables).amount * 0.1;
	
	goldPerSec = goldPerSecBase;

}

function displayValues() {
	document.getElementById("manaMax").innerHTML = "Maximum Mana: " + formatNumber(manaMax);
	document.getElementById("manaRegen").innerHTML = "Mana Regen: " + formatNumber(manaRegen);
	document.getElementById("manaTot").innerHTML = "Mana: " + formatNumber(mana);
	if(manaMax > 0) {document.getElementById("manaBar").style = "width: "+ (mana/manaMax)*100+"%;"}
	
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
	gold += goldPerSec;
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
	if(number > 1000) {
		return (Math.floor(number/10)/100)+"k";
	} else {
		return Math.floor(number*10)/10;
	}
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