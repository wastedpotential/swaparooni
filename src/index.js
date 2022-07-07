import { button } from './scripts/button.js';
import { copyright } from './scripts/copyright.js';
import { showComponent } from './scripts/displayUtils.js';
import { anagram, goToNewAnagram, goToSiteTitle } from './scripts/anagram.js';
import { Header } from './scripts/Header.js';
import { spritesheetLocation, minStageWidth } from './scripts/assets.js';
import * as PIXI from './scripts/pixi.js';

let centerPoint, footerRight, headerCenter, header, timeoutId, sheet, loader;

function onSwapPress() {
	if (timeoutId) {
		clearTimeout(timeoutId);
		timeoutId = null;
	}
	const currentPhrase = goToNewAnagram();
	changePageTitle(currentPhrase);
	timeoutId = setTimeout(() => {
		revertToSiteTitle();
	}, 3000);
}

function revertToSiteTitle() {
	const currentPhrase = goToSiteTitle();
	changePageTitle(currentPhrase);
}

function changePageTitle(phrase) {
	const newTitle = phrase.split('\n').join(' ');
	document.title = newTitle;
}

function createLetterSprites() {
	const ana = anagram(sheet);
	ana.position.set(0, 45);
	centerPoint.addChild(ana);
	showComponent(ana, 1, 0, 20);
}

function createButton() {
	const swapButton = button(sheet, onSwapPress);
	swapButton.position.set(0, 135);
	centerPoint.addChild(swapButton);
	showComponent(swapButton, 1, 0.5, 110);
}

function createCopyright() {
	const copy = copyright(sheet);
	footerRight.addChild(copy);
	showComponent(copy, 1, 0.5);
}

function createHeader() {
	header = new Header(sheet, window.innerWidth);
	header.position.set(0, 0);
	headerCenter.addChild(header);
	// showComponent(header, 0.5, 1.5, 0);
}

function onAppProgress(e) {
	// TODO
	console.log('loading:', e.progress);
}

function onAppError(e) {
	// TODO
	console.log('error:', e.message);
}

function onAppLoaded(e) {
	sheet = loader.resources[spritesheetLocation];
	createLetterSprites();
	createButton();
	createCopyright();
	createHeader();
	onResize();
}

function initApp() {
	window.addEventListener('resize', onResize);
	let app = new PIXI.Application({ resolution: 1, roundPixels: true, backgroundColor: 0xffffff });
	// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
	const cont = document.querySelector('.wp-home-container');
	cont.appendChild(app.view);
	return app;
}

function addContainers() {
	centerPoint = new PIXI.Container();
	app.stage.addChild(centerPoint);

	footerRight = new PIXI.Container();
	app.stage.addChild(footerRight);

	headerCenter = new PIXI.Container();
	app.stage.addChild(headerCenter);
}

let app = initApp();
addContainers();
preload(); // assets are added and displayed in onComplete()

function preload() {
	loader = PIXI.Loader.shared; // PixiJS exposes a premade instance for you to use.
	loader.add(spritesheetLocation);
	loader.onProgress.add(onAppProgress);
	loader.onError.add(onAppError);
	loader.onComplete.add(onAppLoaded);
	loader.load();
}

function onResize() {
	const w = window.innerWidth;
	const h = window.innerHeight;
	const halfW = Math.ceil(w / 2);
	const halfH = Math.ceil(h / 2);
	if (app) {
		app.renderer.resize(w, h);
	}

	if (centerPoint) {
		centerPoint.position.set(halfW, halfH);
	}
	if (footerRight) {
		footerRight.position.set(w, h);
	}
	if (headerCenter) {
		headerCenter.position.set(halfW, 0);
	}

	if (header) {
		header.resize(w);
	}

	// hacky way using constant from assets.js to keep anagram scaled to fit on screen
	const scale = Math.min(1, w / minStageWidth);
	centerPoint.scale.set(scale, scale);
}
