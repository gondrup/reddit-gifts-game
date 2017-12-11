/* globals __DEV__ */
import Phaser from 'phaser'

import Player from '../sprites/Player'
import Obstacle from '../sprites/Obstacle'

export default class extends Phaser.State {
    preload() {
        const ASSET_DIR = 'assets';

        this.game.world.resize(5000, this.game.height);

        this.game.load.audio('bg-music', [ASSET_DIR + '/space.mp3']);

        this.game.load.image('sky', ASSET_DIR + '/milky_way_stars_night_sky_space_97654_800x600.jpg');
        this.game.load.spritesheet('dude', ASSET_DIR + '/dude.png', 32, 48);

        this.game.load.image('mushroom01', ASSET_DIR + '/plantshrooms/plantshrooms_01_10x11.png');
        this.game.load.image('mushroom02', ASSET_DIR + '/plantshrooms/plantshrooms_02_16x16.png');
        this.game.load.image('mushroom03', ASSET_DIR + '/plantshrooms/plantshrooms_03_22x20.png');
        this.game.load.image('mushroom04', ASSET_DIR + '/plantshrooms/plantshrooms_04_26x32.png');
        this.game.load.image('mushroom05', ASSET_DIR + '/plantshrooms/plantshrooms_05_32x32.png');
        this.game.load.image('mushroom06', ASSET_DIR + '/plantshrooms/plantshrooms_06_64x64.png');
        this.game.load.image('mushroom07', ASSET_DIR + '/plantshrooms/plantshrooms_07_64x64.png');
        this.game.load.image('mushroom08', ASSET_DIR + '/plantshrooms/plantshrooms_08_32x96.png');
        this.game.load.image('mushroom09', ASSET_DIR + '/plantshrooms/plantshrooms_09_64x96.png');
        this.game.load.image('mushroom10', ASSET_DIR + '/plantshrooms/plantshrooms_10_96x96.png');

        this.obstacles = [];
    }

    addObstacle(assetKey, x) {
        let obstacle = new Obstacle({
            game: this.game,
            x: x,
            y: this.game.world.height,
            asset: assetKey
        });
        this.game.add.existing(obstacle);

        this.obstacles.push(obstacle);
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.add.tileSprite(0, 0, 5000, this.game.world.height, 'sky');

        this.player = new Player({
            game: this.game,
            x: this.game.width / 2 - this.game.cache.getImage('dude').width,
            y: this.game.world.height / 2,
            asset: 'dude'
        });
        this.game.add.existing(this.player);

        this.game.camera.follow(this.player);

        this.addObstacle('mushroom04', 810);
        this.addObstacle('mushroom05', 1010);
        this.addObstacle('mushroom06', 1210);
        this.addObstacle('mushroom06', 1410);
        this.addObstacle('mushroom07', 1610);

        //  - this.game.cache.getImage('mushroom1').height

        //this.music = this.game.add.audio('bg-music');
        //this.music.play();
    }

    update() {
        let self = this;

        this.obstacles.forEach((item) => {
            this.game.physics.arcade.collide(item, this.player, () => self.obstacleHitPlayer())
        });
    }

    obstacleHitPlayer() {
        this.gameOver();
    }

    gameOver() {
        console.log("game over");
        this.player.running = false;
    }
}
