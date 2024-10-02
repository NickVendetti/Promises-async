$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';

    // request to API for single card from newly shuffled deck. console.log value and suit of card
$.getJSON(`${baseURL}/new/draw/`).then(data => {
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
});

    // make request to get single card from new deck, once first card comes, make same request to receive 2nd card from same deck
    let firstCard = null;
    $.getJSON(`${baseURL}/new/draw/`).then(data => {
        firstCard = data.cards[0];
        let deckId = data.deck_id;
        return $.getJSON(`${baseURL}/${deckId}/draw/`);
    })
    .then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card) {
            console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
        });
    });

    // create HTML, show button for new card, new click = new card
    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');

    $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
        deckId = data.deck_id;
        $btn.show();
    });

    $btn.on('click', function() {
        $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
            let cardSrc = data.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomy = Math.random() * 40 - 20;
            $cardArea.append(
                $('<img>', {
                    src: cardSrc,
                    css: {
                        transform: `translate(${randomX}px, ${randomy}px) rotate(${angle}deg)`
                    }
                })
            );
            if (data.remaining === 0) $btn.remove();
        });
    });
});