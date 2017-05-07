import { SpriteFactory } from './SpriteFactory';
import { MovingActor } from './MovingActor';
import { Vector2D } from './Vector2D';
import { Bullet } from "./Bullet";


export class Player extends MovingActor{

    _health: number = 5;
    _cooldown: number = 0;

    constructor(game: any, x: number, y: number, sprite: PIXI.Sprite, movingSpeed: Vector2D){
        super(game, x,y, sprite, movingSpeed);
    }

    shoot(){
        if(this._cooldown > 0)
            return;

        let direction = new Vector2D(4,0);

        let bullet = this._game.spawnActor('Bullet', this._position.x, this._position.y, SpriteFactory.for('bullet', 0.03, 0.03), direction) as Bullet;
        bullet.setFriendly(true);
        this._cooldown = 1.0;
    }

    update(deltaTime: number){
        super.update(deltaTime);

        if(this._cooldown <= 0)
            return;

        this._cooldown -= deltaTime;
    }

    getHealth(): number{
        return this._health;
    }

    isDead(): boolean{
        return (this._health <= 0);
    }

    hit(){
        this._health--;
    }
}