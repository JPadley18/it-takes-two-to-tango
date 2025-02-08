package handlers

import (
	"it4/backend/internal/game"
	"it4/backend/models"
	"log"

	websocket "github.com/gofiber/contrib/websocket"
)

type PlacementPosition struct {
	X      int         `json:"x"`
	Y      int         `json:"y"`
	Symbol game.Symbol `json:"symbol"`
}

type ClientMessage struct {
	Command      string            `json:"command"`
	PlacementPos PlacementPosition `json:"placementPosition"`
}

func PlayerWorker(c *websocket.Conn, p *models.Player, l *models.Lobby, lobby_id string) {
	log.Printf("Spun up a new worker thread for player '%s' (%s) connected to lobby %s", p.Name, p.Id, lobby_id)

	// Continuously listen for new data on the websocket from the client
	for {
		var msg ClientMessage
		err := c.ReadJSON(&msg)
		if err != nil {
			// Websocket has died or player sent something badly formatted :(
			log.Printf("Player '%s' has disconnected", p.Name)
			// Broadcast the disconnect
			l.PlayerDisconnect(p.Id)
			// Check if the lobby now needs to close
			log.Printf("Checking if lobby needs to close as a player has left")
			if len(l.Players) == 0 {
				log.Printf("Lobby %s is closing as it is empty", lobby_id)
				models.CloseLobby(lobby_id)
			}
			return
		}

		switch msg.Command {
		case "start_game":
			// Try to start the game
			if l.IsReadyToStart() {
				// Start the game
				log.Printf("Lobby %s is starting", lobby_id)
				l.StartGame()
			}
		case "place_symbol":
			data := msg.PlacementPos
			if !p.Place(data.X, data.Y, data.Symbol) {
				log.Printf("Rejected invalid move: %v", data)
			}
			// Broadcast the new board state
			l.BroadcastGameState()
		}
	}
}
