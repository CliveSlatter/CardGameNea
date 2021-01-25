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

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}

class Card {
    constructor(colour, value) {
        this.suit = colour
        this.value = value
    }

    get color() {
        return this.suit === "r" ? "red" : this.suit==="y" ? "yellow": "black"
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

function freshDeck() {
    return COLOURS.flatMap(colour => {
        return VALUES.map(value => {
            return new Card(colour, value)
        })
    })
}