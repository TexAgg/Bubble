/**
* script.js
* This file defines the Bubble class and controls
* the behavior of the bubbles and the canvas.
*
* @summary Define bubble behavior
* @author Matt Gaikema
* @since 2/12/16
* @link https://dl.dropboxusercontent.com/u/222607174/Bubble/index.html
*/

//This is to define my own class
'use strict';

var canvas = document.getElementById('my_canvas');
var ctx = canvas.getContext("2d");

document.getElementById('x').setAttribute('max',canvas.width);
document.getElementById('y').setAttribute('max',canvas.height);

var ball_radius = 30;
var balls = []; //Storage for all the Bubbles
var max_balls = 30;

/**
* @classdec A bubble has a radius, x-coordinate, y-coordinate,
* an x-velocity, a y-velocity, and a number representing its
* position in the balls vector, as well as a color
*/
class Bubble{
	
	/**
	* Constructor for Bubble
	* @param x, y, speed, and radius should all be integers
	*/
	constructor(x,y,speed,radius){		
		this.x = x;
		this.y = y;
		this.dx = speed * Bubble.pm1(); 
		this.dy = speed * Bubble.pm1();
		this.radius = radius;
		//Random color: http://www.paulirish.com/2009/random-hex-color-code-snippets/
		this.color = "#" + Math.random().toString(16).slice(2, 8);
		//this.color =ctx.createRadialGradient(this.x,this.y,this.radius-5,this.x,this.y,this.radius);
		//this.color.addColorStop(0,"white");
		//this.color.addColorStop(1,"#" + Math.random().toString(16).slice(2, 8));
		
		//Since new bubbles are popped to the back of balls,
		//this represents the ball's index in the array
		this.number = balls.length;
		
		document.getElementById('output').innerHTML += "<li id="+this.number+">Bubble "+ this.number + " <button onclick='Bubble.remove("+this.number+")'>Delete</button></li>";	
	}
	
	/**
	* Return plus or minus 1 to make the
	* bubble go in a random direction
	* @return plus or minus 1
	*/
	static pm1(){
		if(Math.random()<0.5){
			return -1;
		}
		else{
			return 1;
		}
	}
	
	/**
	* Removes the selected bubble 
	*/
	static remove(n){
		balls.splice(n,1);
		//Renumber all the balls
		for(var i = n; i < balls.length; i++)
			balls[i].number--;
		
		document.getElementById('output').innerHTML = '';
		
		for(var i=0;i<balls.length;i++){
			document.getElementById('output').innerHTML += "<li id="+balls[i].number+">Bubble "+ balls[i].number 
				+ " <button onclick='Bubble.remove("+balls[i].number+")'>Delete</button></li>";				
		}
	};
	
	/**
	* Labels the Bubble
	* @param any string (but preferably an int)
	*/
	label(){
		ctx.font = '20px sans-serif'
		ctx.fillStyle = '#000000';
		ctx.fillText(this.number,this.x,this.y);		
	}
	
	// http://processingjs.org/learning/topic/bouncybubbles/
	/**
	* Simulate bouncing off other balls
	*/
	static collide(){
		for(var i = 0; i<balls.length; i++){
			for(var j = i+1; j < balls.length; j++){
				if(i!=j){
					var xdx = balls[i].x - balls[j].x;
					var ydy = balls[i].y - balls[j].y;
					var dist = Math.sqrt(xdx*xdx + ydy*ydy);
					
					if(dist <= balls[i].radius + balls[j].radius){
						balls[i].dx = -balls[i].dx;
						balls[i].dy = -balls[i].dy;
						
						balls[j].dx = -balls[j].dx;
						balls[j].dy = -balls[j].dy;
					}
				}
			}
		}
	}
	
	/**
	* Draw the bubble, and simulate bouncing off walls
	*/
	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        //ctx.fillStyle = "#0095DD";
		ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
		
		if(this.x + this.dx >= canvas.width-this.radius || this.x + this.dx <= this.radius) {
			this.dx = -this.dx;
		}
		if(this.y + this.dy >= canvas.height-this.radius || this.y + this.dy <= this.radius) {
			this.dy = -this.dy;
		}		
		
		this.x += this.dx;
		this.y += this.dy;
	}
}

/**
* Creates a new bubble using the information from the form.
*/
function new_clicked(){
	
	if(balls.length >= max_balls){
		alert("Too many balls! Please delete some.")
		return;
	}
	
	var xval = parseInt(document.getElementById('x').value);
	var yval = parseInt(document.getElementById('y').value);
	var spdval = parseInt(document.getElementById('speed').value);
	var rval = parseInt(document.getElementById('radius').value);
	
	var xbad = (xval < document.getElementById('x').getAttribute('min')) || (xval > document.getElementById('x').getAttribute('max'));
	var ybad = (yval < document.getElementById('y').getAttribute('min')) || (yval > document.getElementById('y').getAttribute('max'));
	var spdbad = (spdval < document.getElementById('speed').getAttribute('min')) || (spdval > document.getElementById('speed').getAttribute('max'));
	var rbad = (rval < document.getElementById('radius').getAttribute('min')) || (rval > document.getElementById('radius').getAttribute('max'));
	
	if (xbad || ybad || spdbad || rbad)
		alert("Invalid input!");
	else{
		
		/*
		Function inside a function: probably bad
		*/
		function safe(){
			var flag = true;
			for(var i = 0; i < balls.length; i++){
				
				var xdx = balls[i].x - xval;
				var ydy = balls[i].y - yval;
				var dist = Math.sqrt(xdx*xdx + ydy*ydy)+10;
				
				if(dist < rval + balls[i].radius){		
					flag = false;
					xval = Math.floor(Math.random()*(canvas.width-30)+30);
					yval = Math.floor(Math.random()*(canvas.height-30)+30);
					
					return false;
				}
			}
			return true;
		}
		
		while(!safe()) safe();
		balls.push(new Bubble(xval,yval,spdval,rval));
	}
	
	/*
	Don't hard-code
	*/
	//Display random coordinates
	document.getElementById('x').setAttribute('value',Math.floor(Math.random()*(canvas.width - 30)+30));
	document.getElementById('y').setAttribute('value',Math.floor(Math.random()*(canvas.height - 30)+30));	
}

/**
* Redraw every bubble to simulate movement
*/
function draw_balls(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	Bubble.collide()
	
	for(var i = 0; i < balls.length; i++){
		balls[i].draw();
		balls[i].label();
	}
}


//Make some random balls
//balls.push(new Bubble(100,45,2));
//balls.push(new Bubble(300,75,4));
//balls.push(new Bubble(100,400,3));
//balls.push(new Bubble(250,250,2));

//redraw every 20 milliseconds
setInterval(draw_balls,20);
