const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();
localTetris.element.classList.add('local');
localTetris.run();
const connectionManager = new ConnectionManager(tetrisManager);
// const url = location.origin.replace(/^https/, 'ws');
connectionManager.connect('wss://detrisbvsackend.herokuapp.com/');
// connectionManager.connect(url);
const keyListener = (event) => {
  [
    [65, 68, 81, 69, 83],
    [72, 75, 89, 73, 74],
  ].forEach((key, index) => {
    const player = localTetris.player;
    if (event.type === 'keydown') {
      if (event.keyCode === key[0]) {
        player.move(-1);
      } else if (event.keyCode === key[1]) {
        player.move(1);
      } else if (event.keyCode === key[2]) {
        player.rotate(-1);
      } else if (event.keyCode === key[3]) {
        player.rotate(1);
      }
    }
    if (event.keyCode === key[4]) {
      if (event.type === 'keydown') {
        if (player.dropInterval !== player.DROP_FAST) {
          player.drop();
          player.dropInterval = player.DROP_FAST;
        }
      } else {
        player.dropInterval = player.DROP_SLOW; //!drop fast/slow seems unnecessary
      }
    }
  });
};
document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);
document.addEventListener('touchstart', (e) => {
  const player = localTetris.player;
  const localArena = document.querySelector('.player.local');
  if (e.touches[0].clientX > localArena.getBoundingClientRect().left + localArena.clientWidth * 0.7 && e.touches[0].clientY < window.innerHeight * 0.8) {
    player.move(1);
  }
  else if (e.touches[0].clientX > window.innerWidth * 0.7 && e.touches[0].clientY >= window.innerHeight * 0.8) {
    player.rotate(1);
  }
  else if (e.touches[0].clientX < localArena.getBoundingClientRect().left + localArena.clientWidth * 0.3 && e.touches[0].clientY < window.innerHeight * 0.8) {
    player.move(-1);
  }
  else if (e.touches[0].clientX < window.innerWidth * 0.3 && e.touches[0].clientY >= window.innerHeight * 0.8) {
    player.rotate(-1);
  } else if(e.touches[0].clientY > window.innerHeight * 0.7){
    player.drop();
  }e
})


function isMobile(){
  // credit to Timothy Huang for this regex test: 
  // https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      return true
 }
 else{
      return false
 }
}


if (!isMobile()) {
  alert()
  document.addEventListener('mousedown', (e) => {
  e.preventDefault();
  const localArena = document.querySelector('.player.local');
  console.log(localArena.getBoundingClientRect().left, localArena.clientWidth)
  const player = localTetris.player;
  if (e.clientX > localArena.getBoundingClientRect().left + localArena.clientWidth * 0.7 && e.clientY < window.innerHeight * 0.8) {
    player.move(1);
  }
  else if (e.clientX > window.innerWidth * 0.7 && e.clientY >= window.innerHeight * 0.8) {
    player.rotate(1);
  }
  else if (e.clientX < localArena.getBoundingClientRect().left + localArena.clientWidth * 0.3 && e.clientY < window.innerHeight * 0.8) {
    player.move(-1);
  }
  else if (e.clientX < window.innerWidth * 0.3 && e.clientY >= window.innerHeight * 0.8) {
    player.rotate(-1);
  } else if(e.clientY > window.innerHeight * 0.7){
    player.drop();
  }
})
}


//mouse Controls- able to jump over pieces

// let mousePos = { x: 0, y: 0 };
// localTetris.canvas.addEventListener("mousemove", (e) => {
//   mousePos.x = Math.round(e.offsetX / 40) - 1;
//   if (mousePos.x > -2 && mousePos.x <= localTetris.arena.matrix.length - 10) {
//     if (!localTetris.arena.collide(localTetris.player)) {
//       let lastPos = localTetris.player.pos.x;
//       localTetris.player.pos.x = mousePos.x;
//       if (localTetris.arena.collide(localTetris.player)) {
//         localTetris.player.pos.x = lastPos;
//       }
//     }
//   }
// });
// localTetris.canvas.addEventListener("mousedown", function (e) {
//   e.preventDefault();
//   if (e.button === 0) {
//     localTetris.player.rotate(1);
//   } else {
//     localTetris.player.drop();
//   }
// });
