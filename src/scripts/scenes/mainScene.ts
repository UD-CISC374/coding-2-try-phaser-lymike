import ExampleObject from '../objects/exampleObject';
import PreloadScene from './preloadScene';
import Score from '../score';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  //background: Phaser.GameObjects.Image;
  background: Phaser.GameObjects.TileSprite;
  enemy1: Phaser.GameObjects.Image;
  enemy2: Phaser.GameObjects.Sprite;
  enemy3: Phaser.GameObjects.Sprite;
  player: Phaser.GameObjects.Sprite;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  scoreText: Phaser.GameObjects.Text;
  gameOverText: Phaser.GameObjects.Text;
  highScoreText: Phaser.GameObjects.Text;
  score: number;
  gameOver: boolean;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.exampleObject = new ExampleObject(this, 0, 0);

    this.gameOver = false;

    var ground = this.physics.add.staticGroup();
    ground.create(640, 664, "ground");
    
    this.background = this.add.tileSprite(0, 0, 1280, 720, "background");
    this.background.setOrigin(0, 0);

    this.score = 0;
    this.scoreText = this.add.text(40, 40, "SCORE: 0", {
      font: "25px Arial",
      fill: "Red"
    });

    this.highScoreText = this.add.text(600, 40, "HIGH SCORE: " + Score.bestScore, {
      font: "25px Arial",
      fill: "Red"
    });

    this.gameOverText = this.add.text(640, 360, "GAME OVER", {
      font: "40px Arial",
      fill: "Black"
    });
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.visible = false;

    this.enemy1 = this.physics.add.image(1280, 560, "enemy1");
    this.enemy1.setScale(0.25);

    this.player = this.physics.add.sprite(200, 560, "player"); 
    this.anims.create({
      key: "player_anim",
      frames: this.anims.generateFrameNumbers("player", {start: 0, end: 7}),
      frameRate: 10,
      repeat: -1
    });
    this.player.play("player_anim");

    this.enemy2 = this.physics.add.sprite(1080, 560, "enemy2");
    this.enemy2.setScale(0.5);
    this.anims.create({
      key: "enemy2_anim",
      frames: this.anims.generateFrameNumbers("enemy2", {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });
    this.enemy2.play("enemy2_anim");

    this.enemy3 = this.physics.add.sprite(1180, 560, "enemy3");
    this.enemy3.setScale(0.25);
    this.anims.create({
      key: "enemy3_anim",
      frames: this.anims.generateFrameNumbers("enemy3", {start: 0, end: 7}),
      frameRate: 10,
      repeat: -1
    });
    this.enemy3.play("enemy3_anim");

    this.physics.add.collider(this.player, ground); // Collsion with the ground, so that player doesn't go below it
    this.physics.add.collider(this.enemy1, ground);
    this.physics.add.collider(this.enemy2, ground);
    this.physics.add.collider(this.enemy3, ground);
    
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.player, this.enemy1, this.hitEnemy, undefined, this);
    this.physics.add.collider(this.player, this.enemy2, this.hitEnemy, undefined, this);
    this.physics.add.collider(this.player, this.enemy3, this.hitEnemy, undefined, this);
  }

  hitEnemy(player, enemy) {
    if (this.score > Score.bestScore) {
      Score.bestScore = this.score;
    }
    this.scene.restart();
  }

  moveEnemy(enemy, speed) {
    enemy.x += speed;
    if (enemy.x < 0) {
      this.resetEnemyPos(enemy);
    }
  }

  resetEnemyPos(enemy) { //Reset back to its orignal position
    enemy.x = 1280;
    enemy.y = 560;
  }

  updateScore(scoretxt, pts) {
    this.score += pts;
    scoretxt.setText("SCORE: " + this.score);
  }

  update() {
    
    this.moveEnemy(this.enemy1, -5);
    this.moveEnemy(this.enemy2, -7);
    this.moveEnemy(this.enemy3, -3);
    
    this.updateScore(this.scoreText, 1);
    
    this.background.tilePositionX -= 1;

    if (this.cursorKeys.space?.isDown) { //Jump if space is pressed
      this.player.y -= 10;
    }
    

  }
}
