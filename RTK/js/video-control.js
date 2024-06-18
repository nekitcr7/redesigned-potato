document.addEventListener('DOMContentLoaded', function() {
    const audioElement = document.getElementById('background-audio');
    const musicToggleButton = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const videos = document.querySelectorAll('video');
    let isPlaying = false;
    let wasPlayingBeforeVideo = false; // Переменная для отслеживания, играла ли музыка до воспроизведения видео

    // Функция для переключения состояния воспроизведения музыки
    function toggleMusic() {
        if (isPlaying) {
            audioElement.pause();
            musicIcon.classList.remove('fa-volume-up');
            musicIcon.classList.add('fa-volume-mute');
        } else {
            audioElement.play().catch(error => console.log('Error playing audio:', error));
            musicIcon.classList.remove('fa-volume-mute');
            musicIcon.classList.add('fa-volume-up');
        }
        isPlaying = !isPlaying;
    }

    // Обработчик нажатия на кнопку музыки
    musicToggleButton.addEventListener('click', toggleMusic);

    // Обработчики событий для каждого видео
    videos.forEach(video => {
        // Когда видео начинает воспроизведение
        video.addEventListener('play', () => {
            if (isPlaying) {
                wasPlayingBeforeVideo = true;
                audioElement.pause();
                musicIcon.classList.remove('fa-volume-up');
                musicIcon.classList.add('fa-volume-mute');
            } else {
                wasPlayingBeforeVideo = false;
            }
        });

        // Когда видео приостанавливается
        video.addEventListener('pause', () => {
            if (wasPlayingBeforeVideo) {
                audioElement.play().catch(error => console.log('Error playing audio:', error));
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-up');
            }
        });

        // Когда видео заканчивается
        video.addEventListener('ended', () => {
            if (wasPlayingBeforeVideo) {
                audioElement.play().catch(error => console.log('Error playing audio:', error));
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-up');
            }
        });
    });
});
