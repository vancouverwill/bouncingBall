/* exported bodySetUp */
import PageSetUp from "./PageSetUp";

window.onload = function () {
	PageSetUp.bodySetUp();
};

window.onresize = function() {
	PageSetUp.setCanvasSize();
};
