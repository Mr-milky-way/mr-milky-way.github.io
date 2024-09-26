const gameCardTemplate = document.querySelector("[data-game-template]")
const gameCardContainer = document.querySelector("[data-game-cards-container]")
const searchInput = document.querySelector("[data-search]")

let games = []

fetch("js/json/games.json").then((res) => res.json()).then(data => {
    games = data.map(game=> {
        const card = gameCardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-pic]")

        // adding content into the query selected i.e header and body
        header.textContent = game.title
        body.textContent = game.image
        gameCardContainer.append(card)

        // return the result after successfull fetch
        return {title: game.title, description: game.image, element: card}
    });

})

searchInput.addEventListener('input', (e) => {
    const value = e.target.value
    games.forEach((game) => {
        const isVisible = game.title.toLowerCase().includes(value) || game.description.toLowerCase().includes(value)
        game.element.classList.toggle('hide', !isVisible)
    })
})