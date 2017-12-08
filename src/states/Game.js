/* globals __DEV__ */
import Phaser from 'phaser'

import Player from '../sprites/Player'
import Obstacle from '../sprites/Obstacle'

export default class extends Phaser.State {
    preload() {
        const ASSET_DIR = 'assets';

        this.game.load.image('sky', ASSET_DIR + '/milky_way_stars_night_sky_space_97654_800x600.jpg');
        this.game.load.spritesheet('dude', ASSET_DIR + '/dude.png', 32, 48);
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.add.sprite(0, 0, 'sky');

        this.player = new Player({
            game: this.game,
            x: this.game.world.width / 2 - 24,
            y: this.game.world.height - 16,
            asset: 'dude'
        });
        this.game.add.existing(this.player);

        this.obstacle = new Obstacle({
            game: this.game,
            x: this.game.world.width,
            y: this.game.world.height - 16,
            asset: 'dude'
        });
        this.game.add.existing(this.obstacle);
    }

    update() {
        this.game.physics.arcade.collide(this.obstacle, this.player, this.obstacleHitPlayer);
    }

    obstacleHitPlayer() {
        //alert("hit!");
    }
}
