class EscenaPrincipal extends Phaser.Scene {
  constructor() {
    super("juego");
  }

  preload() {
    this.load.image("moneda", "assets/coin.png");
    this.load.image("player", "assets/PJ1.png");
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.jugador = this.physics.add.sprite(200, 200, "player");
    this.jugador.setScale(0.2);

    this.jugador.setCollideWorldBounds(true);

    this.coin1 = this.physics.add.sprite(400, 200, "moneda");
    this.coin2 = this.physics.add.sprite(600, 200, "moneda");
    this.coin3 = this.physics.add.sprite(800, 200, "moneda");

    this.physics.add.collider(
      this.jugador,
      this.coin1,
      this.tomarMoneda,
      null,
      this,
    );
    this.physics.add.overlap(
      this.jugador,
      this.coin2,
      this.tomarMoneda,
      null,
      this,
    );
    this.physics.add.overlap(
      this.jugador,
      this.coin3,
      this.tomarMoneda,
      null,
      this,
    );

    this.coin1.setScale(0.1);
    this.coin2.setScale(0.1);
    this.coin3.setScale(0.1);

    this.coin1.body.allowGravity = false;
    this.coin2.body.allowGravity = false;
    this.coin3.body.allowGravity = false;

    this.puntaje = 0;
    this.textoPuntaje = this.add.text(20, 20, "Puntaje: 0", {
      fontSize: "20px",
      color: "#ffffff",
    });
  }

  tomarMoneda(jugador, moneda) {
    moneda.destroy();

    this.puntaje++;
    this.textoPuntaje.setText("Puntaje: " + this.puntaje);
  }

  update() {
    const speed = 400;
    this.jugador.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.jugador.setVelocityX(-speed);
    }

    if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(speed);
    }

    if (this.cursors.up.isDown) {
      this.jugador.setVelocityY(-speed);
    }

    if (this.cursors.down.isDown) {
      this.jugador.setVelocityY(speed);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1900,
  height: 900,
  backgroundColor: "rgb(133, 80, 80)",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: EscenaPrincipal,
};

const game = new Phaser.Game(config);
