"use strict";

class  BouncingBall {
	constructor(startingX, startingY) {
		
		this.x = startingX;
		this.y = startingY;

		this.colour = this.getRandomColor();
		this.intializeRandomSpeed();

		this.pointRadius = 5;

		this.gravityRate = 0.1;
		this.dampingRate = 0.8;
	}

	intializeRandomSpeed() {
		const minDx = 0.5;
		const dxRange = 2;
		this.dx = Math.random() * dxRange + minDx;

		const minDy = -1;
		const dyRange = -8;
		this.dy = Math.random() * dyRange + minDy;
	}

	set y(value) {
		if (typeof value !== "number") {
			throw new Error("\"y\" must be a number.");
		}
		this._y = value;
	}

	get y() {
		return this._y;
	}  

	set x(value) {
		if (typeof value !== "number") {
			throw new Error("\"x\" must be a number.");
		}
		this._x = value;
	}

	get x() {
		return this._x;
	}

	updatePosition(canvasHeight) {
		if (this.hasHitFloor(canvasHeight)) this.bounce(canvasHeight);

		this.x += this.dx; 
		this.y += this.dy;

		this.applyGravity();
	}

	hasHitFloor(canvasHeight) {
		return this.y > canvasHeight;
	}

	bounce(canvasHeight) {
		this.y = canvasHeight; // prevent getting stuck off screen
		this.dy = -this.dy * this.dampingRate;
	}

	applyGravity() {
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


module.exports = BouncingBall;