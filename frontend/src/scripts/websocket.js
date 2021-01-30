export function connect(userData, enqueue = false){
    let protocol = "ws";

    if (document.location.protocol === "https:") {
        protocol += "s";
    }

    const ws = new WebSocket(protocol + "://localhost:3030/ws");

    ws.onerror = (evt) => {
        console.error(evt);
    }
    
    ws.onopen = () => {
        console.log('Connected!');

        if (enqueue) {
            ws.send(JSON.stringify({
                type: 'enqueue',
                user: userData,
                payload: 'blc',
                target: 'someone else'
            }));
        }
    };

    ws.onmessage = (evt) => {
        handleIncomingMessage(JSON.parse(evt.data));
    }

    ws.onclose = () => {
        console.log('Connection closed.');
    }
}

function handleIncomingMessage(msg){
    switch (msg.type) {
        case "matchFound":
            console.log(msg.user.uid);
            break;
    
        case "newMessage":
            console.log(msg.payload)
            break;

        default:
            break;
    }
}