const {RTCPeerConnection, RTCSessionDescription} = window;

export function handleIncomingMessage(ws, msg){
    console.log(msg)
    switch (msg.type) {
        case "matchFoundAndCall":
            callUser(ws, msg);
            // set the matching keywords here
            break;
        
        case "matchFound":
            console.log(msg.user.uid);
            // set the matching keywords
            break;
        
        case "callOffer":
            console.log(JSON.parse(msg.payload))
            break;
    
        case "newMessage":
            console.log(msg.payload)
            break;

        default:
            break;
    }
}

async function callUser(ws, msg){
    const peerConnection = new RTCPeerConnection();
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    ws.send(JSON.stringify({
        type: "callOffer",
        target: "12345kajshd", //TODO un-hardcode
        payload: JSON.stringify(offer),
        user: {
            uid: "12345kajshd",
            username: "nic",
            keywords: ["riperoni", "jabronis", "lorem"]
        }
    }))
}