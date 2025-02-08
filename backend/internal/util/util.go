package util

import (
	"log"

	"github.com/gofiber/contrib/websocket"
)

func PanicOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}

func SendPacket(command string, data interface{}, conn *websocket.Conn) {
	packet := struct {
		Command string `json:"command"`
		Data    any    `json:"data"`
	}{command, data}
	conn.WriteJSON(packet)
}
