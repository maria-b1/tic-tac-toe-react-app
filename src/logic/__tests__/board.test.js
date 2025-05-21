// src/logic/__tests__/board.test.js

import {
  provideInitialArray,
  validateBoard,
  provideDefaultTurn,
  nextTurn,
  validateTurn,
  checkWinnerFrom,
  checkEndGame
} from '../board'

describe('board.js game logic', () => {
  test('provideInitialArray returns an array of length 9 filled with null', () => {
    const arr = provideInitialArray()
    expect(Array.isArray(arr)).toBe(true)
    expect(arr).toHaveLength(9)
    expect(arr.every((v) => v === null)).toBe(true)
  })

  describe('validateBoard', () => {
    test('accepts valid board arrays', () => {
      const validBoard = [null, 'X', 'O', null, null, null, 'X', null, 'O']
      expect(validateBoard(validBoard)).toEqual(validBoard)
    })

    test('throws error for arrays with invalid length', () => {
      expect(() => validateBoard([null, 'X'])).toThrow(
        'value must be an Array(9)'
      )
    })

    test('throws error for invalid values in board array', () => {
      expect(() =>
        validateBoard([null, 'X', 'O', null, 'invalid', null, 'X', null, 'O'])
      ).toThrow(/value items must be in/)
    })

    test('throws error if input is not an array', () => {
      expect(() => validateBoard('not an array')).toThrow(
        'value must be an Array(9)'
      )
    })
  })

  test('provideDefaultTurn returns "X"', () => {
    expect(provideDefaultTurn()).toBe('X')
  })

  test('nextTurn switches turns correctly', () => {
    expect(nextTurn('X')).toBe('O')
    expect(nextTurn('O')).toBe('X')
  })

  describe('validateTurn', () => {
    test('accepts valid turns', () => {
      expect(validateTurn('X')).toBe('X')
      expect(validateTurn('O')).toBe('O')
    })

    test('throws error if value is not a string', () => {
      expect(() => validateTurn(123)).toThrow('value must be a String')
    })

    test('throws error if value is not X or O', () => {
      expect(() => validateTurn('Z')).toThrow(/value must be in/)
    })
  })

  describe('checkWinnerFrom', () => {
    test('detects a horizontal winner', () => {
      const board = ['X', 'X', 'X', null, null, null, null, null, null]
      expect(checkWinnerFrom(board)).toEqual(['X', [0, 1, 2]])
    })

    test('detects a vertical winner', () => {
      const board = ['O', null, null, 'O', null, null, 'O', null, null]
      expect(checkWinnerFrom(board)).toEqual(['O', [0, 3, 6]])
    })

    test('detects a diagonal winner', () => {
      const board = ['X', null, null, null, 'X', null, null, null, 'X']
      expect(checkWinnerFrom(board)).toEqual(['X', [0, 4, 8]])
    })

    test('returns no winner if none', () => {
      const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O']
      expect(checkWinnerFrom(board)).toEqual([null, null])
    })
  })

  describe('checkEndGame', () => {
    test('returns true if board is full (no nulls)', () => {
      const fullBoard = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O']
      expect(checkEndGame(fullBoard)).toBe(true)
    })

    test('returns false if board has empty spots', () => {
      const partialBoard = ['X', null, 'X', null, 'O', null, null, 'X', 'O']
      expect(checkEndGame(partialBoard)).toBe(false)
    })
  })
})
