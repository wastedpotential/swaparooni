import { button } from './scripts/button.js';
import { copyright } from './scripts/copyright.js';
import { showComponent } from './scripts/displayUtils.js';
import { anagram, goToNewAnagram, goToSiteTitle } from './scripts/anagram.js';
import { Application, Container, Loader, filters } from 'pixi.js';
import gsap from 'gsap';

let centerPoint, footerRight, filter, timeoutId, sheet, loader;

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
	centerPoint.addChild(ana);
	//showComponent()
}

function createCopyright() {
	const copy = copyright(sheet);
	footerRight.addChild(copy);
	showComponent(copy, 1, 0.5);
}

function createButton() {
	const swapButton = button(sheet, onSwapPress);
	swapButton.position.set(0, 130);
	centerPoint.addChild(swapButton);
	showComponent(swapButton, 1, 0.5);
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
	sheet = loader.resources['assets/1x/packed.json'];
	createLetterSprites();
	createCopyright();
	createButton();
	// start with "wasted potential":
	const centerY = centerPoint.position.y;
	centerPoint.position.y += 25;
	gsap.to(centerPoint, { y: centerY, duration: 1 });
	gsap.to(filter, {
		alpha: 1,
		duration: 1,
		onComplete: function () {
			centerPoint.filters = null;
		},
	});
}

function initApp() {
	window.addEventListener('resize', onResize);
	let app = new Application({ resolution: devicePixelRatio, roundPixels: true, backgroundColor: 0xf1f4f9 });
	// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
	const cont = document.querySelector('.container');
	cont.appendChild(app.view);
	return app;
}

function addContainers() {
	centerPoint = new Container({ resolution: devicePixelRatio, roundPixels: true });
	app.stage.addChild(centerPoint);
	// TODO: move this alpha filter
	filter = new filters.AlphaFilter(1);
	centerPoint.filters = [filter];
	filter.alpha = 0;

	footerRight = new Container();
	app.stage.addChild(footerRight);
}

let app = initApp();
addContainers();
preload(); // assets are added and displayed in onComplete()

function preload() {
	loader = Loader.shared; // PixiJS exposes a premade instance for you to use.
	loader.add('assets/1x/packed.json');
	loader.onProgress.add(onAppProgress);
	loader.onError.add(onAppError);
	loader.onComplete.add(onAppLoaded);
	loader.load();
}

function onResize() {
	const w = window.innerWidth / devicePixelRatio;
	const h = window.innerHeight / devicePixelRatio;
	if (app) app.renderer.resize(w, h);

	if (centerPoint) {
		centerPoint.position.set(0.5 * w, 0.5 * h);
	}
	if (footerRight) {
		footerRight.position.set(w, h);
	}
}

onResize();
