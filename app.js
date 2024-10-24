const $cardBtn = $('#card-btn')
const $cards = $('#cards')

const baseURL = 'https://deckofcardsapi.com/api/deck/'
let deckID = null

function getCard(e) {
    e.preventDefault()
    if (deckID) {
        axios.get(`${baseURL}${deckID}/draw/?count=1`)
        .then(p => {$cards.append(`<img src="${p.data.cards[0].image}">`)
        if (p.data.remaining == 0) {
            deckID = null
        }})
    }
    else {
        axios.get(`${baseURL}new/draw/?count=1`)
        .then(p => {
            deckID = p.data.deck_id
            $cards.text('')
            $cards.append(`<img src="${p.data.cards[0].image}">`)
        })
    }
}

$cardBtn.on('click', getCard)