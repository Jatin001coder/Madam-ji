// ==========================================
// MADAM JI — MUSIC PLAYER
// ==========================================

const musicButton = document.querySelector(".music-button");
const musicSection = document.querySelector(".music-section");

const previousButton = document.querySelector(".controls button:nth-child(1)");
const playButton = document.querySelector(".controls .play");
const nextButton = document.querySelector(".controls button:nth-child(3)");


// ==========================================
// SONG TITLE ELEMENTS
// ==========================================

const songTitle = document.querySelector(".song-info h3");
const songArtist = document.querySelector(".song-info p");


// ==========================================
// PLAYLIST
// ==========================================

const songs = [

    {
        file: "songs/Jaanu.mp3",
        title: "Jaanu",
        artist: "Garry Sandhu"
    },

    {
        file: "songs/Not Sure - Cheema Y.mp3",
        title: "Not Sure",
        artist: "Cheema Y"
    },

    {
        file: "songs/Barsaat Banjaare 320 Kbps.mp3",
        title: "Barsaat",
        artist: "Banjaare"
    },

    {
        file: "songs/Shkini Guru Randhawa 320 Kbps.mp3",
        title: "Shikini",
        artist: "Guru Randhawa"
    },

    {
        file: "songs/VOGUE - Guru Randhawa.mp3",
        title: "Vogue",
        artist: "Guru Randhawa"
    },

    {
        file: "songs/Kangna - Dr Zeus.mp3",
        title: "Kangna",
        artist: "Dr Zeus"
    },

    {
        file: "songs/Your Thoughts.mp3",
        title: "Your Thoughts",
        artist: "Nav Singh"
    },

    {
        file: "songs/Chalray Chalray Waal - Ravzz Musica.mp3",
        title: "Chalre Chalre Waal",
        artist: "Shanzy Sial"
    },

    {
        file: "songs/Ceo Bermuda Triangle 320 Kbps.mp3",
        title: "CEO",
        artist: "Cheema Y"
    },

    {
        file: "songs/Love Salary - Cheema Y.mp3",
        title: "Love Salary",
        artist: "Cheema Y"
    },

    {
        file: "songs/Haareya Meri Pyaari Bindu 320 Kbps.mp3",
        title: "Haareya",
        artist: "Arijit Singh"
    },

    {
        file: "songs/Udaarian - Satinder Sartaaj.mp3",
        title: "Udaarian",
        artist: "Satinder Sartaaj"
    },

    {
        file: "songs/Good Luck Charm 3.mp3",
        title: "Good Luck Charm",
        artist: "Aman Hayer"
    },

    {
        file: "songs/Dooron Dooron - Dooron Dooron (320 kbps).mp3",
        title: "Dooron Dooron",
        artist: "Paresh Pahuja"
    },

    {
        file: "songs/Char Din.mp3",
        title: "Char Din",
        artist: "Unknown"
    }

];


// ==========================================
// AUDIO
// ==========================================

const audio = new Audio();
const albumArt = document.querySelector(".album-art");
// ==========================================
// PROGRESS BAR
// ==========================================

const progressBar = document.querySelector("#progress-bar");
const currentTimeDisplay = document.querySelector("#current-time");
const durationDisplay = document.querySelector("#duration");


// Format time
function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
}


// Get song duration
audio.addEventListener("loadedmetadata", () => {

    if (durationDisplay) {
        durationDisplay.textContent =
            formatTime(audio.duration);
    }

    if (progressBar) {
        progressBar.max = audio.duration;
    }

});


// Update progress
audio.addEventListener("timeupdate", () => {

    if (progressBar) {
        progressBar.value = audio.currentTime;
    }

    if (currentTimeDisplay) {
        currentTimeDisplay.textContent =
            formatTime(audio.currentTime);
    }

});


// Seek through song
if (progressBar) {

    progressBar.addEventListener("input", () => {

        audio.currentTime = progressBar.value;

    });

}
let currentSong = 0;


// ==========================================
// LOAD SONG
// ==========================================

function loadSong(index) {

    currentSong = index;

    audio.src = songs[currentSong].file;

    // Update song name
    if (songTitle) {
        songTitle.textContent = songs[currentSong].title;
    }

    // Update artist
    if (songArtist) {
        songArtist.textContent = songs[currentSong].artist;
    }

    console.log(
        "Loaded:",
        songs[currentSong].title
    );
}


// ==========================================
// PLAY SONG
// ==========================================

function playSong() {

    audio.play()
        .then(() => {

            if (playButton) {
                playButton.textContent = "❚❚";
            }
            if (albumArt) {
    albumArt.classList.add("playing");
}

        })
        .catch((error) => {

            console.log("Song could not play:", error);

        });

}


// ==========================================
// PAUSE SONG
// ==========================================

function pauseSong() {

    audio.pause();

    if (playButton) {
        playButton.textContent = "▶";
    }
    if (albumArt) {
    albumArt.classList.remove("playing");
}

}


// ==========================================
// EXPLORE MUSIC
// ==========================================

if (musicButton) {

    musicButton.addEventListener("click", () => {

        if (musicSection) {

            musicSection.scrollIntoView({
                behavior: "smooth"
            });

        }

        playSong();

    });

}


// ==========================================
// PLAY / PAUSE
// ==========================================

if (playButton) {

    playButton.addEventListener("click", () => {

        if (audio.paused) {

            playSong();

        } else {

            pauseSong();

        }

    });

}


// ==========================================
// PREVIOUS SONG
// ==========================================

if (previousButton) {

    previousButton.addEventListener("click", () => {

        currentSong--;

        if (currentSong < 0) {
            currentSong = songs.length - 1;
        }

        loadSong(currentSong);

        playSong();

    });

}


// ==========================================
// NEXT SONG
// ==========================================

if (nextButton) {

    nextButton.addEventListener("click", () => {

        currentSong++;

        if (currentSong >= songs.length) {
            currentSong = 0;
        }

        loadSong(currentSong);

        playSong();

    });

}


// ==========================================
// AUTOMATIC NEXT SONG
// ==========================================

audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

    playSong();

});


// ==========================================
// START WITH JAANU
// ==========================================

loadSong(0);


// ==========================================
// BACKGROUND SCENE CHANGER
// ==========================================

const scenes = document.querySelectorAll(
    ".background-scenes .scene"
);

let currentScene = 0;

function changeScene() {

    if (scenes.length === 0) return;

    scenes[currentScene].classList.remove("active");

    currentScene =
        (currentScene + 1) % scenes.length;

    scenes[currentScene].classList.add("active");

}

setInterval(changeScene, 8000);


// ==========================================
// CONSOLE
// ==========================================

console.log("Welcome to Madam Ji 🎵");
console.log("Playlist loaded successfully.");