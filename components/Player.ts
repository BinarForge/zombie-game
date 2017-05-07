import { SpriteFactory } from './SpriteFactory';
import { MovingActor } from './MovingActor';
import { Vector2D } from './Vector2D';


export class Player extends MovingActor{

    _health: number = 5;

    constructor(game: any, x: number, y: number, sprite: PIXI.Sprite, movingSpeed: Vector2D){
        super(game, x,y, sprite, movingSpeed);
    }

    shoot(){
        let direction = new Vector2D(4,0);

        this._game.spawnActor('MovingActor', this._position.x, this._position.y, SpriteFactory.for('bullet', 0.03, 0.03), direction);
    }

    hit(){
        this._health--;
    }
}