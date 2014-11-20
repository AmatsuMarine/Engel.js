function Debug(){
	this.logCtx;
	var logs = "";
	var pLog = "";
	logCtx = document.getElementById('Engel-Debug');
	
	// add label to debug logs
	if(logCtx)
		logCtx.innerHTML += "<b>Debug Log</b>";
	
	// display debug log
	this.log = function(text){
		if(logCtx){
			logs += "<br>" + text;
			logCtx.innerHTML = "<b>Debug Log</b>" + pLog + logs;
		}
	}

	this.primary = function(text){
		pLog = "<br>" + text + "<br>";
		if(logCtx)		
			logCtx.innerHTML = "<b>Debug Log</b>" + pLog + logs;
	}
}


