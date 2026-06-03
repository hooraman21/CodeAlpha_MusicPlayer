// 1. Gather all of our DOM element points
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');

// 2. Track List Array - Using royalty-free music files for seamless testing
const songs = [
    {
        title: "Summer Breeze",
        artist: "Benjamin Tissot",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Creative Minds",
        artist: "Corporate Vibes",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Happy Rock",
        artist: "Energetic Beats",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

// Keep track of our current active song index
let songIndex = 0;

// Initialize and load the track details
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
}

// Initial setup call
loadSong(songs[songIndex]);

// 3. Play and Pause Execution Controls
function playSong() {
    playBtn.classList.add('playing');
    playBtn.innerHTML = '&#9208;'; // Changes button image to a Pause Icon
    audio.play();
}

function pauseSong() {
    playBtn.classList.remove('playing');
    playBtn.innerHTML = '&#9654;'; // Changes button image back to Play Icon
    audio.pause();
}

playBtn.addEventListener('click', () => {
    const isPlaying = playBtn.classList.contains('playing');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// 4. Previous and Next Track Jumps
function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0; // Wrap back to index start loop
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1; // Wrap back around to the last track
    }
    loadSong(songs[songIndex]);
    playSong();
}

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// 5. Progress Bar Slider Synced Up via 'timeupdate' Event
audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    if (!duration) return;

    // Calculate percentage value to step the range slider slider
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;

    // Format current elapsed time display
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;

    // Format total overall track duration display
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
});

// Allow the user to click/drag the slider manually to jump through parts of a song
progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// 6. Volume Controller Modification Handler
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

// Auto-advance loop when a song finishes playing completely
audio.addEventListener('ended', nextSong);