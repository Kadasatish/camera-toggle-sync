const socket = io("https://your-render-backend.onrender.com");

const toggleCam = document.getElementById("toggleCam");
const video = document.getElementById("video");
const dot = document.getElementById("dot");

let stream = null;

toggleCam.addEventListener("change", async () => {
  const isOn = toggleCam.checked;
  socket.emit("cameraToggle", isOn);
  socket.emit("colorToggle", isOn);
  handleToggle(isOn);
});

socket.on("cameraToggle", (isOn) => {
  handleToggle(isOn);
});

socket.on("colorToggle", (isOn) => {
  dot.style.backgroundColor = isOn ? "white" : "black";
});

async function handleToggle(isOn) {
  if (isOn) {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
    } catch (err) {
      alert("Camera access blocked!");
    }
  } else {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
      video.srcObject = null;
    }
  }
}
