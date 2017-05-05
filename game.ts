/// <reference path="node_modules/@types/pixi.js/index.d.ts" />
import { SpriteFactory } from './components/SpriteFactory';
import { Vector2D } from './components/Vector2D';
import { MovingActor } from './components/MovingActor';
import { Enemy } from './components/Enemy';
import { keyboard } from './components/keyboard';


export class Game{
    _renderer: PIXI.SystemRenderer;
    _stage: PIXI.Container;

    _actors: MovingActor[];
    _player: MovingActor;
    
    _nextSpawn = 1.0;

    constructor(gameContainerId: string, resX: number, resY: number){
        this._stage = new PIXI.Container();
        this._renderer = PIXI.autoDetectRenderer(
            resX,
            resY,
            { view: document.getElementById(gameContainerId) as HTMLCanvasElement }
        );

        this._actors = new Array<MovingActor>();

        SpriteFactory.add('zombie', 'resources/zombie.png');
        SpriteFactory.add('bullet', 'resources/strawberry.png');

        this._player = this.spawnActor('MovingActor',70, 250, SpriteFactory.for('zombie', 0.4, 0.4), new Vector2D(0.1, 0));

        this.update();
    };

    spawnActor(type: string, x,y, sprite, speed): MovingActor{
        var actor: MovingActor = null;

        if(type === 'MovingActor')
            actor = new MovingActor(this, x,y, sprite, speed);
        else if(type === 'Enemy')
            actor = new Enemy(this, x,y, sprite, speed);

        if(actor === null)
            return;

        this._actors.push(actor);
        return actor;
    };

    update(){
        const deltaTime = 0.05;

        this._renderer.render(this._stage);
        requestAnimationFrame(this.update.bind(this));

        this._nextSpawn -= deltaTime;
        if(this._nextSpawn <= 0.0){
            this._nextSpawn = 8.0 + Math.random() * 12.0;
            this.spawnActor('Enemy', this._renderer.width * 1.2, Math.random()*this._renderer.height, SpriteFactory.for('zombie', -0.25, 0.25), new Vector2D(-1, 0));
        }

        for(var i=0; i<this._actors.length; i++){
            this._actors[i].update(deltaTime);
        }
    };

    getStage(): PIXI.Container { return this._stage; };

    getPlayer(): MovingActor{
        return this._player;
    }
}


new Game('game-container', 800,600)