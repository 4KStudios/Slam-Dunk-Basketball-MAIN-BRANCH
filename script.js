//Creating scenes for game screen and title screen
  var gameScene = new Phaser.Scene('game');
  var titleScene = new Phaser.Scene('title');
  var controlScene = new Phaser.Scene('controls');
  var mapsScene = new Phaser.Scene('maps');

//list for variables in the titleScene

//Title Screen scene
  titleScene.preload = function(){
    this.load.image('titlescreen', 'images/MAINMENU.gif');
    this.load.image('startbutton', 'images/startbutton.png');
    this.load.image('controlsbutton', 'images/controlsbutton.png');//placeholder
  }

  titleScene.create = function(){
    var bg = this.add.image(400, 250,'titlescreen').setScale(5);
    var startbutton = this.add.sprite(400, 300, 'startbutton').setScale(1.5).setInteractive();

    var controlsbutton = this.add.sprite(396, 425, 'controlsbutton').setScale(3).setInteractive();

    startbutton.once('pointerdown', function (pointer) {
        game.scene.start('maps');
        game.scene.stop('title');
      }, this);

    controlsbutton.once('pointerdown', function (pointer) {
      game.scene.start('controls');
      game.scene.stop('title');
    }, this);
  }

//Controls Screen scene
  controlScene.preload = function(){
    this.load.image('controlsimage', 'images/ctrls.png');
    this.load.image('backoutbutton', 'images/back.png');//placeholder
  }

  controlScene.create = function(){
    var bg = this.add.image(400, 263, 'controlsimage').setScale(.75);
    var backoutbutton = this.add.sprite(600, 50, 'backoutbutton').setScale(2).setInteractive();

    backoutbutton.once('pointerdown', function (pointer) {
        game.scene.start('title');
        game.scene.stop('controls');
      }, this);
  }

//MapsScene
const mapsState = {
 mapSelection: 0,
}

mapsScene.preload = function(){
  this.load.image('black', 'images/blackBackground.png')
  this.load.image('beach', 'images/beachbackground.png');
}

mapsScene.create = function(){
  var bg = this.add.image(400, 250,'black').setScale(5);
  beachMap = this.physics.add.sprite(150, 150, 'beach').setScale(.05).setInteractive();

    beachMap.once('pointerdown', function (pointer) {
      mapsState.mapSelection = 1;
      game.scene.stop('maps')
      game.scene.start('game');
    }, this);
}

//list for variables in the gameScene
  const gameState = {
    scoreP1: 0,
    scoreP2: 0,
  }
//Spawns players at top of key
  gameState.spawnBallP2 = function(){
    gameState.player1.setPosition(400,375);
    gameState.player2.setPosition(400,400);
  }
  gameState.spawnBallP1 = function(){
    gameState.player2.setPosition(400,375);
    gameState.player1.setPosition(400,400);
  }

