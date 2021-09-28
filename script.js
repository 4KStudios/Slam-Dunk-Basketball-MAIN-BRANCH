var gameScene = new Phaser.Scene('game');
var titleScene = new Phaser.Scene('title');

const titleState = {

}

titleScene.preload = function(){
  this.load.image('titlescreen', 'images/MAINMENU.gif');
  this.load.image('startbutton', 'images/startbutton.gif');
}

titleScene.create = function(){
  var bg = this.add.image(400,250,'titlescreen').setScale(5);
  titleState.startbutton = this.add.sprite(375, 410, 'startbutton').setScale(5);
  titleState.startbutton.setInteractive();

  titleState.startbutton.once('pointerdown', function (pointer) {
      game.scene.start('game');
    }, this);
}

const gameState = {
  scoreP1: 0,
  scoreP2: 0,
}
gameState.spawnBallP2 = function(){
  gameState.player1.setPosition(400,375);
  gameState.player2.setPosition(400,400);
}
gameState.spawnBallP1 = function(){
  gameState.player2.setPosition(400,375);
  gameState.player1.setPosition(400,400);
}

gameScene.preload = function()
{
  //images
    this.load.image('player1img', 'images/player1img.png'); //placeholder
    this.load.image('player2img', 'images/player2img.png'); //placeholder
    this.load.image('background', 'images/court.gif');
    this.load.image('ball', 'images/Basketball2.png');
    this.load.image('Walls', 'images/Walls.png');
    this.load.image('hoop', 'images/hoop.png');
    this.load.image('scoreboard', 'images/scoreboard.gif')
}

