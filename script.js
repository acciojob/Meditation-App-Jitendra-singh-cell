//your JS code here. If required.
// Get references to DOM elements
const app = document.getElementById('app');
const video = document.getElementById('video');
const playButton = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');
const soundPicker = document.querySelectorAll('.sound-picker button');
const timeButtons = document.querySelectorAll('.time-select button');

// Audio elements for different sounds
const beachSound = new Audio('Sounds/beach.mp3');
const rainSound = new Audio('Sounds/rain.mp3');
let currentSound = beachSound;

// Time variables
let duration = 600; // 10 minutes default
let isPlaying = false;
let interval;

// Update time display
function updateTimeDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Play/Pause video and audio
function togglePlay() {
    if (isPlaying) {
        video.pause();
        currentSound.pause();
        clearInterval(interval);
    } else {
        video.play();
        currentSound.play();
        interval = setInterval(countDown, 1000);
    }
    isPlaying = !isPlaying;
    playButton.textContent = isPlaying ? 'Pause' : 'Play';
}

// Countdown for meditation time
function countDown() {
    if (duration > 0) {
        duration--;
        updateTimeDisplay(duration);
    } else {
        video.pause();
        currentSound.pause();
        clearInterval(interval);
        playButton.textContent = 'Play';
        isPlaying = false;
    }
}

// Switch sound and video
soundPicker.forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.id;
        currentSound.pause();
        video.pause();
        clearInterval(interval);
        isPlaying = false;
        playButton.textContent = 'Play';

        if (id === 'beach-sound') {
            video.src = 'Videos/beach.mp4';
            currentSound = beachSound;
        } else if (id === 'rain-sound') {
            video.src = 'Videos/rain.mp4';
            currentSound = rainSound;
        }

        // Reset the timer
        duration = 600;
        updateTimeDisplay(duration);
    });
});

// Time selection buttons
timeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.id;
        if (id === 'smaller-mins') {
            duration = 120;
        } else if (id === 'medium-mins') {
            duration = 300;
        } else if (id === 'long-mins') {
            duration = 600;
        }
        updateTimeDisplay(duration);
    });
});

// Play button click event
playButton.addEventListener('click', togglePlay);

// Initial time display setup
updateTim
