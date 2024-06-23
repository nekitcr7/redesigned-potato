document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('background-video');
    const sources = [
        'videos/lil_peep_background1.mp4', 
        'videos/lil_peep_background2.mp4'
    ];

  
    let lastVideo = localStorage.getItem('lastVideo');
    
    let nextVideoIndex;
    if (lastVideo === sources[0]) {
        nextVideoIndex = 1;
    } else {
        nextVideoIndex = 0;
    }

    const selectedVideo = sources[nextVideoIndex];

    videoElement.querySelector('source').src = selectedVideo;
    videoElement.load();

    localStorage.setItem('lastVideo', selectedVideo);
});
