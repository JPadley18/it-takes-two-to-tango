package handlers

import (
	"it4/backend/models"

	websocket "github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func HandlePlayerConnect(c *websocket.Conn) {
	defer c.Close()

	// Check the lobby exists
	if !models.LobbyExists(c.Params("id")) {
		c.WriteMessage(websocket.TextMessage, []byte("Lobby does not exist"))
	}

	// Join the lobby
	l := models.GetLobby(c.Params("id"))
	l.AddPlayer(models.NewPlayer("anonymous"))
	// Tell the player that joining was successful
}

func HandleCreateLobby(c *fiber.Ctx) error {
	// Create lobby and return its ID so that the user can join
	id := models.NewLobby()
	return c.SendString(id)
}
