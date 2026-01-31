const app = {
  start: function(mode) {
    document.getElementById('title-screen').style.display = 'none';
    const scene = document.getElementById('gameScene');
    scene.style.opacity = "1"; // Fade scene in
    
    if(mode === 'bot') this.spawnBot();
  },
  spawnBot: function() {
    console.log("Bot competitor active");
    // Bot movement logic goes here
  }
};
