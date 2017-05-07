/// <reference path="node_modules/@types/pixi.js/index.d.ts" />
import { SpriteFactory } from './components/SpriteFactory';
import { Vector2D } from './components/Vector2D';
import { MovingActor } from './components/MovingActor';
import { Enemy } from './components/Enemy';
import { Keyboard } from './components/Keyboard';
import { Player } from "./components/Player";
import { Bullet } from "./components/Bullet";


export class Game {
    _isDebug: boolean = false;
    _renderer: PIXI.SystemRenderer;
    _stage: PIXI.Container;

    _actors: MovingActor[];
    _player: Player;
    
    _nextSpawn = 1.0;
    _keyboard: Keyboard;

    _health: PIXI.Text = new PIXI.Text('',{fontFamily : 'Arial', fontSize: 16, fill : 0x10ff10, align : 'center'});
    _gameOver: boolean = false;

    constructor(gameContainerId: string, resX: number, resY: number){

        this._keyboard = new Keyboard();
        this._stage = new PIXI.Container();
        this._renderer = PIXI.autoDetectRenderer(
            resX,
            resY,
            { view: document.getElementById(gameContainerId) as HTMLCanvasElement }
        );

        this._actors = new Array<MovingActor>();

        SpriteFactory.add('zombie', 'resources/zombie.png');
        SpriteFactory.add('soldier', 'resources/soldier.png');
        SpriteFactory.add('bullet', 'resources/strawberry.png');

        this._player = this.spawnActor('Player',70, 250, SpriteFactory.for('zombie', 0.25, 0.25), new Vector2D(0,0)) as Player;

        this._stage.addChild(this._health);
        this._health.position = new PIXI.Point(50, 50);

        this.update();
    };

    spawnActor(type: string, x,y, sprite, speed): MovingActor{
        var actor: MovingActor = null;

        if(type === 'MovingActor')
            actor = new MovingActor(this, x,y, sprite, speed);
        else if(type === 'Enemy')
            actor = new Enemy(this, x,y, sprite, speed);    
        else if(type === 'Player')
            actor = new Player(this, x,y, sprite, speed);
        else if(type === 'Bullet')
            actor = new Bullet(this, x,y, sprite, speed, false);


        if(actor === null)
            return;

        this._actors.push(actor);
        return actor;
    };

    destroyActor(index: number){
        if(index < 0 || index >= this._actors.length)
            return;

        this._actors[index].destroy();
        this._actors.splice(index, 1);
    }

    update(){
        if(this._gameOver)
            return;

        this.handleKeyboard();
        const deltaTime = 0.05;

        this._renderer.render(this._stage);
        requestAnimationFrame(this.update.bind(this));

        this._nextSpawn -= deltaTime;
        if(this._nextSpawn <= 0.0){
            this._nextSpawn = 10.0 + Math.random() * 15.0;
            this.spawnActor('Enemy', this._renderer.width * 1.2, Math.random()*this._renderer.height, SpriteFactory.for('soldier', 0.5, 0.5), new Vector2D(-1, 0));
        }

        for(var i=0; i<this._actors.length; i++){
            this._actors[i].update(deltaTime);

            // collisions right after an update
            for(var j=0; j<this._actors.length; j++){
                if(j === i)
                    continue;

                if(this._actors[j] !== null && this._actors[j].collidesWith(this._actors[i])){
                    if(this._actors[j] instanceof Player && this._actors[i] instanceof Bullet && !(this._actors[i] as Bullet).isFriendly()){
                        (this._actors[j] as Player).hit();
                        this.destroyActor(i);
                    }
                    else if(this._actors[j] instanceof Enemy && this._actors[i] instanceof Bullet && (this._actors[i] as Bullet).isFriendly()){
                        let enemy = (this._actors[j] as Enemy);
                        enemy.hit();
                        this.destroyActor(i);

                        if(enemy.isDead())
                            this.destroyActor(j);
                    }
                }
            }

            // gui
            this._health.text = 'Health: ' + this._player.getHealth().toString();

            if(this._player.isDead())
                this.finishGame();
            
            // cleanup
            if(this._actors[i].getPosition().x <= -300 || this._actors[i].getPosition().x >= this._renderer.width + 300)
                this.destroyActor(i);
        }
    }

    isDebugMode(): boolean{
        return this._isDebug;
    }

    finishGame(): void{
        this._gameOver = true;

        let gameOver = new PIXI.Text('Game Over!',{fontFamily : 'Arial', fontSize: 32, fill : 0xff1010, align : 'center'});
        gameOver.position = new PIXI.Point(this._renderer.width*0.5, this._renderer.height*0.5);
        this._stage.addChild(gameOver);
        this._renderer.render(this._stage);
    }

    handleKeyboard(){
        if(this._keyboard.getState(Keyboard.Space)){
            
        }
        if(this._keyboard.getState(Keyboard.Up) && this._player.getPosition().y >= 10){
            this._player.move(new Vector2D(0,-4));
        }
        if(this._keyboard.getState(Keyboard.Down) && this._player.getPosition().y <= this._renderer.height - 50){
            this._player.move(new Vector2D(0,4));
        }
        if(this._keyboard.getState(Keyboard.Left) && this._player.getPosition().x >= 10){
            this._player.move(new Vector2D(-4,0));
        }
        if(this._keyboard.getState(Keyboard.Right) && this._player.getPosition().x <= this._renderer.width - 10){
            this._player.move(new Vector2D(4,0));
        }
        if(this._keyboard.getState(Keyboard.Space)){
            this._player.shoot();
        }
    }

    getStage(): PIXI.Container { return this._stage; };

    getPlayer(): MovingActor{
        return this._player;
    }
}


new Game('game-container', 800,600)