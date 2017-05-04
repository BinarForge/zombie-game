/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
import { SpriteFactory } from './SpriteFactory';
import { Vector2D } from './Vector2D';


export class MovingActor{
    _position: Vector2D;
    _game: any;
    _sprite: PIXI.Sprite;
    _speed: Vector2D;
    _canvas: PIXI.Graphics;

    constructor(game: any, x: number, y: number, sprite: PIXI.Sprite, movingSpeed: Vector2D){
        this._position = new Vector2D(x,y);
        this._game = game;
        this._sprite = sprite;
        this._speed = movingSpeed;
        this._canvas = new PIXI.Graphics();

        this.updateSprite();

        this._game.getStage().addChild(this._sprite);
        this._game.getStage().addChild(this._canvas);
    }

    protected debug(){
        this._canvas.clear();
        this._canvas.lineStyle(4, 0x00FF00);
        this._canvas.drawRect(this._position.x, this._position.y, this._sprite.width, this._sprite.height);
    };

    getSprite(){
        return this._sprite;
    }

    getPosition(){
        return this._position;
    }
    update(){
        this._position.x+=this._speed.x;
        this._position.y+=this._speed.y;

        this.updateSprite();

        this.debug();
    }
    
    updateSprite(){
        this._sprite.position = new PIXI.Point(this._position.x, this._position.y);
    }

    shoot(){
        this._game.spawnActor(this._position.x, this._position.y, SpriteFactory.for('bullet', 0.03, 0.03), new Vector2D(this._speed.x*10, 0) );
    }
}