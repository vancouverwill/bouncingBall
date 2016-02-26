(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BouncingBall = function () {
	function BouncingBall(startingX, startingY) {
		_classCallCheck(this, BouncingBall);

		this.x = startingX;
		this.y = startingY;

		this.colour = this.getRandomColor();
		this.intializeRandomSpeed();

		this.pointRadius = 5;

		this.gravityRate = 0.1;
		this.dampingRate = 0.8;
	}

	_createClass(BouncingBall, [{
		key: "intializeRandomSpeed",
		value: function intializeRandomSpeed() {
			var minDx = 0.5;
			var dxRange = 2;
			this.dx = Math.random() * dxRange + minDx;

			var minDy = -1;
			var dyRange = -8;
			this.dy = Math.random() * dyRange + minDy;
		}
	}, {
		key: "updatePosition",
		value: function updatePosition(canvasHeight) {
			if (this.hasHitFloor(canvasHeight)) this.bounce(canvasHeight);

			this.x += this.dx;
			this.y += this.dy;

			this.applyGravity();
		}
	}, {
		key: "hasHitFloor",
		value: function hasHitFloor(canvasHeight) {
			return this.y > canvasHeight;
		}
	}, {
		key: "bounce",
		value: function bounce(canvasHeight) {
			this.y = canvasHeight;
			this.dy = -this.dy * this.dampingRate;
		}
	}, {
		key: "applyGravity",
		value: function applyGravity() {
			this.dy = this.dy + this.gravityRate;
		}
	}, {
		key: "getRandomColor",
		value: function getRandomColor() {
			var letters = "0123456789ABCDEF".split("");
			var color = "#";
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		}
	}, {
		key: "y",
		set: function set(value) {
			if (typeof value !== "number") {
				throw new Error("\"y\" must be a number.");
			}
			this._y = value;
		},
		get: function get() {
			return this._y;
		}
	}, {
		key: "x",
		set: function set(value) {
			if (typeof value !== "number") {
				throw new Error("\"x\" must be a number.");
			}
			this._x = value;
		},
		get: function get() {
			return this._x;
		}
	}]);

	return BouncingBall;
}();

module.exports = BouncingBall;

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BouncingBall = require("./BouncingBall");

var instance = null;

var Canvas = function () {
	function Canvas(PageObject) {
		_classCallCheck(this, Canvas);

		if (!instance) {
			instance = this;
			this.animation_active = false;
		}

		this.PageObject = PageObject;

		this.balls = [];
		this.context = myCanvas.getContext("2d");
		this.raf;

		return instance;
	}

	_createClass(Canvas, [{
		key: "addBall",
		value: function addBall(event) {
			var ball = new BouncingBall(event.clientX, event.clientY);
			this.balls.push(ball);

			this.setAnimating();
		}
	}, {
		key: "setAnimating",
		value: function setAnimating() {
			if (this.animation_active === false) {
				this.animate();
				this.animation_active = true;
			}
		}
	}, {
		key: "animate",
		value: function animate() {
			this.context.clearRect(0, 0, this.PageObject.canvasWidth, this.PageObject.canvasHeight);

			this.balls = this.balls.map(function (ball) {
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
	}, {
		key: "isInXAxis",
		value: function isInXAxis(ball) {
			if (ball.x > this.PageObject.canvasWidth + ball.pointRadius) {
				return false;
			}
			return true;
		}
	}, {
		key: "drawBall",
		value: function drawBall(ball) {
			this.context.beginPath();
			this.context.fillStyle = ball.colour;
			this.context.arc(ball.x, ball.y, ball.pointRadius, 0, Math.PI * 2, true);
			this.context.closePath();
			this.context.fill();
		}
	}]);

	return Canvas;
}();

module.exports = Canvas;

},{"./BouncingBall":1}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = require("./Canvas");

var PageSetUp = function () {
	function PageSetUp() {
		_classCallCheck(this, PageSetUp);
	}

	_createClass(PageSetUp, null, [{
		key: "updateCanvasHeight",
		value: function updateCanvasHeight() {
			myCanvas.width = this.canvasWidth;
		}
	}, {
		key: "updateCanvasWidth",
		value: function updateCanvasWidth() {
			myCanvas.height = this.canvasHeight;
		}
	}, {
		key: "setCanvasSize",
		value: function setCanvasSize() {
			this.canvasHeight = document.body.clientHeight;
			this.canvasWidth = document.body.clientWidth;
			PageSetUp.updateCanvasHeight();
			PageSetUp.updateCanvasWidth();
		}
	}, {
		key: "getCanvasHeight",
		value: function getCanvasHeight() {
			return myCanvas.width;
		}
	}, {
		key: "getCanvasWidth",
		value: function getCanvasWidth() {
			return myCanvas.height;
		}
	}, {
		key: "addEvents",
		value: function addEvents() {
			var canvas = new Canvas(this);
			myCanvas.addEventListener("click", canvas.addBall.bind(canvas), false);
		}
	}]);

	return PageSetUp;
}();

module.exports = PageSetUp;

},{"./Canvas":2}],4:[function(require,module,exports){
/* exported bodySetUp */
"use strict";

var PageSetUp = require("./PageSetUp");

exports.myCanvas = document.getElementById("myCanvas");

var bodySetUp = function bodySetUp() {
	PageSetUp.setCanvasSize();
	PageSetUp.addEvents();
};

window.onload = function () {
	bodySetUp();
};

window.onresize = function () {
	PageSetUp.setCanvasSize();
};

},{"./PageSetUp":3}]},{},[4])


//# sourceMappingURL=bundle.js.map
