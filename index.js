'use strict';

	const canvasHeight = 400;

  	const canvasWidth = 800;

class PageSetUp {
	static setWidth() {
	  var canvas = document.getElementById("myCanvas");  
	  canvas.width = canvasWidth;
	}

	static setHeight() {
	  var canvas = document.getElementById("myCanvas");  
	  canvas.height = canvasHeight;
	}

	static setCanvasSize() {
		PageSetUp.setWidth();
		PageSetUp.setHeight();
	}
}


var bodySetUp = function() {
	PageSetUp.setCanvasSize();

	var el = document.getElementById("myCanvas");
	el.addEventListener("click", Canvas.clickEvent, false);
};



class Canvas {
	constructor() {
		this.ball;

		this.interval = 1;
		this.context = myCanvas.getContext('2d');
		this.refreshIntervalId;
	}

	static clickEvent(event) {
		this.ball = new BouncingBall();
		this.ball.init(event.clientX, event.clientY);

		// this.draw()
		this.canvas = new Canvas();
	  	
	  	this.refreshIntervalId = setInterval(this.canvas.draw.bind(this), this.interval);
	}

	draw()
	{
		this.context.clearRect(0, 0, canvasWidth, canvasHeight);
		this.context.beginPath();
		this.context.fillStyle= this.ball.colour;
		this.context.arc(this.ball.x, this.ball.y, this.ball.pointRadius, 0, Math.PI*2, true);
		this.context.closePath();
		this.context.fill();

		this.ball.updatePosition();
		
		if (this.ball.x > canvasWidth + this.pointRadius) {
	  		window.clearInterval(this.refreshIntervalId)
	  	}
	}

}


class  BouncingBall {
	constructor() {
		
		this.x, this.y;
		this.dx = 0.5;
		this.dy = -2;

		this.pointRadius = 5;

		this.gravityRate = 0.01;
		this.dampingRate = 0.9;

		this.colour;

	}

	

	init(startingX, startingY)
	{
		this.x = startingX;
		this.y = startingY;

		this.colour = this.getRandomColor();

		
	}

	updatePosition() {
		if(this.y > canvasHeight) this.dy = -this.dy * this.dampingRate; 
		this.x += this.dx; 
		this.y += this.dy;

		this.dy = this.dy + this.gravityRate;
	}

	getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}

	
}










// Math.random() 













// alert("hello");