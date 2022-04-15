const parseInputString = (str) => {
    return str.split('\n');
};

const originalString = 'wasted\npotential';
console.log(originalString);

const lines = parseInputString(originalString);
console.log(lines);
const numLines = lines.length;
