const COLOURS = ["r", "y", "b"]
const VALUES = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
]

export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
    }

    get numberOfCards() {
        return this.cards.length
    }

    pop() {
        return this.cards.shift()
    }

    push(card) {
        this.cards.push(card)
    }

    deckPush(card){
        this.cards.push(card)
    }

    clear(){
        for(let x of this.cards) this.cards.shift()
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
        console.log(this.cards)
    }
}

class Card {
    constructor(colour, value) {
        this.colour = colour
        this.value = value
    }

    get color() {
        return this.colour === "r" ? "red" : this.colour==="y" ? "yellow": "black"
    }

    getHTML() {
        const cardDiv = document.createElement("div")
        //cardDiv.innerText = this.suit
        let colour = ""
        if (this.color === "red" || this.color==="black") colour = "yellow"
        else if(this.color==="yellow") colour = "black"
        cardDiv.style.backgroundColor = this.color
        cardDiv.style.color = colour
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value}`
        return cardDiv
    }
}

class EmptyDeck{
    constructor(colour, value){
        this.colour=colour
        this.value=value
    }
}

function freshDeck() {
    return COLOURS.flatMap(colour => {
        return VALUES.map(value => {
            return new Card(colour, value)
        })
    })
}