gameScene.create = function() {
  
  //Setting Background
    gameState.background = this.add.image(400, 250, 'background');
    gameState.background.setScale(1.5)
    gameState.backgroundColor = "rgba(0, 0, 0, 0.30)";

  //Creating Group for Walls
    const wallL = this.physics.add.staticGroup();
    const wallR = this.physics.add.staticGroup();
    const wallBottom = this.physics.add.staticGroup();
    const wallBaseline = this.physics.add.staticGroup();
    const wallTopBackboard = this.physics.add.staticGroup();

  //Putting the walls into the game
    wallL.create(25, 450, 'Walls').setScale(1, 100).refreshBody();
    wallR.create(750, 450, 'Walls').setScale(1, 100).refreshBody();
    wallBottom.create(0, 500, 'Walls').setScale(200, 1).refreshBody();
    wallBaseline.create(250, 155, 'Walls', undefined, false).setScale(100,.5).refreshBody();
    wallTopBackboard.create(250, 42, 'Walls', undefined, false).setScale(100,.5).refreshBody();

  //Adding Scoreboard
    gameState.scoreboard = this.add.sprite(140, 90, 'scoreboard');
    gameState.scoreboard.setScale(6,5)

  // Adding Hoop Sprite
    gameState.hoop = this.physics.add.sprite(400, 100, 'hoop')
    gameState.hoop.setScale(.5)
    gameState.hoop.setImmovable();
  //Adding Player and Ball Sprite
    gameState.player1 = this.physics.add.sprite(400, 250, 'player1img');
    gameState.player1.hasBall = false;
    gameState.player2 = this.physics.add.sprite(100, 250, 'player2img');
    gameState.player2.hasBall = false;
    gameState.ball = this.physics.add.sprite(200, 200, 'ball', .5);
    gameState.ball.setScale(.05);
    gameState.ball.setImmovable();
    gameState.ball.inAir = false;
  //Changing Player Hitboxes
    gameState.player1.setSize(15, 45);
    gameState.player1.setOffset(6, 38);
    gameState.player2.setSize(15, 45);
    gameState.player2.setOffset(6, 38);
    gameState.ball.setCircle(275);
  // Hoop Hitbox
    gameState.hoop.setSize(180, 70);
    gameState.hoop.setOffset(138, 75);

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
    gameState.cursors.numPad1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE);
    gameState.cursors.numPad2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.NUMPAD_TWO);
    gameState.cursors.numPad3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.NUMPAD_THREE);

  //Colliders
    this.physics.add.collider(gameState.player1, wallL);
    this.physics.add.collider(gameState.player2, wallL);
    this.physics.add.collider(gameState.player1, wallR);
    this.physics.add.collider(gameState.player2, wallR);
    this.physics.add.collider(gameState.player1, wallBottom);
    this.physics.add.collider(gameState.player2, wallBottom);
    this.physics.add.collider(gameState.player1, gameState.ball, function(){ 
      //Player 1 ball pickup
      if (gameState.player2.hasBall == false && gameState.ball.inAir == false){
          gameState.player1.hasBall = true;
      }
    });
    this.physics.add.collider(gameState.player2, gameState.ball, function() {
      //Player 2 ball pickup
      if (gameState.player1.hasBall == false && gameState.ball.inAir == false){
          gameState.player2.hasBall = true;
      }
    });
    this.physics.add.collider(gameState.ball, wallBottom);
    this.physics.add.collider(gameState.ball, wallL);
    this.physics.add.collider(gameState.ball, wallR);
    this.physics.add.collider(gameState.player1, gameState.player2);
    this.physics.add.collider(gameState.player1, wallBaseline, function() {
      //Player 1 Out of Bounds on baseline
      if (gameState.player1.hasBall == true) {
        gameState.player1.hasBall = false;
        gameState.player2.hasBall = true;
        gameState.spawnBallP2();
    }
    });
    this.physics.add.collider(gameState.player2, wallBaseline, function() {
      //Player 2 Out of Bounds on baseline
      if (gameState.player2.hasBall == true){
        gameState.player2.hasBall = false;
        gameState.player1.hasBall = true;
        gameState.spawnBallP1();
      }
    });
    this.physics.add.collider(gameState.ball, wallTopBackboard);
    this.physics.add.collider(gameState.ball, gameState.hoop, function(){
      //Ball Score or Rebound
      madeShotP1();
      madeShotP2();
    })

}
gameScene.update = function() {

  //Player 1 Movement
    //Left and Right Key Movement
      if (gameState.cursors.keyA.isDown) {
        gameState.player1.setVelocityX(-100);
      } else if (gameState.cursors.keyD.isDown) {
        gameState.player1.setVelocityX(100);
      } else {
        gameState.player1.setVelocityX(0);
      };
    //Up and Down Key Movement
      if (gameState.cursors.keyW.isDown) {
        gameState.player1.setVelocityY(-100);
      } else if (gameState.cursors.keyS.isDown){
        gameState.player1.setVelocityY(100);
      } else {
        gameState.player1.setVelocityY(0);
      }

  //Player 2 Movement 
    //Left and Right Arrow Movement
      if (gameState.cursors.right.isDown) {
        gameState.player2.setVelocityX(100);
      } else if (gameState.cursors.left.isDown) {
        gameState.player2.setVelocityX(-100);
      }   else {
        gameState.player2.setVelocityX(0);
      }
    //Up and Down Arrow Movement
      if (gameState.cursors.up.isDown) {
          gameState.player2.setVelocityY(-100);
        } else if (gameState.cursors.down.isDown){
          gameState.player2.setVelocityY(100);
        } else {
          gameState.player2.setVelocityY(0);
        }
  
  //Dribbling Player 1
    if (gameState.player1.hasBall == true) { 
    gameState.ball.setPosition(gameState.player1.x, gameState.player1.y + 10);
    gameState.ball.setVelocityX(0);
    gameState.ball.setVelocityY(0);
    }

  //Dribbling Player 2
    if (gameState.player2.hasBall == true) { 
    gameState.ball.setPosition(gameState.player2.x, gameState.player2.y + 10);
    gameState.ball.setVelocityX(0);
    gameState.ball.setVelocityY(0);
    }

  //Shooting Player 1
    if (gameState.cursors.keyQ.duration > 0 && gameState.cursors.keyQ.duration < 1000 && gameState.player1.hasBall == true) {
      gameState.ball.inAir = true;
      gameState.ball.setPosition(gameState.player1.x, gameState.player1.y - 30);
      gameState.player1.hasBall = false
      console.log(gameState.cursors.keyQ.duration);
      if (gameState.cursors.keyQ.duration > 250 && gameState.cursors.keyQ.duration < 1000){
      this.physics.moveToObject(gameState.ball, gameState.hoop, 100);
      } 
      else {
        this.physics.moveToObject(gameState.ball, gameState.hoop, 100);
      }
    }
  
  //Stealing Player 1
    if (gameState.player2.hasBall == true) {
      if (gameState.player1.x <= gameState.player2.x + 30 && gameState.player1.x >=            gameState.player2.x - 30 ){
        if (gameState.cursors.keyE.isDown) {
          gameState.player1.hasBall = true;
          gameState.player2.hasBall = false;
        }
      }
    }
  
  //Shooting Player 2
    if (gameState.cursors.numPad1.duration > 0 && gameState.cursors.numPad1.duration < 1000 && gameState.player2.hasBall == true) {
      gameState.ball.inAir = true;
      gameState.ball.setPosition(gameState.player2.x, gameState.player2.y - 30);
      gameState.player2.hasBall = false;
      console.log(gameState.cursors.numPad1.duration);
      if (gameState.cursors.keyQ.duration > 250 && gameState.cursors.keyQ.duration < 1000){
      this.physics.moveToObject(gameState.ball, gameState.hoop, 100);
      }
      else {
        this.physics.moveToObject(gameState.ball, gameState.hoop, 100);
      }
    }

  //Stealing Player 2
    if (gameState.player1.hasBall == true) {
      if (gameState.player1.x <= gameState.player2.x + 30 && gameState.player1.x >= gameState.player2.x - 30){
        if(gameState.cursors.numPad3.isDown) {
          gameState.player2.hasBall = true;
          gameState.player1.hasBall = false;
          
        }
      }
    }
  //Score on Scoreboard
    this.add.text(75, 110, `${gameState.scoreP2}`, { fontSize: '30px', fill: '#000', backgroundColor: '#f9f9f9' });
    this.add.text(180, 110, `${gameState.scoreP1}`, { fontSize: '30px', fill: '#000', backgroundColor: '#f9f9f9' });
  //Ending Game Function
    if(gameState.scoreP1 >= 21){
      this.physics.pause();
      this.add.text(375, 50, `Player 1 Wins!` , { fontSize: '15px', fill: '#000' });
    } else if(gameState.scoreP2 >= 21){
      this.physics.pause();
      this.add.text(375, 50, `Player 2 Wins!` , { fontSize: '15px', fill: '#000' });
    }
}

