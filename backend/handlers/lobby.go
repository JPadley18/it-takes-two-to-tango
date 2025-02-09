package handlers

import (
	"it4/backend/models"
	"log"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func HandlePlayerConnect(c *websocket.Conn) {
	defer c.Close()

	// Check the lobby exists
	id := c.Params("id")
	name := c.Query("name", "anonymous")
	log.Printf("Handling new connection for lobby %s, player %s", id, name)
	if !models.LobbyExists(id) {
		c.WriteMessage(websocket.TextMessage, []byte("Lobby does not exist"))
		log.Println("Lobby does not exist")
		return
	}

	// Join the lobby
	l := models.GetLobby(id)
	p := models.NewPlayer(name, c)
	if !l.AddPlayer(p) {
		c.WriteMessage(websocket.TextMessage, []byte("Can't join that lobby"))
		log.Println("Lobby joining prohibited")
		return
	}
	// Start up a worker thread for this player
	log.Println("Success - spinning up a worker thread")
	PlayerWorker(c, p, l, id)
}

func HandleCreateLobby(c *fiber.Ctx) error {
	// Create lobby and return its ID so that the user can join
	id := models.NewLobby(c.Query("creator", "anonymous"))
	return c.JSON(struct {
		Id string `json:"id"`
	}{Id: id})
}

func HandleListLobbies(c *fiber.Ctx) error {
	return c.JSON(struct {
		Lobbies []models.LobbyListing `json:"lobbies"`
	}{models.ListLobbies()})
}
