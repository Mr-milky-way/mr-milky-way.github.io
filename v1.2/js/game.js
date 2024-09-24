let jsonData = `[
  {"Name": "Lion", "Color": "Yellow"},
  {"Name": "Monkey", "Color": "Orange"},
  {"Name": "Fish", "Color": "Blue"},
  {"Name": "Cat", "Color": "Black"}
]`

let data = JSON.parse(games.json)

function search_games() {
  let input = document.getElementById('searchbar').value
  input = input.toLowerCase();
  let x = document.querySelector('#list-holder');
  x.innerHTML = ""

  for (i = 0; i < data.length; i++) {
    let obj = data[i];

    if (obj.Name.toLowerCase().includes(input)) {
      const elem = document.createElement("li")
      elem.innerHTML = `${obj.Name} - ${obj.Color}`
      x.appendChild(elem)
    }
  }
}