//Set up the various shop buyables
buyables = [];
buyables.push ({ //The Inky Special
	name: "The Inky Special",
	shop: "inkyQuill",
	descr: "For the next 2 minutes, gain a 1.5x multiplier to gold from performances, but a 0.5x multiplier to translation speed.",
	cost: 20,
	costScaling: function() {
		return cost;
	},
	amount: 0,
	onBuy: function() {
		findActivateBuff("Poet's Brew", 120);
		this.amount = 0;
	}
});
buyables.push ({ //Scribing Tools
	name: "Scribing Tools",
	shop: "inkyQuill",
	descr: "Increases your base translation speed by 0.5 Words/second.",
	cost: 10,
	costScaling: function() {
		return Math.floor(10 * Math.pow(1.25,this.amount));
	},
	amount: 0,
	onBuy: function() {}
});
buyables.push ({ //Posters
	name: "Posters",
	shop: "inkyQuill",
	descr: "Increases your gold gained from performances by 25%.",
	cost: 25,
	costScaling: function() {
		return Math.floor(25 * Math.pow(1.25,this.amount));
	},
	amount: 0,
	onBuy: function() {}
});
buyables.push ({ //List of Exploits
	name: "List of Exploits",
	shop: "inkyQuill",
	descr: "Increases your renown gained from performances by 25%.",
	cost: 25,
	costScaling: function() {
		return Math.floor(25 * Math.pow(1.25,this.amount));
	},
	amount: 0,
	onBuy: function() {}
});

buyables.push ({ //Glass Orb
	name: "Glass Orb",
	shop: "durinCurosities",
	descr: "Increases your maximum mana by 2.",
	cost: 120,
	costScaling: function() {
		return Math.floor(120 * Math.pow(1.25,this.amount));
	},
	amount: 0,
	onBuy: function() {}
});
buyables.push ({ //Runic Trinket
	name: "Runic Trinket",
	shop: "durinCurosities",
	descr: "Increases your mana regeneration by 0.1 mana/sec.",
	cost: 70,
	costScaling: function() {
		return Math.floor(70 * Math.pow(1.25,this.amount));
	},
	amount: 0,
	onBuy: function() {}
});
buyables.push ({ //Scroll of Flowing Metal
	name: "Scroll of the Flowing Metal",
	shop: "durinCurosities",
	descr: "A new scroll, written in the same archaic script as the first two.",
	cost: 600,
	costScaling: function() {
		return 600;
	},
	amount: 0,
	onBuy: function() {
		document.getElementById("scrollTab-flowingMetal").style.display = "block";
		fadeOut(document.getElementById("shopRow-Scroll of the Flowing Metal"));
		setTimeout(function() {document.getElementById("shopRow-Scroll of the Flowing Metal").style.display = "none";}, 500);
		this.amount = 0;
	}
});
buyables.push ({ //Scroll of Ponderous Orb
	name: "Scroll of the Ponderous Orb",
	shop: "durinCurosities",
	descr: "A fourth scroll, even more precious than the last. It glows with a visible aura.",
	cost: 3500,
	costScaling: function() {
		return 3500;
	},
	amount: 0,
	onBuy: function() {
		document.getElementById("scrollTab-ponderousOrb").style.display = "block";
		fadeOut(document.getElementById("shopRow-Scroll of the Ponderous Orb"));
		setTimeout(function() {document.getElementById("shopRow-Scroll of the Ponderous Orb").style.display = "none";}, 500);
		this.amount = 0;
	}
});