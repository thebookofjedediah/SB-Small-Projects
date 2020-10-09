let baseURL = "https://deckofcardsapi.com/api/deck"

// 1
$.getJSON(`${baseURL}/new/draw`).then((data) => {
    let {suit, value} = data.cards[0]
    console.log("***********PART ONE ANSWER***********")
    console.log(`You drew a ${value} of ${suit.toLowerCase()}`)
})

// 2
let cardOne;
$.getJSON(`${baseURL}/new/draw`)
    .then((data) => {
        cardOne = data.cards[0];
        let deck = data.deck_id;
        return $.getJSON(`${baseURL}/${deck}/draw`)
    })
    .then((data) => {
        let cardTwo = data.cards[0];
        console.log("***********PART TWO ANSWER***********")
        console.log(`You drew a ${cardOne.value} of ${cardOne.suit.toLowerCase()} and a ${cardTwo.value} of ${cardTwo.suit.toLowerCase()} `)
    })

// 3
let $btn = $('button');
let $cards = $('#cards')
let partThreeDeck;
$.getJSON(`${baseURL}/new/shuffle`)
.then((data) => {
    partThreeDeck = data.deck_id;
})

$btn.on('click', function() {
    $.getJSON(`${baseURL}/${partThreeDeck}/draw/`)
        .then((data) => {
            let newCard = data.cards[0].image;
            $cards.append(
                $('<img>', {
                    src: newCard
                })
            )
            if (data.remaining == 0) {
                $btn.remove();
            }
        })
})