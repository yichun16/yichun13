document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('myAudio');
    const playButton = document.getElementById('playButton');
    const playIcon = playButton.querySelector('.play-icon');
    const progressBar = document.getElementById('progressBar');
    const volumeControl = document.getElementById('volumeControl');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');

    // 添加错误处理
    audio.addEventListener('error', (e) => {
        console.error('音频加载错误:', e);
        alert('音频加载失败，请检查文件路径是否正确');
    });

    // 添加加载状态检查
    audio.addEventListener('loadeddata', () => {
        console.log('音频加载成功');
        console.log('音频时长:', audio.duration);
        console.log('音频就绪状态:', audio.readyState);
    });

    // 播放/暂停控制
    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playIcon.textContent = '⏸';
        } else {
            audio.pause();
            playIcon.textContent = '▶';
        }
    });

    // 更新进度条和时间显示
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        currentTimeSpan.textContent = formatTime(audio.currentTime);
    });

    // 加载完成后显示总时长
    audio.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(audio.duration);
        progressBar.max = 100;
    });

    // 进度条控制
    progressBar.addEventListener('input', () => {
        const time = (progressBar.value / 100) * audio.duration;
        audio.currentTime = time;
    });

    // 音量控制
    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value;
    });

    // 时间格式化函数
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}); 