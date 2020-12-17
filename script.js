window.onload = function()
{
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.getElementById('audio-file');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music Array

const songs = [
    {
        name : '3peg',
        displayName : '3 Peg',
        artist : 'Sharry Mannn',
    },

    {
        name : 'lahore',
        displayName : 'Lahore',
        artist : 'Guru Randawa',
    },

    {
        name : 'coka',
        displayName : 'Coka',
        artist : 'Sukh - E',
    },

    {
        name : 'gf',
        displayName : 'Girlfriend',
        artist : 'Jass Manak',
    },

    {
        name : 'ishare',
        displayName : 'Ishare Tere',
        artist : 'Guru Randhawa',
    },

    {
        name : 'rang',
        displayName : 'Rang Gora',
        artist : 'Akhil',
    },

    {
        name : 'Sandal',
        displayName : 'Sandal',
        artist : 'Sunanda Sharma',
    },

    {
        name : 'shemove',
        displayName : 'She Move It',
        artist : 'Badshah',
    },

    {
        name : 'slowly',
        displayName : 'Slowly Slowly',
        artist : 'Guru Randhawa',
    },
]
// check if music is playing

let isPlaying = false;

//play the audio
function playSong()
{
    isPlaying = true;
    playBtn.classList.replace('fa-play-circle','fa-pause-circle');
    playBtn.style="color:#00cce7";
    playBtn.setAttribute('title',"Pause");
    music.play();
}
//pause
function pauseSong()
{
   
    isPlaying = false;
    playBtn.classList.replace('fa-pause-circle','fa-play-circle');
    playBtn.style="color:rgb(129, 129, 129);";
    playBtn.setAttribute('title',"Play");
    
    music.pause();
}

//load song

function loadSong(song)
{
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;

}
let songIndex = 0;
//previous song
function prevSong()
{
    songIndex--;
    if(songIndex < 0)
    {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//next song
function nextSong()
{
    songIndex++;
    if(songIndex > songs.length -1)
    {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//progress bar update
function updateProgressBar(e)
{
    if(isPlaying)
    {
        const {duration,currentTime} = e.srcElement;
        const progressPercent = (currentTime / duration)*100;
        progress.style.width = `${progressPercent}%`;
        
        //update duration

        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);


        if(durationSeconds < 10)
        {
            durationSeconds = `0${durationSeconds}`;
        }

        if(durationSeconds)
        {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        //update current time

        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);


        if(currentSeconds < 10)
        {
            currentSeconds = `0${currentSeconds}`;
        }

        if(currentSeconds)
        {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }

        
    }
}

function setProgressBar(e)
{
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    
    music.currentTime = (clickX / width) * duration;
    

}

// event listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()) );
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);

}
