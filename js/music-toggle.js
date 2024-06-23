document.addEventListener('DOMContentLoaded', function() {
    const audioElement = document.getElementById('background-audio');
    const musicToggleButton = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const videoPlayers = document.querySelectorAll('video[controls]'); 
    let isPlaying = false;

    function updateIcon() {
        if (isPlaying) {
            musicIcon.className = 'fas fa-volume-up';
        } else {
            musicIcon.className = 'fas fa-volume-mute';
        }
    }

    function toggleMusic() {
        if (isPlaying) {
            audioElement.pause();
            isPlaying = false;
        } else {
            audioElement.play().catch(error => {
                console.log('Error playing audio:', error);
            });
            isPlaying = true;
        }
        updateIcon();
        sessionStorage.setItem('isPlaying', isPlaying);
    }

    function restoreMusicState() {
        const savedState = sessionStorage.getItem('isPlaying');
        if (savedState === 'true') {
            isPlaying = true;
            audioElement.play().catch(error => {
                console.log('Error playing audio:', error);
            });
        } else {
            isPlaying = false;
        }
        updateIcon();
    }

    function pauseMusic() {
        if (isPlaying) {
            audioElement.pause();
        }
    }

    function resumeMusic() {
        if (sessionStorage.getItem('isPlaying') === 'true') {
            audioElement.play().catch(error => {
                console.log('Error playing audio:', error);
            });
        }
    }

    musicToggleButton.addEventListener('click', toggleMusic);
    videoPlayers.forEach(videoPlayer => {
        videoPlayer.addEventListener('play', pauseMusic);
        videoPlayer.addEventListener('pause', resumeMusic);
    });

    restoreMusicState();
});
