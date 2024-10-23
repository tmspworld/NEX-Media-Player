// script.js

const playlist = [
  {
    title: "Song 1",
    src: "path_to_local_or_api_song_1.mp3", // Replace with local file or API URL
    thumbnail: "path_to_album_thumbnail_1.jpg" // Album thumbnail
  },
  {
    title: "Song 2",
    src: "path_to_local_or_api_song_2.mp3",
    thumbnail: "path_to_album_thumbnail_2.jpg"
  },
  {
    title: "Song 3",
    src: "path_to_local_or_api_song_3.mp3",
    thumbnail: "path_to_album_thumbnail_3.jpg"
  }
];

let currentTrack = 0;

const audioPlayer = document.getElementById('audio-player');
const playlistElement = document.getElementById('playlist');
const audioSource = document.getElementById('audio-source');

// Load the playlist into the HTML
function loadPlaylist() {
  playlist.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('playlist-item');
    listItem.innerHTML = `
      <img src="${song.thumbnail}" alt="Album thumbnail">
      <span>${song.title}</span>
    `;
    listItem.addEventListener('click', () => {
      currentTrack = index;
      loadTrack();
    });
    playlistElement.appendChild(listItem);
  });
}

// Load the current track
function loadTrack() {
  const song = playlist[currentTrack];
  audioSource.src = song.src;
  audioPlayer.load();
  audioPlayer.play();
}

// Next and Previous controls
document.getElementById('next-btn').addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack();
});

document.getElementById('prev-btn').addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack();
});

// Initial setup
loadPlaylist();
loadTrack();
