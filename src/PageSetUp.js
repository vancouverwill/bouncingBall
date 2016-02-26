"use strict";

var Canvas = require("./Canvas");

class PageSetUp {
	constructor() {

	}
	static updateCanvasHeight() {
		this.canvas.width = this.canvasWidth;
	}

	static updateCanvasWidth() {
		this.canvas.height = this.canvasHeight;
	}

	static setCanvasSize(canvas) {
		this.canvas = canvas;
		this.canvasHeight = document.body.clientHeight;
		this.canvasWidth = document.body.clientWidth;
		PageSetUp.updateCanvasHeight();
		PageSetUp.updateCanvasWidth();
	}

	static getCanvasHeight() {
		return this.canvas.width;
	}

	static getCanvasWidth() {
		return this.canvas.height;
	}

	static addEvents() {
		var canvas = new Canvas(this);
		this.canvas.addEventListener("click", canvas.addBall.bind(canvas), false);
	}
}

module.exports = PageSetUp;