function dotProduct(v1, v2){
	if(v1.length != v2.length)
		return false;

	var product = 0;

	for(var i = 0; i < v1.length; i++){
		product += v1[i] * v2[i];
	}

	return product;
}

// TODO: array(3) to array(x)
function crossProduct(v1, v2){
	var product = [];

	product[0] = v1[1] * v2[2] - v1[2] * v2[1];
	product[1] = v1[2] * v2[0] - v1[0] * v2[2];
	product[2] = v1[0] * v2[1] - v1[1] * v2[0];

	return product;
}

function arraySubtract(v1, v2){
	if(v1.length != v2.length)
		return false;

	var subtract = [];

	for(var i = 0; i < v1.length; i++){
		subtract.push(v1[i] - v2[i]);
	}

	return subtract;
}

function arrayAdd(v1, v2){
	if(v1.length != v2.length)
		return false;

	var add = [];

	for(var i = 0; i < v1.length; i++){
		add[i] = v1[i] + v2[i];
	}

	return add;
}

function multMatVec4(mat, vec){
	var array = [];
	
	// row in matrix
	for(var i = 0; i < 4; i++){
		var sum = 0;
		var offset = i * 4;

		// row in vector
		for(var j = 0; j < 4; j++){
			sum += mat[offset + j] * vec[j];
		}

		array.push(sum);
	}

	return array;
}

function scaleVec(vec, scale){
	var array = [];

	for(var i = 0; i < vec.length; i++){
		array.push(vec[i] * scale);
	}

	return array;
}
