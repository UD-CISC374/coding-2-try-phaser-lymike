import MainScene from "./mainScene";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "src/assets/images/background.jpg");
    this.load.image("enemy1", "src/assets/images/enemy1.png");
    this.load.spritesheet("player", "src/assets/images/player.png", {
      frameWidth: 64,
      frameHeight: 96
    });
    this.load.image("ground", "src/assets/images/ground.png");
    this.load.spritesheet("enemy2", "src/assets/images/enemy2.png", {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet("enemy3", "src/assets/images/enemy3.png", {
      frameWidth: 394,
      frameHeight: 404 
    });
  }

  create() {
    this.scene.start('MainScene');
  }
}
