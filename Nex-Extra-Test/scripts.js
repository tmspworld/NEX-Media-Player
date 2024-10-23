const fileInput = document.getElementById('fileInput');
const audioPlayer = document.getElementById('audioPlayer');
const currentThumbnail = document.getElementById('currentThumbnail');
const playPauseBtn = document.getElementById('playPauseBtn');
let isPlaying = false;

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        // Create a URL for the selected file
        const fileURL = URL.createObjectURL(file);
        console.log('Playing file:', fileURL);  // Debugging

        // Set the audio player source to the selected file
        audioPlayer.src = fileURL;

        // Play the audio
        audioPlayer.play().then(() => {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        }).catch((error) => {
            console.error('Error playing audio:', error);
        });

        // Use jsmediatags to read metadata and display the album art
        jsmediatags.read(file, {
            onSuccess: (tag) => {
                const tags = tag.tags;
                if (tags.picture) {
                    const { data, format } = tags.picture;
                    const base64String = data.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
                    const base64Image = `data:${format};base64,${btoa(base64String)}`;
                    currentThumbnail.src = base64Image;
                    console.log('Album art found!');  // Debugging
                } else {
                    // If no album art, use a default placeholder image
                    console.log('No album art found. Using placeholder.');
                    currentThumbnail.src = "https://via.placeholder.com/150/008000";
                }
            },
            onError: (error) => {
                console.error('Error reading tags:', error);
            }
        });
    }
});

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
    } else {
        audioPlayer.play().then(() => {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        }).catch((error) => {
            console.error('Error playing audio:', error);
        });
    }
});
