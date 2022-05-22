import {Sprite, Container, filters} from 'pixi.js';

export function copyright(textureSheet) {
    const RIGHT_MARGIN = 60;
    const copyrightHolder = new Container();

    const copyright = new Sprite(textureSheet.textures['copyright.png']); 
    copyright.pivot.set(RIGHT_MARGIN + copyright.width, copyright.height);
    copyrightHolder.addChild(copyright);

    const filter = new filters.AlphaFilter(1);
    filter.alpha = 0;

    return copyrightHolder;
}