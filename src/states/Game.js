/* globals __DEV__ */
import Phaser from 'phaser'

import Player from '../sprites/Player'
import Obstacle from '../sprites/Obstacle'

export default class extends Phaser.State {
    preload() {
        const ASSET_DIR = 'assets';

        //  Load the Google WebFont Loader script
        //this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        // make the game occuppy all available space, but respecting
        // aspect ratio – with letterboxing if needed
        /*this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;*/
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.game.world.resize(5000, this.game.height);

        this.game.load.audio('bg-music', [ASSET_DIR + '/space.mp3']);

        this.game.load.image('sky', ASSET_DIR + '/milky_way_stars_night_sky_space_97654_800x600.jpg');
        this.game.load.spritesheet('dude', ASSET_DIR + '/dude-edit.png', 32, 48);

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

        this.game.load.image('ground', ASSET_DIR + '/platform.png');
    }

    addObstacle(assetKey, x) {
        /*let obstacle = new Obstacle({
            game: this.game,
            x: x,
            y: this.game.world.height - 32 - (this.game.cache.getImage(assetKey).width / 2),
            asset: assetKey
        });
        this.game.add.existing(obstacle);

        this.obstacles.push(obstacle);*/

        let shroom = this.obstacles.create(x, this.game.world.height - 32 - this.game.cache.getImage(assetKey).width, assetKey);
        shroom.body.immovable = true;
        // Make hit box smaller
        let hitBoxPadding = 5;
        shroom.body.setSize(this.game.cache.getImage(assetKey).width - (hitBoxPadding * 2), this.game.cache.getImage(assetKey).height - (hitBoxPadding * 2), hitBoxPadding, hitBoxPadding);
    }

    addPlatform(x, y, widthScale) {
        let ground = this.platforms.create(x, y, 'ground');
        ground.scale.setTo(widthScale, 0.25);
        ground.body.immovable = true;
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.add.tileSprite(0, 0, 5000, this.game.world.height, 'sky');

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;

        let ground = this.platforms.create(0, this.game.world.height - 32, 'ground');
        ground.scale.setTo(10, 1);
        ground.body.immovable = true;

        this.addPlatform(1180, this.game.world.height - (32 * 2), 0.025);
        this.addPlatform(1260, this.game.world.height - (32 * 4), 0.025);
        this.addPlatform(1340, this.game.world.height - (32 * 6), 0.025);

        this.obstacles = this.game.add.group();
        this.obstacles.enableBody = true;

        this.addObstacle('mushroom04', 810);
        this.addObstacle('mushroom05', 1010);
        this.addObstacle('mushroom06', 1410);
        this.addObstacle('mushroom04', 1710);
        this.addObstacle('mushroom04', 1910);

        this.player = new Player({
            game: this.game,
            x: this.game.width / 2 - this.game.cache.getImage('dude').width,
            y: this.game.world.height / 2,
            asset: 'dude'
        });
        this.game.add.existing(this.player);

        this.game.camera.follow(this.player);

        //this.game.input.onDown.add(this.goFull, this);

        //  - this.game.cache.getImage('mushroom1').height

        //this.music = this.game.add.audio('bg-music');
        //this.music.play();
    }

    update() {
        let self = this;

        let playerHitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);

        this.game.physics.arcade.collide(this.obstacles, this.player, () => self.obstacleHitPlayer());

        /*this.obstacles.forEach((item) => {
            this.game.physics.arcade.collide(item, this.player, () => self.obstacleHitPlayer())
        });*/

        if (this.player.body.x > 4000) {
            this.gameComplete();
        }
    }

    goFull() {
        if (!this.game.scale.isFullScreen) {
            //this.game.scale.stopFullScreen();
        //} else {
            this.game.scale.startFullScreen(false);
        }
    }

    obstacleHitPlayer() {
        this.gameOver();
    }

    gameOver() {
        //console.log("game over");
        this.player.running = false;

        /*this.text = this.game.add.text(this.game.centerX, this.game.centerY, "- phaser -\nrocking with\ngoogle web fonts");
        this.text.anchor.setTo(0.5);

        this.text.font = 'Revalia';
        this.text.fontSize = 60;

        //  x0, y0 - x1, y1
        let grd = this.text.context.createLinearGradient(0, 0, 0, this.text.canvas.height);
        grd.addColorStop(0, '#8ED6FF');
        grd.addColorStop(1, '#004CB3');
        this.text.fill = grd;

        this.text.align = 'center';
        this.text.stroke = '#000000';
        this.text.strokeThickness = 2;
        this.text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);*/

        //let style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        //  The Text is positioned at 0, 100
        /*let text = this.game.add.text(this.game.world.centerX, this.game.world.centerX, "Game Over!", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);*/

        let text = this.game.add.text(this.game.camera.width / 2, (this.game.camera.height / 2) - 30, "Game Over", {font: "14px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 3});
        text.anchor.setTo(0.5, 0.5);
        text.fixedToCamera = true;

        let text2 = this.game.add.text(this.game.camera.width / 2, (this.game.camera.height / 2) + 30, "Retry?", {font: "12px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 3});
        text2.anchor.setTo(0.5, 0.5);
        text2.fixedToCamera = true;

        this.game.input.onDown.add(this.restart, this);

        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        //text.setTextBounds(0, 100, 800, 100);
    }

    gameComplete() {
        //console.log("game complete");

        this.player.running = false;

        let text = this.game.add.text(this.game.camera.width / 2, (this.game.camera.height / 2) - 30, "CONGRATULATIONS!", {font: "14px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 3});
        text.anchor.setTo(0.5, 0.5);
        text.fixedToCamera = true;

        let text2 = this.game.add.text(this.game.camera.width / 2, (this.game.camera.height / 2) + 30, "The code is:    1 8 2", {font: "14px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 3});
        text2.anchor.setTo(0.5, 0.5);
        text2.fixedToCamera = true;
    }

    restart() {
        this.state.start('Game');
    }
}
