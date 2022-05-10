function uniqueRandomIndex(length, currentVal=-1) {
    // TODO: throw error if length < 2
    let newVal;
    do {
        newVal = Math.floor(length * Math.random());
        console.log(newVal);
    } while (currentVal === newVal)
    return newVal;
}

function isAnagram(str1, str2) {
    const str1Trimmed = str1.split(' ').join('').split('\n').join('').split('').sort().join(''); 
    const str2Trimmed = str2.split(' ').join('').split('\n').join('').split('').sort().join('');
    return (str1Trimmed === str2Trimmed);
}

function totalWidth(items) {
    var total = items.reduce(
        (partialSum, a) => partialSum + a.w, 0
    );
    return total;
}

function reset(letters) {
    for (let i=0; i<letters.length; i++) {
        if (letters[i].used) letters[i].used = false;
    }
}

function populateLetterArrays(str, letterArray) {
    const line = [];
    for (var i = 0; i < str.length; i++) {
        const nextLetter = str.charAt(i);
        const letterObj = letterArray.find(e => {
            return !(e.used) && (e.char == nextLetter);
        });
        line.push(letterObj);
        letterObj.used = true;
    }
    return line;
}

function getLineArray(stringArray, letterObjectsArray) {
    const lines = [];
    for (const str of stringArray) {
        lines.push(populateLetterArrays(str, letterObjectsArray));
    }
    return lines;
}

function calculateLetterPositions(lineArray, letterHeight) {
    const startY = -0.5 * lineArray.length * letterHeight;
    for (let i=0; i<lineArray.length; i++) {
        const line = lineArray[i];
        const totalW = totalWidth(line);
        let lineX = -0.5 * totalW;
        const lineStartY = i * letterHeight + startY;
        for (let j=0; j<line.length; j++) {
            const ltr = line[j];
            ltr.destX = lineX;
            ltr.destY = lineStartY;
            lineX += line[j].w;
        }
    }
    return lineArray;
}
