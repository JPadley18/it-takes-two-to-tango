package queue

import (
	"context"
	"it4/backend/internal/util"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

type QueueClient struct {
	conn    *amqp.Connection
	channel *amqp.Channel
}

func Connect(s string) *QueueClient {
	c, err := amqp.Dial(s)
	util.PanicOnError(err, "Failed to dial RabbitMQ server")

	ch, err := c.Channel()
	util.PanicOnError(err, "Failed to create channel")

	return &QueueClient{c, ch}
}

func (q *QueueClient) AssertQueue(name string) error {
	_, err := q.channel.QueueDeclare(
		name,
		false,
		false,
		false,
		false,
		nil,
	)
	return err
}

func (q *QueueClient) SendMessageToQueue(name string, msg string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	err := q.channel.PublishWithContext(
		ctx,
		"",
		name,
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(msg),
		},
	)
	return err
}

func (q *QueueClient) OnMessageFrom(name string, callback func(msg string)) error {
	msgs, err := q.channel.Consume(
		name,
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return err
	}

	go func() {
		for msg := range msgs {
			callback(string(msg.Body))
		}
	}()
	return nil
}

func (q *QueueClient) Close() {
	q.channel.Close()
	q.conn.Close()
}
