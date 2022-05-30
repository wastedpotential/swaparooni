import { uniqueRandomIndex, reset, getLineArray, calculateLetterPositions } from './utils.js';
import { siteTitle, anagrams, letterHeight, letters } from './assets.js';
import * as PIXI from './pixi.js';
import gsap from 'gsap';

export function anagram(textureSheet) {
	const anagramHolder = new PIXI.Container();

	for (let i = 0; i < letters.length; i++) {
		let letter = letters[i];
		if (letter.id) {
			const sprite = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations[letter.id]);
			sprite.animationSpeed = 0.1;
			sprite.play();
			letter.sprite = sprite;
			letter.w = sprite.width;
			anagramHolder.addChild(sprite);
		}
	}

	currentPhrase = showNew(siteTitle, animationTypes.NONE);

	return anagramHolder;
}

export function goToNewAnagram() {
	if (!isAnimating) {
		isAnimating = true;
		reset(letters);
		let newIndex = uniqueRandomIndex(anagrams.length, anagrams.indexOf(currentPhrase));
		currentPhrase = showNew(anagrams[newIndex], animationTypes.EXPLODEY);
	}
	return currentPhrase; // need to return the current phrase to change page title
}

export function goToSiteTitle() {
	reset(letters);
	currentPhrase = showNew(siteTitle, animationTypes.SLIDEY);
	return currentPhrase; // need to return the current phrase to change page title
}

const animationTypes = {
	NONE: 'none',
	SLIDEY: 'slidey',
	EXPLODEY: 'explodey',
};
let currentPhrase = '';
let isAnimating = false;

function prepForAnimation(phrase, letters, animation) {
	if (animation === animationTypes.EXPLODEY) {
		for (let i = 0; i < letters.length; i++) {
			const ltr = letters[i];
			if (ltr.sprite) {
				const dest = getExplodedPosition({ x: ltr.sprite.position.x, y: ltr.sprite.position.y });
				ltr.destX = dest.x;
				ltr.destY = dest.y;
			}
		}
	} else {
		// slidey, none
		const phraseLines = phrase.split('\n'); // split anagram into an array of "lines"
		const lineArray = getLineArray(phraseLines, letters); // prepare for positioning - put letter objects in proper order
		const letterArray = calculateLetterPositions(lineArray, letterHeight); // prepare for positioning - calculate letter positions
	}
}

function getExplodedPosition(startPosition) {
	// TODO: change this calculation:
	let currX = startPosition.x;
	let currY = startPosition.y;
	if (currX > 0) {
		currX = (0.5 * window.innerWidth - currX) * 0.25 * (1 + 3 * Math.random()) + currX;
	} else {
		currX = (-0.5 * window.innerWidth - currX) * 0.25 * (1 + 3 * Math.random()) + currX;
	}
	if (currY > 0) {
		currY = (0.5 * window.innerHeight - currY) * 0.25 * (1 + 3 * Math.random()) + currY;
	} else {
		currY = (-0.5 * window.innerHeight - currY) * 0.25 * (1 + 3 * Math.random()) + currY;
	}
	return { x: currX, y: currY };
}

function animateSwap(phrase, letters, animation) {
	let counter = 0;
	for (let i = 0; i < letters.length; i++) {
		// TODO - change the style of for loop? everywhere?
		const ltr = letters[i];
		if (ltr.sprite) {
			// don't render spaces. duh.
			switch (animation) {
				case animationTypes.NONE:
					ltr.sprite.position.x = ltr.destX;
					ltr.sprite.position.y = ltr.destY;
					break;
				case animationTypes.SLIDEY:
					gsap.to(ltr.sprite, {
						x: ltr.destX,
						y: ltr.destY,
						duration: 0.3,
						ease: 'power1.in',
						onComplete() {
							isAnimating = false;
						},
					});
					break;
				case animationTypes.EXPLODEY:
					gsap.to(ltr.sprite, {
						x: ltr.destX,
						y: ltr.destY,
						duration: 0.3,
						ease: 'power1.out',
						onComplete() {
							counter += 1;
							// TODO: magic numbers are bad
							if (counter >= 15) {
								showNew(phrase, animationTypes.SLIDEY);
							}
						},
					});
			}
		}
	}
}

function showNew(phrase, animation) {
	prepForAnimation(phrase, letters, animation);
	animateSwap(phrase, letters, animation);
	return phrase;
}
