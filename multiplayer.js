// Component to handle the Grappling Hook logic
AFRAME.registerComponent('grapple-point', {
  init: function () {
    const el = this.el;
    const player = document.querySelector('#player-rig');

    el.addEventListener('click', function () {
      // Set the target position to the block's world position
      const targetPos = el.object3D.position;
      player.emit('start-grapple', { target: targetPos });
      
      // Visual feedback
      el.setAttribute('color', 'cyan');
      setTimeout(() => el.setAttribute('color', 'gold'), 500);
    });
  }
});

// Component to move the player toward the target
AFRAME.registerComponent('physics-engine', {
  init: function() {
    this.target = new THREE.Vector3();
    this.isMoving = false;
    this.speed = 0.15; // Adjustment for pull speed

    this.el.addEventListener('start-grapple', (evt) => {
      this.target.copy(evt.detail.target);
      this.isMoving = true;
    });
  },
  tick: function() {
    if (!this.isMoving) return;
    
    let currentPos = this.el.object3D.position;
    currentPos.lerp(this.target, this.speed);

    if (currentPos.distanceTo(this.target) < 0.3) {
      this.isMoving = false;
    }
  }
});

// Attach the engine to the rig
document.querySelector('#player-rig').setAttribute('physics-engine', '');
