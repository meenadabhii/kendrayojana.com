document.addEventListener("DOMContentLoaded", function () {
    // console.log("hre");   
    // MORE BUTTON CLICK INTRACTION --------------------------------------------------------------
    const moreButton = document.querySelector(".more-button");
    if (moreButton) {
        moreButton.addEventListener("click", function () {
            // console.log("more");
            gtag('event', 'more_games_click', {
                'event_category': 'Navigation',
                'event_label': 'More Games Button'
            });
            window.location.href = "https://baseapk.me"; 
        });
    }
    // HOME BUTTON CLICK INTRACTION --------------------------------------------------------------
    const homeButton = document.querySelector(".home-button");
    if (homeButton) {
        console.log("herer");
        
        homeButton.addEventListener("click", function () {
            gtag('event', 'home_games_click', {
                'event_category': 'Navigation',
                'event_label': 'Play to Home'
            });
            window.location.href = "https://baseapk.me"; 
        });
    }
});