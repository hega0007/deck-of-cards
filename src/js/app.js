function Card(suit, val){
	this.suit = suit;
	this.val = val;

	this.toString = function(){
		return this.val + '&' + this.suit.toLowerCase() + ';';
	};
}

function DeckOfCards(){
	var suits = ["CLUBS", "SPADES", "HEARTS", "DIAMS"];
	var faces = ["J", "Q", "K", "A"];

	this.shuffle = function(){
		var size = this.deck.length;
		for(var i = 0; i < size; i++){
			//swap this index with a random one
			var newIndex = Math.floor(Math.random() * size);
			var swapVal = this.deck[newIndex];
			this.deck[newIndex] = this.deck[i];
			this.deck[i] = swapVal;
		}
	};

	this.deal = function(numberOfCards){
		if(numberOfCards < 1 || numberOfCards > 52){
			return [];
		}
		
		var hand = [];
		for(var i = 0; i < numberOfCards; i++){
			hand.push(this.deck.pop());
		}
		return hand;
	};

	//comparator function for Card object sorts
	//not a perfect match for inclusion on the DeckOfCards object, but trying to avoid duplicating the
	//hard coding of suits and face card names + their sort orders
	this.cardSort = function(a, b){
		var aSuitIndex = suits.indexOf(a.suit);
		var bSuitIndex = suits.indexOf(b.suit);

		if(aSuitIndex < bSuitIndex){
			return -1;
		}else if(bSuitIndex < aSuitIndex){
			return 1;
		}else{
			var aCardIndex = getCardIndex(a);
			var bCardIndex = getCardIndex(b);
			if(aCardIndex < bCardIndex){
				return -1;
			}else if(bCardIndex < aCardIndex){
				return 1;
			}else{
				return 0;
			}
		}
	};

	//private helper function
	function getCardIndex(card){
		if(faces.indexOf(card.val) > -1){
			return 11 + faces.indexOf(card.val);
		}else{
			return card.val;
		}
	}

	//initialize the deck
	this.deck = [];

	for(var i = 0; i < suits.length; i++){

		//add the numbered cards for this suit
		for(var j = 2; j <= 10; j++){
			this.deck.push(new Card(suits[i], j));
		}

		//add the face cards
		for(var k = 0; k < faces.length; k++){
			this.deck.push(new Card(suits[i], faces[k]));
		}
	}

	this.shuffle();
}
