/* exported bodySetUp */
"use strict";


var PageSetUp = require('./PageSetUp');


exports.myCanvas = document.getElementById("myCanvas"); 

var bodySetUp = function() {
	// var pageSetUp = PageSetUp();
	PageSetUp.setCanvasSize();
	PageSetUp.addEvents();
};

window.onload = function () {
  	bodySetUp();
}

window.onresize = function() {
	PageSetUp.setCanvasSize();
}








