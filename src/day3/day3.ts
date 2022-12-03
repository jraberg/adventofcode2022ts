import * as fs from 'fs';
import path from 'path';

const filepath = path.join(__dirname, 'day3.puzzle.in.txt');
const rucksacks = fs.readFileSync(filepath, { encoding: 'utf-8' }).trim().split('\n');

export const priority = (c: string): number => {
  const valueOfa = 'a'.charCodeAt(0);
  const valueOfA = 'A'.charCodeAt(0);
  return c.charCodeAt(0) < valueOfa ? c.charCodeAt(0) - valueOfA + 27 : c.charCodeAt(0) - valueOfa + 1;
};

let solutionPart1 = 0;
const rucksackByCompartment = rucksacks.map((rucksack) => [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)]);
rucksackByCompartment.forEach(([left,right]) => {
  const duplicates = new Set([...left].filter(x => right.includes(x)));
  const sum = [...duplicates.values()].map(d => priority(d)).reduce((acc, cur) => acc + cur, 0);
  solutionPart1 += sum;
});

const elvesGroups = []
for( let i = 0; i < rucksacks.length; i+=3){
  elvesGroups.push(rucksacks.slice(i,i+3));
}
let solutionPart2=0
for (const [left,middle,right] of elvesGroups) {
  const duplicates = new Set([...left].filter(x => middle.includes(x) && right.includes(x)));
  const sum = [...duplicates.values()].map(d => priority(d)).reduce((acc, cur) => acc + cur, 0);
  solutionPart2+=sum
}

console.log(`Part 1 - Total score: ${solutionPart1}`);
console.log(`Part 2 - Total score: ${solutionPart2}`);
