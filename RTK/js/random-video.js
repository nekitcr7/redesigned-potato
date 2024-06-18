document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('background-video');
    const sources = [
        'videos/lil_peep_background1.mp4', 
        'videos/lil_peep_background2.mp4'
    ];

    // Получаем предыдущее видео из localStorage
    let lastVideo = localStorage.getItem('lastVideo');
    
    // Определяем индекс для следующего видео
    let nextVideoIndex;
    if (lastVideo === sources[0]) {
        nextVideoIndex = 1;
    } else {
        nextVideoIndex = 0;
    }

    const selectedVideo = sources[nextVideoIndex];

    // Устанавливаем новое видео
    videoElement.querySelector('source').src = selectedVideo;
    videoElement.load();

    // Сохраняем текущее видео в localStorage для следующего обновления
    localStorage.setItem('lastVideo', selectedVideo);
});
