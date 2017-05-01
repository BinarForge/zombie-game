const assert = require('assert');
const Rectangle = require('../components/Rectangle').Rectangle;


describe('Given the two rectangles', function() {
  describe('When they logically overlap each other', function() {

    var rectangleA = new Rectangle(0,0, 100, 100);
    var rectangleB = new Rectangle(25,25, 150, 150);

    it('Then the `overlaps` method returns true', function() {
        assert.ok(rectangleA.overlaps(rectangleB));
        assert.ok(rectangleB.overlaps(rectangleA));
    });
  });

  describe('When they logically do not overlap each other', function() {

    var rectangleA = new Rectangle(0,0, 100, 100);
    var rectangleB = new Rectangle(225,225, 2150, 2150);

    it('Then the `overlaps` method returns false', function() {
        assert.ok(!rectangleA.overlaps(rectangleB));
        assert.ok(!rectangleB.overlaps(rectangleA));
    });
  });

  describe('When they logically, partially overlap each other', function() {

    var rectangleA = new Rectangle(0,0, 100, 100);
    var rectangleB = new Rectangle(50,50, 100, 100);

    it('Then the `overlaps` method returns true', function() {
        assert.ok(rectangleA.overlaps(rectangleB));
        assert.ok(rectangleB.overlaps(rectangleA));
    });

    rectangleA_2 = new Rectangle(0,0, 100, 100);
    rectangleB_2 = new Rectangle(-50,-50, 100, 100);

    it('Then the `overlaps` method returns true', function() {
        assert.ok(rectangleA_2.overlaps(rectangleB_2));
        assert.ok(rectangleB_2.overlaps(rectangleA_2));
    });
  });
});