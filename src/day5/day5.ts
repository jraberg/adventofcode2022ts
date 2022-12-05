import path from 'path';
import * as fs from 'fs';

type StackMove = { move: number; from: number; to: number };

class Stack {
  private stackMoves: StackMove[] = [];
  private stack: string[][] = [];

  constructor(private rawStack: string, rawMoves: string) {
    this.parseStack(rawStack);
    this.parseStackMoves(rawMoves);
  }

  getMessages = (): string => this.stack.map((s) => s[s.length - 1]).join('');

  moveStackItemsOneByOne = () => this.stackMoves.forEach((stackMove) => this.moveItems(stackMove.move, stackMove.from, stackMove.to));
  moveStackItemsInOneMove = () => this.stackMoves.forEach((stackMove) => this.moveItemsInOneMove(stackMove.move, stackMove.from, stackMove.to));

  private moveItems = (move: number, from: number, to: number) => this.stack[to - 1].push(...this.stack[from - 1].splice(this.stack[from - 1].length - move, move).reverse());
  private moveItemsInOneMove = (move: number, from: number, to: number) => {
    const items = this.stack[from - 1].splice(this.stack[from - 1].length - move, move);
    if (move > 1) {
      this.stack[to - 1].push(...items);
    } else {
      this.stack[to - 1].push(...items.reverse());
    }
  };

  private parseStack(raw: string) {
    const s = raw.split('\n').slice(0, -1).map((l) => l);
    const colIndexes = raw.trim().split('\n').slice(-1)[0].split('  ').map(Number);
    this.stack = [...colIndexes.map(_ => [])];
    for (const colIndex of colIndexes) {
      s.forEach((l, i) => {
        const c = l.slice((colIndex - 1) * 4, (colIndex - 1) * 4 + 3);
        if (c.trim()) {
          this.stack[colIndex - 1].unshift(c.replace('[', '').replace(']', ''));
        }
      });
    }
  }

  private parseStackMoves = (rawMoves: string): StackMove[] =>
    this.stackMoves = rawMoves.trim().split('\n').map((line) => {
      const m = /move (?<move>\d+) from (?<from>\d+) to (?<to>\d+)/.exec(line);
      return m && m.groups ? { move: Number(m.groups.move), from: Number(m.groups.from), to: Number(m.groups.to), } : { move: 0, from: 0, to: 0 };
    });

}

const [rawStack, rawMoves] = fs.readFileSync(path.join(__dirname, 'day5.puzzle.in.txt'), { encoding: 'utf-8' }).split('\n\n');

const stackPart1 = new Stack(rawStack, rawMoves);
stackPart1.moveStackItemsOneByOne();
const messagePart1 = stackPart1.getMessages();
console.log(`Part 1 - solution: ${messagePart1}`);

const stackPart2 = new Stack(rawStack, rawMoves);
stackPart2.moveStackItemsInOneMove();
const messagePart2 = stackPart2.getMessages();
console.log(`Part 2 - solution: ${messagePart2}`);
