import { SpriteFactory } from './SpriteFactory';
import { MovingActor } from './MovingActor';
import { Vector2D } from './Vector2D';


export class Enemy extends MovingActor{

    nextShoot: number = 1;

    constructor(game: any, x: number, y: number, sprite: PIXI.Sprite, movingSpeed: Vector2D){
        super(game, x,y, sprite, movingSpeed);
    }
    
    update(deltaTime: number){
        super.update(deltaTime);

        this.nextShoot -= deltaTime;

        if(this.nextShoot <= 0){
            this.shoot();
            this.nextShoot = 1 + Math.random()*3;
        }
    }

    shoot(){
        this._game.spawnActor('MovingActor', this._position.x, this._position.y, SpriteFactory.for('bullet', 0.03, 0.03), new Vector2D(this._speed.x*10, 0) );
    }
}