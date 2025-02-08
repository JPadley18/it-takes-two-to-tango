package models

import (
	"sync"

	"github.com/google/uuid"
)

const MAX_PLAYERS = 2

var lobbyList *LobbyList = &LobbyList{
	lobbies: make(map[string]*Lobby),
}

type Lobby struct {
	mu      sync.Mutex
	started bool
	Players []*Player `json:"players"`
}

type LobbyList struct {
	mu      sync.Mutex
	lobbies map[string]*Lobby
}

type LobbyListing struct {
	Id          string `json:"id"`
	PlayerCount int    `json:"playerCount"`
	IsFull      bool   `json:"isFull"`
	HasStarted  bool   `json:"hasStarted"`
}

func getRandomLobbyId() string {
	// Use fancy UUIDs because I can
	return uuid.New().String()
}

func GetLobby(id string) *Lobby {
	return lobbyList.lobbies[id]
}

func LobbyExists(id string) bool {
	_, exists := lobbyList.lobbies[id]
	return exists
}

func ListLobbies() []LobbyListing {
	lobbyList.mu.Lock()
	defer lobbyList.mu.Unlock()

	var ret []LobbyListing = []LobbyListing{}
	for id, lobby := range lobbyList.lobbies {
		listing := LobbyListing{
			id,
			len(lobby.Players),
			lobby.IsReadyToStart(),
			lobby.GameHasStarted(),
		}
		ret = append(ret, listing)
	}
	return ret
}

func NewLobby() string {
	lobbyList.mu.Lock()
	defer lobbyList.mu.Unlock()
	id := getRandomLobbyId()
	lobbyList.lobbies[id] = &Lobby{
		Players: []*Player{},
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
	if len(l.Players) < MAX_PLAYERS {
		l.Players = append(l.Players, p)
		return true
	}
	return false
}

func (l *Lobby) IsReadyToStart() bool {
	return len(l.Players) == MAX_PLAYERS
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
