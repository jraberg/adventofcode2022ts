// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock.
export const decodeYou = (you: string) => ({ 'X': 'Rock', 'Y': 'Paper', 'Z': 'Scissors' }[you] || 'Fail');
export const decodeOpponent = (opponent: string) => ({
  'A': 'Rock',
  'B': 'Paper',
  'C': 'Scissors',
}[opponent] || 'Fail');
export const decodeToLose = (selection: string) => ({
  'Rock': 'Scissors',
  'Paper': 'Rock',
  'Scissors': 'Paper',
}[selection] || 'Fail');
export const decodeToWin = (selection: string) => ({
  'Rock': 'Paper',
  'Paper': 'Scissors',
  'Scissors': 'Rock',
}[selection] || 'Fail');
