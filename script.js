const gameState = {
scoreP1: 0,
scoreP2: 0,
}

function preload()
{
  //images
  this.load.image('player1img', 'images/player1img.png'); //placeholder
  this.load.image('player2img', 'images/player2img.png'); //placeholder
  this.load.image('background', 'images/Newcourt.png');
  this.load.image('ball', 'images/Basketball2.png');
  this.load.image('Walls', 'images/Walls.png');
  this.load.image('hoop', 'images/hoop.png');
}

function create()
{
  //Setting Background
  gameState.background = this.add.image(400, 250, 'background');
  gameState.background.setScale(1.5)
  gameState.backgroundColor = "rgba(0, 0, 0, 0.30)";

  //Creating Group for Walls
const wallL = this.physics.add.staticGroup();
const wallR = this.physics.add.staticGroup();
const wallBottom = this.physics.add.staticGroup();
const wallBaseline = this.physics.add.staticGroup();

//Putting the walls into the game
wallL.create(25, 450, 'Walls').setScale(1, 100).refreshBody();
wallR.create(750, 450, 'Walls').setScale(1, 100).refreshBody();
wallBottom.create(0, 500, 'Walls').setScale(200, 1).refreshBody();
wallBaseline.create(250, 120, 'Walls').setScale(100,.5).refreshBody();


// Adding Hoop Sprite
  gameState.hoop = this.physics.add.sprite(400, 100, 'hoop')
  gameState.hoop.setScale(.5)
//Adding Player and Ball Sprite
  gameState.player1 = this.physics.add.sprite(400, 250, 'player1img');
  gameState.player2 = this.physics.add.sprite(100, 250, 'player2img');
  gameState.ball = this.physics.add.sprite(200, 200, 'ball', .5);
  gameState.ball.setScale(.075);

// Inputing Arrows
  gameState.cursors = this.input.keyboard.createCursorKeys();
//Inputing Letter Keys
  gameState.cursors.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  gameState.cursors.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  gameState.cursors.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  gameState.cursors.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  gameState.cursors.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
  gameState.cursors.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  gameState.cursors.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
  gameState.cursors.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

//Player and Wall Colliders
this.physics.add.collider(gameState.player1, wallL);
this.physics.add.collider(gameState.player2, wallL);
this.physics.add.collider(gameState.player1, wallR);
this.physics.add.collider(gameState.player2, wallR);
this.physics.add.collider(gameState.player1, wallBottom);
this.physics.add.collider(gameState.player2, wallBottom);
this.physics.add.collider(gameState.player1, gameState.ball);
this.physics.add.collider(gameState.player2, gameState.ball);
this.physics.add.collider(gameState.ball, wallBottom);
this.physics.add.collider(gameState.ball, wallL);
this.physics.add.collider(gameState.ball, wallR);
this.physics.add.collider(gameState.player1, gameState.player2);
this.physics.add.collider(gameState.player1, wallBaseline);
this.physics.add.collider(gameState.player2, wallBaseline);
//this.physics.add.collider(gameState.ball, wallBaseline);
//Ball needs to collide with a wall above the baseline

}

function update() {
  //Player 1 Movement
  if (gameState.cursors.keyA.isDown) {
    gameState.player1.setVelocityX(-160);
  } else if (gameState.cursors.keyD.isDown) {
    gameState.player1.setVelocityX(160);
  } else {
    gameState.player1.setVelocityX(0);
  };

  if (gameState.cursors.keyW.isDown) {
    gameState.player1.setVelocityY(-160);
  } else if (gameState.cursors.keyS.isDown){
    gameState.player1.setVelocityY(160);
  } else {
    gameState.player1.setVelocityY(0);
  }

  //Player 2 Movement 
  if (gameState.cursors.right.isDown) {
    gameState.player2.setVelocityX(160);
  } else if (gameState.cursors.left.isDown) {
    gameState.player2.setVelocityX(-160);
  }   else {
    gameState.player2.setVelocityX(0);
}

 if (gameState.cursors.up.isDown) {
    gameState.player2.setVelocityY(-160);
  } else if (gameState.cursors.down.isDown){
    gameState.player2.setVelocityY(160);
  } else {
    gameState.player2.setVelocityY(0);
  }

  
}

//Phaser Library
const config = 
{
  type: Phaser.AUTO,
  width: 750,
  height: 500,
  backgroundColor: '#f9f9f9',
  scene: 
  {
      preload: preload,
      create: create,
      update: update,
  },
  physics: {
  default: 'arcade',
  arcade: {
    enableBody: true,
  },
  }
};

const game = new Phaser.Game(config);