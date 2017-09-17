class  BouncingBall {
	constructor(startingX, startingY) {
		
		this.x = startingX;
		this.y = startingY;

		this.colour = BouncingBall.getRandomColor();
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

		if (this.isBallOffGround(canvasHeight)) {
			this.applyGravity();
		}
	}

	isBallOffGround(canvasHeight) {
		return canvasHeight - this.y > this.pointRadius / 2;
	}

	hasHitFloor(canvasHeight) {
		return this.y > canvasHeight;
	}

	bounce(canvasHeight) {
		this.y = canvasHeight; // prevent getting stuck off screen
		const minSpeedNeededToLeaveFloor = 0.1;
		if (Math.abs(this.dy) > minSpeedNeededToLeaveFloor) {
			this.dy = -this.dy * this.dampingRate;
		}
		else {
			this.setBallRolling(canvasHeight);
		}
	}

	setBallRolling(canvasHeight) {
		this.y = canvasHeight - this.pointRadius / 2;
		this.dy = 0;
	}

	applyGravity() {
		this.dy = this.dy + this.gravityRate;
	}

	static getRandomColor() {
		const letters = "0123456789ABCDEF".split("");
		let color = "#";
		for (let i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}	
}


export default BouncingBall;