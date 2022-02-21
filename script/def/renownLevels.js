//Set up the various renown thresholds
renownLevels = [];

renownLevels.push({ //20 Renown
	amount: 20,
	descr: "Unlocks a new shop.",
	active: false,
	onAchieve: function() {
		document.getElementById("shopTab-durinCurosities").style.display = "block";
	}
});
renownLevels.push({ //50 Renown
	amount: 50,
	descr: "Unlocks a new place to perform.",
	active: false,
	onAchieve: function() {
		document.getElementById("shopTab-inkyStage").style.display = "block";
	}
});
renownLevels.push({ //250 Renown
	amount: 250,
	descr: "Become God-Emperor over all civilization (a.k.a. Complete the demo).",
	active: false,
	onAchieve: function() {
		createAlert("Congratulations on completing the demo!<br>This game is still under development. Any<br>feedback you may have would be greatly<br>apperciated.", "success");
	}
});