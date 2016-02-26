require('jsdom-global')()
// var babelpolyfill = require('babel-polyfill')

var assert = require('assert');

var BouncingBall = require('../src/BouncingBall');

describe('Bouncing Ball', function() {
	it('should have x and y equal to paramaters passed to the constructor', function () {
        var ball = new BouncingBall(20, 40)
        assert.equal(20, ball.x);
        assert.equal(40, ball.y);		
	});

    it('should return a valid new hexadecimal colour', function () {
        var ball = new BouncingBall(0, 0);
        var colour = ball.getRandomColor();
        assert.equal(true, colour.match("^\#[A-Z0-9]{6}") != null);
    });

    it('should apply consistent gravity', function() {
      var ball = new BouncingBall(0, 0);
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
      var ball = new BouncingBall(0, 0);
      assert.throws(function() {ball.x = "not a number"}, Error);
      assert.throws(function() {ball.y = "not a number"}, Error);
    });
});

console.log(BouncingBall);
console.log("test");