//Score for P1 or Rebound
function madeShotP1(){
  if(gameState.cursors.keyQ.duration > 250 && gameState.cursors.keyQ.duration < 500){
      gameState.ball.setPosition(gameState.hoop.x, gameState.hoop.y);
      gameState.ball.setVelocityX(0);
      gameState.ball.setVelocityY(30);
      gameState.cursors.keyQ.duration = 0;
      gameState.scoreP1 += 2;
      gameState.player1.hasBall = false;
      gameState.player2.hasBall = true;
      gameState.spawnBallP2();
    } else {
      gameState.cursors.keyQ.duration = 0;
      gameState.ball.setVelocityY(50);
      gameState.ball.setVelocityX(Phaser.Math.Between(-50, 50));
      gameState.ball.inAir = false;
    }
}

//Score for P2 or Rebound
function madeShotP2(){
  if(gameState.cursors.numPad1.duration > 250 && gameState.cursors.numPad1.duration < 500){
      gameState.ball.setPosition(gameState.hoop.x, gameState.hoop.y);
      gameState.ball.setVelocityX(0);
      gameState.ball.setVelocityY(30);
      gameState.cursors.numPad1.duration = 0;
      gameState.scoreP2 += 2;
      gameState.player2.hasBall = false;
      gameState.player1.hasBall = true;
      gameState.spawnBallP1();
    } else {
      gameState.cursors.numPad1.duration = 0;
      gameState.ball.setVelocityY(50);
      gameState.ball.setVelocityX(Phaser.Math.Between(-50, 50));
      gameState.ball.inAir = false;
    }
}

//Phaser Library
const config = 
{
  type: Phaser.AUTO,
  width: 750,
  height: 500,
  backgroundColor: '#f9f9f9',
  scene: {titleScene, gameScene},
  physics: {
  default: 'arcade',
  arcade: {
    enableBody: true,
    
  },
  }
};

const game = new Phaser.Game(config);
game.scene.add('title', titleScene);
game.scene.add("game", gameScene);

// Start the title scene
game.scene.start('title');