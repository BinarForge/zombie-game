"use strict";
var Rectangle = (function () {
    function Rectangle(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    Rectangle.prototype.right = function () {
        return this.x + this.w;
    };
    Rectangle.prototype.bottom = function () {
        return this.y + this.h;
    };
    Rectangle.prototype.overlaps = function (otherRect) {
        var vertically = false;
        var horizontally = false;
        if (this.x >= otherRect.x && this.x <= otherRect.right())
            horizontally = true;
        if (this.right() >= otherRect.x && this.right() <= otherRect.right())
            horizontally = true;
        if (this.y >= otherRect.y && this.y <= otherRect.bottom())
            vertically = true;
        if (this.bottom() >= otherRect.y && this.bottom() <= otherRect.bottom())
            vertically = true;
        return (vertically && horizontally);
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
