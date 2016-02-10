'use strict';

var canvas = document.getElementById('my_canvas');
var ctx = canvas.getContext("2d");

document.getElementById('x').setAttribute('max',canvas.width);
document.getElementById('y').setAttribute('max',canvas.height);

//console.log(document.getElementById('x').getAttribute('max'));

var ball_radius = 30;
var balls = [];

class Ball{
	
	/**
	*Constructor for Ball
	*@param x,y, and speed should all be integers
	*/
	constructor(x,y,speed){
		this.x = x;
		this.y = y;
		this.dx = speed;
		this.dy = -speed;
	}
	
	/**
	*Labels the ball
	*@param any string (but preferably an int)
	*/
	label(n){
		ctx.font = '20px sans-serif'
		ctx.fillStyle = '#000000';
		ctx.fillText(n,this.x,this.y);
	}
	
	// http://processingjs.org/learning/topic/bouncybubbles/
	/**
	*Simulate bouncing off other balls
	*/
	static collide(){
		for(var i = 0; i<balls.length; i++){
			for(var j = i+1; j < balls.length; j++){
				//console.log('i='+i);
				//console.log('j='+j);
				if(i!=j){
					var xdx = balls[i].x - balls[j].x;
					var ydy = balls[i].y - balls[j].y;
					var dist = Math.sqrt(xdx*xdx + ydy*ydy);
					
					if(dist<2*ball_radius){
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
	*Draw the bubble, and simulate bouncing off walls
	*/
	draw(){
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.arc(this.x, this.y, ball_radius, 0, 2*Math.PI);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
		
		if(this.x + this.dx > canvas.width-ball_radius || this.x + this.dx < ball_radius) {
			this.dx = -this.dx;
		}
		if(this.y + this.dy > canvas.height-ball_radius || this.y + this.dy < ball_radius) {
			this.dy = -this.dy;
		}		
		
		this.x += this.dx;
		this.y += this.dy;
	}
}

// ISSUE: Prevent bubbles from spawning on top of one another.
/**
*Creates a new bubble using the information from the form.
*/
function new_clicked(){
	var xval = parseInt(document.getElementById('x').value);
	var yval = parseInt(document.getElementById('y').value);
	var spdval = parseInt(document.getElementById('speed').value);
	
	var xbad = (xval < document.getElementById('x').getAttribute('min')) || (xval > document.getElementById('x').getAttribute('max'));
	var ybad = (yval < document.getElementById('y').getAttribute('min')) || (yval > document.getElementById('y').getAttribute('max'));
	var spdbad = (spdval < document.getElementById('speed').getAttribute('min')) || (spdval > document.getElementById('speed').getAttribute('max'));

	if (xbad || ybad || spdbad)
		alert("Invalid input!");
	else{
		//If there is already a ball in that coordinate, place
		//the new bubble somewhere else
		balls.push(new Ball(xval,yval,spdval));
	}
}

/**
*Redraw every bubble to simulate movement
*/
function draw_balls(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	Ball.collide()
	
	for(var i = 0; i < balls.length; i++){
		balls[i].draw();
		balls[i].label(i);
	}
}


//Make some random balls
balls.push(new Ball(100,45,2));
balls.push(new Ball(300,75,4));
balls.push(new Ball(100,400,3));
balls.push(new Ball(250,250,2));

//redraw every 20 milliseconds
setInterval(draw_balls,20);