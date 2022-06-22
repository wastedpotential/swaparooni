import * as PIXI from './pixi.js';

export class Header extends PIXI.Container {
	constructor(textureSheet, width) {
		super();
		const MENU_BAR_HEIGHT = 50;
		const texBg = textureSheet.textures['menubar_bg.png'];
		this.rectangle = new PIXI.TilingSprite(texBg, width, MENU_BAR_HEIGHT);
		this.addChild(this.rectangle);
	}

	resize(width) {
		this.rectangle.width = width;
	}
}
