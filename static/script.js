// Clean & contained script: canvas overlays video, reference image is HTML below buttons,
// preserves spaces, uses stable live update logic and sends frames to backend

const video =document.getElementById("video"); // catch video frames
const canvas= document.getElementById("canvas"); // catch canvas frames
const ctx =canvas.getContext("2d"); // Canvas set to be in 2D data ( rows & columuns )
const predictedWord= document.getElementById("predicted-word") // variable for predicted word
const socket =io(); 

let currentText ="";
let localStableText= "";

// Live preview style
const LIVE_FONT_SIZE = 56;
const LIVE_X = 18;
const LIVE_Y = 14;
const SEND_INTERVAL_MS =200; // 200ms between frames

// set predictedWord to preserve whitespace
predictedWord.style.whiteSpace ="pre-wrap";

// create stable and live spans inside predictedWord to avoid HTML whitespace collapse
const stableSpan =document.createElement("span");
stableSpan.className ="stable";
stableSpan.textContent= "";

const liveSpan = document.createElement("span");
liveSpan.className = "live";
liveSpan.textContent = "";
liveSpan.style.marginLeft ="10px";
liveSpan.style.color ="#f59e0b"; // orange for live preview

predictedWord.innerHTML = "";
predictedWord.appendChild(stableSpan);
predictedWord.appendChild(liveSpan);

// sync canvas size to the displayed video size
function syncCanvasSizeToVideo(){
    const w = video.videoWidth || video.clientWidth ||640;
    const h = video.videoHeight || video.clientHeight || 480;
    if (canvas.width !== w || canvas.height!== h) {
        canvas.width =w;
        canvas.height = h;
 }
}

// draw overlay :  show liveChar (big orange letter)
function drawOverlay(liveChar = "") {
    syncCanvasSizeToVideo();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (liveChar) {
        ctx.font = `${LIVE_FONT_SIZE}px Arial`;
        ctx.fillStyle = "rgba(245,158,11,0.95)"; 
        ctx.textBaseline = "top";
        ctx.fillText(liveChar.toUpperCase(), LIVE_X, LIVE_Y);
    }
}

// start the camera 
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream =>{
        video.srcObject = stream;
        video.muted = true;
        video.play().catch(()=>{});
        video.addEventListener('loadedmetadata',() => {
            syncCanvasSizeToVideo();
            drawOverlay("");
        });
        video.addEventListener('play',() => {
            syncCanvasSizeToVideo();
            drawOverlay("");
        });
    })
    .catch(err =>{
        console.error("getUserMedia error:", err);
    });

// send frames periodically
setInterval(() => {
    if (!video.videoWidth ||!video.videoHeight) return;
    const tmp = document.createElement('canvas');
    tmp.width = video.videoWidth;
    tmp.height =video.videoHeight;
    const tctx =tmp.getContext('2d');
    tctx.drawImage(video, 0, 0, tmp.width, tmp.height);
    const dataURL =tmp.toDataURL("image/jpeg", 0.6);
    socket.emit('frame', dataURL);
}, SEND_INTERVAL_MS);

// handle incoming predictions
socket.on('prediction',data => {
    const liveChar =(data && data.live) ? data.live : "";
    const stableText =(data && data.stable) ? data.stable : "";

    // update overlay
    drawOverlay(liveChar);

    // update stable text but prefer the longer string to avoid overwriting a just-typed space
    if (stableText.length > localStableText.length || stableText !== localStableText) {
        localStableText = stableText;
        stableSpan.textContent = localStableText;
    }

    // always update live preview span
    liveSpan.textContent =liveChar || "";
    currentText = localStableText;
});

// buttons layout
function sendButton(btn){
    socket.emit('button',{ button: btn });
}

// server response to button actions
socket.on('update_text',text => {
    localStableText = text || "";
    stableSpan.textContent =localStableText;
    liveSpan.textContent = "";
    currentText = localStableText;
});


