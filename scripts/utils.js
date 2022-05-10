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