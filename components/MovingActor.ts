/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
import { SpriteFactory } from './SpriteFactory';
import { Vector2D } from './Vector2D';
import { Game } from './../Game';
import { Rectangle } from "./Rectangle";


export class MovingActor{
    _position: Vector2D;
    _game: Game;
    _sprite: PIXI.Sprite;
    _speed: Vector2D;
    _canvas: PIXI.Graphics;
    _collisionBox: Rectangle;

    constructor(game: Game, x: number, y: number, sprite: PIXI.Sprite, movingSpeed: Vector2D){
        this._position = new Vector2D(x,y);
        this._game = game;
        this._sprite = sprite;
        this._speed = movingSpeed;
        this._canvas = new PIXI.Graphics();

        this.updateSprite();

        this._game.getStage().addChild(this._sprite);
        this._game.getStage().addChild(this._canvas);

        this._collisionBox = new Rectangle(this._position.x, this._position.y, this._sprite.width, this._sprite.height);
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
    update(deltaTime: number){
        this._position.x+=this._speed.x;
        this._position.y+=this._speed.y;

        this.updateRectangle();
        this.updateSprite();

        if(this._game.isDebugMode())
            this.debug();
    }

    move(translation: Vector2D){
        this._position.x += translation.x;
        this._position.y += translation.y;
    }
    
    updateSprite(){
        this._sprite.position = new PIXI.Point(this._position.x, this._position.y);
    }

    updateRectangle(){
        this._collisionBox.x = this._position.x;
        this._collisionBox.y = this._position.y;
        this._collisionBox.w = this._sprite.width;
        this._collisionBox.h = this._sprite.height;
    }

    getCollision(): Rectangle{
        return this._collisionBox;
    }

    collidesWith(otherActor: MovingActor): boolean{
        return otherActor.getCollision().overlaps(this._collisionBox);
    }

    destroy(){
        this._sprite.destroy();
        this._canvas.destroy();
    }
}