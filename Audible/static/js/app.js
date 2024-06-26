const close=document.querySelector('.close');
const Profile=document.querySelector('.profile');
const Notes=document.querySelector('.take-note');
const NoteBrowse=document.querySelector('.browse-note');
const Dashboard=document.querySelector('.files-display');
const Files=document.querySelector('.downloads');
const PlayDisplay=document.querySelector('.mid-panel');
const Chapters=document.querySelector('.right-panel');
const Menu=document.querySelector('.left-panel');


close.onclick=()=>{document.querySelector('.settings').style.display='none';}
Profile.onclick=()=>{document.querySelector('.settings').style.display='flex';}

document.addEventListener('DOMContentLoaded', () => {
    // darkMode
    const darkMode = document.getElementById('darkMode');
    const BtnToggle = document.getElementById('darkToggle');
    
    // Function to update the mode and save it to local storage
    function updateMode(isDarkMode) {
        const toggle=document.body.classList.toggle('dark', isDarkMode);
        const dark = toggle ? BtnToggle.innerHTML='<i class="fa fa-lightbulb text-dark"></i>' : BtnToggle.innerHTML='<i class="fa fa-moon"></i>';
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    }

    // Event listener for dark mode toggle
    darkMode.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark');
        updateMode(isDarkMode);
    });
    
    // On page load, apply the saved mode
    window.addEventListener('load', () => {
        const savedMode = localStorage.getItem('darkMode');
        const isDarkMode = savedMode === 'enabled';
        updateMode(isDarkMode);
    });
    
    
    // Playing controls 
    // Audio play
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const backwardBtn = document.getElementById('backward');
    const forwardBtn = document.getElementById('forward');
    const seekBar = document.getElementById('seek-bar');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    const volumeBar = document.getElementById('volume-bar');
    const speedSelect = document.getElementById('speed');

    // const playlist = ['MOGmusic-Elohim.mp3', 'file.mp3', 'audio3.mp3'];
    // let currentTrackIndex = 0;

    // audio.src = playlist[currentTrackIndex];

    // playPauseBtn.addEventListener('click', () => {
    //     if (audio.paused) {
    //         audio.play();
    //         playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    //     } else {
    //         audio.pause();
    //         playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    //     }
    // });

    // prevBtn.addEventListener('click', () => {
    //     currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    //     audio.src = playlist[currentTrackIndex];
    //     audio.play();
    //     playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    // });

    // nextBtn.addEventListener('click', () => {
    //     currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    //     audio.src = playlist[currentTrackIndex];
    //     audio.play();
    //     playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    // });

    backwardBtn.addEventListener('click', () => {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    });

    forwardBtn.addEventListener('click', () => {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    });

    audio.addEventListener('timeupdate', () => {
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        const durationMinutes = Math.floor(audio.duration / 60);
        const durationSeconds = Math.floor(audio.duration % 60);

        currentTimeSpan.textContent = `${String(currentMinutes).padStart(2, '0')}:${String(currentSeconds).padStart(2, '0')}`;
        durationSpan.textContent = `${String(durationMinutes).padStart(2, '0')}:${String(durationSeconds).padStart(2, '0')}`;
        seekBar.value = (audio.currentTime / audio.duration) * 100;
    });

    seekBar.addEventListener('input', () => {
        audio.currentTime = (seekBar.value / 100) * audio.duration;
    });

    audio.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = `${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60).toString().padStart(2, '0')}`;
    });

    audio.addEventListener('ended', () => {
        nextBtn.click();
    });

    volumeBar.addEventListener('input', () => {
        audio.volume = volumeBar.value / 100;
    });

    speedSelect.addEventListener('change', () => {
        audio.playbackRate = speedSelect.value;
    });

    // fontSize increase and Decrease

    let font=20;
    const Increase=document.getElementById('increase');
    const Value=document.getElementById('value');
    const Decrease=document.getElementById('decrease');
    Value.textContent=font;
    const textDisplay=document.getElementById('exT');
    Increase.addEventListener('click',()=>{
        font+=1;
        Value.textContent=font;
        textDisplay.style.fontSize=font+'px';
    });
    Decrease.addEventListener('click',()=>{
        font-=1;
        Value.textContent=font;
        textDisplay.style.fontSize=font+'px';
    });

    if (window.innerWidth>900) {
        Menu.classList.add('active');
        Files.classList.add('active');
    };

    // Chart.js initialization
    const yValues = [0,10,40,34,50,19,66,78,23,90,100];
    const xValues = ['M','T','W','T','F','S','S'];
    
    new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
            label:'Weekly Usage',
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(255, 0, 0,1.0)",
          borderColor: "rgba(255,0,0,0.5)",
          data: yValues
        }]
      },
      options: {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    pointStyle: 'line'
                }
            }
        },
        scales: {
          x: {
            grid: {
                display: false
            },
            ticks: {
                font: {
                    size: 10 // Adjust the size as needed
                }
            }
        },
        y: {
            grid: {
                display: false
            },
            beginAtZero: true,
            ticks: {
                font: {
                    size: 10 // Adjust the size as needed
                }
            }
        }
        }
      }
    });
    

});


