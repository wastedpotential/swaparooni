import * as PIXI from './pixi.js';
import gsap from 'gsap';

export function button(textureSheet, onPressCallback) {
	const buttonHolder = new PIXI.Container();

	const texBottom = textureSheet.textures['press_bottom.png'];
	const buttonBottom = new PIXI.Sprite(texBottom);
	buttonHolder.addChild(buttonBottom);

	const texTop = textureSheet.textures['press_top.png'];
	const buttonTop = new PIXI.Sprite(texTop);
	buttonHolder.addChild(buttonTop);

	buttonHolder.pivot.set(0.5 * buttonBottom.width, 0.5 * buttonBottom.height);

	buttonHolder.interactive = true;
	buttonHolder.buttonMode = true;
	buttonHolder.defaultCursor = 'pointer';
	buttonHolder.on('mousedown', onButtonDown).on('mouseup', onButtonUp).on('mouseupoutside', onButtonUp).on('touchstart', onButtonDown).on('touchend', onButtonUp).on('touchendoutside', onButtonUp);

	function onButtonUp() {
		gsap.to(buttonTop, { y: 0, duration: 0.2, ease: 'power2.in' });
		onPressCallback();
	}

	function onButtonDown() {
		gsap.to(buttonTop, { y: 5, duration: 0.2, ease: 'power2.out' });
	}

	return buttonHolder;
}
