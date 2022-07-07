import * as PIXI from './pixi.js';

export class Header extends PIXI.Container {
	constructor(textureSheet, width) {
		super();
		const MENU_BAR_HEIGHT = 50;

		const texBg = textureSheet.textures['menubar_bg.png'];
		this.bg = new PIXI.TilingSprite(texBg, width, MENU_BAR_HEIGHT);
		this.addChild(this.bg);
		const texButton = textureSheet.textures['menubar_site_btn.png'];
		this.siteButton = new PIXI.Sprite(texButton);
		this.addChild(this.siteButton);
		this.siteButton.anchor.set(1, 0);
		this.siteButton.interactive = true;
		this.siteButton.buttonMode = true;
		this.siteButton.defaultCursor = 'pointer';
		this.siteButton.on('mouseup', this.onButtonUp).on('mouseupoutside', this.onButtonUp).on('touchend', this.onButtonUp).on('touchendoutside', this.onButtonUp);
		this.resize(width);
	}

	resize(width) {
		const half = Math.ceil(width / 2);
		if (this.bg) {
			this.bg.width = width + 10;
			this.bg.position.set(-1 * half, 0);
		}
		if (this.siteButton) {
			this.siteButton.position.set(half, 0);
		}
	}

	onButtonUp() {
		window.location = 'http://www.wastedpotential.com';
	}
}
