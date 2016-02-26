(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{"./BouncingBall":1}],3:[function(require,module,exports){
"use strict";

var Canvas = require("./Canvas");

class PageSetUp {
	constructor() {

	}
	static updateCanvasHeight() {
		myCanvas.width = this.canvasWidth;
	}

	static updateCanvasWidth() {
		myCanvas.height = this.canvasHeight;
	}

	static setCanvasSize() {
		this.canvasHeight = document.body.clientHeight;
		this.canvasWidth = document.body.clientWidth;
		PageSetUp.updateCanvasHeight();
		PageSetUp.updateCanvasWidth();
	}

	static getCanvasHeight() {
		return myCanvas.width;
	}

	static getCanvasWidth() {
		return myCanvas.height;
	}

	static addEvents() {
		var canvas = new Canvas(this);
		myCanvas.addEventListener("click", canvas.addBall.bind(canvas), false);
	}
}

module.exports = PageSetUp;
},{"./Canvas":2}],4:[function(require,module,exports){
/* exported bodySetUp */
"use strict";


var PageSetUp = require("./PageSetUp");

exports.myCanvas = document.getElementById("myCanvas"); 

var bodySetUp = function() {
	PageSetUp.setCanvasSize();
	PageSetUp.addEvents();
};

window.onload = function () {
	bodySetUp();
};

window.onresize = function() {
	PageSetUp.setCanvasSize();
};









},{"./PageSetUp":3}]},{},[4]);

//# sourceMappingURL=bundle.js.map
