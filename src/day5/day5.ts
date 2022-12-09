import path from 'path';
import * as fs from 'fs';

type StackMove = { quantity: number; from: number; to: number };

class Stack {
  private instructions: StackMove[] = [];
  private stack: string[][] = [];

  constructor(private rawStack: string, rawMoves: string) {
    this.parseStack(rawStack);
    this.parseInstructions(rawMoves);
  }

  getMessages = (): string => this.stack.map((s) => s[s.length - 1]).join('');

  moveStackItemsOneByOne = () => this.instructions.forEach((instruction) => this.moveItems(instruction.quantity, instruction.from, instruction.to));

  moveStackItemsInOneMove = () => this.instructions.forEach((instruction) => this.moveItemsInOneMove(instruction.quantity, instruction.from, instruction.to));

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
      s.forEach((l) => {
        const c = l.slice((colIndex - 1) * 4, (colIndex - 1) * 4 + 3);
        if (c.trim()) {
          this.stack[colIndex - 1].unshift(c.replace('[', '').replace(']', ''));
        }
      });
    }
  }

  private parseInstructions = (rawMoves: string): StackMove[] =>
    this.instructions = rawMoves.trim().split('\n').map((line) => {
      const m = /move (?<quantity>\d+) from (?<from>\d+) to (?<to>\d+)/.exec(line);
      return m && m.groups ? { quantity: Number(m.groups.quantity), from: Number(m.groups.from), to: Number(m.groups.to), } : { quantity: 0, from: 0, to: 0 };
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
