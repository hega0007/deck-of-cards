QUnit.test("Deck Creation", function(assert) {
	var testDeck = new DeckOfCards();
	assert.ok(testDeck.deck, "Deck exists");
	assert.equal(testDeck.deck.length, 52, "Deck has 52 cards");

	var numClubs = 0;
	var numHearts = 0;
	var numDiamonds = 0;
	var numSpades = 0;

	for(var i = 0; i < testDeck.deck.length; i++){
		if(testDeck.deck[i].suit == "CLUBS"){
			numClubs ++;
		}else if(testDeck.deck[i].suit == "HEARTS"){
			numHearts ++;
		}else if(testDeck.deck[i].suit == "SPADES"){
			numSpades ++;
		}else if(testDeck.deck[i].suit == "DIAMS"){
			numDiamonds++;
		}
	}

	assert.equal(numClubs, 13, "13 Clubs in the deck");
	assert.equal(numHearts, 13, "13 Hearts in the deck");
	assert.equal(numDiamonds, 13, "13 Diamonds in the deck");
	assert.equal(numSpades, 13, "13 Spades in the deck");
});

QUnit.test("Shuffling", function(assert){
	var testDeck = new DeckOfCards();

	var testDeckClone = testDeck.deck.slice(0);
	testDeck.shuffle();

	assert.notDeepEqual(testDeck.deck, testDeckClone, "Shuffle deck is the same as original deck. This should have an almost impossible likelihood of occuring.");
});

QUnit.test("Dealing", function(assert){
	var testDeck = new DeckOfCards();
	var hand = testDeck.deal(5);

	assert.equal(hand.length, 5, "5 Cards dealt to hand");
	assert.equal(testDeck.deck.length, 47, "47 Cards now in deck");

	testDeck = new DeckOfCards();
	hand = testDeck.deal(1);

	var dealtCardFound = false;
	for(var i = 0; i < testDeck.deck.length; i ++){
		var thisCard = testDeck.deck[i];
		if(thisCard.suit == hand[0].suit && thisCard.val == hand[0].val){
			dealtCardFound = true;
		}
	}
	assert.ok(!dealtCardFound, "Dealt card was not found in deck");

	testDeck = new DeckOfCards();
	assert.deepEqual(testDeck.deal(0), [], "Dealing zero cards returns empty array");
	assert.deepEqual(testDeck.deal(-1), [], "Dealing negative cards returns empty array");
	assert.deepEqual(testDeck.deal(53), [], "Dealing 53 cards returns empty array");

	hand = testDeck.deal(52);
	assert.equal(hand.length, 52, "Dealing 52 cards works");
	assert.equal(testDeck.deck.length, 0, "Dealing 52 cards empties the deck");
});

QUnit.test("Sorting", function(assert){
	var testDeck = new DeckOfCards();

	var hand = [new Card("CLUBS", 2), new Card("DIAMS", 2), new Card("HEARTS", 2), new Card("SPADES", 2)];
	var hand2 = [new Card("DIAMS", 2), new Card("HEARTS", 2), new Card("SPADES", 2), new Card("CLUBS", 2)];
	var hand3 = [ new Card("SPADES", 2), new Card("CLUBS", 2), new Card("DIAMS", 2), new Card("HEARTS", 2)];
	var hand4 = [new Card("CLUBS", 2), new Card("HEARTS", 2), new Card("DIAMS", 2), new Card("SPADES", 2)];

	var sorted = [new Card("CLUBS", 2), new Card("SPADES", 2), new Card("HEARTS", 2), new Card("DIAMS", 2)];

	hand = hand.sort(testDeck.cardSort);
	hand2 = hand.sort(testDeck.cardSort);
	hand3 = hand.sort(testDeck.cardSort);
	hand4 = hand.sort(testDeck.cardSort);

	assert.deepEqual(hand, sorted, "Cross suit sorting is working");
	assert.deepEqual(hand2, sorted, "Cross suit sorting is working");
	assert.deepEqual(hand3, sorted, "Cross suit sorting is working");
	assert.deepEqual(hand4, sorted, "Cross suit sorting is working");

	hand = [new Card("CLUBS", "A"), new Card("CLUBS", "K"), new Card("CLUBS", 4), new Card("CLUBS", 3)];
	hand2 = [new Card("CLUBS", 4), new Card("CLUBS", "K"), new Card("CLUBS", "A"), new Card("CLUBS", 3)];
	hand3 = [new Card("CLUBS", 3), new Card("CLUBS", 4), new Card("CLUBS", "K"), new Card("CLUBS", "A")];
	hand4 = [new Card("CLUBS", "A"), new Card("CLUBS", 3), new Card("CLUBS", 4), new Card("CLUBS", "K")];

	sorted = [new Card("CLUBS", 3), new Card("CLUBS", 4), new Card("CLUBS", "K"), new Card("CLUBS", "A")];

	hand = hand.sort(testDeck.cardSort);
	hand2 = hand.sort(testDeck.cardSort);
	hand3 = hand.sort(testDeck.cardSort);
	hand4 = hand.sort(testDeck.cardSort);

	assert.deepEqual(hand, sorted, "Same suit sorting is working");
	assert.deepEqual(hand2, sorted, "Same suit sorting is working");
	assert.deepEqual(hand3, sorted, "Same suit sorting is working");
	assert.deepEqual(hand4, sorted, "Same suit sorting is working");

	hand = [new Card("CLUBS", 7), new Card("SPADES", 2), new Card("SPADES", "A"), new Card("DIAMS", "K")];
	hand2 = [new Card("CLUBS", 7), new Card("SPADES", 2), new Card("SPADES", "K"), new Card("DIAMS", "A")];
	hand3 = [new Card("SPADES", "A"), new Card("CLUBS", 7), new Card("SPADES", 2), new Card("DIAMS", "K")];
	hand4 = [new Card("SPADES", 2), new Card("SPADES", "A"), new Card("DIAMS", "K"), new Card("CLUBS", 7)];

	sorted = [new Card("CLUBS", 7), new Card("SPADES", 2), new Card("SPADES", "A"), new Card("DIAMS", "K")];

	hand = hand.sort(testDeck.cardSort);
	hand2 = hand.sort(testDeck.cardSort);
	hand3 = hand.sort(testDeck.cardSort);
	hand4 = hand.sort(testDeck.cardSort);

	assert.deepEqual(hand, sorted, "Combined sorting is working");
	assert.deepEqual(hand2, sorted, "Combined sorting is working");
	assert.deepEqual(hand3, sorted, "Combined sorting is working");
	assert.deepEqual(hand4, sorted, "Combined sorting is working");

});