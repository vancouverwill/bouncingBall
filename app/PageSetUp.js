import Canvas from "./Canvas";

class PageSetUp {
	constructor() {
		this.canvasController;
		this.htmlCanvasElement;
	}
	static bodySetUp() {
		this.htmlCanvasElement = document.getElementById("myCanvas"); 
		this.setCanvasSize();
		this.addEvents();
	}

	static updateCanvasHeight() {
		this.htmlCanvasElement.width = this.canvasWidth;
	}

	static updateCanvasWidth() {
		this.htmlCanvasElement.height = this.canvasHeight;
	}

	static setCanvasSize() {
		this.canvasHeight = document.body.clientHeight;
		this.canvasWidth = document.body.clientWidth;
		PageSetUp.updateCanvasHeight();
		PageSetUp.updateCanvasWidth();
	}

	static getCanvasHeight() {
		return this.htmlCanvasElement.width;
	}

	static getCanvasWidth() {
		return this.htmlCanvasElement.height;
	}

	static addEvents() {
		this.canvasController = new Canvas(this);
		this.htmlCanvasElement.addEventListener("click", this.canvasController.addBall.bind(this.canvasController), false);
	}
}

export default PageSetUp;