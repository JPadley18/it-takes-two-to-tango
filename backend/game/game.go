package game

import (
	"github.com/samber/lo"
)

const BOARD_SIZE = 6

type ModifierKind int
type Symbol int

const (
	Blank   Symbol = iota
	SymbolA Symbol = iota
	SymbolB Symbol = iota
)

const (
	Opposite ModifierKind = iota
	Same     ModifierKind = iota
)

type Modifier struct {
	x1   int
	y1   int
	x2   int
	y2   int
	kind ModifierKind
}

type Board struct {
	spaces    [][]Symbol
	modifiers []Modifier
}

func rowIsValid(symbols []Symbol) bool {
	// Check that there are no sequences longer than two
	streak := Blank
	c := 0
	for _, s := range symbols {
		if s != streak {
			streak = s
			c = 1
		} else {
			c += 1
			// Streak greater than 2 of any symbol other than blank means the row is invalid
			if c > 2 && streak != Blank {
				return false
			}
		}
	}
	return true
}

func rowIsComplete(symbols []Symbol) bool {
	return rowIsValid(symbols) && len(lo.Filter(symbols, func(x Symbol, index int) bool {
		return x == Blank
	})) == BOARD_SIZE
}

func (b *Board) modifiersSatisfied() bool {
	for _, m := range b.modifiers {
		a := b.spaces[m.y1][m.x1]
		b := b.spaces[m.y2][m.x2]
		if a == Blank || b == Blank {
			return false
		}
		if m.kind == Same {
			return a == b
		} else {
			// Opposite
			return a != b
		}
	}
	return true
}

// func (b *Board) IsValid() bool {

// }

// func (b *Board) IsComplete() bool {

// }
