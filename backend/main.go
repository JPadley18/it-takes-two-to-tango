package main

import (
	"it4/backend/internal/queue"
	"log"
)

func main() {
	log.Println("Connecting to RabbitMQ")
	q := queue.Connect("amqp://guest:guest@rabbitmq")
	defer q.Close()
	log.Println("Connected!")

	q.AssertQueue("test")
	q.OnMessageFrom("test", func(msg string) {
		log.Printf("Received %s from test", msg)
	})
	q.SendMessageToQueue("test", "Hello World!")
	forever := make(chan []struct{})
	<-forever
}
