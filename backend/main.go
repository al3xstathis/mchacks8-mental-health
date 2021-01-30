package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type message struct {
	UID string `json:"uid"`
}

const port = 3030

var clients = make(map[*websocket.Conn]bool)
var msgQueue = make(chan message)
var upgrader = websocket.Upgrader{}

func main() {
	http.HandleFunc("/ws", handleConnections)

	go handleIncomingMessages()

	fmt.Printf("Starting server on port %d", port)

	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Fatal("ListenAndServe error:", err)
	}
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	// Upgrade initial GET request to a websocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal("WebSocket upgrader error", err)
	}
	defer ws.Close()

	clients[ws] = true

	decodeAndPassMessage(ws)
}

func decodeAndPassMessage(ws *websocket.Conn) {
	for {
		var msg message
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, ws)
			break
		}
		msgQueue <- msg
	}
}

func handleIncomingMessages() {
	for {
		msg := <-msgQueue

		// TODO: logic here will change
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				fmt.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}
