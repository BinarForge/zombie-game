/// <reference path="node_modules/@types/pixi.js/index.d.ts" />
import { SpriteFactory } from './components/SpriteFactory';
import { Vector2D } from './components/Vector2D';
import { MovingActor } from './components/MovingActor';
import { Enemy } from './components/Enemy';
import { Keyboard } from './components/Keyboard';
import { Player } from "./components/Player";


export class Game{
    _renderer: PIXI.SystemRenderer;
    _stage: PIXI.Container;

    _actors: MovingActor[];
    _player: Player;
    
    _nextSpawn = 1.0;
    _keyboard: Keyboard;

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

                if(this._actors[j].collidesWith(this._actors[i])){
                    if(this._actors[j] instanceof Player){
                        (this._actors[j] as Player).hit();
                    }
                }
            }

            // cleanup
            if(this._actors[i].getPosition().x <= -300 || this._actors[i].getPosition().x >= this._renderer.width + 300)
                this.destroyActor(i);
        }
    };

    handleKeyboard(){
        if(this._keyboard.getState(Keyboard.Space)){
            
        }
        if(this._keyboard.getState(Keyboard.Up)){
            this._player.move(new Vector2D(0,-4));
        }
        if(this._keyboard.getState(Keyboard.Down)){
            this._player.move(new Vector2D(0,4));
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