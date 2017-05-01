
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

function MovingActor(game, x, y, sprite, movingSpeed){
    var _position = {
        x: x,
        y: y
    };
    var _game = game;
    var _sprite = sprite;
    var _canvas = new PIXI.Graphics();
    
    _sprite.position = _position;

    _game.getStage().addChild(_sprite);
    _game.getStage().addChild(_canvas);

    console.log(_sprite);

    var _debug = function(){
        _canvas.clear();
        _canvas.lineStyle(4, 0x00FF00);
        _canvas.drawRect(_position.x, _position.y, _sprite.width, _sprite.height);
    };

    return {
        getSprite: function(){
            return _sprite;
        },
        getPosition(){
            return _position;
        },
        update: function(){
            _position.x+=movingSpeed;
            _sprite.position = _position;

            _debug();
        },
        shoot: function(){
            _game.spawnActor(_position.x, _position.y, SpriteFactory.for('bullet', 0.03, 0.03), movingSpeed*10 );
        }
    }
};


function SpriteFactory(){}

SpriteFactory.textures = {};

SpriteFactory.add = function(key, path){
    this.textures[key] = new PIXI.Texture.fromImage(path);
};

SpriteFactory.for = function(key, scaleX, scaleY){
    if(!this.textures.hasOwnProperty(key))
        return null;

    var sprite = new PIXI.Sprite(this.textures[key]);
    sprite.scale.x = typeof scaleX === 'undefined' ? 1.0 : scaleX;
    sprite.scale.y = typeof scaleY === 'undefined' ? 1.0 : scaleY;
    return sprite;
};

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


var graphics = new PIXI.Graphics();

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