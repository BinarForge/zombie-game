const MovingActor = require('./components/MovingActor').MovingActor;
const keyboard = require('./components/keyboard').keyboard;
const SpriteFactory = require('./components/sprite-factory').SpriteFactory;


function Game(){
    var _renderer,
        _stage;

    var _actors = [];
    var _player;

    var _onSpace = keyboard(32);
    _onSpace.press = function(){
        _player.shoot();
    };

    var _init = function(gameContainerId, resX, resY){
        _spawnActor = _spawnActor.bind(this);
        _getStage = _getStage.bind(this);

        _stage = new PIXI.Container();
        _renderer = PIXI.autoDetectRenderer(
            800,
            600,
            {view: document.getElementById(gameContainerId)}
        );

        SpriteFactory.add('zombie', 'resources/zombie.png');
        SpriteFactory.add('bullet', 'resources/strawberry.png');

        _spawnActor(550, 150, SpriteFactory.for('zombie', -0.25, 0.25), -1);
        _spawnActor(670, 50, SpriteFactory.for('zombie', -0.25, 0.25), -1.2);

        _player = _spawnActor(70, 250, SpriteFactory.for('zombie', 0.4, 0.4), 0.1);

        _update();
    };

    var _spawnActor = function(x,y, sprite, speed){
        var enemy = new MovingActor(this, x,y, sprite, speed);
        _actors.push(enemy);
        return enemy;
    };

    var _update = function(){
        _renderer.render(_stage);
        requestAnimationFrame(_update);

        for(var i=0; i<_actors.length; i++){
            _actors[i].update();
        }
    };

    var _getStage = function(){ return _stage; };

    return {
        init: _init,
        getStage: _getStage,
        spawnActor: _spawnActor
    }
}


new Game().init('game-container', 800,600)