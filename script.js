// https://developer.mozilla.org/en-US/docs/Games/Workflows/2D_Breakout_game_pure_JavaScript/Bounce_off_the_walls

'use strict';

var canvas = document.getElementById('my_canvas');
var ctx = canvas.getContext("2d");

var ball_radius = 30;

var balls = [];

class Ball{
	
	constructor(x,y,speed){
		this.x = x;
		this.y = y;
		this.dx = speed;
		this.dy = -speed;
	}
	
	label(n){
		ctx.fillStyle = '#000000';
		ctx.fillText(n,this.x,this.y);
	}
	
	// http://processingjs.org/learning/topic/bouncybubbles/
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

function draw_balls(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	Ball.collide()
	
	for(var i = 0; i < balls.length; i++){
		balls[i].draw();
		balls[i].label(i);
	}
}

balls.push(new Ball(100,45,2));
balls.push(new Ball(300,75,4));
balls.push(new Ball(100,400,3));
balls.push(new Ball(250,250,2));

//redraw every 20 milliseconds
setInterval(draw_balls,20);