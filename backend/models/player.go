package models

import (
	"it4/backend/internal/game"

	"github.com/gofiber/contrib/websocket"
)

type Player struct {
	Name  string `json:"name"`
	board *game.Board
	Conn  *websocket.Conn `json:"-"`
}

func NewPlayer(name string, c *websocket.Conn) *Player {
	return &Player{
		name,
		nil,
		c,
	}
}

func (p *Player) SetBoard(b *game.Board) {
	p.board = b
}

func (p *Player) Place(x int, y int, s game.Symbol) bool {
	return p.board.Place(x, y, s)
}

func (p *Player) HasWon() bool {
	return p.board.IsComplete()
}
