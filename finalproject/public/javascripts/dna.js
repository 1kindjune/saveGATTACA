function main(){
	console.log("within dna.js")
	var sketch = document.getElementById('sketch');
	var context = sketch.getContext("2d");
//	window.requestAnimationFrame(animate)
//}
//function animate(){
	context.fillStyle = "#ff0"
	context.beginPath();
	context.arc(150, 150, 100, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();	


	var seq = document.getElementById("seq").value;
	console.log("the sequence is: " + seq);
	var num = [0, 0]; 	
	for (var x = 0; x < seq.length; x++){
		num = drawNuc(seq.charAt, num[0], num[1]);		
	}	
}
function drawNuc(nuc, x, y){
	var color = "#000";
	switch (nuc) {
		case "G" :
			color = "#ff0";
			break;
		case "C" :
			color = "#f00";
			break;
		case "A" :
			color = "#00f";
			break;
		case "T" :
			color = "#0ff";
	}
	x = (x % 50) + 100; 
	y = y - 10 + 100;
	context.fillStyle = color;
	context.beginPath();
	context.arc(x, y, 20, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();	

	x += 10;
	return [x, y]; 
}
