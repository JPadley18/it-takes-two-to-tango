package main

import (
	"it4/backend/internal/queue"
	"log"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
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

	f.Get("/", func(c fiber.Ctx) error {
		return c.SendStatus(http.StatusOK)
	})

	log.Println("Done!")
}
