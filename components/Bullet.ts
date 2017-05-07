import { MovingActor } from './MovingActor';
import { Vector2D } from './Vector2D';


export class Bullet extends MovingActor{

    _isFriendly: boolean = false;

    constructor(game: any, x: number, y: number, sprite: PIXI.Sprite, movingSpeed: Vector2D, isFriendly: boolean){
        super(game, x,y, sprite, movingSpeed);

        this._isFriendly = isFriendly;
    }

    setFriendly(value: boolean): void{
        this._isFriendly = value;
    }

    isFriendly(): boolean{
        return this._isFriendly;
    }
}