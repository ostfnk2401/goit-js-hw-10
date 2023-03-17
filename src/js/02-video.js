import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerElement = document.getElementById('vimeo-player');
const player = new Player(playerElement);

player.on('timeupdate', throttle(() => {
  const currentTime = Math.floor(player.getCurrentTime().then(function(seconds){
    localStorage.setItem('videoplayer-current-time', seconds);
  }).catch(function(error) {
    console.log(error);
  }))
}, 1000));

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(savedTime);
}

