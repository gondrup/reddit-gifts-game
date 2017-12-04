window.PIXI = require( 'phaser/build/custom/pixi' );
window.p2 = require( 'phaser/build/custom/p2' );
window.Phaser = require( 'phaser/build/custom/phaser-split' );

const ASSET_DIR = 'game-assets';

import Game from './Game/Game';

window.init = () => {
	let game = new Game();
};