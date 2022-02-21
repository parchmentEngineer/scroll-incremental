function tickRenown(value) {
	if(!value.active && renown >= value.amount) {
		value.active = true;
		value.onAchieve();
	}
}

function createRenown(value) {
	document.getElementById("renown").innerHTML += `
	<b style="font-size: 20;">`+value.amount+` Renown</b><br>
	`+value.descr+`<hr>`;
}