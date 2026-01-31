AFRAME.registerComponent('grapple-point', {
  init: function () {
    this.el.addEventListener('click', () => {
      document.querySelector('#player-rig').emit('pull', { pos: this.el.object3D.position });
    });
  }
});

AFRAME.registerComponent('physics-engine', {
  init: function() {
    this.target = new THREE.Vector3();
    this.moving = false;
    this.el.addEventListener('pull', (e) => {
      this.target.copy(e.detail.pos);
      this.moving = true;
    });
  },
  tick: function() {
    if (!this.moving) return;
    this.el.object3D.position.lerp(this.target, 0.1);
    if (this.el.object3D.position.distanceTo(this.target) < 0.5) this.moving = false;
  }
});
