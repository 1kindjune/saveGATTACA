function drawNuc1(nuc, x, y, sketch, context){
	var center = 200;
	var color = "#000";
	switch (nuc) {
		case "G" :
			color = "#FE2EF7";
			break;
		case "C" :
			color = "#F5A9E1";
			break;
		case "A" :
			color = "#819FF7";
			break;
		case "T" :
			color = "#2E64FE";
	}

	x = (x % 300); 
	y = y - 20 + 100;
	if (x == 0){
		x = 100;
	}
	context.fillStyle = color
	if (x > center){
		context.fillRect(x - Math.abs(x-center), y - 10, Math.abs(x - center), 20);			
	}
	else{
		context.fillRect(x, y - 10, Math.abs(center - x), 20);	
	}
	context.beginPath();
	context.arc(x, y, 20, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();	

	x += 100;
	return [x, y]; 
}
function drawNuc2(nuc, x, y, sketch, context){
	var center = 200;
	var color = "#000";
	switch (nuc) {
		case "G" :
			color = "#000";
			break;
		case "C" :
			color = "#444";
			break;
		case "A" :
			color = "#ccc";
			break;
		case "T" :
			color = "#fff";
	}

	x = (x % 300); 
	y = y - 20 + 100;
	if (x == 0){
		x = 300;
	}
	context.fillStyle = color
	if (x < center){
		context.fillRect(x, y - 10, Math.abs(x - center), 20);			
	}
	else{
		context.fillRect(x - Math.abs(x-center), y - 10, Math.abs(center - x), 20);	
	}	
	context.beginPath();
	context.arc(x, y, 20, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();	

	x -= 100;
	return [x, y]; 
}

function main(){
	var sketch = document.getElementById('sketch');
	var context = sketch.getContext('2d');
	
	document.getElementById("sketch").style.background = "grey";

	var grd = context.createLinearGradient(0, 0, 0, 160);
	grd.addColorStop(0, 'white'); 
	grd.addColorStop(1, 'grey');
	context.fillStyle = grd;
	context.fillRect(0, 0, sketch.width, 160);

	grd = context.createLinearGradient(0, (sketch.height - 160), 0, sketch.height);
	grd.addColorStop(0, 'grey'); 
	grd.addColorStop(1, 'white');
	context.fillStyle = grd;
	context.fillRect(0, (sketch.height - 160), sketch.width, 160);
	
//	window.requestAnimationFrame(animate)
//}
//function animate(){
	var seq = document.getElementById("seq").value;
	var num1 = [50, -50 + 160]; 
	var num2 = [300, -50 + 160]; 		
	for (var x = 0; x < seq.length; x++){
		num1 = drawNuc1(seq.charAt(x).toUpperCase(), num1[0], num1[1], sketch, context);	
		num2 = drawNuc2(seq.charAt(x).toUpperCase(), num2[0], num2[1], sketch, context);				
	}	
}
document.addEventListener('DOMContentLoaded', main);