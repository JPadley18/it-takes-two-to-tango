package handlers

import (
	"it4/backend/models"

	websocket "github.com/gofiber/contrib/websocket"
)

func PlayerWorker(c *websocket.Conn, p *models.Player, l *models.Lobby) {
	// Send the lobby data to the player

}
