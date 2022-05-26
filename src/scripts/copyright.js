import { Sprite } from '@pixi/sprite';
import { Container } from '@pixi/display';

export function copyright(textureSheet) {
	const RIGHT_MARGIN = 60;
	const copyrightHolder = new Container();

	const copyright = new Sprite(textureSheet.textures['copyright.png']);
	copyright.pivot.set(RIGHT_MARGIN + copyright.width, copyright.height);
	copyrightHolder.addChild(copyright);

	return copyrightHolder;
}
