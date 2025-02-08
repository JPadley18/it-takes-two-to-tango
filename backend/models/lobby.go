package models

import (
	"fmt"
	"math/rand/v2"
	"sync"
)

const MAX_PLAYERS = 2

var lobbyList *LobbyList = &LobbyList{
	lobbies: make(map[string]*Lobby),
}

type Lobby struct {
	mu      sync.Mutex
	started bool
	players []*Player
}

type LobbyList struct {
	mu      sync.Mutex
	lobbies map[string]*Lobby
}

func getRandomLobbyId() string {
	// Generate random id until unique one found ;) pls dont hurt me
	for {
		idInt := int(rand.Float64() * 1000)
		id := fmt.Sprintf("%d", idInt)
		if !LobbyExists(id) {
			return id
		}
	}
}

func GetLobby(id string) *Lobby {
	return lobbyList.lobbies[id]
}

func LobbyExists(id string) bool {
	_, exists := lobbyList.lobbies[id]
	return exists
}

func NewLobby() string {
	lobbyList.mu.Lock()
	defer lobbyList.mu.Unlock()
	id := getRandomLobbyId()
	lobbyList.lobbies[id] = &Lobby{
		players: []*Player{},
	}
	return id
}

func CloseLobby(id string) {
	_, exists := lobbyList.lobbies[id]
	if exists {
		delete(lobbyList.lobbies, id)
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
