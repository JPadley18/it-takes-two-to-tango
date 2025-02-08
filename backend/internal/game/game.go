package game

import (
	"sync"

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
	mu           *sync.Mutex
	spaces       [][]Symbol
	modifiers    []Modifier
	lockedSpaces []lo.Tuple2[int, int]
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
	return rowIsValid(symbols) &&
		len(lo.Filter(symbols, func(x Symbol, index int) bool {
			return x == Blank
		})) == 0 &&
		len(symbols) == BOARD_SIZE &&
		lo.Count(symbols, SymbolA) == lo.Count(symbols, SymbolB)
}

func (b *Board) modifiersComplete() bool {
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

func (b *Board) modifiersValid() bool {
	for _, m := range b.modifiers {
		a := b.spaces[m.y1][m.x1]
		b := b.spaces[m.y2][m.x2]
		if a == Blank || b == Blank {
			return true
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

func (b *Board) IsComplete() bool {
	// Check all rows and columns are complete
	for i, row := range b.spaces {
		if !rowIsComplete(row) {
			return false
		}
		// Check the columns too
		if !rowIsComplete(lo.Map(b.spaces, func(x []Symbol, index int) Symbol {
			return x[i]
		})) {
			return false
		}
	}
	// Check the modifiers too
	return b.modifiersComplete()
}

func (b *Board) IsValid() bool {
	// Check all rows and columns are valid
	for i, row := range b.spaces {
		if !rowIsValid(row) {
			return false
		}
		// Check the columns too
		if !rowIsValid(lo.Map(b.spaces, func(x []Symbol, index int) Symbol {
			return x[i]
		})) {
			return false
		}
	}
	// Check the modifiers too
	return b.modifiersValid()
}

func (b *Board) CanPlaceHere(x int, y int) bool {
	if x < 0 || y < 0 || x >= BOARD_SIZE || y >= BOARD_SIZE {
		return false
	}
	for _, l := range b.lockedSpaces {
		if l.A == x && l.B == y {
			return false
		}
	}
	return true
}

func (b *Board) Place(x int, y int, s Symbol) bool {
	if !b.CanPlaceHere(x, y) {
		return false
	}
	b.mu.Lock()
	b.spaces[y][x] = s
	b.mu.Unlock()
	return true
}
