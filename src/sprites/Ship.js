import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor ({ game, x, y, asset, frame }) {
        super(game, x, y, asset, frame);

        this.game = game;

        this.anchor.setTo(0.5);
        this.scale.setTo(1);

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this);

        //  Player physics properties. Give the little guy a slight bounce.
        this.body.bounce.y = 0;
        this.body.gravity.y = 0;
        this.body.collideWorldBounds = true;
        this.body.immovable = true;

        this.animations.add('hover', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 25, true);
        this.animations.play('hover');
    }

    update () {
        this.body.velocity.x = 0;
    }
}
