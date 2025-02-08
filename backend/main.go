package main

import (
	"it4/backend/handlers"
	"it4/backend/internal/queue"
	"log"
	"os"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	log.Println("Connecting to RabbitMQ")

	q := queue.Connect("amqp://guest:guest@rabbitmq")
	defer q.Close()

	log.Println("Connected!")

	log.Println("Setting up Fiber")

	f := fiber.New()
	defer f.Listen(":8080")

	f.Use(cors.New(cors.Config{
		AllowOriginsFunc: func(origin string) bool {
			return os.Getenv("ENVIRONMENT") == "development"
		},
	}))

	f.Get("/play/:lobby", websocket.New(handlers.HandlePlayerConnect))
	f.Get("/lobbies", handlers.HandleListLobbies)
	f.Post("/start", handlers.HandleCreateLobby)

	log.Println("Server ready!")
}
