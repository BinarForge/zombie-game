function Vector2D(x,y){

    var _x = x | 0;
    var _y = y | 0;

    var _directionTo = function(otherVector){
        if(typeof otherVector.x === 'undefined' || typeof otherVector.y === 'undefined')
            return new Vector2D(0,0);

        return new Vector2D(otherVector.x - _x, otherVector.y - _y);
    };

    var _magnitude = function(){
        return Math.sqrt(_x*_x + _y*_y);
    };

    return {
        x: _x,
        y: _y,
        directionTo: _directionTo,
        magnitude: _magnitude
    }
}


module.exports = {
    Vector2D: Vector2D
}