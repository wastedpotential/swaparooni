export function copyright(textureSheet) {
    const RIGHT_MARGIN = 60;
    const copyrightHolder = new PIXI.Container();

    const copyright = new PIXI.Sprite(textureSheet.textures['copyright.png']); 
    copyright.pivot.set(RIGHT_MARGIN + copyright.width, copyright.height);
    copyrightHolder.addChild(copyright);

    const filter = new PIXI.filters.AlphaFilter(1);
    filter.alpha = 0;

    return copyrightHolder;
}