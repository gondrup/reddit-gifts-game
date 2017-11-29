alert('hi');

var phaser = require('phaser');

var game = new Phaser.Game(800, 600, Phaser.AUTO, document.getElementById('game'), { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', '../game-assets/milky_way_stars_night_sky_space_97654_800x600.jpg');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');
}

function update() {
}