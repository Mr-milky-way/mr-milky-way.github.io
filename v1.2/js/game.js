const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

fetch("js/json/games.json").then((res) => res.json()).then(data => {
    users = data.map(user=> {
        const card = userCardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")
        
        var img = document.createElement("img");
        img.src = user.image;
        var src = document.getElementById("header");
        src.appendChild(img);

        // adding content into the query selected i.e header and body
        header.textContent = user.title
        body.textContent = user.image
        userCardContainer.append(card)

        // return the result after successfull fetch
        return {title: user.title, description: user.image, element: card}
    });

})

searchInput.addEventListener('input', (e) => {
    const value = e.target.value
    users.forEach((user) => {
        const isVisible = user.title.toLowerCase().includes(value) || user.description.toLowerCase().includes(value)
        user.element.classList.toggle('hide', !isVisible)
    })
})