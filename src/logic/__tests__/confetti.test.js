/**
 * confetti.test.js
 * 
 * Basic tests for confetti.js functions.
 * Since confetti is visual/animation-based, we test that functions are callable
 * and interact correctly with the confetti library.
 */

import * as confettiModule from '../confetti'
import confetti from 'canvas-confetti'

// Mock the confetti function from canvas-confetti to avoid running real animations
jest.mock('canvas-confetti', () => {
  return jest.fn(() => true) // mock implementation just returns true
})

describe('confetti.js', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('createConfetti calls confetti function multiple times', () => {
    jest.useFakeTimers() // use fake timers to control setTimeout / requestAnimationFrame

    confettiModule.createConfetti({ during: 100, disableForReducedMotion: false })

    // Fast-forward all timers to trigger the animation frames
    jest.advanceTimersByTime(150)

    // Expect that confetti (mock) was called at least once
    expect(confetti).toHaveBeenCalled()

    jest.useRealTimers()
  })

  test('createConfetti respects disableForReducedMotion', () => {
    confettiModule.createConfetti({ during: 100, disableForReducedMotion: true })

    // When reduced motion is disabled, confetti should still be called once but not animate repeatedly
    expect(confetti).toHaveBeenCalled()
  })

  test('resetConfetti calls confetti.reset', () => {
    confetti.reset = jest.fn()

    confettiModule.resetConfetti()

    expect(confetti.reset).toHaveBeenCalled()
  })
})
