"use strict";

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

	updatePosition(canvasHeight) {
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

module.exports = BouncingBall;