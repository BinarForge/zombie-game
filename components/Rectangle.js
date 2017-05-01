function Rectangle(x,y,w,h){
    return {
        x: x,
        y: y,
        w: w,
        h: h,
        right: function(){ return x+w },
        bottom: function(){ return y+h },
        overlaps: function(otherRect){
            var vertically = false;
            var horizontally = false;

            if(x >= otherRect.x && x <= otherRect.right())
                horizontally = true;

            if(this.right() >= otherRect.x && this.right() <= otherRect.right())
                horizontally = true;
                
            if(y >= otherRect.y && y <= otherRect.bottom())
                vertically = true;

            if(this.bottom() >= otherRect.y && this.bottom() <= otherRect.bottom())
                vertically = true;                

            return (vertically && horizontally);
        }
    }
}

module.exports = {
    Rectangle: Rectangle
}