//Game Screen scene
  gameScene.preload = function()
  {
    //images
      this.load.image('player1img', 'images/player1img.png'); //placeholder
      this.load.image('player2img', 'images/player2img.png'); //placeholder
      this.load.image('court', 'images/court.gif');
      this.load.image('ball', 'images/mainbasketball.png');
      this.load.image('Walls', 'images/Walls.png');
      this.load.image('hoop', 'images/hoop.png');
      this.load.image('scoreboard', 'images/transparentSB.png')
      this.load.image('beach', 'images/beachbackground.png')
      this.load.spritesheet('shotmeter', 'images/ShotMeter.png', { frameWidth: 320, frameHeight: 320 });
      this.load.spritesheet('p1blocking', 'images/player1block.png', { frameWidth: 27, frameHeight: 100});
      this.load.spritesheet('p2blocking', 'images/player2block.png', { frameWidth: 27, frameHeight: 100});
  }

  gameScene.create = function() {

    //Setting background
    if (mapsState.mapSelection = 1){
      gameState.background = this.add.image(400,50, 'beach');
      gameState.background.setScale(.5);
  }
    
    //Adding Court
      gameState.court = this.add.image(400, 250, 'court');
      gameState.court.setScale(1.5)

    //Creating Group for Walls
      const wallL = this.physics.add.staticGroup();
      const wallR = this.physics.add.staticGroup();
      const wallBottom = this.physics.add.staticGroup();
      const wallBaseline = this.physics.add.staticGroup();
      const wallTopBackboard = this.physics.add.staticGroup();

    //Putting the walls into the game
      wallL.create(5, 450, 'Walls').setScale(1, 100).refreshBody();
      wallR.create(750, 450, 'Walls').setScale(1, 100).refreshBody();
      wallBottom.create(0, 500, 'Walls').setScale(200, 1).refreshBody();
      wallBaseline.create(250, 155, 'Walls', undefined, false).setScale(100,.5).refreshBody();
      wallTopBackboard.create(250, 42, 'Walls', undefined, false).setScale(100,.5).refreshBody();

    //Adding Scoreboard
      gameState.scoreboard = this.add.sprite(140, 90, 'scoreboard');
      gameState.scoreboard.setScale(.75,.75)

    // Adding Hoop Sprite
      gameState.hoop = this.physics.add.sprite(400, 100, 'hoop')
      gameState.hoop.setScale(.5)
      gameState.hoop.setImmovable();
    //Adding Player and Ball Sprite
      gameState.player1 = this.physics.add.sprite(400, 420, 'player1img');
      gameState.player1.hasBall = true;
      gameState.player2 = this.physics.add.sprite(400,350 , 'player2img');
      gameState.player2.hasBall = false;
      gameState.ball = this.physics.add.sprite(200, 200, 'ball', .5);
      gameState.ball.setScale(.05);
      gameState.ball.setImmovable();
      gameState.ball.inAir = false;
      this.anims.create({
      key: "shoot",
      frameRate: 50,
      frames: this.anims.generateFrameNumbers("shotmeter", { start: 0, end: 17 }),
      repeat: 0
    })
    this.anims.create({
      key: "p1block",
      frameRate: 25,
      frames: this.anims.generateFrameNumbers("p1blocking", { start: 0, end: 3 }),
      repeat: 0
    });
    this.anims.create({
      key: "p2block",
      frameRate: 25,
      frames: this.anims.generateFrameNumbers("p2blocking", { start: 0, end: 3 }),
      repeat: 0
    });

    

    //Changing Player Hitboxes
      gameState.player1.setSize(15, 45);
      gameState.player1.setOffset(6, 38);
      gameState.player2.setSize(15, 45);
      gameState.player2.setOffset(6, 38);
      gameState.ball.setCircle(275);
    // Hoop Hitbox
      gameState.hoop.setSize(180, 70);
      gameState.hoop.setOffset(138, 75);

    //3-point line Hitbox
      gameState.threepointline = this.physics.add.sprite(400, 240)
      gameState.threepointline.setSize(550,250)


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
      gameState.cursors.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
      ;
      gameState.cursors.numPad1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE);
      gameState.cursors.numPad2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO);
      gameState.cursors.numPad3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE);
      gameState.cursors.ctrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL)

    //Colliders
      this.physics.add.collider(gameState.player1, wallL, function(){
        //Out of Bounds on Left Wall
        if (gameState.player1.y <= 270 && gameState.player1.hasBall == true) {
          gameState.player1.hasBall = false;
          gameState.player2.hasBall = true;
          gameState.spawnBallP2();
        }
      });
      this.physics.add.collider(gameState.player2, wallL, function(){
        //Out of Bounds on Left Wall
        if (gameState.player2.y <= 270 && gameState.player2.hasBall == true) {
          gameState.player2.hasBall = false;
          gameState.player1.hasBall = true;
          gameState.spawnBallP1();
        }
      });
      this.physics.add.collider(gameState.player1, wallR, function(){
        //Out of Bounds on Right Wall
        if (gameState.player1.y <= 230 && gameState.player1.hasBall == true) {
          gameState.player1.hasBall = false;
          gameState.player2.hasBall = true;
          gameState.spawnBallP2();
        }
      });
      this.physics.add.collider(gameState.player2, wallR, function(){
        //Out of Bounds on Right Wall
        if (gameState.player2.y <= 230 && gameState.player2.hasBall == true) {
          gameState.player2.hasBall = false;
          gameState.player1.hasBall = true;
          gameState.spawnBallP1();
        }
      });
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
      this.physics.add.collider(gameState.ball, wallBottom, function(){
        gameState.ball.velocityY = -1*gameState.ball.velocityY
      });
      this.physics.add.collider(gameState.ball, wallL, function(){
        gameState.ball.velocityX = -1*gameState.ball.velocityX
      });
      this.physics.add.collider(gameState.ball, wallR, function() {
        gameState.ball.velocityX = -1*gameState.ball.velocityX
      });
      this.physics.add.collider(gameState.player1, gameState.player2);
      this.physics.add.collider(gameState.player1, wallBaseline, function() {
        //Player 1 Out of Bounds on baseline
        if (gameState.player1.hasBall == true) {
          gameState.player1.hasBall = false;
          gameState.player2.hasBall = true;
          gameState.spawnBallP2();
          if (gameState.cursors.keyZ.isDown) {
            gameState.scoreP1 += 2
        }
      }
        
      });
      this.physics.add.collider(gameState.player2, wallBaseline, function() {
        //Player 2 Out of Bounds on baseline
        if (gameState.player2.hasBall == true){
          gameState.player2.hasBall = false;
          gameState.player1.hasBall = true;
          gameState.spawnBallP1();
          if (gameState.cursors.numPad2.isDown) {
            gameState.scoreP2 += 2
        }
        }
      });
      this.physics.add.collider(gameState.ball, wallTopBackboard);
      this.physics.add.collider(gameState.ball, gameState.hoop, function(){
        //Ball Score or Rebound
        madeShotP1();
        madeShotP2();
      })
      
      p1threeptline = false
      p2threeptline = false


      this.physics.add.overlap(gameState.player1, gameState.threepointline, function() {
        p1threeptline = true
      })
      this.physics.add.overlap(gameState.player1, gameState.threepointline, function() {
        p2threeptline = true
      })

  }
  
  gameScene.update = function() {
    //Three Point Line Boolean
      p1threeptline = false
      p2threeptline = false

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
      
      gameState.cursors.keyQ.on('down', function() {
        if(gameState.player1.hasBall == true && gameState.ball.inAir == false){
          shotAnimation(gameState.player1);
        }
      });
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
      if (gameState.player2.hasBall == true && gameState.player1.x <= gameState.player2.x 
       + 30 && gameState.player1.x >= gameState.player2.x - 30 &&  
       gameState.cursors.keyE.isDown){
          gameState.cursors.keyQ.duration = 0;
          gameState.player1.hasBall = true;
          gameState.player2.hasBall = false;
        }
    
    
    //Shooting Player 2
      gameState.cursors.numPad1.on('down', function() {
        if(gameState.player2.hasBall == true && gameState.ball.inAir == false){
          shotAnimation(gameState.player2);
        }
      });
      if (gameState.cursors.numPad1.duration > 0 && gameState.cursors.numPad1.duration < 1000 && gameState.player2.hasBall == true) {
        gameState.ball.inAir = true;
        gameState.ball.setPosition(gameState.player2.x, gameState.player2.y - 30);
        gameState.player2.hasBall = false;
        console.log(gameState.cursors.numPad1.duration);
        if (gameState.cursors.numPad2.duration > 250 && gameState.cursors.numPad2.duration < 1000){
          this.physics.moveToObject(gameState.ball, gameState.hoop, 100);
        }
        else {
          this.physics.moveToObject(gameState.ball, gameState.hoop, 100);
        }
      }

    //Stealing Player 2
     this.input.keyboard.on('keydown-NUMPAD_THREE', function () {
        if (gameState.player1.hasBall == true && gameState.player2.x <= gameState.player1.x + 30 && gameState.player2.x >= gameState.player1.x - 30){
          gameState.cursors.numPad1.duration = 0;
          gameState.player2.hasBall = true;
          gameState.player1.hasBall = false;
      }
    }, this);

    //blocking p1
      if (gameState.player1.x >= gameState.player2.x - 30 && gameState.player1.x <= gameState.player2.x + 30) {
        if (gameState.cursors.numPad2.isDown) {
          if (gameState.cursors.keyF.isDown) {
            playAnimation(gameState.player1, 'p1block');
            gameState.player1.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
              gameState.player2.hasBall = false;
              gameState.player1.hasBall = true;
            })
            
         }
       }
     }
      
    //Blocking Player 2
    if (gameState.cursors.ctrl.isDown) {
      if (gameState.player2.x >= gameState.player1.x - 30 && gameState.player2.x <= gameState.player1.x + 30) {
          if (gameState.cursors.keyZ.isDown) {
            playAnimation(gameState.player2, 'p2block');
             gameState.player2.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
              gameState.player1.hasBall = false;
              gameState.player2.hasBall = true;
            })
          }
        }
      }
    /*this.input.keyboard.on('CTRL.ALT', function () {
      if (gameState.player1.hasBall == true && gameState.player2.x <= gameState.player1.x + 30 && gameState.player2.x >= gameState.player1.x - 30) {
        blockAnimation(gameState.player2)
      }
    }) */
    

    //Score on Scoreboard
      this.add.text(86, 98, `${gameState.scoreP2}`, { fontSize: '30px', fill: '#000', backgroundColor: '#f9f9f9' });
      this.add.text(175, 98, `${gameState.scoreP1}`, { fontSize: '30px', fill: '#000', backgroundColor: '#f9f9f9' });
    //Ending Game Function
      if(gameState.scoreP1 >= 21){
        this.physics.pause();
        this.add.text(375, 50, `Player 1 Wins!` , { fontSize: '15px', fill: '#000' });
      } else if(gameState.scoreP2 >= 21){
        this.physics.pause();
        this.add.text(375, 50, `Player 2 Wins!` , { fontSize: '15px', fill: '#000' });
      }

       //dunking p1
      if(p1threeptline == false && gameState.cursors.keyZ.isDown && gameState.player1.hasBall == true) {
          this.physics.moveToObject(gameState.player1, gameState.hoop, 100)
          gameState.ball.y -= 50
          this.physics.moveToObject(gameState.ball, gameState.hoop, 100) 
      }
      
      //dunking p2
      if(p2threeptline == false && gameState.cursors.numPad2.isDown && gameState.player2.hasBall == true) {
        this.physics.moveToObject(gameState.player2, gameState.hoop, 100)
        gameState.ball.y -= 50
        this.physics.moveToObject(gameState.ball, gameState.hoop, 100)
      }
  }

