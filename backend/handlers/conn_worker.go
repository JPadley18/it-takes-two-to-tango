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

func PlayerWorker(c *websocket.Conn, p *models.Player, l *models.Lobby) {
	// Send the lobby data to the player
	log.Printf("Spun up a new worker thread for player '%s'", p.Name)
	c.WriteJSON(l)

	// Continuously listen for new data on the websocket from the client
	for {
		var msg ClientMessage
		err := c.ReadJSON(&msg)
		if err != nil {
			// Websocket has died or player sent something badly formatted :(
			log.Printf("Player '%s' has disconnected", p.Name)
			return
		}

		switch msg.Command {
		}
	}
}
