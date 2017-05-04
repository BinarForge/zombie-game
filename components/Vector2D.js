"use strict";
var Vector2D = (function () {
    function Vector2D(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x === null ? 0 : x;
        this.y = y === null ? 0 : y;
    }
    Vector2D.prototype.directionTo = function (otherVector) {
        if (!(otherVector instanceof Vector2D))
            return new Vector2D(0, 0);
        return new Vector2D(otherVector.x - this.x, otherVector.y - this.y);
    };
    Vector2D.prototype.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    ;
    return Vector2D;
}());
exports.Vector2D = Vector2D;
