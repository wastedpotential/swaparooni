import { letterSpacing } from './assets.js';

// generate a random array index. It must be different than the current value
export function uniqueRandomIndex(length, currentVal = -1) {
	// TODO: throw error if length < 2
	let newVal;
	do {
		newVal = Math.floor(length * Math.random());
	} while (currentVal === newVal);
	return newVal;
}

// check if 2 strings are valid anagrams of each other. ignore spaces and line breaks
export function isAnagram(str1, str2) {
	const str1Trimmed = str1.split(' ').join('').split('\n').join('').split('').sort().join('');
	const str2Trimmed = str2.split(' ').join('').split('\n').join('').split('').sort().join('');
	return str1Trimmed === str2Trimmed;
}

// add up the widths of all objects in an array and return the total value:
export function totalWidth(items) {
	let total = items.reduce((partialSum, a) => partialSum + a.w + letterSpacing, 0);
	total -= letterSpacing; // remove the trailing space
	return total;
}

// set the used property of all objects back to false
export function reset(letters) {
	for (let i = 0; i < letters.length; i++) {
		if (letters[i].used) letters[i].used = false;
	}
}

//
export function populateLetterArrays(str, letterArray) {
	const line = [];
	for (var i = 0; i < str.length; i++) {
		const nextLetter = str.charAt(i);
		const letterObj = letterArray.find((e) => {
			return !e.used && e.char == nextLetter;
		});
		line.push(letterObj);
		letterObj.used = true;
	}
	return line;
}

//
export function getLineArray(stringArray, letterObjectsArray) {
	const lines = [];
	for (const str of stringArray) {
		lines.push(populateLetterArrays(str, letterObjectsArray));
	}
	return lines;
}

//
export function calculateLetterPositions(lineArray, letterHeight) {
	const startY = -0.5 * (lineArray.length + 1) * letterHeight;
	for (let i = 0; i < lineArray.length; i++) {
		const line = lineArray[i];
		const totalW = totalWidth(line);
		let lineX = -0.5 * totalW;
		const lineStartY = i * letterHeight + startY;
		for (let j = 0; j < line.length; j++) {
			const ltr = line[j];
			ltr.destX = lineX;
			ltr.destY = lineStartY;
			lineX += line[j].w + letterSpacing;
		}
	}
	return lineArray;
}
