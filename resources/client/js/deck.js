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

/*
    Creates the structure for the cards being used in the deck, including the colours used. Each card will be stored as an object
    within the flattened map data structure i.e. 10 sets of cards for each colour in one structure rather than three.
 */

class Card {
    constructor(colour, value) {
        this.colour = colour
        this.value = value
    }

    // returns the colour to be used as the background colour for the card when drawn

    get color() {
        return this.colour === "r" ? "red" : this.colour==="y" ? "yellow": "black"
    }

    // Defines the HTML formatting for the card when drawn, creating a new <div> block

    getHTML() {
        const cardDiv = document.createElement("div")
        //cardDiv.innerText = this.suit
        let colour = ""

        // Changes the text colour of the card based on the card colour
        if (this.color === "red" || this.color==="black") colour = "yellow"
        else if(this.color==="yellow") colour = "black"
        cardDiv.style.backgroundColor = this.color
        cardDiv.style.color = colour
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value}`
        return cardDiv
    }
}

/*
    Creates a map data structure by merging all of the colours with each of the values from the
    arrays from the top. FLATMAP creates a single map structure from the MAP structures created so that
    they all appear in a single structure.
 */

function freshDeck() {
    return COLOURS.flatMap(colour => {
        return VALUES.map(value => {
            return new Card(colour, value)
        })
    })
}