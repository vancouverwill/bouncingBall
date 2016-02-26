require('jsdom-global')()

var assert = require('assert');

var Canvas = require('../../src/Canvas');


describe('Canvas', function() {
  var canvas;

  before(function() { 
  	// var html = '<div></div><div></div><div class="addHere"></div>';
  	// $('body').append(html);
    
    
    // var htmlCanvas = document.getElementById("myCanvas"); 
    canvas = new Canvas(htmlCanvas);
  });

  // beforeEach(function() {
  // ball = new BouncingBall(20, 40);
  // });
  // 
  
    it('should have 0 balls to start with', function () {

        assert.equal(0, canvas.balls.length);
    });
  

 });