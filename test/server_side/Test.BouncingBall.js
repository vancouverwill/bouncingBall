require('jsdom-global')()

var assert = require('assert');

var BouncingBall = require('../../src/BouncingBall');


describe('Bouncing Ball', function() {
  var ball, tempCanvasHeight;

  before(function() {
    tempCanvasHeight = 500;
  });

  beforeEach(function() {
    ball = new BouncingBall(20, 40);
  });

  it('should have x and y equal to paramaters passed to the constructor', function () {
      assert.equal(20, ball.x);
      assert.equal(40, ball.y);		
  });

  it('should return a valid new hexadecimal colour', function () {
      var colour = ball.getRandomColor();
      assert.equal(true, colour.match("^\#[A-Z0-9]{6}") != null);
  });

  it('should apply consistent gravity', function() {
    var currentVerticalAcceleration = ball.dy;
    ball.applyGravity()
    var adjustedVerticalAcceleration = ball.dy;
    assert.equal(currentVerticalAcceleration + ball.gravityRate, adjustedVerticalAcceleration);
  });

  it('each new ball should have different starting horizontal and vertical speeds.', function() {
    var ball1 = new BouncingBall(0, 0);
    var ball2 = new BouncingBall(0, 0);
    assert.notEqual(ball1.dx, ball2.dx);
    assert.notEqual(ball1.dy, ball2.dy);
  });

  it('should not allow me to set x or y to non integers', function() {
    assert.throws(function() {ball.x = "not a number"}, Error);
    assert.throws(function() {ball.y = "not a number"}, Error);
  });

  it('should show me if a ball is off the canvas', function() {
    ball.y = tempCanvasHeight + 100;
    assert.equal(true, ball.hasHitFloor(tempCanvasHeight));
  })

  it('should change direction when bouncing', function() {
    ball.dy = 10;
    ball.bounce(tempCanvasHeight);
    assert.equal(ball.dy < 0, true);
  })

  it('should lose momentum when bouncing', function() {
    var startingSpeed = 10;
    ball.dy = startingSpeed;
    ball.bounce(tempCanvasHeight);
    assert.equal(Math.abs(ball.dy) < startingSpeed, true);
  })
});


