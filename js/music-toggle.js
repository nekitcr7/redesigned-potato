document.addEventListener('DOMContentLoaded', function() {
    const audioElement = document.getElementById('background-audio');
    const musicToggleButton = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    let isPlaying = false;


    function updateIcon() {
        if (isPlaying) {
            musicIcon.className = 'fas fa-volume-up';
        } else {
            musicIcon.className = 'fas fa-volume-mute';
        }
    }


    musicToggleButton.addEventListener('click', function() {
        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play().catch(error => {
                console.log('Error playing audio:', error);
            });
        }
        isPlaying = !isPlaying;
        updateIcon(); 
    });

 
    updateIcon();
});
