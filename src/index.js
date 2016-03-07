/* exported bodySetUp */
"use strict";


var PageSetUp = require("./PageSetUp");

window.onload = function () {
	PageSetUp.bodySetUp();
};

window.onresize = function() {
	PageSetUp.setCanvasSize();
};