//Score for P1 or Rebound
  function madeShotP1(){
    if(gameState.cursors.keyQ.duration > 250 && gameState.cursors.keyQ.duration < 500){
        if (p1threeptline == true) {
          gameState.scoreP1 += 2
          gameState.ball.setPosition(gameState.hoop.x, gameState.hoop.y);
          gameState.ball.setVelocityX(0);
          gameState.ball.setVelocityY(30);
          gameState.cursors.keyQ.duration = 0;
          gameState.player1.hasBall = false;
          gameState.player2.hasBall = true;           
          gameState.spawnBallP2();
        } else {
          gameState.scoreP1 += 3
          gameState.ball.setPosition(gameState.hoop.x, gameState.hoop.y);
          gameState.ball.setVelocityX(0);
          gameState.ball.setVelocityY(30);
          gameState.cursors.keyQ.duration = 0;
          gameState.player1.hasBall = false;
          gameState.player2.hasBall = true;
          gameState.spawnBallP2();
        }
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
      if (p2threeptline == true) {
          gameState.scoreP2 += 2
          gameState.ball.setPosition(gameState.hoop.x, gameState.hoop.y);
          gameState.ball.setVelocityX(0);
          gameState.ball.setVelocityY(30);
          gameState.cursors.numPad1.duration = 0;
          gameState.player1.hasBall = false;
          gameState.player2.hasBall = true;           
          gameState.spawnBallP1();
        } else {
          gameState.scoreP2 += 3
          gameState.ball.setPosition(gameState.hoop.x, gameState.hoop.y);
          gameState.ball.setVelocityX(0);
          gameState.ball.setVelocityY(30);
          gameState.cursors.numPad1.duration = 0;
          gameState.player1.hasBall = true;
          gameState.player2.hasBall = false;
          gameState.spawnBallP1();
        }
      } else {
        gameState.cursors.numPad1.duration = 0;
        gameState.ball.setVelocityY(50);
        gameState.ball.setVelocityX(Phaser.Math.Between(-50, 50));
        gameState.ball.inAir = false;
      }
  }
  function shotAnimation(player){
    meter = gameScene.add.sprite(player.x, player.y - 50, "shotmeter").setScale(.5);
    meter.play("shoot");

    destroySprite(meter);
  }
  
  function destroySprite(sprite){
    sprite.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
      sprite.destroy();
    })
  }

  function playAnimation(player, animation){
    player.play(animation);
  }

//Phaser Library
  const config = 
  {
    type: Phaser.AUTO,
    width: 750,
    height: 500,
    backgroundColor: '#f9f9f9',
    scene: {titleScene, controlScene, mapsScene, gameScene},
    physics: {
    default: 'arcade',
    arcade: {
      enableBody: true,
      debug: false,
    },
    }
  };
const game = new Phaser.Game(config);

game.scene.add('title', titleScene);
game.scene.add('game', gameScene);
game.scene.add('controls', controlScene);
game.scene.add('maps', mapsScene);

// Start the title scene
  game.scene.start('title');