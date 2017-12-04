import Level1 from './State/Level1';

class Game extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.AUTO, document.getElementById('game'), null);

        //this.state.add('Boot', Boot, false);
        //this.state.add('Preloader', Preloader, false);
        //this.state.add('MainMenu', MainMenu, false);
        this.state.add('Level1', Level1, false);

        this.state.start('Level1');
    }
}

export { Game as default };