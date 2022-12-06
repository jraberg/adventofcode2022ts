import path from 'path';
import * as fs from 'fs';
import { decodeOpponent, decodeToLose, decodeToWin, decodeYou } from './helper';

const strategy = fs.readFileSync(path.join(__dirname, 'day2.puzzle.in.txt'), { encoding: 'utf-8' }).trim().split('\n')
                   .map(l => l.split(' '))
                   .map(([op, you]) => ({ opponent: op, you: you }));

const baseScore = (selection: string) => ({ 'Rock': 1, 'Paper': 2, 'Scissors': 3 }[selection] || 0);

const score = (you: string, opponent: string): number => {
  const youWin = opponent === 'Scissors' && you === 'Rock' || opponent === 'Paper' && you === 'Scissors' || opponent === 'Rock' && you === 'Paper';
  const youLose = opponent === 'Rock' && you === 'Scissors' || opponent === 'Scissors' && you === 'Paper' || opponent === 'Paper' && you === 'Rock';
  const youDraw = opponent === you;
  return youWin ? 6 : youLose ? 0 : youDraw ? 3 : 0;
};

const scoreRound = (mySelection: string, opponentSelection: string): number => score(mySelection, opponentSelection) + baseScore(mySelection);

const totalScorePart1 = strategy.map(({ opponent, you }) => scoreRound(decodeYou(you), decodeOpponent(opponent)))
                                .reduce((acc, cur) => acc + cur, 0);

let totalScorePart2 = 0;
for (let { opponent, you } of strategy) {
  you = you === 'X' ? decodeToLose(decodeOpponent(opponent)) : you === 'Y' ? decodeOpponent(opponent) : you ? decodeToWin(decodeOpponent(opponent)) : 'Fail';
  opponent = decodeOpponent(opponent);
  totalScorePart2 += scoreRound(you, decodeOpponent(opponent));
}
console.log(`Part 1 - Total score: ${totalScorePart1}`);
console.log(`Part 2 - Total score: ${totalScorePart2}`);
