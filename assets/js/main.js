// main.js
function setDynamicBackground(gameName) {
    var backgroundImageUrl = '';

    console.log(gameName);
    switch (gameName) {
        case 'backbone':
            backgroundImageUrl = 'assets/images/background/backbone-background.jpg';
            break;
        case 'maze_grid':
            backgroundImageUrl = 'assets/images/background/maze-grid-background.jpg';
            break;
        case 'car_game':
            backgroundImageUrl = 'assets/images/background/car-game-background.jpg';
            break;
        default:
            backgroundImageUrl = 'assets/images/background/default-background.jpg'; // Default background
            break;
    }
    console.log(backgroundImageUrl);
    document.body.style.backgroundImage = 'url('+ backgroundImageUrl +')';
    document.getElementById('banner-background').src = backgroundImageUrl;

    var playNowLink = 'browse.html'; // Default link
    switch (gameName) {
        case 'backbone':
            playNowLink = 'games/backbone/index.html';
            break;
        case 'maze_grid':
            playNowLink = 'games/maze_grid/index.html';
            break;
        case 'car_game':
            playNowLink = 'games/car_game/index.html';
            break;
        // Add more cases for other games as needed
        default:
            playNowLink = 'browse.html'; // Default link
            break;
    }
    document.getElementById('play-now-button').href = playNowLink;
}
