function startPerformance(performanceName) {
	perf = find(performanceName, performances);
	if(perf.recharge == 0 && !inPerformance) {
		perf.active = true;
		perf.duration = perf.maxDuration;
		perf.recharge = perf.maxRecharge;
		inPerformance = true;
		performanceMult = perf.mult;
		performancePointer = 0;
		prevProfit = 0;
		prevRenown = 0;
		prevSpells = 0;
		spells.forEach(function(value) {
			elems = document.getElementsByClassName('perfSpellBtn-'+value.name.replace(/ /g, "-"));
			for (var i = 0, len = elems.length; i < len; i++) {
				if(elems[i].classList.contains("perfSpellBtnIn-"+perf.name.replace(/ /g, "-"))) {elems[i].classList.add("disabled")};
			}
		})
		if(find("Verbal Introductions", research).complete) {gainRenown(3);}
	}
	appear("activePerformance");
	displayValues();
}

function addSpellToRoutine(spellName, performanceName) {
	spell = find(spellName, spells);
	perf = find(performanceName, performances);
	perf.routine.push(spell);
	displayValues();
}

function removeSpellFromRoutine(i, performanceName) {
	perf = find(performanceName, performances);
	perf.routine.splice(i, 1);
	displayValues();
}

function tickPerformance(value) {
	if(value.active) {
		value.duration -= 1;
		value.prevProfit = prevProfit;
		value.prevRenown = prevRenown;
		value.prevSpells = prevSpells;
		if(performancePointer > -1) {
			if(mana >= value.routine[performancePointer].mana) {
				findCastSpell(value.routine[performancePointer].name);
				if(performancePointer < value.routine.length-1) {
					performancePointer += 1;
				} else {
					performancePointer = -1;
				}
			}
		}
		if(value.duration < 0) {
			value.duration = 0;
			value.active = false;
			inPerformance = false;
			performanceMult = 1;
			performancePointer = -1;
			prevProfit = 0;
			prevRenown = 0;
			prevSpells = 0;
			spells.forEach(function(value2) {
				elems = document.getElementsByClassName('perfSpellBtn-'+value2.name.replace(/ /g, "-"));
				for (var i = 0, len = elems.length; i < len; i++) {
					if(elems[i].classList.contains("perfSpellBtnIn-"+value.name.replace(/ /g, "-"))) {elems[i].classList.remove("disabled")};
				}
			});
			removeBuff("Light Show");
			removeBuff("Mana Well");
		}
	}
	if(value.recharge > 0) {
		value.recharge -= 1;
		if(value.recharge <= 0) {
			value.recharge = 0;
			createAlert("You can now perform at the "+value.name+" once more.", "primary");
		}
	}		
}

function displayPerformance(value) {
	if(value.active) {
		document.getElementById("activePerformanceName").innerHTML = value.name;
		document.getElementById("activePerformanceBar").style = "width: " + (value.duration/value.maxDuration)*100+"%";
		document.getElementById("activePerformanceBar").innerHTML = formatTime(value.duration);
	}
	document.getElementById("performanceBar-"+value.name).style = "width: " + (value.recharge/value.maxRecharge)*100+"%";
	document.getElementById("performanceBar-"+value.name).innerHTML = formatTime(value.recharge);
	if(value.recharge == 0) {
		document.getElementById("performanceButton-" + value.name).classList.remove("btn-secondary");
		document.getElementById("performanceButton-" + value.name).classList.add("btn-primary");
	} else {
		document.getElementById("performanceButton-" + value.name).classList.add("btn-secondary");
		document.getElementById("performanceButton-" + value.name).classList.remove("btn-primary");
	}
	document.getElementById("performanceRoutine-" + value.name).innerHTML = "";
	value.routine.forEach(function(innerValue, i) {
		temp1 = ""
		temp2 = ""
		if(value.active) {temp2 = "disabled"; if(i==performancePointer) {temp1 = "active"}}
		document.getElementById("performanceRoutine-" + value.name).innerHTML += `<button type="button" class="list-group-item list-group-item-action perfRoutineBtn-`+value.name.replace(/ /g, "-")+` `+temp1+`" `+temp2+` onclick="removeSpellFromRoutine(`+i+`, '`+value.name+`')">`+innerValue.name+`</button>`
	})
	tempCurrentCost = 0;
	if(value.active) {
		value.prevProfit = prevProfit;
		value.prevRenown = prevRenown;
		value.prevSpells = prevSpells;
	}
	value.routine.forEach(function(value) {tempCurrentCost += value.mana});
	document.getElementById("perfCurrentCost-"+value.name).innerHTML = tempCurrentCost;
	document.getElementById("perfMaxCost-"+value.name).innerHTML = manaMax + (manaRegen * value.maxDuration);
	document.getElementById("prevProfit-"+value.name).innerHTML = formatNumber(value.prevProfit);
	document.getElementById("prevRenown-"+value.name).innerHTML = formatNumber(value.prevRenown);
	document.getElementById("prevSpells-"+value.name).innerHTML = formatNumber(value.prevSpells);
}