function getNote() {
    if (window.innerWidth>900) {
        Notes.classList.add('active');
        NoteBrowse.classList.add('active');
        Dashboard.classList.remove('active');
        Files.classList.remove('active');
        PlayDisplay.classList.remove('active');
        Chapters.classList.remove('active');

    } else {
        Notes.classList.add('active');
        NoteBrowse.classList.remove('active');
        Menu.classList.remove('active');
        Dashboard.classList.remove('active');
        Files.classList.remove('active');
        PlayDisplay.classList.remove('active');
        Chapters.classList.remove('active');
    }
};

function Back() {
    if (window.innerWidth<=900) {
        Menu.classList.add('active');
        Notes.classList.remove('active');
        NoteBrowse.classList.remove('active');
        Dashboard.classList.remove('active');
        Files.classList.remove('active');
        PlayDisplay.classList.remove('active');
        Chapters.classList.remove('active');

    }
};



function getDashboard() {
    if (window.innerWidth>900) {
        Notes.classList.remove('active');
        NoteBrowse.classList.remove('active');
        Dashboard.classList.add('active');
        Files.classList.add('active');
        PlayDisplay.classList.remove('active');
        Chapters.classList.remove('active');

    } else {
        Notes.classList.remove('active');
        NoteBrowse.classList.remove('active');
        Dashboard.classList.add('active');
        Files.classList.remove('active');
        PlayDisplay.classList.remove('active');
        Chapters.classList.remove('active');
        Menu.classList.remove('active');
    }
};

function getPlaying() {
    if (window.innerWidth>900) {
        Notes.classList.remove('active');
        NoteBrowse.classList.remove('active');
        Dashboard.classList.remove('active');
        Files.classList.remove('active');
        PlayDisplay.classList.add('active');
        Chapters.classList.add('active');
        

    } else {
        Notes.classList.remove('active');
        NoteBrowse.classList.remove('active');
        Dashboard.classList.remove('active');
        Files.classList.remove('active');
        PlayDisplay.classList.add('active');
        Chapters.classList.remove('active');
        Menu.classList.remove('active');
       }
};
function getChapters() {
    if (window.innerWidth>900) {
        console.log('nothing executed');
    } else {
        Notes.classList.remove('active');
        NoteBrowse.classList.remove('active');
        Dashboard.classList.remove('active');
        Files.classList.remove('active');
        PlayDisplay.classList.remove('active');
        Chapters.classList.add('active');
        Menu.classList.remove('active');
       }
};
function getFiles() {
    if (window.innerWidth>900) {
        console.log('nothing executed');
    } else {
        Notes.classList.remove('active');
        NoteBrowse.classList.remove('active');
        Dashboard.classList.remove('active');
        Files.classList.add('active');
        PlayDisplay.classList.remove('active');
        Chapters.classList.remove('active');
        Menu.classList.remove('active');
       }
};
function getBrowsenote() {
    if (window.innerWidth>900) {
        console.log('nothing executed');
    } else {
        Notes.classList.remove('active');
        NoteBrowse.classList.add('active');
        Dashboard.classList.remove('active');
        Files.classList.remove('active');
        PlayDisplay.classList.remove('active');
        Chapters.classList.remove('active');
        Menu.classList.remove('active');
       }
};

function getMenu() {
    if (window.innerWidth<=900) {
        Menu.classList.add('active');
        Dashboard.classList.remove('active');
    };
};


function save() {
    const notepad=document.getElementById('notepad');
    const disable=notepad.attributes.getNamedItem('disabled');
    // console.log(disable);
    // notepad.setAttribute(disable,'disabled')
}
