import Deck from "./deck.js"

const CARD_VALUE_MAP = {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10
}

const player1CardSlot = document.querySelector(".player1-card-slot")
const player2CardSlot = document.querySelector(".player2-card-slot")
const mainDeckElement = document.querySelector(".main-deck")
//const playerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector(".text")

let player1Deck, player2Deck, mainDeck, inRound, stop, player1Card, player2Card, isDraw

/*document.addEventListener("click", () => {
    if (stop) {
        startGame()
        return
    }

    if (inRound) {
        cleanBeforeRound()
    } else {
        flipCards()
    }
})*/

document.addEventListener("click", () => {
    if (stop) {
        startGame()
        return
    }

    if (inRound) {
        cleanBeforeRound()
    } else {
        if(mainDeck.numberOfCards % 2 === 0) playerOneTurn()
        else playerTwoTurn()
        //flipCards()
    }
})

startGame()
function startGame() {
    const deck = new Deck()
    deck.shuffle()
    mainDeck = new Deck(deck.cards)
    player2Deck = new Deck()
    player1Deck = new Deck()
    player1Deck.clear()
    player2Deck.clear()
    //player1Deck = new Deck(deck.cards)
    //player2Deck.clear()
    //player1Deck.clear()
    //const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
    //playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
    //computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
    inRound = false
    stop = false

    cleanBeforeRound()
}

function cleanBeforeRound() {
    inRound = false
    player1CardSlot.innerHTML = ""
    player2CardSlot.innerHTML = ""
    text.innerText = ""

    updateDeckCount()
}

function checkWinner() {
    inRound = true

    if (isRoundWinner(player2Card, player1Card)) {
        text.innerText = "Player 2 wins"
        player2Deck.push(player2Card)
        player2Deck.push(player1Card)
    } else if (isRoundWinner(player1Card, player2Card)) {
        text.innerText = "Player 1 wins"
        player1Deck.push(player2Card)
        player1Deck.push(player1Card)
    } else {
        text.innerText = "Draw"
        isDraw = true
        mainDeck.push(player2Card)
        mainDeck.push(player1Card)
    }
    console.log(mainDeck.numberOfCards)
    if (isGameOver(mainDeck)) {
        text.innerText = "You Lose!!"
        stop = true
    } else if (isGameOver(mainDeck)) {
        text.innerText = "You Win!!"
        stop = true
    }
}

function updateDeckCount() {
    mainDeckElement.innerText = mainDeck.numberOfCards
    //playerDeckElement.innerText = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
    if(CARD_VALUE_MAP[cardOne.color]===CARD_VALUE_MAP[cardTwo.color]){
        return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
    }else{
        if(CARD_VALUE_MAP[cardOne.color].valueOf() === "red" && CARD_VALUE_MAP[cardTwo.color].valueOf()==="black") return true;
        else if(CARD_VALUE_MAP[cardOne.color].valueOf()==="yellow" && CARD_VALUE_MAP[cardTwo.color].valueOf()==="red") return true;
        else if(CARD_VALUE_MAP[cardOne.color].valueOf() === "black" && CARD_VALUE_MAP[cardTwo.color].valueOf() === "yellow") return true;
        return false;
    }

}

function isGameOver(deck) {
    return deck.numberOfCards === 0
}

function playerOneTurn(){
    console.log("Player one has had a turn")
    player1Card = mainDeck.pop()
    player1CardSlot.appendChild(player1Card.getHTML())
    //cleanBeforeRound()
}

function playerTwoTurn(){
    console.log("Player two has had a turn")
    player2Card = mainDeck.pop()
    player2CardSlot.appendChild(player2Card.getHTML())
    checkWinner()
}