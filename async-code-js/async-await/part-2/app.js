let baseURL = "https://deckofcardsapi.com/api/deck"

// 1
async function drawCard() {
    let res = await axios.get(`${baseURL}/new/draw`)
    let card = res.data.cards[0]
    console.log(`You drew a ${card.value} of ${card.suit.toLowerCase()}`)
}
drawCard()


// 2
async function getTwoCards() {
    let res1 = await axios.get(`${baseURL}/new/draw`)
    let deck = res1.data.deck_id
    let cardOne = res1.data.cards[0]
    let res2 = await axios.get(`${baseURL}/${deck}/draw`)
    let cardTwo = res2.data.cards[0]
    console.log(`You drew a ${cardOne.value} of ${cardOne.suit.toLowerCase()} and a ${cardTwo.value} of ${cardTwo.suit.toLowerCase()}`)
}
getTwoCards()

// 3
// DECLARE VARIABLES
let $btn = $('button');
let $cards = $('#cards');
let partThreeDeck;

// GET A NEW DECK
async function getNewDeck() {
    let newDeck = await axios.get(`${baseURL}/new/shuffle`);
    partThreeDeck = newDeck.data.deck_id;
}
getNewDeck()

// DRAW FUNCTION
async function drawFullDeck() {
    let res = await axios.get(`${baseURL}/${partThreeDeck}/draw/`);
    let newCard = res.data.cards[0].image;
    $cards.append(
        $('<img>', {
            src: newCard
        })
    )
    if (res.data.remaining == 0) {
        $btn.remove();
    }
}

// ENABLE BUTTON DRAWING
$btn.on('click', function() {
    drawFullDeck()
})