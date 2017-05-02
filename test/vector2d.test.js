const assert = require('assert');
const Vector2D = require('../components/Vector2D').Vector2D;


describe('Given the 2d vector instance', function(){
    describe('When initializing it with default parameters', function(){

        let v = new Vector2D();

        it('Its components are equal zero', function(){
            assert.ok(0 === v.x && 0 === v.y);
        })
    })

    describe('When calculating the magnitude of the vector', function(){

        let v = new Vector2D(3.0,4.0);

        it('Then it is being calculated correctly', function(){
            assert.equal(5.0, v.magnitude());
        })
    })
})

describe('Given the two 2d vectors', function(){
    describe('When calculating the direction vector between them', function(){

        let a = new Vector2D(3,2);
        let b = new Vector2D(11,-3);

        let direction = a.directionTo(b);

        it('Then it is being calculated correctly', function(){
            assert.equal(8, direction.x);
            assert.equal(-5, direction.y);
        })
    })
})