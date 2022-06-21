import * as PIXI from './pixi.js';

export class Header extends PIXI.Container {
	constructor(width) {
		super();
		this.rectangle = PIXI.Sprite.from(PIXI.Texture.WHITE);
		this.resize(width);
		this.rectangle.height = 44;
		this.rectangle.tint = 0xff0000;
		this.addChild(this.rectangle);
	}

	resize(width) {
		this.rectangle.width = width;
	}
}
