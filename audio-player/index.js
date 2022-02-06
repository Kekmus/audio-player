const playBtn = document.querySelector('.play-btn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const songAuthor = document.querySelector('.song-author');
const songName = document.querySelector('.song-name');
const songImgs = document.querySelectorAll('.song-img');
const songLength = document.querySelector(".length-time");
const currentTime = document.querySelector(".current-time");
const progressBar = document.querySelector(".progress");
const timeline = document.querySelector(".timeline");
let audio;
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

function switchNumber(direction) {
    if (direction === 'next') {
        numberSongNow++
        numberSongNow %= songs.length
        return
    }
    if (direction === 'prev') {
        numberSongNow--
        if (numberSongNow < 0) numberSongNow = songs.length - 1;
        return
    }
    throw new Error('Uncknown directionб available directions: next, prev')
}

function switchAudio (event) {
    const direction = getSwitchDirection(event)
    switchNumber(direction)
    if(isPlay)  {
        switchPlayAudio();
        switchAudioInfo ()
        switchPlayAudio()
    } else {
        switchAudioInfo ()
        togglePlayBtn ()
    }
}

function getSwitchDirection(event) {
    if(typeof event == 'string') {
        return event
    }
    if (event.target.classList.contains('next-btn')) return 'next';
    if (event.target.classList.contains('prev-btn')) return 'prev';
}

function changeTime () {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = event.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}

function keyСontrol (x) {
    code = x.code
    console.log(1)
    switch (code) {
        case 'ArrowRight':
            switchAudio('next')
            break
        case 'ArrowLeft':
            switchAudio('prev')
            break
    }
}


switchAudioInfo ()
timeline.addEventListener("click", changeTime, false);
playBtn.addEventListener('click', togglePlayBtn);
nextBtn.addEventListener('click', switchAudio);
prevBtn.addEventListener('click', switchAudio);
document.addEventListener('keydown', keyСontrol)

setInterval(() => {
    progressBar.style.width = audio.currentTime / audio.duration * 100 + '%'
    currentTime.textContent = getTimeCodeFromNum(audio.currentTime)
    if (audio.currentTime === audio.duration) switchAudio('next');
}, 500)