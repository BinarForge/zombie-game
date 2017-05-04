"use strict";
/// <reference path="node_modules/@types/pixi.js/index.d.ts" />
var SpriteFactory_1 = require("./components/SpriteFactory");
var Vector2D_1 = require("./components/Vector2D");
var MovingActor_1 = require("./components/MovingActor");
var keyboard_1 = require("./components/keyboard");
var Game = (function () {
    function Game(gameContainerId, resX, resY) {
        this._onSpace = keyboard_1.keyboard(32);
        this.press = function () {
            _player.shoot();
        };
        this._stage = new PIXI.Container();
        this._renderer = PIXI.autoDetectRenderer(resX, resY, { view: document.getElementById(gameContainerId) });
        this._actors = new Array();
        SpriteFactory_1.SpriteFactory.add('zombie', 'resources/zombie.png');
        SpriteFactory_1.SpriteFactory.add('bullet', 'resources/strawberry.png');
        this.spawnActor(550, 150, SpriteFactory_1.SpriteFactory.for('zombie', -0.25, 0.25), new Vector2D_1.Vector2D(-1, 0));
        this.spawnActor(670, 50, SpriteFactory_1.SpriteFactory.for('zombie', -0.25, 0.25), new Vector2D_1.Vector2D(-1.2, 0));
        this._player = this.spawnActor(70, 250, SpriteFactory_1.SpriteFactory.for('zombie', 0.4, 0.4), new Vector2D_1.Vector2D(0.1, 0));
        this.update();
    }
    ;
    Game.prototype.spawnActor = function (x, y, sprite, speed) {
        var enemy = new MovingActor_1.MovingActor(this, x, y, sprite, speed);
        this._actors.push(enemy);
        return enemy;
    };
    ;
    Game.prototype.update = function () {
        this._renderer.render(this._stage);
        requestAnimationFrame(this.update.bind(this));
        for (var i = 0; i < this._actors.length; i++) {
            this._actors[i].update();
        }
    };
    ;
    Game.prototype.getStage = function () { return this._stage; };
    ;
    return Game;
}());
new Game('game-container', 800, 600);
