/* exported bodySetUp */
"use strict";


var PageSetUp = require("./PageSetUp");

// exports.myCanvas = document.getElementById("myCanvas"); 

var bodySetUp = function() {
	var canvas = document.getElementById("myCanvas"); 
	PageSetUp.setCanvasSize(canvas);
	PageSetUp.addEvents();
};

window.onload = function () {
	bodySetUp();
};

window.onresize = function() {
	PageSetUp.setCanvasSize();
};
