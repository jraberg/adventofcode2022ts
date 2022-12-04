import path from "path";
import * as fs from "fs";

const filepath = path.join(__dirname, "day4.puzzle.in.txt");
const assignments = fs.readFileSync(filepath, { encoding: "utf-8" }).trim().split("\n")
                      .map((l) => l.split(","))
                      .map(([a, b]) => [a.split("-").map(Number), b.split("-").map(Number)]);

export const fullyContains = (r1: number[], r2: number[]) => (r1[0] <= r2[0] && r2[1] <= r1[1]) || (r2[0] <= r1[0] && r1[1] <= r2[1]);
export const partiallyContains = (r1: number[], r2: number[]) => (r1[0] <= r2[0] && r2[0] <= r1[1]) || (r1[0] <= r2[1] && r2[1] <= r1[1]);

const fullyOverlaps = assignments.filter(([r1, r2]) => fullyContains(r1, r2) || fullyContains(r2, r1));
const partiallyOverlaps = assignments.filter(([r1, r2]) => partiallyContains(r1, r2) || partiallyContains(r2, r1));

console.log(`Part 1 - solution: ${fullyOverlaps.length}`);
console.log(`Part 2 - solution: ${partiallyOverlaps.length}`);
