package models

import (
	"it4/backend/internal/game"

	"github.com/gofiber/contrib/websocket"
	"github.com/google/uuid"
)

type Player struct {
	Id    string `json:"id"`
	Name  string `json:"name"`
	board *game.Board
	Conn  *websocket.Conn `json:"-"`
}

func NewPlayer(name string, c *websocket.Conn) *Player {
	return &Player{
		uuid.New().String(),
		name,
		nil,
		c,
	}
}

func (p *Player) SetBoard(b game.Board) {
	p.board = &game.Board{
		Spaces:       b.Spaces,
		Modifiers:    b.Modifiers,
		LockedSpaces: b.LockedSpaces,
	}
}

func (p *Player) Place(x int, y int, s game.Symbol) bool {
	return p.board.Place(x, y, s)
}

func (p *Player) HasWon() bool {
	return p.board.IsComplete()
}
