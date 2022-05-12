import {uniqueRandomIndex, isAnagram, totalWidth, reset, populateLetterArrays, getLineArray, calculateLetterPositions} from    './utils.js';
import {siteTitle, anagrams, letterHeight, assetFolder, letters} from './assets.js';

const animationTypes = {
    NONE: 'none',
    SLIDEY: 'slidey',
    EXPLODEY: 'explodey',
}
let currentPhrase = '';
let centerPoint, footer, filter, timeoutId, sheet;

function onSwapPress() {
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    reset(letters);
    let newIndex = uniqueRandomIndex(anagrams.length, anagrams.indexOf(currentPhrase));
    currentPhrase = showNew(anagrams[newIndex], animationTypes.EXPLODEY);
    changePageTitle(currentPhrase);
    timeoutId = setTimeout(() => {
        revertToSiteTitle();
    }, 3000);
}

function revertToSiteTitle() {
    reset(letters);
    currentPhrase = showNew(siteTitle, animationTypes.SLIDEY);
    changePageTitle(currentPhrase);
}

function changePageTitle(phrase) {
    const newTitle = phrase.split('\n').join(' ');
    document.title = newTitle;
}

function prepForAnimation(phrase, letters, animation) {
    if (animation === animationTypes.EXPLODEY) {
        for (let i=0; i<letters.length; i++) {
            const ltr = letters[i];
            if (ltr.sprite) {
                let currX = ltr.sprite.position.x;
                let currY = ltr.sprite.position.y;
                // TODO: change this calculation:
                if (currX > 0) {
                    currX = (window.innerWidth/4*devicePixelRatio - currX)*Math.random() + currX;
                } else {
                    currX = (-1*window.innerWidth/4*devicePixelRatio - currX)*Math.random() + currX;
                }
                if (currY > 0) {
                    currY = (window.innerWidth/4*devicePixelRatio - currY)*Math.random() + currY;
                } else {
                    currY = (-1*window.innerWidth/4*devicePixelRatio - currX)*Math.random() + currY;
                }
                ltr.destX = currX;
                ltr.destY = currY;
            }
        }
    } else { // slidey, none
        const phraseLines = phrase.split('\n'); // split anagram into an array of "lines"
        const lineArray = getLineArray(phraseLines, letters); // prepare for positioning - put letter objects in proper order 
        const letterArray = calculateLetterPositions(lineArray, letterHeight); // prepare for positioning - calculate letter positions
    }
}

function animateSwap(phrase, letters, animation) {
    let counter = 0;
    for (let i=0; i<letters.length; i++) { // TODO - change the style of for loop? everywhere?
        const ltr = letters[i];
        if (ltr.sprite) { // don't render spaces. duh.                    
            switch (animation) {
                case animationTypes.NONE:
                    ltr.sprite.position.x = ltr.destX;
                    ltr.sprite.position.y = ltr.destY;
                    break;
                case animationTypes.SLIDEY:
                    gsap.to(ltr.sprite, { x: ltr.destX, y: ltr.destY, duration: 0.3, ease: "power1.in" });
                    break;
                case animationTypes.EXPLODEY:
                gsap.to(ltr.sprite, { 
                    x: ltr.destX, 
                    y: ltr.destY, 
                    duration: 0.3, 
                    ease: "power1.out", 
                    onComplete() {
                        counter += 1;
                        // TODO: magic numbers are bad
                        if (counter >= 15) { showNew(phrase, animationTypes.SLIDEY); }
                    }
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

function createLetterSprites(letterObjs) {
    for (let i=0; i<letterObjs.length; i++) {
        let letter = letterObjs[i];
        if (letter.id) {     
            const name = letter.id + "_01@2x.png";
            const sprite = new PIXI.Sprite(sheet.textures[name]);
            letter.sprite = sprite;
            centerPoint.addChild(sprite);
        }            
    }
}

function createCopyright() {
    const copyright = new PIXI.Sprite(sheet.textures['copyright@2x.png']); 
    copyright.position.set(-60 - copyright.width, -1 * copyright.height);
    footer.addChild(copyright);
}

function createButton() {
    const button = new PIXI.Container({resolution: devicePixelRatio, roundPixels: true});
    const buttonBottom = PIXI.Sprite.from(app.loader.resources['press_bottom'].texture, { roundPixels: true, resolution: devicePixelRatio }); // Magically load the PNG asynchronously
    //buttonBottom.position.set(0, -1 * copyright.height);
    button.addChild(buttonBottom);
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
    sheet = app.loader.resources["assets/packed/assets@2x.json"];
    createLetterSprites(letters); 
    createCopyright();
    // createButton();
    // start with "wasted potential":
    currentPhrase = showNew(siteTitle, animationTypes.NONE);
    const centerY = centerPoint.position.y;
    centerPoint.position.y += 25;
    gsap.to(filter, { alpha: 1, duration: 1 });  
    gsap.to(centerPoint, { y: centerY, duration: 1 });           
}

function initApp() {
    window.addEventListener('resize', onResize);
    let app = new PIXI.Application({ autoResize:true, resolution: devicePixelRatio, roundPixels: true, backgroundColor: 0xf1f4f9 });
    const cont = document.querySelector('.container'); 
    cont.appendChild(app.view);

    // TODO: change this:
    const button = document.querySelector('#swapbutton');
    button.addEventListener('click', onSwapPress);
    return app;
}

function addContainers() {
    centerPoint = new PIXI.Container({resolution: devicePixelRatio, roundPixels: true});
    app.stage.addChild(centerPoint);
    filter = new PIXI.filters.AlphaFilter(1);
    centerPoint.filters = [filter];
    filter.alpha = 0; 
    
    footer = new PIXI.Container({resolution: devicePixelRatio, roundPixels: true});
    app.stage.addChild(footer);
}

let app = initApp();
addContainers();
preload(); // assets are added and displayed in onComplete()

function preload() {
    // TODO: load all assets here
    // app.loader.baseUrl = 'assets/packed/';
    // for (const letter of letters) {
    //     if (letter.id) {
    //         app.loader.add(letter.id, letter.id + '_01@2x.png');
    //     }
    // }
    // app.loader.add('copyright', 'copyright@2x.png');
    // app.loader.add('press_bottom', 'press_bottom@2x.png');
    app.loader.add('assets/packed/assets@2x.json');
    app.loader.onProgress.add(onAppProgress);
    app.loader.onError.add(onAppError);
    app.loader.onComplete.add(onAppLoaded);
    app.loader.load();
}

function onResize() {	
    const w = window.innerWidth/devicePixelRatio;
    const h = window.innerHeight/devicePixelRatio;
    if (app) app.renderer.resize(w, h);

    if (centerPoint) {
        centerPoint.position.set(0.5 * w, 0.5 * h);
    }
    if (footer) {
        console.log(w, h);
        footer.position.set(w, h);
    }
}

onResize(); 