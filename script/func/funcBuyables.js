function findBuyItem(buyableName) {
	buyableTarget = buyableName;
	buyables.forEach(buyItem);
	recalculateValues();
	displayValues();
}

function buyItem(value) {
	if(value.name == buyableTarget) {
		if(gold >= value.cost) {
			gold -= value.cost;
			value.amount += 1;
			value.onBuy();
			value.cost = value.costScaling();
		}
	}
}

function displayBuyables(value) {
	if(value.amount > 0) {
		document.getElementById("shopAmount-"+value.name).innerHTML = " - " + value.amount + " Owned";
	} else {
		document.getElementById("shopAmount-"+value.name).innerHTML = " ";
	}
	document.getElementById("shopCost-"+value.name).innerHTML = formatNumber(value.cost);
}

function createBuyable(value) {
	document.getElementById("shop-"+value.shop).innerHTML += `
	  <div class="row" id="shopRow-`+value.name+`">
		<div class="col-sm-9">
		  <b style="font-size: 20;">`+value.name+`</b><span id="shopAmount-`+value.name+`"> - 0 Owned</span><br>
		  `+value.descr+`
		</div>
		<div class="col-sm-3 shop-btn">
		  <button type="button" class="btn btn-primary" onclick="findBuyItem('`+value.name+`');">Buy (<span id="shopCost-`+value.name+`">5</span> Gold)</button>
		</div>
	  </div>`;
}
