function onYouTubeIframeAPIReady() {
    // Идентификаторы видео YouTube
    const videos = {
        player1: 'rV0UwlwYTh0', // World Away
        player2: 'kZRgD-_fjVs', // Awful Things
        player3: 'ikKyxA_KOU8'  // Save That Shit
    };

    // Функция для создания YouTube плеера
    function createPlayer(playerId, videoId) {
        return new YT.Player(playerId, {
            height: '315',
            width: '560',
            videoId: videoId,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // Создаем плееры для каждого видео
    Object.keys(videos).forEach(playerId => {
        createPlayer(playerId, videos[playerId]);
    });
}

// Эта функция запускается, когда видео готово к воспроизведению
function onPlayerReady(event) {
    // Видео начинает воспроизводиться, как только плеер готов
    // event.target.playVideo();
}

// Эта функция вызывается при изменении состояния видео
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        alert('Video has ended.');
    }
}
