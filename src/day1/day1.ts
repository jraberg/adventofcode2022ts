import * as fs from 'fs';
import path from 'path';

const testDataPath = path.join(__dirname, 'puzzle.in.txt');
const caloriesByDeer = fs.readFileSync(testDataPath, { encoding: 'utf8' }).trim().split('\n\n')
                         .map(deer => deer.split('\n').map(c => parseInt(c)))
                         .map(calories => calories.reduce((acc, calorie) => acc + calorie, 0))
                         .sort((a, b) => b - a);

console.log(caloriesByDeer[0]);
console.log(caloriesByDeer.slice(0, 3).reduce((acc, calorie) => acc + calorie, 0));
