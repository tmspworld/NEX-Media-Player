const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const repeatBtn = document.getElementById('repeatBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const fileInput = document.getElementById('fileInput');
const fileBtn = document.getElementById('fileBtn');
const currentThumbnail = document.getElementById('currentThumbnail');
const trackName = document.getElementById('trackName');
const durationTime = document.getElementById('durationTime');
const remainingTime = document.getElementById('remainingTime');
const volumeControl = document.getElementById('volumeControl');

let isPlaying = false;
let isShuffling = false;
let isRepeating = false;

// Update track info
function updateTrackInfo() {
    const trackDuration = audioPlayer.duration || 0;
    durationTime.textContent = `Duration: ${formatTime(trackDuration)}`;
}

// Format time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

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

// Update remaining time on timeupdate
audioPlayer.addEventListener('timeupdate', () => {
    remainingTime.textContent = `Remaining: ${formatTime(audioPlayer.duration - audioPlayer.currentTime)}`;
    updateWaveform();
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
    repeatBtn.classList.toggle('active', isRepeating);
});

// Shuffle functionality
shuffleBtn.addEventListener('click', () => {
    isShuffling = !isShuffling;
    shuffleBtn.classList.toggle('active', isShuffling);
});

// File input for audio selection
fileBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        audioPlayer.src = url;
        currentThumbnail.src = "https://via.placeholder.com/150/00ff00"; // Change thumbnail for the selected track
        trackName.textContent = file.name;
        updateTrackInfo();
    }
});

// Volume control
volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value;
});

// Canvas waveform (simplified)
const waveformCanvas = document.getElementById('waveformCanvas');
const ctx = waveformCanvas.getContext('2d');
waveformCanvas.width = window.innerWidth - 30;
waveformCanvas.height = 50;

function updateWaveform() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const percent = (currentTime / duration) * waveformCanvas.width;

    ctx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, waveformCanvas.width, waveformCanvas.height);
    
    ctx.fillStyle = currentTime < duration / 2 ? '#00ff00' : '#ff0000'; // Change color based on current time
    ctx.fillRect(0, 0, percent, waveformCanvas.height);
}

audioPlayer.addEventListener('loadedmetadata', updateTrackInfo);
