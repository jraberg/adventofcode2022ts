import * as fs from 'fs';
import path from 'path';

const rucksacks = fs.readFileSync(path.join(__dirname, 'day3.puzzle.in.txt'), {encoding: 'utf-8'}).trim().split('\n');
export const priority = (c: string): number => {
    const valueOfa = 'a'.charCodeAt(0);
    const valueOfA = 'A'.charCodeAt(0);
    return c.charCodeAt(0) < valueOfa ? c.charCodeAt(0) - valueOfA + 27 : c.charCodeAt(0) - valueOfa + 1;
};

const rucksackByCompartment = rucksacks.map((rucksack) => [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)]);
const solutionPart1 = rucksackByCompartment.map(([left, right]) => {
    const duplicates = new Set([...left].filter(x => right.includes(x)));
    return [...duplicates.values()].map(d => priority(d)).reduce((acc, cur) => acc + cur, 0);
}).reduce((acc, cur) => acc + cur, 0);

const elvesGroups = []
for (let i = 0; i < rucksacks.length; i += 3) {
    elvesGroups.push(rucksacks.slice(i, i + 3));
}
const solutionPart2 = elvesGroups.map(([left, middle, right]) => {
    const duplicates = new Set([...left].filter(x => middle.includes(x) && right.includes(x)));

    return [...duplicates.values()].map(d => priority(d)).reduce((acc, cur) => acc + cur, 0);
}).reduce((acc, cur) => acc + cur, 0);

console.log(`Part 1 - Total score: ${solutionPart1}`);
console.log(`Part 2 - Total score: ${solutionPart2}`);
