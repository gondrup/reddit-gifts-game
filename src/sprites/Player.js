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
        this.body.gravity.y = 1000;
        this.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        this.animations.add('left', [0, 1, 2, 3], 10, true);
        this.animations.add('right', [5, 6, 7, 8], 10, true);

        //this.frame = 5;
        this.animations.play('right');

        this.spacebarKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.running = true;
    }

    update () {
        if (this.running) {
            //  Reset the player velocity (movement)
            this.body.velocity.x = 100;

            if (this.spacebarKey.downDuration(250)/* && this.body.touching.down*/) {
                this.body.velocity.y = -350;
            }

            this.animations.play('right');

            return;

            if (this.cursors.left.isDown) {
                //  Move to the left
                this.body.velocity.x = -150;

                this.animations.play('left');
            }
            else if (this.cursors.right.isDown) {
                //  Move to the right
                this.body.velocity.x = 150;

                this.animations.play('right');
            }
            else {
                //  Stand still
                this.animations.stop();

                this.frame = 4;
            }

            //  Allow the player to jump if they are touching the ground.
            if (this.cursors.up.isDown /*&& this.player.body.touching.down*/) {
                this.body.velocity.y = -350;
            }
        } else {
            this.body.velocity.x = 0;
            this.frame = 5;
        }
    }
}
