import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
    init () {}

    preload () {
        const ASSET_DIR = 'assets';

        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        centerGameObjects([this.loaderBg, this.loaderBar]);

        this.load.setPreloadSprite(this.loaderBar);
        //
        // load your assets
        //
        //this.load.image('mushroom', ASSET_DIR + '/images/mushroom2.png');
        this.load.image('sky', ASSET_DIR + '/milky_way_stars_night_sky_space_97654_800x600.jpg');
    }

    create () {
        this.loaderBg.destroy();
        this.loaderBar.destroy();

        this.game.stage.backgroundColor = "#000000";

        //this.add.tileSprite(0, 0, 760, this.game.world.height, 'sky');

        let text = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Welcome Georg_Lie, your code is being held hostage on another planet.\n\nClick here to retrieve it.', { font: '26px Bangers', fill: '#dddddd', align: 'center' });
        text.anchor.setTo(0.5, 0.5);

        this.game.input.onDown.add(this.start, this);
    }

    start() {
        this.state.start('Game');
    }
}
