console.log("Welcome to Spotify");

// Initialize variables
let songIndex = 0;

let songs = [
    { songName: "Guns And Roses", filePath: "SONGS/1.mp3", coverPath: "COVERS/og1.jpg" },
    { songName: "Streets Of Fire", filePath: "SONGS/2.mp3", coverPath: "COVERS/og1.jpg" },
    { songName: "OMI Trance", filePath: "SONGS/3.mp3", coverPath: "COVERS/og1.jpg" },
    { songName: "Kiss Kiss Bang Bang", filePath: "SONGS/4.mp3", coverPath: "COVERS/og1.jpg" },
    { songName: "OG Meets OMI", filePath: "SONGS/5.mp3", coverPath: "COVERS/og1.jpg" }
];

let audioElement = new Audio(songs[0].filePath);
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// populate song item covers & names (if present)
songItems.forEach((element, i) => {
    const img = element.getElementsByTagName("img")[0];
    const nameElem = element.getElementsByClassName("songName")[0];
    if (img && songs[i]) img.src = songs[i].coverPath;
    if (nameElem && songs[i]) nameElem.innerText = songs[i].songName;
});

// Handle play/pause click on master button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        if (gif) gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        if (gif) gif.style.opacity = 0;
    }
});

// Listen to audio timeupdate to update progress bar
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration && !isNaN(audioElement.duration)) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
});

// Seek using progress bar
myProgressBar.addEventListener('change', () => {
    if (audioElement.duration && !isNaN(audioElement.duration)) {
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    }
});

// Utility to make all per-track icons show play
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Per-track play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();

        // the clicked element should have an id equal to the index
        let id = parseInt(e.target.id);
        if (isNaN(id)) return;

        songIndex = id;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        if (gif) gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Next button
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    if (gif) gif.style.opacity = 1;
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    if (gif) gif.style.opacity = 1;
});
