let audio;
const playBtn = document.querySelector('.play-btn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const songAuthor = document.querySelector('.song-author');
const songName = document.querySelector('.song-name');
const songImgs = document.querySelectorAll('.song-img');
const songLength = document.querySelector(".length-time");
const currentTime = document.querySelector(".current-time");
let isPlay = false;
let numberSongNow = 0;

const songs = [
    {
        'songAuthor' : "Beyonce",
        'songName' : "Don't hurn myself",
        'path' : "./assets/audio/beyonce.mp3",
        'img' : "./assets/img/lemonade.png", 
    }, 
    {
        'songAuthor' : "Dua Lipa",
        'songName' : "Don't start now",
        'path' : "./assets/audio/dontstartnow.mp3",
        'img' : "./assets/img/dontstartnow.png",
    },
]

function switchAudioInfo () {
    audio = new Audio(songs[numberSongNow]['path']);
    songAuthor.textContent = songs[numberSongNow]['songAuthor']
    songName.textContent = songs[numberSongNow]['songName']
    audio.addEventListener("loadeddata", () => {
        songLength.textContent = getTimeCodeFromNum(audio.duration)
    });
    songImgs.forEach(x =>  {
        x.src = songs[numberSongNow]['img']
    })
}

function getTimeCodeFromNum(num) {
    num = Math.round(num)
    let seconds = num % 60
    let minutes = Math.floor(num / 60) % 60
    let hours = Math.floor (num / 3600)
    return hours === 0 ? 
    `${minutes}:${('' + seconds).padStart(2, '0')}` : 
    `${hours}:${('' + minutes).padStart(2, '0')}:${('' + seconds).padStart(2, '0')}`
}

function switchPlayAudio() {
    if (!isPlay) {
        audio.play();
        isPlay = true
    } else {
        audio.pause();
        isPlay = false
    }    
}

function togglePlayBtn() {
    playBtn.classList.toggle('pause');
    switchPlayAudio()
}

function switchNumber() {
    const type = event.target.classList
    if (type.contains('next-btn')) {
        numberSongNow++
        numberSongNow %= songs.length
        return
    }
    if (type.contains('prev-btn')) {
        numberSongNow--
        if (numberSongNow < 0) numberSongNow = songs.length - 1;
        return
    }
    throw new Error('Uncknown btn')
}

function switchAudio () {
    switchNumber()
    if(isPlay)  {
        switchPlayAudio();
        switchAudioInfo ()
        switchPlayAudio()
    } else {
        switchAudioInfo ()
        togglePlayBtn ()
    }
}



switchAudioInfo ()
setInterval(() => {
    currentTime.textContent = getTimeCodeFromNum(audio.currentTime)
}, 1000)

playBtn.addEventListener('click', togglePlayBtn);
nextBtn.addEventListener('click', switchAudio);
prevBtn.addEventListener('click', switchAudio);