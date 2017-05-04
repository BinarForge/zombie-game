export class Rectangle{
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(x: number,y: number,w: number, h: number){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    right(): number{
        return this.x + this.w;
    }
    bottom(): number{
        return this.y + this.h;
    }

    overlaps(otherRect: Rectangle){
        var vertically = false;
        var horizontally = false;

        if(this.x >= otherRect.x && this.x <= otherRect.right())
            horizontally = true;

        if(this.right() >= otherRect.x && this.right() <= otherRect.right())
            horizontally = true;
            
        if(this.y >= otherRect.y && this.y <= otherRect.bottom())
            vertically = true;

        if(this.bottom() >= otherRect.y && this.bottom() <= otherRect.bottom())
            vertically = true;                

        return (vertically && horizontally);
    }
}