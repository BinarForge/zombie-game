"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="node_modules/@types/pixi.js/index.d.ts" />
var SpriteFactory_1 = require("./components/SpriteFactory");
var Vector2D_1 = require("./components/Vector2D");
var MovingActor_1 = require("./components/MovingActor");
var Enemy_1 = require("./components/Enemy");
var Keyboard_1 = require("./components/Keyboard");
var Player_1 = require("./components/Player");
var Bullet_1 = require("./components/Bullet");
var Game = (function () {
    function Game(gameContainerId, resX, resY) {
        this._isDebug = false;
        this._nextSpawn = 1.0;
        this._health = new PIXI.Text('', { fontFamily: 'Arial', fontSize: 16, fill: 0x10ff10, align: 'center' });
        this._info = new PIXI.Text('Use arrows & space to avoid and shoot!', { fontFamily: 'Arial', fontSize: 18, fill: 0x1010ff, align: 'center' });
        this._gameOver = false;
        this._keyboard = new Keyboard_1.Keyboard();
        this._stage = new PIXI.Container();
        this._renderer = PIXI.autoDetectRenderer(resX, resY, { view: document.getElementById(gameContainerId) });
        this._actors = new Array();
        SpriteFactory_1.SpriteFactory.add('zombie', 'resources/zombie.png');
        SpriteFactory_1.SpriteFactory.add('soldier', 'resources/soldier.png');
        SpriteFactory_1.SpriteFactory.add('bullet', 'resources/strawberry.png');
        this._player = this.spawnActor('Player', 70, 250, SpriteFactory_1.SpriteFactory.for('zombie', 0.25, 0.25), new Vector2D_1.Vector2D(0, 0));
        this._health.position = new PIXI.Point(50, 50);
        this._info.position = new PIXI.Point(50, 550);
        this._stage.addChild(this._health);
        this._stage.addChild(this._info);
        this.update();
    }
    ;
    Game.prototype.spawnActor = function (type, x, y, sprite, speed) {
        var actor = null;
        if (type === 'MovingActor')
            actor = new MovingActor_1.MovingActor(this, x, y, sprite, speed);
        else if (type === 'Enemy')
            actor = new Enemy_1.Enemy(this, x, y, sprite, speed);
        else if (type === 'Player')
            actor = new Player_1.Player(this, x, y, sprite, speed);
        else if (type === 'Bullet')
            actor = new Bullet_1.Bullet(this, x, y, sprite, speed, false);
        if (actor === null)
            return;
        this._actors.push(actor);
        return actor;
    };
    ;
    Game.prototype.destroyActor = function (index) {
        if (index < 0 || index >= this._actors.length)
            return;
        this._actors[index].destroy();
        this._actors.splice(index, 1);
    };
    Game.prototype.update = function () {
        if (this._gameOver)
            return;
        this.handleKeyboard();
        var deltaTime = 0.05;
        this._renderer.render(this._stage);
        requestAnimationFrame(this.update.bind(this));
        this._nextSpawn -= deltaTime;
        if (this._nextSpawn <= 0.0) {
            this._nextSpawn = 10.0 + Math.random() * 15.0;
            this.spawnActor('Enemy', this._renderer.width * 1.2, Math.random() * this._renderer.height, SpriteFactory_1.SpriteFactory.for('soldier', 0.5, 0.5), new Vector2D_1.Vector2D(-1, 0));
        }
        for (var i = 0; i < this._actors.length; i++) {
            this._actors[i].update(deltaTime);
            // collisions right after an update
            for (var j = 0; j < this._actors.length; j++) {
                if (j === i)
                    continue;
                if (this._actors[j] !== null && this._actors[j].collidesWith(this._actors[i])) {
                    if (this._actors[j] instanceof Player_1.Player && this._actors[i] instanceof Bullet_1.Bullet && !this._actors[i].isFriendly()) {
                        this._actors[j].hit();
                        this.destroyActor(i);
                    }
                    else if (this._actors[j] instanceof Enemy_1.Enemy && this._actors[i] instanceof Bullet_1.Bullet && this._actors[i].isFriendly()) {
                        var enemy = this._actors[j];
                        enemy.hit();
                        this.destroyActor(i);
                        if (enemy.isDead())
                            this.destroyActor(j);
                    }
                }
            }
            // gui
            this._health.text = 'Health: ' + this._player.getHealth().toString();
            if (this._player.isDead())
                this.finishGame();
            // cleanup
            if (this._actors[i].getPosition().x <= -300 || this._actors[i].getPosition().x >= this._renderer.width + 300)
                this.destroyActor(i);
        }
    };
    Game.prototype.isDebugMode = function () {
        return this._isDebug;
    };
    Game.prototype.finishGame = function () {
        this._gameOver = true;
        var gameOver = new PIXI.Text('Game Over!', { fontFamily: 'Arial', fontSize: 32, fill: 0xff1010, align: 'center' });
        gameOver.position = new PIXI.Point(this._renderer.width * 0.5, this._renderer.height * 0.5);
        this._stage.addChild(gameOver);
        this._renderer.render(this._stage);
    };
    Game.prototype.handleKeyboard = function () {
        if (this._keyboard.getState(Keyboard_1.Keyboard.Space)) {
        }
        if (this._keyboard.getState(Keyboard_1.Keyboard.Up) && this._player.getPosition().y >= 10) {
            this._player.move(new Vector2D_1.Vector2D(0, -4));
        }
        if (this._keyboard.getState(Keyboard_1.Keyboard.Down) && this._player.getPosition().y <= this._renderer.height - 50) {
            this._player.move(new Vector2D_1.Vector2D(0, 4));
        }
        if (this._keyboard.getState(Keyboard_1.Keyboard.Left) && this._player.getPosition().x >= 10) {
            this._player.move(new Vector2D_1.Vector2D(-4, 0));
        }
        if (this._keyboard.getState(Keyboard_1.Keyboard.Right) && this._player.getPosition().x <= this._renderer.width - 10) {
            this._player.move(new Vector2D_1.Vector2D(4, 0));
        }
        if (this._keyboard.getState(Keyboard_1.Keyboard.Space)) {
            this._player.shoot();
        }
    };
    Game.prototype.getStage = function () { return this._stage; };
    ;
    Game.prototype.getPlayer = function () {
        return this._player;
    };
    return Game;
}());
exports.Game = Game;
new Game('game-container', 800, 600);
