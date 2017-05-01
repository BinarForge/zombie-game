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


module.exports = {
    SpriteFactory: SpriteFactory
}