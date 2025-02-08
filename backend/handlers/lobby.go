package handlers

import (
	websocket "github.com/gofiber/contrib/websocket"
)

func HandlePlayerConnect(c *websocket.Conn) {
	c.WriteMessage(websocket.TextMessage, []byte("perish"))
}
