package game

import (
	"testing"
)

func TestRowIsValid(t *testing.T) {
	tests := []struct {
		name   string
		row    []Symbol
		result bool
	}{
		{
			name:   "Empty rows are valid",
			row:    []Symbol{},
			result: true,
		},
		{
			name:   "Fully blank rows are valid",
			row:    []Symbol{Blank, Blank, Blank, Blank, Blank},
			result: true,
		},
		{
			name:   "Rows with a few symbols in are valid",
			row:    []Symbol{SymbolA, SymbolB, SymbolB, Blank, SymbolB},
			result: true,
		},
		{
			name:   "Rows with a few symbols in are valid",
			row:    []Symbol{SymbolA, SymbolA, Blank, Blank, SymbolB},
			result: true,
		},
		{
			name:   "Rows with a few symbols in are valid",
			row:    []Symbol{Blank, SymbolB, SymbolB, Blank, Blank},
			result: true,
		},
		{
			name:   "Rows with long streaks are invalid",
			row:    []Symbol{SymbolA, SymbolA, SymbolA, Blank, Blank},
			result: false,
		},
		{
			name:   "Rows with long streaks are invalid",
			row:    []Symbol{Blank, SymbolA, SymbolA, SymbolA, Blank},
			result: false,
		},
		{
			name:   "Rows with long streaks are invalid",
			row:    []Symbol{Blank, Blank, SymbolB, SymbolB, SymbolB},
			result: false,
		},
		{
			name:   "Rows with long streaks are invalid",
			row:    []Symbol{SymbolB, SymbolB, SymbolA, SymbolA, SymbolA},
			result: false,
		},
		{
			name:   "Rows with long streaks are invalid",
			row:    []Symbol{SymbolA, SymbolA, SymbolB, SymbolB, SymbolB},
			result: false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			outcome := rowIsValid(test.row)
			if outcome != test.result {
				t.Errorf("got '%v', want '%v'", outcome, test.result)
			}
		})
	}
}

func TestRowIsComplete(t *testing.T) {
	tests := []struct {
		name   string
		row    []Symbol
		result bool
	}{
		{
			name:   "Empty rows are invalid",
			row:    []Symbol{},
			result: false,
		},
		{
			name:   "Fully blank rows are invalid",
			row:    []Symbol{Blank, Blank, Blank, Blank, Blank, Blank},
			result: false,
		},
		{
			name:   "Rows with long streaks are invalid",
			row:    []Symbol{SymbolA, SymbolA, SymbolB, SymbolB, SymbolB, SymbolA},
			result: false,
		},
		{
			name:   "Incomplete without long streaks are invalid",
			row:    []Symbol{SymbolA, SymbolA, SymbolB, SymbolB, SymbolA},
			result: false,
		},
		{
			name:   "Rows without long streaks are valid",
			row:    []Symbol{SymbolA, SymbolA, SymbolB, SymbolB, SymbolA, SymbolB},
			result: true,
		},
		{
			name:   "Unbalanced rows are invalid",
			row:    []Symbol{SymbolA, SymbolA, SymbolB, SymbolB, SymbolA, SymbolA},
			result: false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			outcome := rowIsComplete(test.row)
			if outcome != test.result {
				t.Errorf("got '%v', want '%v'", outcome, test.result)
			}
		})
	}
}
