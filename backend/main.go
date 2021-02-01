package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type message struct {
	User    userStruct `json:"user"`
	Payload string     `json:"payload"`
	Type    string     `json:"type"`
	Target  string     `json:"target"`
}

type userStruct struct {
	UID      string   `json:"uid"`
	Username string   `json:"username"`
	Keywords []string `json:"keywords"`
	WS       *websocket.Conn
}

const port = 3030

var clients = make(map[*websocket.Conn]userStruct)
var userQueue []userStruct
var msgQueue = make(chan message)
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

func main() {
	http.HandleFunc("/ws", handleConnections)

	go handleIncomingMessages()

	fmt.Printf("Starting server on port %d\n", port)

	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Fatalln("ListenAndServe error:", err)
	}
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	// Upgrade initial GET request to a websocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		if !websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
			log.Fatal("WebSocket upgrader error\n", err)
		}
	}
	defer func() {
		ws.Close()
		delete(clients, ws)
	}()

	clients[ws] = userStruct{}

	decodeAndPassMessage(ws)
}

func decodeAndPassMessage(ws *websocket.Conn) {
	for {
		var msg message
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("JSON read error: msg type: %v error: %v\n", msg, err)
		}

		if msg.Type == "" {
			continue
		}

		if msg.Type == "enqueue" {
			msg.User.WS = ws
		}

		msgQueue <- msg
	}
}

func handleIncomingMessages() {
	for {
		msg := <-msgQueue
		switch msg.Type {
		case "enqueue":
			clients[msg.User.WS] = msg.User
			matchFound, matchedUser, keywords := searchForMatch(msg.User)

			if matchFound {
				fmt.Println("Match found!", keywords)

				notifyMatches(msg.User, *matchedUser, keywords)
			} else {
				userQueue = append(userQueue, msg.User)
			}

		// case "callOffer":
		// 	callOffer(msg)

		// case "callAccepted":
		// 	callAccepted(msg)

		// case "iceEvent":
		// 	iceEvent(msg)

		// case "negotiate":
		// 	negotiate(msg)

		case "sendMessage":
			sendMessage(msg)
		}
	}
}

func sendMessage(msg message) {
	for ws := range clients {
		if clients[ws].UID == msg.Target {
			ws.WriteJSON(message{
				Type:    "message",
				Payload: msg.Payload,
				User:    msg.User,
			})
		}
	}
}

func negotiate(msg message) {
	for ws := range clients {
		if clients[ws].UID == msg.Target {
			ws.WriteJSON(message{
				Type:    "negotiate",
				Payload: msg.Payload,
			})
		}
	}
}

func iceEvent(msg message) {
	for ws := range clients {
		if clients[ws].UID == msg.Target {
			ws.WriteJSON(message{
				Type:    "iceEvent",
				Payload: msg.Payload,
			})
		}
	}
}

func callAccepted(msg message) {
	for ws := range clients {
		if clients[ws].UID == msg.Target {
			ws.WriteJSON(message{
				Type:    "callAccepted",
				User:    msg.User,
				Payload: msg.Payload,
			})
		}
	}
}

func callOffer(msg message) {
	for ws := range clients {
		if clients[ws].UID == msg.Target {
			ws.WriteJSON(message{
				Type:    "callOffer",
				User:    msg.User,
				Payload: msg.Payload,
			})
		}
	}
}

func notifyMatches(user1 userStruct, user2 userStruct, keywords []string) {
	for ws := range clients {
		if clients[ws].UID == user2.UID {
			ws.WriteJSON(message{
				Type: "matchFoundAndCall",
				User: user1,
			})
		} else if clients[ws].UID == user1.UID {
			ws.WriteJSON(message{
				Type: "matchFound",
				User: user2,
			})
		}
	}
}

func searchForMatch(user userStruct) (bool, *userStruct, []string) {
	for i, u := range userQueue {
		overlap, keywords := checkOverlap(user.Keywords, u.Keywords)
		if overlap {
			userQueue = append(userQueue[:i], userQueue[i+1:]...)
			return true, &u, keywords
		}
	}

	return false, nil, nil
}

func checkOverlap(keywords1 []string, keywords2 []string) (bool, []string) {
	exists := make(map[string]bool)
	results := []string{}

	for _, v := range keywords1 {
		exists[v] = true
	}

	for _, v := range keywords2 {
		if exists[v] {
			results = append(results, v)
		}
	}

	if len(results) > 0 {
		return true, results
	}
	return false, nil
}
