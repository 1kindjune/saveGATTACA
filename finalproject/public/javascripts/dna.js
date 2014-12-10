function drawNuc1(nuc, x, y, dir, center, sketch, context){
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

	x = (x % 400); 
	y = y - 20 + 100;

	//do this after adding the value?????
	if (x == 350 ){ //hit right side change directions to left
		dir = false;
	}
	else if(x == 50){ //hit left side change direction to right
		dir = true;
	}

	context.fillStyle = color;
	if (x > center){
		context.fillRect(center, y -10 , Math.abs(x - center), 20);			
	}
	else{
		context.fillRect(x, y - 10, Math.abs(center - x), 20);	
	}
	context.beginPath();
	context.arc(x, y, 10, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();	
	context.beginPath();
	context.arc(center, y, 10, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();		

	if (dir == true){//true right
		x += 50;
 	}
	else{ //false left
		x -= 50;
	}

	return [x, y, dir]; 
}
function drawNuc2(nuc, x, y, dir, center, sketch, context){
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

	x = (x % 400); 
	y = y - 20 + 100;

	//do this after adding the value?????
	if (x == 350 ){ //hit right side change directions to left
		dir = false;
	}
	else if(x == 50){ //hit left side change direction to right
		dir = true;
	}

	context.fillStyle = color;
	if (x > center){
		context.fillRect(center, y -10 , Math.abs(x - center), 20);			
	}
	else{
		context.fillRect(x, y - 10, Math.abs(center - x), 20);	
	}
	context.beginPath();
	context.arc(x, y, 10, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();	
	context.beginPath();
	context.arc(center, y, 10, 0, 2 * Math.PI, true);
	context.closePath();
	context.fill();		

	if (dir == true){//true right
		x += 50;
 	}
	else{ //false left
		x -= 50;
	}

	return [x, y, dir]; 
}

function main(){
	var sketch = document.getElementById('sketch');
	var context = sketch.getContext('2d');
	var seq = document.getElementById("seq").value;	
	
//	window.requestAnimationFrame(animate)
//}
//function animate(){

//BACKGROUND
	document.getElementById("sketch").style.background = "grey";

//BACKBONE - BEHIND
	var backboneColor;
	var num;
	var pos = [ 50, 190 ];
	var bx, by;
	while(pos[1] < sketch.height){
		if(backboneColor == "#A04040"){
			backboneColor = "#4A40A0"; //change to blue
		}
		else{
			backboneColor = "#A04040"; //change to red
		}

		num = 0;
		if (pos[1] !=190){
			pos = [50, pos[1] - 80];
		}
		while(num < 7){
			num++;
			context.fillStyle = backboneColor;
			context.beginPath();
			if (num == 1){
				context.moveTo(pos[0]-10, pos[1]-40+10);
				context.lineTo(pos[0]-10, pos[1]-40+70);
				bx = pos[0]-10;
				by = pos[1]-40+70;
			}
			else{
				context.moveTo(pos[0]-25, pos[1]-40-30);
				context.lineTo(pos[0]-25, pos[1]-40+30);
				bx = pos[0]-25;
				by = pos[1]-40+30;				
			}
			//context.bezierCurveTo()
			if (num == 7){
				context.lineTo(pos[0]+10, pos[1]+40-10);
				context.lineTo(pos[0]+10, pos[1]+40-70);
			}
			else{
				context.lineTo(pos[0]+25, pos[1]+40+30);
				context.lineTo(pos[0]+25, pos[1]+40-30);
			}
			context.closePath();
			context.fill();

			pos = [pos[0] + 50, pos[1] + 80];
		}
	}

//DNA	
	//true is right, false is left	
	var num1 = [50, -50 + 160, true]; 
	var num2 = [350, -50 + 160, false]; 
	var center = 200;	
	var previous;
	for (var x = 0; x < seq.length; x++){
		if (num1[0] < num2[0]){ //1 is on the left
			num2 = drawNuc2(seq.charAt(x).toUpperCase(), num2[0], num2[1], num2[2], center, sketch, context);
			num1 = drawNuc1(seq.charAt(x).toUpperCase(), num1[0], num1[1], num1[2], center, sketch, context);	
			previous = num1;	
		}
		else if (num2[0] < num1[0]){ //2 is on the left
			num1 = drawNuc1(seq.charAt(x).toUpperCase(), num1[0], num1[1], num1[2], center, sketch, context);	
			num2 = drawNuc2(seq.charAt(x).toUpperCase(), num2[0], num2[1], num2[2], center, sketch, context);	
			previous = num2;				
		}
		else{ //both are at center only show the one that was on the right side
			if (previous == num2){
				num1 = drawNuc1(seq.charAt(x).toUpperCase(), num1[0], num1[1], num1[2], center, sketch, context);	
				num2 = drawNuc2(seq.charAt(x).toUpperCase(), num2[0], num2[1], num2[2], center, sketch, context);
			}
			else{
				num2 = drawNuc2(seq.charAt(x).toUpperCase(), num2[0], num2[1], num2[2], center, sketch, context);			
				num1 = drawNuc1(seq.charAt(x).toUpperCase(), num1[0], num1[1], num1[2], center, sketch, context);	
			}
		}
	}	

//BACKBONE - FRONT
	pos = [350, 190];
	while(pos[1] < sketch.height){
		if(backboneColor == "#8080FF"){
			backboneColor = "#FF8080"; //change to red
		}
		else{
			backboneColor = "#8080FF"; //change to blue
		}

		num = 0;
		if (pos[1] !=190){
			pos = [350, pos[1] - 80];
		}
		while(num < 7){
			num++;			
			context.fillStyle = backboneColor;
			context.beginPath();
			if (num == 1){
				context.moveTo(pos[0]+10, pos[1]-40+70);
				context.lineTo(pos[0]+10, pos[1]-40+10);				
			}
			else{
				context.moveTo(pos[0]+25, pos[1]-40+30);
				context.lineTo(pos[0]+25, pos[1]-40-30);
			}
			if (num == 7){
				context.lineTo(pos[0]-10, pos[1]+40-70);
				context.lineTo(pos[0]-10, pos[1]+40-10);
			}
			else{
				context.lineTo(pos[0]-25, pos[1]+40-30);
				context.lineTo(pos[0]-25, pos[1]+40+30);				
			}
			context.closePath();
			context.fill();

			pos = [pos[0] - 50, pos[1] + 80];
		}
	}
//BACKGROUND GRADIENT	
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
}
document.addEventListener('DOMContentLoaded', main);












