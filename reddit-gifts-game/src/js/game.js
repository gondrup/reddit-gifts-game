window.PIXI = require( 'phaser/build/custom/pixi' );
window.p2 = require( 'phaser/build/custom/p2' );
window.Phaser = require( 'phaser/build/custom/phaser-split' );

const ASSET_DIR = 'game-assets';

window.init = () => {
	let game = new Phaser.Game(800, 600, Phaser.AUTO, document.getElementById('game'), { preload: preload, create: create, update: update });

	let player;
	let platforms;
	let cursors;

	function preload() {
	    game.load.image('sky', ASSET_DIR + '/milky_way_stars_night_sky_space_97654_800x600.jpg');
	    game.load.spritesheet('dude', ASSET_DIR + '/dude.png', 32, 48);
	}

	function create() {
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    game.add.sprite(0, 0, 'sky');

	    player = game.add.sprite(32, game.world.height - 150, 'dude');

	    //  We need to enable physics on the player
	    game.physics.arcade.enable(player);

	    //  Player physics properties. Give the little guy a slight bounce.
	    player.body.bounce.y = 0.2;
	    player.body.gravity.y = 300;
	    player.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    player.animations.add('left', [0, 1, 2, 3], 10, true);
	    player.animations.add('right', [5, 6, 7, 8], 10, true);

	    cursors = game.input.keyboard.createCursorKeys();
	}

	function update() {
		//  Reset the players velocity (movement)
	    player.body.velocity.x = 0;

	    if (cursors.left.isDown)
	    {
	        //  Move to the left
	        player.body.velocity.x = -150;

	        player.animations.play('left');
	    }
	    else if (cursors.right.isDown)
	    {
	        //  Move to the right
	        player.body.velocity.x = 150;

	        player.animations.play('right');
	    }
	    else
	    {
	        //  Stand still
	        player.animations.stop();

	        player.frame = 4;
	    }
	    
	    //  Allow the player to jump if they are touching the ground.
	    if (cursors.up.isDown /*&& player.body.touching.down*/)
	    {
	        player.body.velocity.y = -350;
	    }
	}
}