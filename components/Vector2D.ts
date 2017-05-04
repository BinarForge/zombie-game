export class Vector2D{
    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number){
        this.x = x === null ? 0 : x;
        this.y = y === null ? 0 : y;
    }

    directionTo(otherVector: Vector2D): Vector2D{
        if(!(otherVector instanceof Vector2D))
            return new Vector2D(0,0);

        return new Vector2D(otherVector.x - this.x, otherVector.y - this.y);
    }

    magnitude(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    };
}