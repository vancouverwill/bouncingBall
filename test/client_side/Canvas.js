require('jsdom-global')()

var assert = require('assert');

var Canvas = require('../../src/Canvas');
var PageSetUp = require('../../src/PageSetUp');


describe('Canvas', function() {
  var canvas;

  before(function() { 
    var htmlCanvas = document.getElementById("myCanvas"); 
    // var PageSetUp = new PageSetUp();
    PageSetUp.bodySetUp()
    canvas = PageSetUp.canvasController;
    // canvas = new Canvas(PageSetUp);
  });

  // beforeEach(function() {
  // ball = new BouncingBall(20, 40);
  // });
  // 
  
    it('should have 0 balls to start with', function () {
        assert.equal(0, canvas.balls.length);
    });
  

 });