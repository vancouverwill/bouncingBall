/* exported bodySetUp */
"use strict";

// require('babel-core/register');


var myCanvas, canvasHeight, canvasWidth;

class PageSetUp {
	static setWidth() {
		myCanvas.width = canvasWidth;
	}

	static setHeight() {
		myCanvas.height = canvasHeight;
	}

	static setCanvasSize() {
		canvasHeight = document.body.clientHeight;
		canvasWidth = document.body.clientWidth;
		myCanvas = document.getElementById("myCanvas");  
		PageSetUp.setWidth();
		PageSetUp.setHeight();
	}
}

var bodySetUp = function() {
	PageSetUp.setCanvasSize();
	var canvas = new Canvas();
	myCanvas.addEventListener("click", canvas.addBall.bind(canvas), false);
};

window.onresize = PageSetUp.setCanvasSize;


let instance = null;

class Canvas {
	constructor() {
		if(!instance){
			instance = this;
			this.animation_active = false;
		}

		this.balls = [];
		this.context = myCanvas.getContext("2d");
		// this.refreshIntervalId;
		this.raf;

		return instance;
	}

	addBall(event) {
		var ball = new BouncingBall(event.clientX, event.clientY);
		this.balls.push(ball);

		this.setAnimating();
	}

	setAnimating() {
		if (this.animation_active === false) {
			this.animate();
			this.animation_active = true;
		}
	}

	animate(){
		this.context.clearRect(0, 0, canvasWidth, canvasHeight);
		
		this.balls = this.balls.map(function(ball, index) {
			ball.updatePosition();
			this.drawBall(ball);
				return ball;
		}, this);

		this.balls = this.balls.filter(this.isInXAxis);

		if (this.balls.length == 0) {
			window.cancelAnimationFrame(this.raf);
			this.animation_active = false;
			return;
		}

		this.raf = window.requestAnimationFrame(this.animate);
		// this.raf = window.requestAnimationFrame(this.draw.bind(this));
	}

	isInXAxis(ball) {
		if ( ball.x > canvasWidth + ball.pointRadius) {
			return false;
		}
		return true;
	}

	drawBall(ball) {
		this.context.beginPath();
		this.context.fillStyle= ball.colour;
		this.context.arc(ball.x, ball.y, ball.pointRadius, 0, Math.PI*2, true);
		this.context.closePath();
		this.context.fill();
	}
}


class  BouncingBall {
	constructor(startingX, startingY) {
		
		this.x = startingX;
		this.y = startingY;

		this.colour = this.getRandomColor();
		this.dx = Math.random() * 2 + 0.5;
		this.dy = Math.random() * -8 - 1;

		this.pointRadius = 5;

		this.gravityRate = 0.1;
		this.dampingRate = 0.8;

		this.colour;
	}

	set y(value) {
		if (typeof value !== 'number') {
			throw new Error('"y" must be a number.');
		}
		this._y = value;
	}

	get y() {
		return this._y;
	}  

	set x(value) {
		if (typeof value !== 'number') {
			throw new Error('"x" must be a number.');
		}
		this._x = value;
	}

	get x() {
		return this._x;
	}

	updatePosition() {
		if (this.y > canvasHeight) {
			this.y = canvasHeight;
			this.dy = -this.dy * this.dampingRate; 
		}
		this.x += this.dx; 
		this.y += this.dy;

		this.dy = this.dy + this.gravityRate;
	}

	getRandomColor() {
		var letters = "0123456789ABCDEF".split("");
		var color = "#";
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}	
}

var exports = module.exports = BouncingBall;
