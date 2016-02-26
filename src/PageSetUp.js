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