function findActivateBuff(buffName, buffDur) {
	buffTarget = buffName;
	buffTargetDur = buffDur;
	buffs.forEach(activateBuff);
}

function activateBuff(value) {
	if(value.name == buffTarget) {
		if(value.stacking == "time-set") {
			value.amount = buffTargetDur;
		}
		if(value.stacking == "amount") {
			value.amount += buffTargetDur;
		}
		if(!value.active) {
			value.active = true;
			value.onApply();
		}
	}
}

function tickBuffs(value) {
	if(value.active) {
		if(value.stacking == "time-set") {
			value.amount -= 1;
			if(value.amount == 0) {
				value.active = false;
				value.onRemove();
			}
		}
		value.onTick();
	}
}

function displayBuffs(value) {
	if(value.active) {
		buffText = document.getElementById("buffs");
		if(value.stacking == "time-set") {
			buffText.innerHTML += value.name + " (" + formatTime(value.amount) + ")<br>";
		}
		if(value.stacking == "amount") {
			buffText.innerHTML += value.name + " (" + value.amount + ")<br>";
		}
	}
}