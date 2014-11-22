function GUI(canvas){
	var guis = [];

	var clear = function(){
		guis = [];
	}

	this.draw = function(){
		checkMouseOver();
	
		for(var i = 0; i < guis.length; i++){
			guis[i].draw();
		}

		clear();
	}

	this.add = function(ui){
		guis.push(ui);
	}

	var checkMouseOver = function(){
		for(var i = 0; i < guis.length; i++){
			if(guis[i].checkMouseOver()){
				guis[i].onMouseOver();
				//break;
			}
		}
	}
}


/*
GUI.Text(text, x, y, style, font){
	//if(arguments.length >= 1)
		//text = typeof text !== 'undefined' ? text : " ";
	//if(arguments.length >= 2)
		//x = typeof x !== 'undefined' ? x : 10;
	//if(arguments.length >= 3)
		//y = typeof y !== 'undefined' ? y : 50;
	//if(arguments.legnth >= 4)
		//style = typeof style !== 'undefined' ? style : "#000000";

	//var context = document.getElementById('Engel-Canvas');
	//var contx = _canvas.getContext('2d');
	contx.font = font;
	contx.fillStyle = style;
	contx.fillText(text,x,y);
}*/
