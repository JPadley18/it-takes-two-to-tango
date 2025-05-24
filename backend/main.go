package main

import (
	"it4/backend/handlers"
	"log"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	log.Println("Setting up Fiber")

	f := fiber.New()
	defer f.Listen(":8080")

	f.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173, http://tango.sherv.co.uk, https://tango.sherv.co.uk",
	}))

	f.Get("/play/:id", websocket.New(handlers.HandlePlayerConnect))
	f.Get("/lobbies", handlers.HandleListLobbies)
	f.Post("/start", handlers.HandleCreateLobby)

	log.Println("Server ready!")
}
