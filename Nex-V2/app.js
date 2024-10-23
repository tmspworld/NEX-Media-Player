const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const repeatBtn = document.getElementById('repeatBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const fileInput = document.getElementById('fileInput');
const fileBtn = document.getElementById('fileBtn');

let isPlaying = false;
let isShuffling = false;
let isRepeating = false;

// Play or Pause audio
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Play next song (placeholder functionality)
nextBtn.addEventListener('click', () => {
    console.log('Next song');
    audioPlayer.currentTime = 0;
});

// Play previous song (placeholder functionality)
prevBtn.addEventListener('click', () => {
    console.log('Previous song');
    audioPlayer.currentTime = 0;
});

// Repeat functionality
repeatBtn.addEventListener('click', () => {
    isRepeating = !isRepeating;
    audioPlayer.loop = isRepeating;
    repeatBtn.classList.toggle('active', isRepeating);
});

// Shuffle functionality (placeholder functionality)
shuffleBtn.addEventListener('click', () => {
    isShuffling = !isShuffling;
    shuffleBtn.classList.toggle('active', isShuffling);
    console.log('Shuffle', isShuffling);
});

// File selection
fileBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        audioPlayer.src = fileURL;
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
    }
});

// Audio visualization placeholder
const canvas = document.getElementById('waveformCanvas');
const ctx = canvas.getContext('2d');

function drawWaveform() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(0, canvas.height / 2, canvas.width, 1);
    requestAnimationFrame(drawWaveform);
}

drawWaveform();
