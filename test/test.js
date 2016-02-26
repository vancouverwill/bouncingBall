require('jsdom-global')()
//var jsdom = require('mocha-jsdom')
var babelpolyfill = require('babel-polyfill')

var assert = require('assert');
//var chai = require('chai');

var BouncingBall = require('../src/index');


//var expect = chai.expect;
//var should = chai.should();

describe('Array', function() {

	//jsdom()

  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

describe('Bouncing Ball', function() {
	it('should have x and y equal to paramaters passed to the constructor', function () {
        var ball = new BouncingBall(20, 40)
        assert.equal(20, ball.x);
        assert.equal(40, ball.y);		
	});

    it('should return a valid new hexadecimal colour', function () {
        var ball = new BouncingBall(0, 0);
        var colour = ball.getRandomColor();
        //console.log(colour.temp(".match("^\#[A-Z0-9]{6}")"));
        assert.equal(true, colour.match("^\#[A-Z0-9]{6}") != null);
    });
});

console.log(BouncingBall);
console.log("test");
