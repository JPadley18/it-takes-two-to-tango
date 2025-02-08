package handlers

import (
	"it4/backend/models"
	"log"

	websocket "github.com/gofiber/contrib/websocket"
)

type ClientMessage struct {
	Command string `json:"command"`
	Data    string `json:"data"`
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
		}
	}
}
