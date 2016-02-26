"use strict";

var BouncingBall = require("./BouncingBall");

let instance = null;

class Canvas {
	constructor(PageObject) {
		if(!instance){
			instance = this;
			this.animation_active = false;
		}

		this.PageObject = PageObject;

		this.balls = [];
		this.context = myCanvas.getContext("2d");
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
		this.context.clearRect(0, 0, this.PageObject.canvasWidth, this.PageObject.canvasHeight);
		
		this.balls = this.balls.map(function(ball) {
			ball.updatePosition(this.PageObject.canvasHeight);
			this.drawBall(ball);
			return ball;
		}, this);

		this.balls = this.balls.filter(this.isInXAxis.bind(this));

		if (this.balls.length == 0) {
			window.cancelAnimationFrame(this.raf);
			this.animation_active = false;
			return;
		}

		this.raf = window.requestAnimationFrame(this.animate.bind(this));
	}

	isInXAxis(ball) {
		if ( ball.x > this.PageObject.canvasWidth + ball.pointRadius) {
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

module.exports = Canvas;