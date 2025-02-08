package models

import (
	"sync"
)

const MAX_PLAYERS = 2

type Lobby struct {
	mu      *sync.Mutex
	started bool
	players []*Player
}

func NewLobby(p *Player) *Lobby {
	return &Lobby{
		started: false,
		players: []*Player{p},
	}
}

func (l *Lobby) AddPlayer(p *Player) bool {
	l.mu.Lock()
	defer l.mu.Unlock()
	if len(l.players) < MAX_PLAYERS {
		l.players = append(l.players, p)
		return true
	}
	return false
}

func (l *Lobby) IsReadyToStart() bool {
	return len(l.players) == MAX_PLAYERS
}

func (l *Lobby) GameHasStarted() bool {
	return l.started
}

func (l *Lobby) StartGame() {
	l.mu.Lock()
	defer l.mu.Unlock()
	l.started = true
	// TODO: game initialisation logic
}
