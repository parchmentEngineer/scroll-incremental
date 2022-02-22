function hideSpellButton(value) {
	document.getElementById("spellBtn-"+value.name).style.display = "none";
	elems = document.getElementsByClassName('perfSpellBtn-'+value.name.replace(/ /g, "-"));
	for (var i = 0, len = elems.length; i < len; i++) {
		elems[i].style.display = "none";
	}
}

function findUnlockSpell(spellName) {
	spellTarget = spellName;
	spells.forEach(unlockSpell);
	spells.forEach(displaySpells);
}

function unlockSpell(value) {
	if(value.name == spellTarget) {
		document.getElementById("spellBtn-"+value.name).style.display = "block";
		document.getElementById("spellTitle-"+value.name).innerHTML = value.name + " (Mana: " + value.mana + ")";
		document.getElementById("spellDescr-"+value.name).innerHTML = value.descr;
		fadeIn(document.getElementById("spellBtn-"+value.name));
		fadeIn(document.getElementById("spellTitle-"+value.name));
		fadeIn(document.getElementById("spellDescr-"+value.name));
		elems = document.getElementsByClassName('perfSpellBtn-'+value.name.replace(/ /g, "-"));
		for (var i = 0, len = elems.length; i < len; i++) {
			elems[i].style.display = "block";
			fadeIn(elems[i]);
		}
		elems = document.getElementsByClassName('perfSpellTitle-'+value.name.replace(/ /g, "-"));
		for (var i = 0, len = elems.length; i < len; i++) {
			elems[i].innerHTML = value.name + " (Mana: " + value.mana + ")";
			fadeIn(elems[i]);
		}
		elems = document.getElementsByClassName('perfSpellDescr-'+value.name.replace(/ /g, "-"));
		for (var i = 0, len = elems.length; i < len; i++) {
			elems[i].innerHTML = value.descr;
			fadeIn(elems[i]);
		}
		value.unlocked = true;
		appear("nav-magic-tab");
		if(value.performance) {
			appear("nav-town-tab");
		}
	}
}

function findCastSpell(spellName) {
	spellTarget = spellName;
	spells.forEach(castSpell);
	recalculateValues();
	displayValues();
}

function castSpell(value) {
	if(value.name == spellTarget && value.unlocked && !(value.performance && !inPerformance)) {
		if(mana >= value.mana) {
			mana -= value.mana;
			value.onCast();
			if(inPerformance) {prevSpells += 1}
			
			//Handling the Mana Well effect
			well = find("Mana Well", buffs);
			if(well.amount > 0) {
				well.amount -= 1;
				if(well.amount == 0) {
					mana += 20;
					if(mana > manaMax) {mana = manaMax;}
					removeBuff("Mana Well");
				}
			}
		}
	}
}

function updateSpellDescr(spellName, descr) {
	thisSpell = find(spellName, spells);
	fadePulse(document.getElementById("spellDescr-"+thisSpell.name));
	setTimeout(function() {thisSpell.descr = descr;
	if(thisSpell.unlocked) {
		document.getElementById("spellDescr-"+thisSpell.name).innerHTML = thisSpell.descr;
	}}, 100);
}

function tickMana() {
	mana += manaRegen;
	if(mana > manaMax) {
		mana = manaMax;
		if(find("Overflowing", research).complete && find("Overflowing", buffs).amount < 45) {
			findActivateBuff("Overflowing", find("Overflowing", buffs).amount+2);
		}
	}
}

function displaySpells(value) {
	if(value.performance) {
		if(inPerformance) {
			//document.getElementById("spellBtn-" + value.name).disabled = false;
			document.getElementById("spellBtn-" + value.name).classList.remove("btn-secondary");
			document.getElementById("spellBtn-" + value.name).classList.add("btn-primary");
		} else {
			//document.getElementById("spellBtn-" + value.name).disabled = true;
			document.getElementById("spellBtn-" + value.name).classList.add("btn-secondary");
			document.getElementById("spellBtn-" + value.name).classList.remove("btn-primary");
		}
	}
}

function displaySpellGold() {
	elems = document.getElementsByClassName("spellGold")
	if(performanceMult > 1) {
		for (var i = 0, len = elems.length; i < len; i++) {
			elems[i].innerHTML = formatNumber(getPerformanceMult() * getClassMult(elems[i])) + " (x" + performanceMult + ")";
		}
	} else {
		for (var i = 0, len = elems.length; i < len; i++) {
			elems[i].innerHTML = formatNumber(getPerformanceMult() * getClassMult(elems[i]));
		}
	}
	elems = document.getElementsByClassName("spellGoldNoPerf")
	for (var i = 0, len = elems.length; i < len; i++) {
		elems[i].innerHTML = formatNumber(getPerformanceMult() * getClassMult(elems[i]));
	}
}

function displaySpellRenown() {
	elems = document.getElementsByClassName("spellRenown")
	for (var i = 0, len = elems.length; i < len; i++) {
		elems[i].innerHTML = formatNumber(getPerformanceMultRenown() * getClassMult(elems[i]));
	}
}


var currSpell
function createSpell(value) {
	document.getElementById("spellCat-"+value.category+"-"+Math.ceil(value.num/3)).innerHTML += `
	<div class="col-sm-4"><div class="card" style="width:100%">
		<h5 class="card-header"><span id="spellTitle-`+value.name+`">Locked</span></h5>
		<div class="card-body" style="height:100px">
			<div class="row">
			<div class="col-sm-8">
				<p class="card-text" style="font-size: 15;" id="spellDescr-`+value.name+`"></p>
			</div><div class="col-sm-4">
				<button type="button" id="spellBtn-`+value.name+`" class="btn btn-primary" onclick="findCastSpell('`+value.name+`');">Cast Spell</a>
			</div>
			</div>
		</div>
	</div></div>`;
	
	if(value.performance) {
		currSpell = value;
		performances.forEach(createSpellInPerformance);
	}	
}

function createSpellInPerformance(value) {
	//createAlert(currSpell.name, "danger");
	//createAlert(value.name, "danger");
	document.getElementById("spellCat-"+value.name+"-"+Math.ceil(currSpell.num/2)).innerHTML += `
	<div class="col-sm-6"><div class="card" style="width:100%">
		<h5 class="card-header" style="font-size: 19"><span class="perfSpellTitle-`+currSpell.name.replace(/ /g, "-")+`">Locked</span></h5>
		<div class="card-body" style="height:100px">
			<div class="row">
			<div class="col-sm-9">
				<p class="card-text perfSpellDescr-`+currSpell.name.replace(/ /g, "-")+`" style="font-size: 14;"></p>
			</div><div class="col-sm-3">
				<button type="button" class="perfSpellBtn-`+currSpell.name.replace(/ /g, "-")+` perfSpellBtnIn-`+value.name.replace(/ /g, "-")+` btn btn-primary" onclick="addSpellToRoutine('`+currSpell.name+`', '`+value.name+`');">Add</a>
			</div>
			</div>
		</div>
	</div></div>`;
}