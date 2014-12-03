function GUI(canvas){
	var guis = [];

	this.clear = function(){
		while(guis.length > 0)
			guis.pop();
	}

	this.draw = function(){
		for(var i = 0; i < guis.length; i++){
			try{
				guis[i].draw();
			} catch(e){
				debug.log("Failed to draw GUI element");
			}
		}
	}

	this.add = function(ui){
		guis.push(ui);
	}

	this.checkMouseOver = function(){
		for(var i = 0; i < guis.length; i++){
			if(guis[i] != null){
				if(guis[i].checkMouseOver()){
					try{
						guis[i].onMouseOver();
					} catch(e) { }
				}
			}
		}
	}
}

// Check if mouse is inside GL placement rectangle with floating point positioning [-1:1] for (x,y)
// rect array format = [x, y, width, height]
function mouseInRect(rectArray){
	var mousePos = input.getMousePosZoned();

	return mousePos[0] >= rectArray[0] && mousePos[0] <= rectArray[0] + rectArray[2] && mousePos[1] <= rectArray[1] && mousePos[1] >= rectArray[1] - rectArray[3];
}
