package models

import "it4/backend/internal/game"

type Player struct {
	name  string
	board *game.Board
}

func (p *Player) Place(x int, y int, s game.Symbol) bool {
	return p.board.Place(x, y, s)
}

func (p *Player) HasWon() bool {
	return p.board.IsComplete()
}
