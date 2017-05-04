/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />


export class SpriteFactory{
    static textures: { [id: string] : PIXI.Texture; } = {};

    static add(key: string, path: string){
        this.textures[key] = PIXI.Texture.fromImage(path);
    }

    static for(key: string, scaleX: number, scaleY: number): PIXI.Sprite{
        if(!this.textures.hasOwnProperty(key))
            return null;    

        var sprite = new PIXI.Sprite(this.textures[key]);
        sprite.scale.x = typeof scaleX === 'undefined' ? 1.0 : scaleX;
        sprite.scale.y = typeof scaleY === 'undefined' ? 1.0 : scaleY;
        return sprite;
    }
}