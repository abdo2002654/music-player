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

let favourite = ["faded", "walking a way"];
let index = 0;

let canPlay = true;
let switcher = document.querySelector(".switch");
let volumeButton = document.querySelector('.volumeButton');
let volumeControls = document.querySelector(".volume");
let volumeTrack = document.querySelector(".volumeTrack");
let volumeTrackScroller = document.querySelector(".volumeTrack .scroll");
let volumeMute = document.querySelector(".volume-off");
let volume = 1;

let repeatButton = document.querySelector(".repeatButton");
let favouriteButton = document.querySelector(".favouriteButton");
let shuffleButton = document.querySelector(".shuffleButton");

let ListsContainer = document.querySelector(".playerListContainer");
let listToggler = document.querySelector(".listToggler");
let tabs = document.querySelectorAll(".tab");
let tabPanels = document.querySelectorAll(".tab-panel");
let allList = document.querySelector(".allList");
let favList = document.querySelector(".favList");
let allListItems = document.querySelectorAll(".allList li");
let ListCloseButton = document.querySelector(".listHeader button");

let songName = document.querySelector("h4");
let author = document.querySelector("p");
let songTrack = document.querySelector(".track");
let songTrackScroll = document.querySelector(".track .scroll");
let songTrackScrollPointer = document.querySelector(".track .scroll div");
let duration = document.querySelector(".duration");
let currentTime = document.querySelector(".currentTime");

let nextButton = document.querySelector(".nextButton");
let playButton = document.querySelector(".playButton");
let prevButton = document.querySelector(".prevButton");

let songSource = document.querySelector(".songSource");

let shuffle = false;
let repeat = false;

favouriteButton.addEventListener("click",  () => {
  if(favouriteButton.classList.contains("active")) {
    favouriteButton.classList.remove("active");
    favourite = favourite.filter(e => e !== songs[index].songName)
    updateList();
  } else {
    favouriteButton.classList.add("active");
    favourite.push(songs[index].songName);
    updateList();
  }

})

window.addEventListener("load", () => {
  songSource.src = songs[0].source;
  play();
  updateList();
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
  let fav = false;
  favourite.forEach(e => {
    if(e === songs[index].songName) fav = true;
  })

  if(fav) favouriteButton.classList.add('active');
  if(!fav) favouriteButton.classList.remove('active');
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
  if(!canPlay) return;
  canPlay = false;
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
  setTimeout(() => {
    canPlay = true;
  }, 1000);
});
prevButton.addEventListener("click", () => {
  if(!canPlay) return;
  canPlay = false;
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
  setTimeout(() => {
    canPlay = true;
  }, 1000);
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

setInterval(() => {
  if(songSource.duration > 0) {
    duration.innerHTML = formatToMinutes(songSource.duration);
  }
}, 500);

tabs.forEach((e, i) => {
  e.addEventListener("click", () => {
    tabs.forEach(ele => ele.classList.remove("active"));
    tabPanels.forEach((ele, index) => {
      if(index == i) {
        ele.classList.add("active");
      } else {
        ele.classList.remove("active");
      }
    })
    e.classList.add("active");
  });
});

volumeButton.addEventListener("click", () => {
  if(volumeControls.classList.contains("active")) {
    volumeControls.classList.remove("active")
    volumeButton.innerHTML = "<i class='fa fa-volume-high'></i>";
  } else {
    volumeButton.innerHTML = "<i class='fa fa-close'></i>";
    volumeControls.classList.add("active")
  }
})

volumeTrack.addEventListener("click", (e) => {
  songSource.volume = e.offsetX/volumeTrack.clientWidth;
  volume = e.offsetX/volumeTrack.clientWidth;
  volumeTrackScroller.style.width = (songSource.volume) * 100+"%";
})

volumeMute.addEventListener("click", () => {
  if(songSource.volume > 0) {
    songSource.volume = 0;
    volumeTrackScroller.style.width = (songSource.volume) * 100+"%";
  } else {
    songSource.volume = volume;
    volumeTrackScroller.style.width = (songSource.volume) * 100+"%";
  }
})

volumeTrackScroller.style.width = (songSource.volume) * 100+"%";

listToggler.addEventListener("click", () => {
  ListsContainer.classList.add("on")
})
function updateList () {
  allList.innerHTML = ``;
  favList.innerHTML = ``;
  songs.forEach((song, id) => {
    let favourited = false;
    favourite.forEach(e => {
      if(e === song.songName) favourited = true;
    })
    let li = document.createElement("li");
    li.innerHTML += `
      <div class="icon">
        <i class="fa fa-music"></i>
      </div>
      <div class="song">
        <h5>${song.songName}</h5>
        <p>${song.author}</p>
      </div>
      <div class="fav-icon ${favourited?"fav":""}">
        <i class="fa fa-heart"></i>
      </div>
    `
    li.addEventListener("click", () => {
      index = id;
      play();
      playMusic();
      ListsContainer.classList.remove("on");
    })
    allList.append(li)

    if(favourited) {
      let favli = document.createElement("li");
      favli.innerHTML += `
      <div class="icon">
      <i class="fa fa-music"></i>
      </div>
      <div class="song">
      <h5>${song.songName}</h5>
      <p>${song.author}</p>
      </div>
      <div class="fav-icon fav">
      <i class="fa fa-heart"></i>
      </div>
      `
      favli.addEventListener("click", () => {
        index = id;
        play();
        playMusic();
        ListsContainer.classList.remove("on");
      })
      favList.append(favli)}
  })
}

songTrackScrollPointer.onclick = (e) => {
  e.stopPropagation();
}

ListCloseButton.addEventListener("click", () => ListsContainer.classList.remove("on"));
switcher.addEventListener("click", () => {
  if(document.body.classList.contains("dark")) {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    switcher.innerHTML = "<i class='fa fa-moon'></i>";
  } else if (document.body.classList.contains("light")) {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    switcher.innerHTML = "<i class='fa fa-sun'></i>";
  }
})