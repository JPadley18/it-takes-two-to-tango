package models

import (
	"fmt"
	"it4/backend/internal/game"
	"it4/backend/internal/util"
	"log"
	"slices"
	"sync"

	"github.com/google/uuid"
	"github.com/samber/lo"
)

const MAX_PLAYERS = 2

// Global lobby list
var lobbyList *LobbyList = &LobbyList{
	lobbies: make(map[string]*Lobby),
}

type Lobby struct {
	mu      sync.Mutex
	started bool
	Players []*Player `json:"players"`
}

type LobbyState struct {
	Players []*Player `json:"players"`
}

type LobbyList struct {
	mu      sync.Mutex
	lobbies map[string]*Lobby
}

type LobbyListing struct {
	Id          string `json:"id"`
	Title       string `json:"title"`
	PlayerCount int    `json:"playerCount"`
	IsFull      bool   `json:"isFull"`
	HasStarted  bool   `json:"hasStarted"`
}

type GameState struct {
	YourBoard  [][]game.Symbol `json:"spaces"`
	TheirBoard [][]bool        `json:"theirBoard"`
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

func (l *Lobby) broadcast(command string, v any) {
	for _, p := range l.Players {
		util.SendPacket(command, v, p.Conn)
	}
}

func ListLobbies() []LobbyListing {
	lobbyList.mu.Lock()
	defer lobbyList.mu.Unlock()

	var ret []LobbyListing = []LobbyListing{}
	for id, lobby := range lobbyList.lobbies {
		listing := LobbyListing{
			id,
			fmt.Sprintf("%s's lobby", lobby.Players[0].Name),
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
	if len(l.Players) < MAX_PLAYERS && !l.started {
		l.Players = append(l.Players, p)
		l.broadcast("lobby_update", l)
		return true
	}
	return false
}

func (l *Lobby) PlayerDisconnect(id string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	_, idx, found := lo.FindIndexOf(l.Players, func(x *Player) bool {
		return x.Id == id
	})
	if found {
		l.Players = slices.Delete(l.Players, idx, idx+1)
		l.broadcast("lobby_update", l)
	}
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
	// Game initialisation
	board := game.NewBoard()
	l.broadcast("game_start", board)
	for _, p := range l.Players {
		// Set their board
		p.SetBoard(board)
	}
}

func (l *Lobby) BroadcastGameState() {
	l.mu.Lock()
	defer l.mu.Unlock()
	for _, p := range l.Players {
		util.SendPacket("game_state", l.getGameStateForPlayer(p.Id), p.Conn)
	}
}

func (l *Lobby) BroadcastWin(id string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	l.started = false
	log.Printf("Player %s won a game", id)
	for _, p := range l.Players {
		if p.Id == id {
			util.SendPacket("win", "", p.Conn)
		} else {
			util.SendPacket("lose", "", p.Conn)
		}
	}
}

func anonymizeBoardState(b *game.Board) [][]bool {
	var result [][]bool
	for _, row := range b.Spaces {
		var rowResult []bool
		for _, col := range row {
			rowResult = append(rowResult, col != game.Blank)
		}
		result = append(result, rowResult)
	}
	return result
}

func (l *Lobby) getGameStateForPlayer(id string) *GameState {
	_, idx, _ := lo.FindIndexOf(l.Players, func(x *Player) bool {
		return x.Id == id
	})
	state := &GameState{
		YourBoard:  l.Players[idx].board.Spaces,
		TheirBoard: anonymizeBoardState(l.Players[1-idx].board),
	}
	return state
}
