const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

fetch("/content/json/games.json").then((res) => res.json()).then(data => {
    users = data.map(user=> {
        const card = userCardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")

        // adding content into the query selected i.e header and body
        header.textContent = user.title
        card.href = user.link
        userCardContainer.append(card)

        // return the result after successfull fetch
        return {title: user.title, description: user.link, element: card}
    });

})

searchInput.addEventListener('input', (e) => {
    const value = e.target.value
    users.forEach((user) => {
        const isVisible = user.title.toLowerCase().includes(value)
        user.element.classList.toggle('hide', !isVisible)
    })
})