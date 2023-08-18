
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player('vimeo-player');

const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime) {
  vimeoPlayer.setCurrentTime(parseFloat(savedTime));
}
const updateSavedTime = throttle(async () => {
  const currentTime = await vimeoPlayer.getCurrentTime();
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

vimeoPlayer.on('timeupdate', updateSavedTime);