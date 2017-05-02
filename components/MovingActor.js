const SpriteFactory = require('./sprite-factory').SpriteFactory;


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


module.exports = {
    MovingActor: MovingActor
}