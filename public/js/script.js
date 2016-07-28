$(document).ready(function(){

	var dealer = $('#dealer'),
		player = $('#player'),
		actions = $('#actions'),
		deck = null,
		playerCards = [],
		dealerCards = [],
		dealt = false,
		playerScore = $('#player-score'),
		dealerScore = $('#dealer-score'),
		playerConsole = $('.console');

	// Actino buttons
	var drawButton = $('#drawButton'),
		newDealButton = $('#newDeal'),
		logDeck = $('#devLogDeck'),
		removehidden = $('#devRemoveHidden'),
		standButton = $('#stand-button');



	function newDeck() {
		deck = ['h_1', 'h_2', 'h_3', 'h_4', 'h_5', 'h_6', 'h_7', 'h_8', 'h_9' ,'h_10', 'h_11', 'h_12', 'h_13',
				's_1', 's_2', 's_3', 's_4', 's_5', 's_6', 's_7', 's_8', 's_9' ,'s_10', 's_11', 's_12', 's_13',
				'd_1', 'd_2', 'd_3', 'd_4', 'd_5', 'd_6', 'd_7', 'd_8', 'd_9' ,'d_10', 'd_11', 'd_12', 'd_13',
				'c_1', 'c_2', 'c_3', 'c_4', 'c_5', 'c_6', 'c_7', 'c_8', 'c_9' ,'c_10', 'c_11', 'c_12', 'c_13',];
	}

	function drawCard(newDeck, div, hidden) {
		var card = deck[Math.floor(Math.random()*deck.length)];
		//remove card from deck
		deck = jQuery.grep(deck, function(value) {
		  return value != card;
		});

		// add card to new deck (player, dealer etc.)
		newDeck.push(card);
		if(hidden){
			div.append($('<div class="card '+card+' hidden"><img src="/images/cards/'+card+'.jpg"></div>').hide().fadeIn(400));
		} else {
			div.append($('<div class="card '+card+'"><img src="/images/cards/'+card+'.jpg"></div>').hide().fadeIn(400));
		}

		updateScore(calcScore(playerCards), playerScore);

		return card;
	}

	function updateCards() {
		// Refresh dealer cards
		player.html('');
		$.each(playerCards, function( i, l){
			player.append($('<div class="card '+l+'"><img src="/images/cards/'+l+'.jpg"></div>').hide().fadeIn(400));
		});
		// Refresh player cards
		dealer.html('');
		$.each(dealerCards, function( i, l){
			dealer.append($('<div class="card '+l+'"><img src="/images/cards/'+l+'.jpg"></div>').hide().fadeIn(400));
		});
	}

	function newDeal(){

		newDeck();

		if(dealt === true) {
			playerCards = [];
			dealerCards = [];

			updateCards();
			dealerScore.html('');
		}


		drawCard(playerCards, player, false);
		setTimeout(function(){
			drawCard(dealerCards, dealer, true)
		}, 400);
		setTimeout(function(){
			drawCard(playerCards, player, false)
		}, 800);
		setTimeout(function(){
			drawCard(dealerCards, dealer, false)
		}, 1200);

		dealt = true;
	}

	function removeHidden(){
		$('.hidden').each(function(){
			$(this).removeClass('hidden');
		})
	}

	function calcScore(deck){
		var score = 0;

		$.each(deck, function( i, card){
			var score_array = card.split('_');
			var temp = parseInt(score_array[1]);
			if(temp == 1){
				deck = jQuery.grep(deck, function(value) {
				  return value != card;
				});

				deck.push(card);
			}
		});

		// Adding the score together
		$.each(deck, function( i, card){
			var score_array = card.split('_');
			var temp = parseInt(score_array[1]);
			switch(temp) {
			    case 1:
			    	if(score < 11){
			    		score = score + 10;
			    	} else {
			    		score = score + temp;
			    	}
			        break;
			    case 2:
			        score = score + temp;
			        break;
			    case 3:
			        score = score + temp;
			        break;
			    case 4:
			        score = score + temp;
			        break;
			    case 5:
			        score = score + temp;
			        break;
			    case 6:
			        score = score + temp;
			        break;
			    case 7:
			        score = score + temp;
			        break;
			    case 8:
			        score = score + temp;
			        break;
			    case 9:
			        score = score + temp;
			        break;
			    case 10:
			        score = score + temp;
			        break;
			    case 11:
			        score = score + 10;
			        break;
			    case 12:
			        score = score + 10;
			        break;
			    case 13:
			        score = score + 10;
			        break;
			    default:
			       score = 'Error';
			}
		});

		return score;
	}

	function dealerTurn(){
		console.log('dealer turn started');
		removeHidden();

		var dScore = parseInt(calcScore(dealerCards));
		var pScore = parseInt(calcScore(playerCards));

		updateScore(calcScore(dealerCards), dealerScore);
		console.log(dScore + ' -pre draw');
		if(dScore < 17){
			console.log('endgame Triggered 0');
		}

		while(dScore < 17){
			console.log(dScore+" - before");
			drawCard(dealerCards, dealer, false);
			console.log(dScore+" - mid");
			dScore = dScore + 10;
			console.log(dScore+" - after");
			updateScore(dScore, dealerScore);
			if(dScore < 17){
				console.log('endgame Triggered 1');
			}

		}
	}

	function endGame(){

		var dScore = calcScore(dealerCards);
		var pScore = calcScore(playerCards);

		console.log('endgame triggered');

		if(pScore > 21){
			playerConsole.append('<p>Dealer wins!</p>');
		} else if(dScore > 21){
			playerConsole.append('<p>You win!</p>');
		} else if(dScore > pScore){
			playerConsole.append('<p>Dealer wins!</p>');
		} else if(dScore == pScore){
			playerConsole.append('<p>No one wins!</p>');
		} else {
			playerConsole.append('<p>You win!</p>');
		}

		

	}

	function updateScore(score, div){
		if(score > 21){
			var text = 'Busted';
		} else if(score == 21){
			var text = 'BlackJack';
		}
		else {
			var text = score;
		}
		div.hide().html(text).fadeIn(200);

		if(score >= 21){
			dealerTurn();
		}
	}

	drawButton.click(function(){
		drawCard(playerCards, player, false);
	});

	newDealButton.click(function(){
		newDeal();
	});

	standButton.click(function(){
		dealerTurn();
	});

	logDeck.click(function(){
		console.log(deck);
	});

	removehidden.click(function(){
		removeHidden();
	});



	newDeal();
});