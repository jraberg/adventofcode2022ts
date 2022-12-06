import * as fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'day6.puzzle.in.txt'), { encoding: 'utf-8' }).trim();
const isUniqueChars = (s: string, noUniqueChars:number) =>  (new Set(s)).size === noUniqueChars;

export const firstPositionAfterUniqChars = (s: string, noUniqueChars: number) => {
    let i = 0;
    while (i < s.length && !isUniqueChars(s.slice(i, i + noUniqueChars), noUniqueChars)) {
        i++;
    }
    return i+noUniqueChars;
}

const solutionPart1 = firstPositionAfterUniqChars(input, 4);
console.log(`Part 1 - solution: ${solutionPart1}`);
const solutionPart2 = firstPositionAfterUniqChars(input, 14);
console.log(`Part 2 - solution: ${solutionPart2}`);
