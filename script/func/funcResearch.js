function startResearch(researchName) {
	researchTarget = researchName;
	research.forEach(deactivateResearch);
	if(researchTarget != "Cancel") {
		research.forEach(activateResearch);
	}
	displayValues();
}

function activateResearch(value) {
	if(value.name == researchTarget && value.words != value.maxWords) {
		value.active = true;
		document.getElementById("researchButton-"+value.name).innerHTML = "Translating...";
		appear("activeTrans");
	}
}

function deactivateResearch(value) {
	if(value.active && researchTarget == value.name) {
		researchTarget = "Cancel";
	}
	value.active = false;
	if(value.words != value.maxWords) {
		document.getElementById("researchButton-"+value.name).innerHTML = "Translate";
	}
	displayValues();
}

function tickResearch(value) {
	if(value.active) {
		value.words = value.words + translationSpeed;
		if(value.words >= value.maxWords) {
			value.words = value.maxWords;
			value.complete = true;
			value.onComplete();
			deactivateResearch(value);
			document.getElementById("researchBar-"+value.name).innerHTML = "Completed!";
			document.getElementById("researchButton-"+value.name).remove();
		} else {
			document.getElementById("researchBar-"+value.name).innerHTML = value.words;
		}
		document.getElementById("researchBar-"+value.name).style = "width: "+(value.words/value.maxWords)*100+"%;";
		
	}
}

function displayResearch(value) {
	if(value.active) {
		document.getElementById("activeTransName").innerHTML = value.name;
		document.getElementById("activeTransBar").style = "width: " + (value.words/value.maxWords)*100+"%";
		document.getElementById("activeTransBar").innerHTML = formatNumber(value.words);
	}
}

function createResearch(value) {
	document.getElementById("scroll-"+value.inScroll).innerHTML += `
	<div class="row">
	  <div class="col-sm-9">
		<b style="font-size: 20;">`+value.name+`</b> (`+value.maxWords+` Words) <br>
		`+value.descr+`
	  </div>
	  <div class="col-sm-2" style="display: flex; justify-content: flex-end">
		<button type="button" id="researchButton-`+value.name+`" class="btn btn-primary" onclick="startResearch('`+value.name+`');">Translate</button>
	  </div>
	  <div class="col-sm-1"></div>
	</div><br>
	<div class="row">
	  <div class="col-sm-11">
		<div class="progress">
		  <div class="progress-bar" id="researchBar-`+value.name+`" role="progressbar" style="width: 0%"></div>
		</div>
	  </div>
	  <div class="col-sm-1"></div>
	</div><br><hr>`;
}