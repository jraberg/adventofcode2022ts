import * as fs from 'fs';
import path from 'path';

const caloriesByDeer = fs.readFileSync(path.join(__dirname, 'puzzle.in.txt'), { encoding: 'utf8' }).trim().split('\n\n')
                         .map(deer => deer.split('\n').map(c => parseInt(c)))
                         .map(calories => calories.reduce((acc, calorie) => acc + calorie, 0))
                         .sort((a, b) => b - a);

console.log(`Day 1 - part 1: ${caloriesByDeer[0]}`);
console.log(`Day 1 - part 2: ${caloriesByDeer.slice(0, 3).reduce((acc, calorie) => acc + calorie, 0)}`);
