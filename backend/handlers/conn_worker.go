package handlers

import (
	"it4/backend/models"
	"log"

	websocket "github.com/gofiber/contrib/websocket"
)

func PlayerWorker(c *websocket.Conn, p *models.Player, l *models.Lobby) {
	// Send the lobby data to the player
	log.Printf("Spun up a new worker thread for player '%s'", p.Name)
}
