// Import the functions to test from the storage module
import { saveGameToStorage, resetGameStorage, loadBoardFromStorage, loadTurnFromStorage } from '../storage';

describe('LocalStorage game data', () => {
  // Clear localStorage before each test to avoid data interference
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveGameToStorage saves board and turn', () => {
    // Sample game state
    const board = ['X', null, 'O'];
    const turn = 'X';

    // Save game state to localStorage
    saveGameToStorage({ board, turn });

    // Check if board and turn were saved correctly (as JSON strings)
    expect(localStorage.getItem('board')).toBe(JSON.stringify(board));
    expect(localStorage.getItem('turn')).toBe(JSON.stringify(turn));
  });

  test('resetGameStorage clears board and turn', () => {
    // Pre-fill localStorage with dummy values
    localStorage.setItem('board', 'test');
    localStorage.setItem('turn', 'test');

    // Clear saved game data
    resetGameStorage();

    // Check that localStorage keys for board and turn are removed
    expect(localStorage.getItem('board')).toBeNull();
    expect(localStorage.getItem('turn')).toBeNull();
  });
});
