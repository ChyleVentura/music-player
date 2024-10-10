const song = new Audio()

const songs = [
    {
        path:'media/Eminem - Somebody Save Me (feat. Jelly Roll) [Official Music Video].mp3',
        title:'Somebody Save Me',
        artist:'Eminem feat. Jelly Roll',
        img:'url(imgs/1900x1900-000000-80-0-0.jpg)'
    },
    {
        path:'media/Air Supply - All Out Of Love (Lyrics).mp3',
        title:'All Out Of Love',
        artist:'Airsupply',
        img:'url(imgs/airsupply.jpg)'
    },
    {
        path:'media/DAB (Leaked interlude).mp3',
        title:'DAB (Leaked interlude)',
        artist:'HELLMERRY',
        img:'url(imgs/hellmerry.png)'
    }
]


const songProgress = document.getElementById("song-progress")
const image = document.querySelector('.music-player')
const progressBar = document.getElementById("progress")
const control = document.getElementById("playpause")
const currentSongTime = document.querySelector(".current-time")
const songDuration = document.querySelector(".duration")
const forward = document.getElementById("forward")
const backward = document.getElementById('backward')
const volume = document.getElementById('volume')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const title = document.querySelector('.music-title')
const artist = document.querySelector('.music-artist')
const body = document.querySelector('body')

let songIndex = 0
let isPlaying = false

togglePlay = () =>{
    if(isPlaying){
        pause()
    }else{
        play()
    }
}

play =()=>{
    isPlaying = true
    control.classList.replace('fa-play','fa-pause')
    song.play()
}

pause =()=>{
    isPlaying = false
    control.classList.replace('fa-pause','fa-play')
    song.pause()
}

getSong = (music) =>{
    song.src = music.path
    title.textContent = music.title
    artist.textContent = music.artist
    image.style.backgroundImage = music.img
    body.style.backgroundImage = music.img
}

song.onloadedmetadata =()=>{
    songProgress.max= song.duration
    songProgress.value = song.currentTime
    let min = "0" + Math.floor(song.duration / 60)
    let sec = "0" + Math.floor(song.duration % 60)

    let dur = min.substr(-2) + ":" + sec.substr(-2)
    songDuration.textContent = dur
}

changeMusic = (direction) => {
    
    if(direction === -1 && song.currentTime >= 3){
        song.currentTime = 0
    }else{
        image.classList.add('fadeIn')
        songIndex += direction
        getSong(songs[songIndex])
        play()
        image.addEventListener('animationend', ()=>{ image.classList.remove('fadeIn')})
    }
}        

setVolume = () => {
    song.volume = (volume.valueAsNumber/100) 
}

adjustTime = (direction) =>{
    song.currentTime = (song.currentTime + direction)
}

setProgressBar = (e) =>{
    const width = songProgress.clientWidth;
    const clickX = e.offsetX;
    song.currentTime = (clickX/width) * song.duration
}

updateProgressBar = () =>{
    songProgress.max= song.duration
    songProgress.value = song.currentTime
    let min = "0" + Math.floor(song.currentTime / 60)
    let sec = "0" + Math.floor(song.currentTime % 60)

    let dur = min.substr(-2) + ":" + sec.substr(-2)
    currentSongTime.textContent = dur
    progressBar.style.width = ((song.currentTime/song.duration)*100+"%")
}
control.addEventListener('click', togglePlay)
songProgress.addEventListener('click', setProgressBar)
prevBtn.addEventListener('click', ()=>changeMusic(-1))
nextBtn.addEventListener('click', ()=>changeMusic(1))
songProgress.addEventListener('drag', setProgressBar)
song.addEventListener('timeupdate', updateProgressBar)
forward.addEventListener('click', ()=> adjustTime(+10))
backward.addEventListener('click',()=> adjustTime(-10))
volume.onchange = () =>{setVolume()}

document.body.onkeyup = (e) =>{
    if(e.keyCode == 32){
        playPause()
    }else if (e.keyCode === 39){
        adjustTime(+10)
    }else if(e.keyCode ===37){
        adjustTime(-10)
    }
}

getSong(songs[songIndex])