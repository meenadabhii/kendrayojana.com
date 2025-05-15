/*jshint esversion: 6 */

$(document).ready(function() {

  const btnStartModal = document.getElementById("btn-start-modal");
  const btnStartGame = document.getElementById("btn-start-game");
  const inputPlayerName = document.getElementById("player-name");
  const btnResultsModal = document.getElementById("btn-results-modal");
  const btnLevelUp = document.getElementById("btn-level-up");
  const btnPlayAgain = document.getElementById("btn-play-again");
  const btnRestart = document.getElementById("btn-restart");
  const btnExit = document.getElementById("btn-exit");
  const card = document.querySelector('.card');
  const btnCloseCrossStartModal = document.getElementById("btn-close-cross-start-modal");
  const btnCloseStartModal = document.getElementById("btn-close-start-modal");
  const btnCloseCrossResultsModal = document.getElementById("btn-close-cross-results-modal");
  const btnCloseResultsModal = document.getElementById("btn-close-results-modal");

  // game namespace/scope
  let game = {
    playerName: "",
    moves: 0,
    timeCounter: 0,
    imgCategory: "any",
    cardFigures: [],
    gameLevel: 0,

    // Event listener BtnStartModal click
    // Display the start modal
    clickBtnStartModal: function() {
      window.scrollTo(0, 0);
      $("#btn-start-modal").hide();
      $("#start-modal").modal({
        backdrop: "static",
        keyboard: false,
      });
      $("#player-name").val("");

      btnStartGame.addEventListener("click", game.clickBtnStartGame);
      btnCloseStartModal.addEventListener("click", game.clickBtnCloseStartModal);
      btnCloseCrossStartModal.addEventListener("click", game.clickBtnCloseCrossStartModal);
    },

    // Event listener BtnStartGame click
    // Start the player's game
    clickBtnStartGame: function() {
      game.initTime();

      inputPlayerName.addEventListener("input", game.changeInputPlayerName());
    },

    // Event listener InputPlayerName change
    changeInputPlayerName: function() {
      if (inputPlayerName.value !== "") {
        game.getPlayerData();
      } else {
        setTimeout(function() {
          $("#player-name").effect("bounce");
        }, 10);
      }
    },

    // Event listener BtnResultsModal click
    // Display the result modal according to the game level
    clickBtnResultsModal: function() {
      window.scrollTo(0, 0);
      $("#btn-results-modal").hide();
      $("#results-modal").modal({
        backdrop: "static",
        keyboard: false,
      });
      $("#btn-level-up").hide();
      $("#btn-play-again").hide();

      if (game.gameLevel === 3) {
        $(".results-text").text(
          `Well done ${game.playerName}! You finished the game. Do you want to \
          start the game over?`
        );
        $("#btn-play-again").show();
        btnPlayAgain.addEventListener("click", game.clickBtnPlayAgain);
      } else {
        $("#btn-results-modal").hide();
        $(".results-text").text(
          `Well done ${game.playerName}! You finished Level ${game.gameLevel} \
          in ${game.timeCounter} seconds and ${game.moves} moves.`
        );
        $("#btn-level-up").show();
        btnLevelUp.addEventListener("click", game.clickBtnLevelUp);
      }

      btnCloseResultsModal.addEventListener("click", game.clickBtnCloseResultsModal);
      btnCloseCrossResultsModal.addEventListener("click", game.clickBtnCloseCrossResultsModal);
    },

    // Event listener BtnLevelUp click
    // Display a level up game round
    clickBtnLevelUp: function() {
      $("#results-modal").modal("toggle");
      game.gameLevel++;
      game.getLevelUp();
    },

    // Event listener BtnPlayAgain click
    // Start the game over from the result pop up when the player has completed
    // the 5 levels
    clickBtnPlayAgain: function() {
      $("#results-modal").modal("toggle");
      game.clearTime();
      game.resetTime();
      game.init();
    },

    // Event listener BtnRestart click
    // Restart the game round (scope: current level)
    clickBtnRestart: function() {
      game.resetMoves();
      game.resetTime();
      game.shuffleCards();
    },

    // Event listener BtnExit click
    // Start the game over from the Exit button
    clickBtnExit: function() {
      game.clearTime();
      game.resetTime();
      game.init();
    },

    // Event listener BtnCloseCrossStartModal click
    // Display the btn start modal
    clickBtnCloseCrossStartModal: function() {
      $("#btn-start-modal").show();
    },

    // Event listener BtnCloseStartModal click
    // Display the btn start modal
    clickBtnCloseStartModal: function() {
      $("#btn-start-modal").show();
    },

    // Event listener BtnCloseCrossResultsModal click
    // Display the btn results modal
    clickBtnCloseCrossResultsModal: function() {
      $("#btn-results-modal").show();
    },

    // Event listener BtnCloseResultsModal click
    // Display the btn results modal
    clickBtnCloseResultsModal: function() {
      $("#btn-results-modal").show();
    },

    // Event listener card class click
    // Flip the card
    clickCardHandlers: function() {
      $(".card").click(function() {
        game.flipCard($(this));
      });
    },

    // Initialize the game
    init: function() {
      btnStartModal.addEventListener("click", game.clickBtnStartModal);

      $(".init-wrapper").show();
      $("#btn-start-modal").show();
      $("#btn-results-modal").hide();
      $(".header-details").empty();
      $(".information-details h4").empty();
      $("#btn-restart").hide();
      $("#btn-exit").hide();
      $("#card-details").empty();
    },

    // Get the player game environment data
    getPlayerData: function() {
      game.playerName = inputPlayerName.value;
      game.clickCardHandlers();
      $("#start-modal").modal("toggle");
      $(".init-wrapper").hide();
      game.getHeaderDetails();
      game.getInformationDetails();
      game.gameLevel = 1;
      game.getDeckOfCard(game.gameLevel);
    },

    // Display game title
    getHeaderDetails: function() {
      $(".header-details").empty();
      $(".header-details")
        .append("<h1>Match the memory</h1>")
        .addClass("uppercase");
    },

    // Display info badges (level, moves, time) and action buttons (reset, exit)
    getInformationDetails: function() {
      $(".information-details h4").empty();
      $(".information-details h4").append(
        '<span class="badge badge-primary level">Level<span id="levelCounter">0</span></span><span class="badge badge-primary moves"><span id="moves">0</span> moves</span><span class="badge badge-primary levelTimer"><span id="levelTimer">0</span> s</span>'
      );
      $(".information-details").show();
      $("#btn-restart").show();
      $("#btn-exit").show();

      btnExit.addEventListener("click", game.clickBtnExit);
      btnRestart.addEventListener("click", game.clickBtnRestart);
    },

    // Get the card deck according to the game round level
    getCardFigures: function(gameLevel) {
      switch (gameLevel) {
        case (1):
          return (game.cardFigures = [1, 2, 3, 1, 2, 3]);
        case (2):
          return (game.cardFigures = [1, 2, 3, 4, 1, 2, 3, 4]);
        case (3):
          return (game.cardFigures = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]);
        default:
          return (game.cardFigures = [1, 2, 3, 1, 2, 3]);
      }
    },

    // credit: https://medium.com/swlh/the-javascript-shuffle-62660df19a5d
    // Iterate over the cards array and each time generate a random number
    // then switching numbers which shuffles cards and then, after cards are
    // shuffled, assign cards
    shuffleCards: function() {
      let switching = 0;
      let temp = 0;
      $("#card-details").empty();
      for (let i = game.cardFigures.length - 1; i > -1; i -= 1) {
        switching = Math.floor(Math.random() * game.cardFigures.length);
        temp = game.cardFigures[i];
        game.cardFigures[i] = game.cardFigures[switching];
        game.cardFigures[switching] = temp;
        $("#card-details").append('<div class="card unpaired"></div>');
      }
      game.getCards();
    },

    // Get the deck of cards layout on md, lg and xl: 3 colums (default) or 4
    // colums according to the number of cards in the current level
    // On xs, xxs: 2 columns
    getDeckOfCardsLayout: function() {
      if (game.cardFigures.length % 4 === 0) {
        $("#card-details").addClass('columns4');
      } else {
        $("#card-details").removeClass('columns4');
      }
    },

    // Assign cards
    // Iterate over each one of the elements with class="card" and assign a
    // data-value attribute and a relative value to each one of the individual
    // cards (https://api.jquery.com/data/)
    getCards: function() {
      $(".card").each(function(index) {
        $(this).attr("data-card-figure", game.cardFigures[index]);
      });
      game.clickCardHandlers();
    },

    // On-click flip the card and display the figure of the card. Figures are
    // randomly generated from https://placeimg.com
    flipCard: function(card) {
      card.addClass("visible");
      // card.css({
      //   "background-image": 'url("https://placeimg.com/200/200/' +
      //     game.imgCategory +
      //     "/" +
      //     card.data("cardFigure") +
      //     '")',
      // });
      card.css({
        "background-image": 'url("https://loremflickr.com/200/200' +
          // game.imgCategory +
          "/" +
          card.data("cardFigure") +
          '")',
      });
      if ($(".visible").length === 2) {
        game.checkForPairedCards(game.gameLevel);
      }
    },

    // Check if the 2 visible cards have similar figures,
    //if they match make the paired cards disapeared if not flip the figures of
    //the unpaired ones back after a timeout interval
    checkForPairedCards: function(level) {
      let time = 0;
      game.gameLevel = level;
      switch (game.gameLevel) {
        case (1):
          time = 900;
          break;
        case (2):
          time = 700;
          break;
        case (3):
          time = 700;
          break;
      }

      if (
        $(".visible").first().data("cardFigure") ===
        $(".visible").last().data("cardFigure")
      ) {
        setTimeout(function() {
          $(".visible").each(function() {
            $(this)
              .css({
                opacity: 0,
              }, {
                duration: 1000,
              })
              .removeClass("unpaired visible");
          });
          game.checkForSuccess();
        }, time);
      } else {
        setTimeout(function() {
          $(".visible").each(function() {
            $(this)
              .css({
                background: "",
              })
              .removeClass("visible");
          });
        }, time);
      }
      game.moves++;
      $("#moves").html("" + game.moves);
    },

    // Check if all cards are suceessfully paired
    checkForSuccess: function() {
      if ($(".unpaired").length === 0) {
        this.getResults(game.gameLevel);
      }
    },

    // Once all cards are paired, pop up your results: player name, level,
    // time and moves it took to finish the game round
    getResults: function() {
      $(".information-details").hide();
      $("h1").hide();
      $(".init-wrapper").show();
      $("#card-details").empty();
      $("#btn-start-modal").hide();
      $("#btn-results-modal").show();

      btnResultsModal.addEventListener("click", game.clickBtnResultsModal)
    },

    // Continue the game by starting a new game round to the level up
    getLevelUp: function() {
      game.clickCardHandlers();
      $(".init-wrapper").hide();
      game.getHeaderDetails();
      $(".information-details").show();

      game.resetTime();
      game.resetMoves();
      game.getDeckOfCard(game.gameLevel);
    },

    // Display the game level
    displayGameLevel: function(level) {
      game.gameLevel = level;
      $("#levelCounter").html(" " + game.gameLevel);
    },

    // Reset moves (scope: current level of the game round)
    resetMoves: function() {
      game.moves = 0;
      $("#moves").html("" + game.moves);
    },

    // Reset time (scope: current level of the game round)
    resetTime: function() {
      game.timeCounter = 0;
      $("#levelTimer").html("" + game.timeCounter);
    },

    // Initialize time
    initTime: function() {
      game.refreshIntervalId = setInterval(function() {
        game.timeCounter++;
        $("#levelTimer").html("" + game.timeCounter);
      }, 1000);
    },

    // Clear time
    clearTime: function() {
      clearInterval(game.refreshIntervalId);
    },

    // Pre load the images from https://placeimg.com
    getImagesloaded: function() {
      let img = [];
      for (let i = 0; i < game.cardFigures.length; i++) {
        img[i] = new Image();
        img[i].src =
          "https://placeimg.com/200/200/" + game.imgCategory + "/" + i;
      }
    },

    // Get the deck of cards according to the game level
    getDeckOfCard: function(level) {
      game.gameLevel = level;
      game.displayGameLevel(game.gameLevel);
      game.cardFigures = game.getCardFigures(game.gameLevel);
      game.getDeckOfCardsLayout();
      game.shuffleCards();
      game.getImagesloaded();
    }
  };

  game.init();
});
