"use strict";
/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
var SpriteFactory_1 = require("./SpriteFactory");
var Vector2D_1 = require("./Vector2D");
var MovingActor = (function () {
    function MovingActor(game, x, y, sprite, movingSpeed) {
        this._position = new Vector2D_1.Vector2D(x, y);
        this._game = game;
        this._sprite = sprite;
        this._speed = movingSpeed;
        this._canvas = new PIXI.Graphics();
        this.updateSprite();
        this._game.getStage().addChild(this._sprite);
        this._game.getStage().addChild(this._canvas);
    }
    MovingActor.prototype.debug = function () {
        this._canvas.clear();
        this._canvas.lineStyle(4, 0x00FF00);
        this._canvas.drawRect(this._position.x, this._position.y, this._sprite.width, this._sprite.height);
    };
    ;
    MovingActor.prototype.getSprite = function () {
        return this._sprite;
    };
    MovingActor.prototype.getPosition = function () {
        return this._position;
    };
    MovingActor.prototype.update = function () {
        this._position.x += this._speed.x;
        this._position.y += this._speed.y;
        this.updateSprite();
        this.debug();
    };
    MovingActor.prototype.updateSprite = function () {
        this._sprite.position = new PIXI.Point(this._position.x, this._position.y);
    };
    MovingActor.prototype.shoot = function () {
        this._game.spawnActor(this._position.x, this._position.y, SpriteFactory_1.SpriteFactory.for('bullet', 0.03, 0.03), new Vector2D_1.Vector2D(this._speed.x * 10, 0));
    };
    return MovingActor;
}());
exports.MovingActor = MovingActor;
