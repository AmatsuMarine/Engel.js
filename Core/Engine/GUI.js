function GUI(canvas){
	var _canvas = Engel.canvas;

	this.Text(text, x, y){
		_canvas2D.font = '30px Arial';
		_canvas2D.fillText(text,x,y);
	}
}

GUI.prototype.Text(text, x, y, canvas2D){
	canvas2D.font = '30px Arial';
	canvas2D.fillText(text,x,y);
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
