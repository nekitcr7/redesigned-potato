
document.addEventListener('DOMContentLoaded', function() {
    const audioElements = document.querySelectorAll('audio');
    const musicToggleButton = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const videoElements = document.querySelectorAll('video');
    let isPlaying = false;
    let wasPlayingBeforeHidden = false;

    function updateIcon() {
        if (isPlaying) {
            musicIcon.className = 'fas fa-volume-up';
        } else {
            musicIcon.className = 'fas fa-volume-mute';
        }
    }

    function toggleMusic() {
        audioElements.forEach(audioElement => {
            if (isPlaying) {
                audioElement.pause();
            } else {
                audioElement.play().catch(error => {
                    console.error('Error playing audio:', error);
                    alert('Could not play audio: ' + error.message);
                });
            }
        });
        isPlaying = !isPlaying;
        updateIcon();
        localStorage.setItem('isPlaying', isPlaying);
    }

    function restoreMusicState() {
        const savedState = localStorage.getItem('isPlaying');
        if (savedState === 'true') {
            isPlaying = true;
        } else {
            isPlaying = false;
        }
        updateIcon();
    }

    function userInteractionHandler() {
        restoreMusicState();
        document.removeEventListener('click', userInteractionHandler);
    }

    document.addEventListener('click', userInteractionHandler);

    musicToggleButton.addEventListener('click', toggleMusic);

    videoElements.forEach(videoElement => {
        videoElement.addEventListener('play', () => {
            if (isPlaying) {
                audioElements.forEach(audioElement => audioElement.pause());
                isPlaying = false;
                updateIcon();
            }
        });

        videoElement.addEventListener('pause', () => {
            if (wasPlayingBeforeHidden) {
                audioElements.forEach(audioElement => {
                    audioElement.play().catch(error => {
                        console.error('Error playing audio:', error);
                        alert('Could not play audio: ' + error.message);
                    });
                });
                isPlaying = true;
                updateIcon();
            }
        });

        videoElement.addEventListener('ended', () => {
            if (wasPlayingBeforeHidden) {
                audioElements.forEach(audioElement => {
                    audioElement.play().catch(error => {
                        console.error('Error playing audio:', error);
                        alert('Could not play audio: ' + error.message);
                    });
                });
                isPlaying = true;
                updateIcon();
            }
        });
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            wasPlayingBeforeHidden = isPlaying;
            audioElements.forEach(audioElement => audioElement.pause());
            isPlaying = false;
        } else if (document.visibilityState === 'visible' && wasPlayingBeforeHidden) {
            audioElements.forEach(audioElement => {
                audioElement.play().catch(error => {
                    console.error('Error playing audio:', error);
                    alert('Could not play audio: ' + error.message);
                });
            });
            isPlaying = true;
            updateIcon();
        }
    });
});