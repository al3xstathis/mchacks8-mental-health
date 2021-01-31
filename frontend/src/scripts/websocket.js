const {RTCPeerConnection, RTCSessionDescription} = window;

export function handleIncomingMessage(ws, msg, currentUser, setShowVideo){
    console.log(msg)
    switch (msg.type) {
        case "matchFoundAndCall":
            callUser(ws, msg, currentUser, setShowVideo);
            console.log(1)
            // set the matching keywords here
            break;
        
        case "matchFound":
            console.log(msg.user.uid, currentUser);
            console.log(1)
            // set the matching keywords
            break;
        
        case "callOffer":
            console.log(2)
            acknowledgeCall(ws, msg, currentUser, setShowVideo);
            break;
    
        case "newMessage":
            console.log(msg.payload)
            break;

        default:
            break;
    }
}

async function acknowledgeCall(ws, msg, currentUser, setShowVideo){
    createPeerConnection();
    
    await activateUserVideoAudio(setShowVideo);
    await window.peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(msg.payload)));
    const answer = await window.peerConnection.createAnswer();
    await window.peerConnection.setLocalDescription(answer);

    ws.send(JSON.stringify({
        type: "callOffer",
        target: msg.user.uid,
        payload: JSON.stringify(answer),
        user: {
            uid: currentUser.uid,
            username: "nic",
            keywords: ["riperoni", "jabronis", "lorem"]
        }
    }));
}

async function callUser(ws, msg, currentUser, setShowVideo){
    createPeerConnection();

    await activateUserVideoAudio(setShowVideo);
    const offer = await window.peerConnection.createOffer();
    await window.peerConnection.setLocalDescription(offer);

    ws.send(JSON.stringify({
        type: "callOffer",
        target: msg.user.uid,
        payload: JSON.stringify(window.peerConnection.localDescription),
        user: {
            uid: currentUser.uid,
            username: "nic",
            keywords: ["riperoni", "jabronis", "lorem"]
        }
    }));
}

function createPeerConnection(){
    window.peerConnection = new RTCPeerConnection({
        iceServers: [
            {
                'url': 'stun:stun.l.google.com:19302'
              },
              {
                'url': 'turn:192.158.29.39:3478?transport=udp',
                'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                'username': '28224511:1379330808'
              },
              {
                'url': 'turn:192.158.29.39:3478?transport=tcp',
                'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                'username': '28224511:1379330808'
              }
        ]
    });
}

async function activateUserVideoAudio(setShowVideo){
    setShowVideo(true);
    return navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true 
    }).then((localStream) => {
        //while(!document.getElementById("local-video")){}
        document.getElementById("local-video").srcObject = localStream;
        localStream.getTracks().forEach(track => window.peerConnection.addTrack(track, localStream));
    }).catch(handleGetUserMediaError);
}

function handleGetUserMediaError(e) {
    switch(e.name) {
      case "NotFoundError":
        alert("Unable to open your call because no camera and/or microphone" +
              "were found.");
        break;
      case "SecurityError":
      case "PermissionDeniedError":
        // Do nothing; this is the same as the user canceling the call.
        break;
      default:
        alert("Error opening your camera and/or microphone: " + e.message);
        break;
    }
    //closeVideoCall();
  }