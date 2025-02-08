package models

import "github.com/samber/lo"

type Game struct {
	players lo.Tuple2[*Player, *Player]
}
