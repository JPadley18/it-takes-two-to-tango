package game

import (
	"math/rand"

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
	X1   int          `json:"x1"`
	Y1   int          `json:"y1"`
	X2   int          `json:"x2"`
	Y2   int          `json:"y2"`
	Kind ModifierKind `json:"kind"`
}

type Board struct {
	Spaces       [][]Symbol            `json:"spaces"`
	Modifiers    []Modifier            `json:"modifiers"`
	LockedSpaces []lo.Tuple2[int, int] `json:"lockedSpaces"`
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
	for _, m := range b.Modifiers {
		a := b.Spaces[m.Y1][m.X1]
		b := b.Spaces[m.Y2][m.X2]
		if a == Blank || b == Blank {
			return false
		}
		if m.Kind == Same {
			return a == b
		} else {
			// Opposite
			return a != b
		}
	}
	return true
}

func (b *Board) modifiersValid() bool {
	for _, m := range b.Modifiers {
		a := b.Spaces[m.Y1][m.X1]
		b := b.Spaces[m.Y2][m.X2]
		if a == Blank || b == Blank {
			return true
		}
		if m.Kind == Same {
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
	for i, row := range b.Spaces {
		if !rowIsComplete(row) {
			return false
		}
		// Check the columns too
		if !rowIsComplete(lo.Map(b.Spaces, func(x []Symbol, index int) Symbol {
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
	for i, row := range b.Spaces {
		if !rowIsValid(row) {
			return false
		}
		// Check the columns too
		if !rowIsValid(lo.Map(b.Spaces, func(x []Symbol, index int) Symbol {
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
	for _, l := range b.LockedSpaces {
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
	b.Spaces[y][x] = s
	return true
}

func NewBoard() Board {
	boards := []Board{
		{
			Spaces: [][]Symbol{
				{Blank, Blank, Blank, SymbolA, Blank, Blank},
				{Blank, Blank, Blank, Blank, SymbolB, Blank},
				{Blank, Blank, Blank, Blank, Blank, SymbolA},
				{SymbolB, Blank, Blank, Blank, Blank, Blank},
				{Blank, SymbolA, Blank, Blank, Blank, Blank},
				{Blank, Blank, SymbolB, Blank, Blank, Blank},
			},
			Modifiers: []Modifier{
				{0, 0, 1, 0, Same},
				{0, 1, 1, 1, Same},
				{0, 2, 1, 2, Same},
				{4, 3, 5, 3, Opposite},
				{4, 4, 5, 4, Opposite},
				{4, 5, 5, 5, Opposite},
			},
			LockedSpaces: []lo.Tuple2[int, int]{
				{A: 3, B: 0},
				{A: 4, B: 1},
				{A: 5, B: 2},
				{A: 0, B: 3},
				{A: 1, B: 4},
				{A: 2, B: 5},
			},
		},
		{
			Spaces: [][]Symbol{
				{SymbolA, Blank, Blank, Blank, Blank, SymbolB},
				{Blank, SymbolA, Blank, Blank, SymbolA, Blank},
				{Blank, Blank, Blank, Blank, Blank, Blank},
				{Blank, Blank, Blank, Blank, Blank, Blank},
				{Blank, SymbolB, Blank, Blank, SymbolA, Blank},
				{SymbolA, Blank, Blank, Blank, Blank, SymbolA},
			},
			Modifiers: []Modifier{
				{2, 2, 2, 3, Same},
				{3, 2, 3, 3, Same},
			},
			LockedSpaces: []lo.Tuple2[int, int]{
				{A: 0, B: 0},
				{A: 1, B: 1},
				{A: 5, B: 0},
				{A: 4, B: 1},
				{A: 0, B: 5},
				{A: 1, B: 4},
				{A: 4, B: 4},
				{A: 5, B: 5},
			},
		},
		{
			Spaces: [][]Symbol{
				{SymbolA, Blank, Blank, Blank, Blank, SymbolA},
				{Blank, SymbolB, Blank, Blank, SymbolA, Blank},
				{Blank, Blank, SymbolB, SymbolA, Blank, Blank},
				{Blank, Blank, SymbolA, SymbolB, Blank, Blank},
				{Blank, SymbolB, Blank, Blank, SymbolB, Blank},
				{SymbolA, Blank, Blank, Blank, Blank, SymbolB},
			},
			Modifiers: []Modifier{
				{0, 2, 0, 3, Opposite},
				{2, 0, 3, 0, Opposite},
				{2, 5, 3, 5, Same},
				{5, 2, 5, 3, Same},
			},
			LockedSpaces: []lo.Tuple2[int, int]{
				{A: 0, B: 0},
				{A: 5, B: 0},
				{A: 1, B: 1},
				{A: 4, B: 1},
				{A: 2, B: 2},
				{A: 3, B: 2},
				{A: 2, B: 3},
				{A: 3, B: 3},
				{A: 1, B: 4},
				{A: 4, B: 4},
				{A: 0, B: 5},
				{A: 5, B: 5},
			},
		},
	}
	return boards[rand.Intn(len(boards))]
}
