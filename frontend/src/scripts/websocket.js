const {RTCPeerConnection, RTCSessionDescription} = window;

export function handleIncomingMessage(ws, msg, currentUser, setShowVideo){
    switch (msg.type) {
        case "matchFoundAndCall":
            window.targetUser = msg.user.uid;
            window.peerConnection = null;
            window.sessionws = ws;
            window.currentUser = currentUser;
            callUser(ws, msg, currentUser, setShowVideo);
            // set the matching keywords here
            break;
        
        case "matchFound":
            window.targetUser = msg.user.uid;
            window.peerConnection = null;
            window.sessionws = ws;
            window.currentUser = currentUser;
            // set the matching keywords
            break;
        
        case "callOffer":
            acknowledgeCall(ws, msg, currentUser, setShowVideo);
            break;
        
        case "callAccepted":
            getAnswer(msg);
            break;

        case "iceEvent":
            iceEvent(msg);
            break;

        case "negotiate":
            receiveNegotiation(msg);
            break;
    
        case "newMessage":
            break;

        default:
            break;
    }
}

async function receiveNegotiation(msg){
    await window.peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(msg.payload)));
    const answer = await window.peerConnection.createAnswer();

    await window.peerConnection.setLocalDescription(answer);

    window.sessionws.send(JSON.stringify({
        type: "callAccepted",
        target: window.targetUser,
        payload: JSON.stringify(window.peerConnection.localDescription),
        user: {
            uid: window.currentUser.uid,
            username: "nic",
            keywords: ["riperoni", "jabronis", "lorem"]
        }
    }));
}

async function iceEvent(msg){
    await window.peerConnection.addIceCandidate(new RTCIceCandidate(JSON.parse(msg.Payload)));
}

async function getAnswer(msg){
    await window.peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(msg.payload)));
}

function handleTrackEvent(event) {
    console.log('adding stream?')
    document.getElementById("remote-video").srcObject = event.streams[0];
    //document.getElementById("hangup-button").disabled = false;
}

function handleRemoveTrackEvent(evt) {
    let stream = document.getElementById("remote-video").srcObject;
    let trackList = stream.getTracks();
  
    if (trackList.length === 0) {
      //closeVideoCall();
    }
  }

async function handleNegotiationNeeded(ev){
    if (!window.peerConnection.localDescription){
        return;
    }
    let offer = await window.peerConnection.createOffer();

    await window.peerConnection.setLocalDescription(offer);

    window.sessionws.send({
        type: "negotiate",
        target: window.targetUser,
        payload: JSON.stringify(window.peerConnection.localDescription),
        user: {
            uid: window.currentUser.uid,
            username: "nic",
            keywords: ["riperoni", "jabronis", "lorem"]
        }
    });
}

async function acknowledgeCall(ws, msg, currentUser, setShowVideo){
    createPeerConnection();
    
    await activateUserVideoAudio(setShowVideo);
    await window.peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(msg.payload)));
    const answer = await window.peerConnection.createAnswer();
    await window.peerConnection.setLocalDescription(answer);

    ws.send(JSON.stringify({
        type: "callAccepted",
        target: msg.user.uid,
        payload: JSON.stringify(window.peerConnection.localDescription),
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
                'urls': 'stun:stun.l.google.com:19302'
              },
              {
                'urls': 'turn:192.158.29.39:3478?transport=udp',
                'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                'username': '28224511:1379330808'
              },
              {
                'urls': 'turn:192.158.29.39:3478?transport=tcp',
                'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                'username': '28224511:1379330808'
              }
        ]
    });

    window.peerConnection.onicecandidate = handleICECandidateEvent;
    window.peerConnection.ontrack = handleTrackEvent;
    window.peerConnection.onremovetrack = handleRemoveTrackEvent;
    window.peerConnection.onnegotiationneeded = handleNegotiationNeeded;
}

function handleICECandidateEvent(evt) {
    if (evt.candidate){
        window.sessionws.send({
            type: 'iceEvent',
            target: window.targetUser,
            payload: JSON.stringify(evt.candidate)
        });
    }
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