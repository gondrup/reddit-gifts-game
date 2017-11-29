window.PIXI = require( 'phaser/build/custom/pixi' );
window.p2 = require( 'phaser/build/custom/p2' );
window.Phaser = require( 'phaser/build/custom/phaser-split' );

const ASSET_DIR = 'game-assets';

window.init = () => {
	let game = new Phaser.Game(800, 600, Phaser.AUTO, document.getElementById('game'), { preload: preload, create: create, update: update });

	function preload() {
	    game.load.image('sky', ASSET_DIR + '/milky_way_stars_night_sky_space_97654_800x600.jpg');
	}

	function create() {
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    game.add.sprite(0, 0, 'sky');
	}

	function update() {
	}
}