# deck-of-cards

A simple page providing some basic functionality of a deck of cards.

##Functionality
Upon the page load, a deck of cards is created and pre-shuffled.  The user can select to re-shuffle the cards, or to deal a specified number of cards onto the page.  Once the cards are dealt, the user can select to sort the cards in ascending order (with the suits sorting as Clubs, Spades, Diamonds, and then Hearts), with Aces sorting as the highest card.  The user can also select to Start Over, which results in a new deck being created and pre-shuffled, and the existing "hand" being discarded.

##Build instructions
I've used Grunt to automate JS Hinting and unit testing via QUnit.  After cloning the repository, navigating to the root, and running `npm install` should get the Grunt dependencies installed.  Then, running `grunt` should execute the default build, which will run JS Hnt and the QUnit tests.

##Design considerations
* Given the small size + low compexity of this project, I've forgone some streamlining of the build that might be valuable on a larger project, such as concatenating + minifying JS and CSS, or using a CSS pre-processor such as SASS.
* Given the design constraint of minimizing external libraries except as relating to testing, there is a bit of necessary hard-coded DOM nastiness in the JS present in index.html.  I've done my best to keep it all in one (small) place so that hard-coded element ids aren't strewn around the JS.
