/**
 * @module constants
 */

/* The size of the array CARD_FIGURES does not really matter,
as long as its length equals at least half of the deck size.

If the number of card figures in CARD_FIGURES exceeds half of the deck size,
the programm will choose the correct amount of figures randomly.
If there are not enough figures, the deck constructor will throw an error. */

const CARD_FIGURES = [
  'cat', 'bath', 'crow', 'anchor', 'cocktail',
  'cube', 'leaf', 'bicycle', 'bomb', 'couch',
  'fish', 'hamburger', 'hippo', 'kiwi-bird', 'pepper-hot',
  'subway', 'swimmer', 'theater-masks', 'toilet-paper', 'yin-yang',
  'toilet', 'ankh', 'bacterium', 'biohazard','bong',
  'brain', 'camera-retro', 'carrot', 'moon', 'hand-spock',
  'frog', 'ghost', 'hiking', 'helicopter', 'hat-wizard',
  'hotdog', 'dog', 'life-ring', 'chess-rook', 'piggy-bank',
  'poop', 'quidditch', 'snowman', 'spider', 'user-astronaut',
  'snowplow', 'user-injured', 'american-sign-language-interpreting', 'baby', 'bug',
  'cannabis','chess-knight','chess-bishop','chess-pawn','chess-queen',
  'archway', 'award', 'basketball-ball', 'binoculars', 'birthday-cake',
  'bone', 'bowling-ball', 'bullhorn', 'chair', 'cash-register',
  'charging-station', 'child', 'cloud', 'cloud-sun', 'compact-disc',
  'crosshairs', 'dice', 'dice-d20', 'dna', 'dog',
  'egg', 'eye-dropper', 'faucet', 'feather', 'filter',
  'band-aid', 'beer', 'box', 'box-open', 'bus-alt',
  'candy-cane', 'dumpster', 'car-crash', 'dragon', 'drum',
  'peace', 'golf-ball', 'highlighter', 'lemon', 'meteor',
  'dungeon', 'envelope-open-text', 'fan', 'female', 'gift',
  'globe-africa', 'graduation-cap', 'grin-tongue-squint', 'hand-lizard', 'hot-tub',
  'igloo', 'lightbulb', 'mask', 'mitten', 'mosque'];
const DECK_SIZE = 16;

const PERF_COMMENTS = {
  'astonishing':
    ['Seriously, how the f*** did you do that!?',
     'Go away! You are a wizard!',
     'Are you even human!?'],
   'excellent':
    ['You surely will be remembered for this performance!',
    'Amazing! I cannot believe my eyes!'],
   'good':
    ['Keep training your brain. You are getting there!',
     'Not too bad. Not too bad...'],
   'OK':
    ['You are starting to have memory leaks!',
     'Come on! Push yourself further!'],
   'bad':
    ['You should start eating brocoly to improve your memory!',
     'Either you start playing better, or I will just close myself. You choose.'],
   'verybad':
    ['Are you kidding me? Can you even remember your name?',
     'This is the worst I have seen since The Hobbit movies!',
     'You may need another kind of games. Let\'s try this one: how much is 1+1?'],
   'slow':
    ['Did you fall asleep!?',
     'Were you chatting with your sweetie pie or what?',
     'Someone bring me a gun, please... Boooooriiiiingg!']
  };

export {CARD_FIGURES, DECK_SIZE, PERF_COMMENTS};