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

        let target = this._game.getPlayer().getPosition();
        if(this._position.x <= target.x)
            return;

        this.nextShoot -= deltaTime;

        if(this.nextShoot <= 0){
            this.shoot(target);
            this.nextShoot = 1 + Math.random()*3;
        }
    }

    shoot(target: Vector2D){
        let direction = this._position.directionTo(target).normalized();
        direction.x *= 2.0;
        direction.y *= 2.0;

        this._game.spawnActor('MovingActor', this._position.x, this._position.y, SpriteFactory.for('bullet', 0.03, 0.03), direction);
    }
}