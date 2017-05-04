/// <reference path="node_modules/@types/pixi.js/index.d.ts" />
import { SpriteFactory } from './components/SpriteFactory';
import { Vector2D } from './components/Vector2D';
import { MovingActor } from './components/MovingActor';
import { Enemy } from './components/Enemy';
import { keyboard } from './components/keyboard';


class Game{
    _renderer: PIXI.SystemRenderer;
    _stage: Object;

    _actors: MovingActor[];
    _player: MovingActor;
    
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

        this.spawnActor('Enemy', 550, 150, SpriteFactory.for('zombie', -0.25, 0.25), new Vector2D(-1, 0));
        this.spawnActor('Enemy',670, 50, SpriteFactory.for('zombie', -0.25, 0.25), new Vector2D(-1.2, 0));

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
        this._renderer.render(this._stage);
        requestAnimationFrame(this.update.bind(this));

        for(var i=0; i<this._actors.length; i++){
            this._actors[i].update(0.05);
        }
    };

    getStage(){ return this._stage; };
}


new Game('game-container', 800,600)