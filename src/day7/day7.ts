import * as fs from 'fs';
import path from 'path';

const dirListing = fs.readFileSync(path.join(__dirname, 'day7.puzzle.in.txt'), 'utf-8').trim().split('\n');

const directoryStack: string[] = [];
const directory = new Map<string, number>();

function updateParentDirectoriesSize(size: number) {
  for (let i = 1; i < directoryStack.length; i++) {
    const parentPath = getDirectoryPath(directoryStack.slice(0, -i));
    const parentSize = directory.get(parentPath) || 0;
    directory.set(parentPath, parentSize + size);
  }
}

function addFileToCurrentDirectory(line: string) {
  const size = parseInt(line.split(' ')[0], 10);
  const path = getDirectoryPath(directoryStack);
  const dirSize = (directory.get(path) || 0) + size;
  directory.set(path, dirSize);
  updateParentDirectoriesSize(size);
}

function updateCurrentDirectory(dir: string) {
  if (dir === '..') {
    directoryStack.pop();
  } else if (dir === '/') {
    directoryStack.push('root');
  } else {
    directoryStack.push(dir);
  }
}

function getDirectoryPath(directoryStack: string[]) {
  return '/' + directoryStack.join('/');
}

function addDirectoryToCurrentDirectory(line: string) {
  const dir = line.replace('dir ', '').trim();
  const currentPath = getDirectoryPath(directoryStack);
  const newDirectoryPath = `${currentPath}/${dir}`;
  directory.set(newDirectoryPath, 0);
}

function execCommand(line: string) {
  const [_, command, ...args] = line.split(' ');
  switch (command) {
    case 'cd':
      updateCurrentDirectory(args[0].trim());
      break;
    case 'ls':
      break;
    default:
      throw new Error(`Unknown command: ${command}`);
  }
}

function parseListing(listing: string[]) {

  listing.forEach((line) => {
    if (line.startsWith('$')) {
      execCommand(line);
    } else if (/^\d+/.test(line)) {
      addFileToCurrentDirectory(line);
    } else if (/^dir/.test(line)) {
      addDirectoryToCurrentDirectory(line);
    }
  });
}

parseListing(dirListing);

const solutionPart1 = [...directory.values()].filter((d) => d <= 100000).reduce((acc, s) => acc + s, 0);
console.log(`Part 1 - solution: ${solutionPart1} `);

const maxAllowedAllocated = 70000000 - 30000000;
const allocatedSpace = directory.get('/root') || 0;
const needToFreeUp = allocatedSpace - maxAllowedAllocated;
const solutionPart2 = [...directory.values()].filter((d) => d > needToFreeUp).sort((a, b) => a - b)[0];
console.log(`Part 2 - solution: ${solutionPart2} `);
