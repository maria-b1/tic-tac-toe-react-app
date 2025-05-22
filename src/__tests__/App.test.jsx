import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('Tic-Tac-Toe App', () => {
  test('renders the Tic-Tac-Toe title', () => {
    render(<App />)
    expect(
      screen.getByText((content, node) => {
        const hasText = (node) => node.textContent === 'Tic-Tac-Toe'
        const nodeHasText = hasText(node)
        const childrenDontHaveText = Array.from(node?.children || []).every(
          (child) => !hasText(child)
        )
        return nodeHasText && childrenDontHaveText
      })
    ).toBeInTheDocument()
  })

  test("initially shows X's turn", () => {
    render(<App />)
    expect(
      screen.getByText((content, node) => node.textContent === "X's turn")
    ).toBeInTheDocument()
  })

  test('clicking a tile updates the board and turn', () => {
    render(<App />)
    const tiles = screen
      .getAllByRole('button')
      .filter((btn) => btn.className === 'tile')
    fireEvent.click(tiles[0]) // X
    expect(tiles[0].textContent).toBe('X')
    expect(
      screen.getByText((_, node) => node.textContent === "O's turn")
    ).toBeInTheDocument()

    fireEvent.click(tiles[1]) // O
    expect(tiles[1].textContent).toBe('O')
    expect(
      screen.getByText((_, node) => node.textContent === "X's turn")
    ).toBeInTheDocument()
  })

  test('reset button clears the board and winner', () => {
    render(<App />)
    const tiles = screen
      .getAllByRole('button')
      .filter((btn) => btn.className === 'tile')
    fireEvent.click(tiles[0]) // X
    fireEvent.click(tiles[1]) // O
    fireEvent.click(tiles[2]) // X

    const resetButton = screen.getByText('Reset')
    fireEvent.click(resetButton)

    // Board should be empty againn
    // Board should be empty againn
    tiles.forEach((tile) => {
      expect(tile.textContent).toBe('')
    })

    // Turn should be back to X
    expect(
      screen.getByText((_, node) => node.textContent === 'Xs turn')
    ).toBeInTheDocument()
  })
})
