let songs = [
  {songName: "faded", author: "alan walker", source: "./assets/audios/Alan Walker - Faded(MP3_320K).mp3"},
  {songName: "on my way", author: "sabrina carpenter", source: "./assets/audios/Alan Walker_ Sabrina Carpenter _ Farruko  - On My Way(MP3_320K).mp3"},
  {songName: "for my hand", author: "burna boy & ed sheeran", source: "./assets/audios/Burna Boy - For My Hand (Lyrics) _ I wanna be in your life until the night is over(MP3_320K).mp3"},
  {songName: "seven days", author: "craig david", source: "./assets/audios/Craig David - 7 Days (Official Video)(MP3_320K).mp3"},
  {songName: "walking a way", author: "craig david", source: "./assets/audios/Craig David - Walking Away (Official Video)(MP3_160K).mp3"},
  {songName: "fine china", author: "juice wrld & future", source: "./assets/audios/Fine China(MP3_320K).mp3"},
  {songName: "come and go", author: "juice wrld & marshmello", source: "./assets/audios/Juice WRLD ft. Marshmello - Come _ Go (Official Audio)(MP3_320K).mp3"},
  {songName: "rich spirit", author: "kendrick lamar", source: "./assets/audios/Kendrick Lamar - Rich Spirit(MP3_320K).mp3"},
  {songName: "bye bye", author: "juice wrld & marshmello", source: "./assets/audios/Marshmello_ Juice WRLD - Bye Bye (Official Video)(MP3_320K).mp3"},
  {songName: "cruel summer", author: "taylor swift", source: "./assets/audios/Taylor Swift - Cruel Summer (Official Audio)(MP3_320K).mp3"},
];

let favourite = [];
let index = 0;

let volumeButton = document.querySelector('.volumeButton');
let volumeControls = document.querySelector(".volume");
let volumeTrack = document.querySelector(".volumeTrack .scroll");

let repeatButton = document.querySelector(".repeatButton");
let favouriteButton = document.querySelector(".favouriteButton");
let shuffleButton = document.querySelector(".shuffleButton");

let songName = document.querySelector("h4");
let author = document.querySelector("p");
let songTrack = document.querySelector(".track");
let songTrackScroll = document.querySelector(".track .scroll");
let duration = document.querySelector(".duration");
let currentTime = document.querySelector(".currentTime");

let nextButton = document.querySelector(".nextButton");
let playButton = document.querySelector(".playButton");
let prevButton = document.querySelector(".prevButton");

let songSource = document.querySelector(".songSource");

let shuffle = false;
let repeat = false;



window.addEventListener("load", () => {
  songSource.src = songs[0].source;
  play();
});

songSource.addEventListener("timeupdate", () => {
  currentTime.innerHTML = formatToMinutes(songSource.currentTime);
  songTrackScroll.style.width = (songSource.currentTime/songSource.duration) * 100 + "%";
  songTrackScroll.style.width = (songSource.currentTime/songSource.duration) * 100 + "%";
});
 function play () {
  songSource.src = songs[index].source;
  songName.innerHTML = songs[index].songName;
  author.innerHTML = songs[index].author;
  songTrackScroll.style.width = 0;
  currentTime.innerHTML = formatToMinutes(0);
};

playButton.addEventListener("click", () => {
  if(songSource.classList.contains("paused")) {
    songSource.classList.remove("paused");
    playMusic();
  } else {
    songSource.classList.add("paused");
    pauseMusic();
  };
});
nextButton.addEventListener("click", () => {
  if(shuffle){
    index = Math.floor(Math.random() * songs.length);
  } else if(repeat) {
    index = index;
  } else {
    index = index==songs.length-1?0:index + 1;
  };
  play();
  playMusic();
  songSource.classList.remove("paused");
});
prevButton.addEventListener("click", () => {
  if(shuffle){
    index = Math.floor(Math.random() * songs.length);
  } else if(repeat) {
    index = index;
  } else {
    index = index==0?songs.length - 1:index - 1;
  };
  play();
  playMusic();
  songSource.classList.remove("paused")
});

shuffleButton.addEventListener("click", () => {
  if(shuffle) {
    shuffle = false;
    shuffleButton.classList.remove("active");
  } else {
    shuffle = true;
    repeat = false;
    repeatButton.classList.remove("active");
    shuffleButton.classList.add("active");
  };
});

repeatButton.addEventListener("click", () => {
  if(repeat) {
    repeat = false;
    repeatButton.classList.remove("active");
  } else {
    repeat = true;
    shuffle = false;
    shuffleButton.classList.remove("active");
    repeatButton.classList.add("active");
  };
});


function playMusic() {
  songSource.play();
  playButton.innerHTML = "<i class='fa fa-pause'></i>";
  songSource.classList.remove("paused");
  setTimeout(() => duration.innerHTML = formatToMinutes(songSource.duration), 500);
};

function pauseMusic() {
  songSource.pause();
  playButton.innerHTML = '<i class="fa fa-play" style="margin-top: 4px;margin-left: 2px;"></i>';
  songSource.classList.add("paused");
};

songTrack.addEventListener("click", (e) => {
  songSource.currentTime = (e.offsetX / songTrack.clientWidth) * songSource.duration;
});



function formatToMinutes (time) {
  let before = Math.floor(time/60);
  let after = (time%60>=10?"":"0")+Math.floor(time%60);
  return before + " : " + after;
};
