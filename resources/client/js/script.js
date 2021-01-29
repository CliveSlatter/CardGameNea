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

/*
    if the game is in a stop state (stop is true) then starts a new game. If the number of cards MOD 2 is zero e.g. 30, 28, 26 etc then
    it is player one's turn to draw otherwise it is player two's turn.
 */

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
    }
})

// if a click event is not encountered the game starts as soon as the page loads

startGame()

function startGame() {
    const deck = new Deck()
    deck.shuffle()
    mainDeck = new Deck(deck.cards)
    inRound = false
    stop = false

    cleanBeforeRound()
}

// Resets the player 1 and player 2 card slots and clears the text. Updates the number of cards in the main deck <div> block.

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
    }
    if (isGameOver(mainDeck)) {
        if(player1Deck.numberOfCards>player2Deck.numberOfCards){
            text.innerText = "Player 1 Wins with "+ player1Deck.numberOfCards +" cards!!"
            stop = true
        }else if(player1Deck.numberOfCards<player2Deck.numberOfCards){
            text.innerText = "Player 2 Wins with "+ player2Deck.numberOfCards +" cards!!"
            stop = true
        }else{
            text.innerText = "Game is a draw!!"
            stop = true
        }

    }
}

function updateDeckCount() {
    mainDeckElement.innerText = mainDeck.numberOfCards
}

/*
    Defines the rules of the game, first checking if the colours of the cards match and then compare the value. CARD_VALUE_MAP references the
    value as a string from the cards and returns the integer equivalent.

    If the cards are different colours then the code checks the colour of the player 1 card against the player 2 card returning true if player 1s card
    is the winner (TRUE) otherwise returns the player 2 card wins (FALSE)
 */

function isRoundWinner(cardOne, cardTwo) {
    if(CARD_VALUE_MAP[cardOne.colour]===CARD_VALUE_MAP[cardTwo.colour]){
        return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
    }else{
        if(CARD_VALUE_MAP[cardOne.colour] === "red" && CARD_VALUE_MAP[cardTwo.colour]==="black") return true;
        else if(CARD_VALUE_MAP[cardOne.colour]==="yellow" && CARD_VALUE_MAP[cardTwo.colour]==="red") return true;
        else if(CARD_VALUE_MAP[cardOne.colour]=== "black" && CARD_VALUE_MAP[cardTwo.colour] === "yellow") return true;
        return false;
    }

}

// When the number of cards in the main deck reaches zero the game restarts (at the moment)

function isGameOver(deck) {
    return deck.numberOfCards === 0
}

// When the first card in a round is drawn it is placed in the player 1 card slot <div> block

function playerOneTurn(){
    console.log("Player one has had a turn")
    player1Card = mainDeck.pop()
    player1CardSlot.appendChild(player1Card.getHTML())
    //cleanBeforeRound()
}

/*  When the second card in a round is drawn the card is placed in the player 2 card slot <div> block
    and then compares the cards to determine the winning card.
 */

function playerTwoTurn(){
    console.log("Player two has had a turn")
    player2Card = mainDeck.pop()
    player2CardSlot.appendChild(player2Card.getHTML())
    checkWinner()
}