function gainPerformanceGold(amt) {
	gold += amt * getPerformanceMult() * performanceMult;
	prevProfit += amt * getPerformanceMult() * performanceMult;
	displayValues();
}

function getPerformanceMult() {
	temp = 0;
	temp += 1
		* (1+(find("Posters", buyables).amount * 0.25))
		* ((find("Poet's Brew", buffs).active) ? 1.5 : 1
		* ((find("Immortalize in Gold", buffs).active) ? 2 : 1));
	return temp;
}

function gainPerformanceRenown(amt) {
	renown += amt * getPerformanceMultRenown();
	prevRenown += amt * getPerformanceMultRenown();
}

function getPerformanceMultRenown() {
	temp = 0;
	temp += 1
		* (1+(find("List of Exploits", buyables).amount * 0.25))
	return temp;
}
	

function createPerformance(value) {
	document.getElementById("performance-"+value.name).innerHTML += `
	<div class="row">
	  <div class="col-sm-9">
		<b style="font-size: 20;">`+value.name+`</b> | x`+value.mult+` Gold multiplier | `+formatTime(value.maxDuration)+` Performance duration | `+formatTime(value.maxRecharge)+` Recharge time<br>
		<i>`+value.descr+`</i><br>
	  </div>
	  <div class="col-sm-3" style="display: flex; justify-content: flex-end">
		<button type="button" id="performanceButton-`+value.name+`" class="btn btn-primary" onclick="startPerformance('`+value.name+`');">Start Performance</button>
	  </div>
	</div><br>
	<div class="row">
	  <div class="col-sm-12">
		<div class="progress">
		  <div class="progress-bar" id="performanceBar-`+value.name+`" role="progressbar" style="width: 0%"></div>
		</div>
	  </div>
	</div><br><hr>
	
	<div class="row">
		<div class="col-sm-5 overflow-auto" style="height:45vh;">
			<h5><b>Performace routine:</b></h5>
			Current cost: <span id="perfCurrentCost-`+value.name+`">0</span> | Max potential cost: <span id="perfMaxCost-`+value.name+`">0</span><br>
			Profit from most recent performance here: <span id="prevProfit-`+value.name+`">0</span><br>
			Renown from most recent performance here: <span id="prevRenown-`+value.name+`">0</span><br>
			Spells cast in most recent performance here: <span id="prevSpells-`+value.name+`">0</span><hr>
			<div class="list-group" id="performanceRoutine-`+value.name+`">
				<button type="button" class="list-group-item list-group-item-action">A second item</button>
			</div>
		</div>
		<div class="col-sm-7 overflow-auto" style="height:45vh;" >
			<div class="row" style="width:100%" id="spellCat-`+value.name+`-1"></div><br>
			<div class="row" style="width:100%" id="spellCat-`+value.name+`-2"></div><br>
			<div class="row" style="width:100%" id="spellCat-`+value.name+`-3"></div><br>
			<div class="row" style="width:100%" id="spellCat-`+value.name+`-4"></div><br>
		</div>
	</div>
	`;
}