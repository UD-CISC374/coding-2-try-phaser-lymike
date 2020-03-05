import MainScene from "./mainScene";

export default class PreloadScene extends Phaser.Scene {
  play_button: Phaser.GameObjects.Image;
  background: Phaser.GameObjects.Image;

  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/images/background.jpg");
    this.load.image("play-button", "assets/images/play_button.png");
    this.load.image("enemy1", "assets/images/enemy1.png");
    this.load.spritesheet("player", "assets/images/player.png", {
      frameWidth: 64,
      frameHeight: 96
    });
    this.load.image("ground", "assets/images/ground.png");
    this.load.spritesheet("enemy2", "assets/images/enemy2.png", {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet("enemy3", "assets/images/enemy3.png", {
      frameWidth: 394,
      frameHeight: 404 
    });
  }

  create() {

    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    this.play_button = this.add.image(0, 0, "play-button");
    this.play_button.x = this.cameras.main.centerX;
    this.play_button.y = this.cameras.main.centerY;
    this.play_button.setInteractive();

    this.play_button.on("pointerup", () => { //Game starts when play button is clicked.
      this.scene.start("MainScene");
    });

    this.play_button.on("pointerover", () => {
      this.play_button.setRotation(0.2);
    });

    this.play_button.on("pointerout", () => {
      this.play_button.setRotation(0);
    });

    //this.scene.start('MainScene');
  }
}
